import express from "express";
import auth from "../middleware/auth.js"
const emailRouter = express.Router();

import { send_email } from "../controllers/emailController.js";

emailRouter.post("/send",auth, send_email);

export default emailRouter;