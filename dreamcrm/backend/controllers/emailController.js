import nodemailer from 'nodemailer';
import {google} from 'googleapis';
import userModel from "../models/user.js";

const oauth2Client = new google.auth.OAuth2(
    "678095570684-gnjgmcakmnmd64lmb3qom978v31jfucg.apps.googleusercontent.com",
    "yN3jabn4R1nESLCbJXYTj_cg",
    'postmessage'
  );

export const link_email = async (req,res) => {
  try {
    const user = await userModel.findOne({ _id: req.user_id});
    const code = req.body.code;
    const {tokens} = await oauth2Client.getToken(code);
    if(!user.refresh_token&&tokens.refresh_token!=null){
      const idToken = tokens.id_token;
      const ticket = await oauth2Client.verifyIdToken({
        idToken,
        audience: "678095570684-gnjgmcakmnmd64lmb3qom978v31jfucg.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      await userModel.findByIdAndUpdate(req.user_id, {refresh_token: tokens.refresh_token,email_service:payload.email}).exec();
    }
    return res.status(200).json({message:"serivce is linked!"});
  } catch (error) {
    res.status(500).json({message:"something went wrong!"});
  }
}
export const send_email = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.user_id});
        oauth2Client.setCredentials({ refresh_token: user.refresh_token });
        const accessToken = await oauth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            type: 'OAuth2',
            user: user.email_service ,
            clientId: "678095570684-gnjgmcakmnmd64lmb3qom978v31jfucg.apps.googleusercontent.com",
            clientSecret: "yN3jabn4R1nESLCbJXYTj_cg",
            refreshToken: user.refresh_token,
            accessToken: accessToken,
      },
    });
    const mailOptions = {
        from: user.email_service ,
        to: req.body.toEmail,
        subject: req.body.Subject,
        text: req.body.message,
      };
      const result = await transport.sendMail(mailOptions);
      return res.status(200).json({ result});
    } catch (error) {
        res.status(500).json({ error});
    }
}