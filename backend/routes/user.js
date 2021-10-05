import express from "express";
const router = express.Router();
import auth  from '../middleware/auth.js'

import { signin, signup, update } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update",auth, update);

export default router;