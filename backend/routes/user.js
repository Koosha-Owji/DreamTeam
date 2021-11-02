/**
 * user.js, backend URL routing for user functions
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  signin,
  signup,
  update,
  update_password,
} from "../controllers/userController.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update", auth, update);
router.patch("/update_password", auth, update_password);

export default router;
