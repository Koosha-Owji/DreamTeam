import nodemailer from 'nodemailer';
import {google} from 'googleapis';
import userModel from "../models/user.js";

const oauth2Client = new google.auth.OAuth2(
    "678095570684-gnjgmcakmnmd64lmb3qom978v31jfucg.apps.googleusercontent.com",
    "yN3jabn4R1nESLCbJXYTj_cg",
    'postmessage'
  );

export const send_email = async (req, res) => {
    try {
        const code = req.body.code;
        const {tokens} = await oauth2Client.getToken(code);
        if(tokens.refresh_token){await userModel.findByIdAndUpdate(req.user_id, {refresh_token: tokens.refresh_token}).exec();};
        const user = await userModel.findOne({ _id: req.user_id});
        oauth2Client.setCredentials({ refresh_token: user.refresh_token });
        const accessToken = await oauth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            type: 'OAuth2',
            user: "" ,
            clientId: "678095570684-gnjgmcakmnmd64lmb3qom978v31jfucg.apps.googleusercontent.com",
            clientSecret: "yN3jabn4R1nESLCbJXYTj_cg",
            refreshToken: user.refresh_token,
            accessToken: accessToken,
      },
    });
    const mailOptions = {
        from: "" ,
        to: req.body.toEmail,
        subject: req.body.Subject,
        text: req.body.message,
      };
      const result = await transport.sendMail(mailOptions);
      res.status(200).json({ result});
    } catch (error) {
        res.status(500).json({ error});
    }
}