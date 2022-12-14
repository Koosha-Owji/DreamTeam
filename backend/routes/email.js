/**
 * email.js, backend URL routing for email functions
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import express from "express";
import auth from "../middleware/auth.js";
const emailRouter = express.Router();

import { send_email, link_email } from "../controllers/emailController.js";

emailRouter.post("/link", auth, link_email);
emailRouter.post("/send", auth, send_email);

export default emailRouter;
