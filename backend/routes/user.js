import express from "express";
const router = express.Router();
import auth  from '../middleware/auth.js'

import { signin, signup, update, update_password } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update",auth, update);
router.patch("/update_password",auth,update_password);

export default router;