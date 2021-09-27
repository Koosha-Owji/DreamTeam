import express from "express";
import auth from "../middleware/auth.js"
const emailRouter = express.Router();

import { send_email, link_email } from "../controllers/emailController.js";

emailRouter.post("/link",auth,link_email);
emailRouter.post("/send",auth, send_email);

export default emailRouter;