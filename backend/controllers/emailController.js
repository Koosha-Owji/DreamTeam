/**
 * contactController.js, controller functions for contact (get, get all, update, delete, create)
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import nodemailer from 'nodemailer';
import userModel from "../models/user.js";
import {OAuth2Client} from 'google-auth-library';
import CryptoJS from 'crypto-js';

import dotenv from "dotenv";
dotenv.config();

const oauth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);
/**  Links your Gmail account to your DreamCrm account
 * @param {request with user id and google token } req
 * @param {Response by message} res
 * @return {Response}
 */
export const link_email = async (req,res) => {
  try {
    const user = await userModel.findOne({ _id: req.user_id});
    const {tokens} = await oauth2Client.getToken(req.body.code);
    if(tokens.refresh_token!=null){
      const idToken = tokens.id_token;
      const ticket = await oauth2Client.verifyIdToken({
        idToken,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      var ciphertext = CryptoJS.AES.encrypt(tokens.refresh_token, process.env.JWT_SECRET).toString();
      await userModel.findByIdAndUpdate(req.user_id, {refresh_token: ciphertext,email_service:payload.email}).exec();
    }
    return res.status(200).json({message:"serivce is linked!"});
  } catch (error) {
    res.status(500).json({message:"something went wrong!"});
  }
}
/** Sends Email from your Gmail account using nodemailer
 * @param {request with user id, receiver email, email subject and email message } req
 * @param {Response by message} res
 * @return {Response}
 */
export const send_email = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.user_id});
        var bytes  = CryptoJS.AES.decrypt(user.refresh_token, process.env.JWT_SECRET);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        oauth2Client.setCredentials({ refresh_token: originalText });
        const accessToken = await oauth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: user.email_service,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: originalText,
            accessToken: accessToken,
          },
        });
    const mailOptions = {
        from: user.email_service ,
        to: req.body.toEmail,
        subject: req.body.Subject,
        text: req.body.message,
      };
      await transport.sendMail(mailOptions);
      return res.status(200).json({message:"Email sent!"});
    } catch (error) {
        res.status(500).json({ error});
    }
}