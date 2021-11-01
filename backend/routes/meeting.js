/**
 * meeting.js, backend URL routing for meeting functions
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import express from "express";
import auth from "../middleware/auth.js";

import {
  create_meeting,
  delete_meeting,
  get_all_meetings,
  update_meeting,
  mark_as_completed,
} from "../controllers/meetingController.js";
const meetingRouter = express.Router();

meetingRouter.post("/create", auth, create_meeting);
meetingRouter.delete("/delete/:id", auth, delete_meeting);
meetingRouter.patch("/update/:id", auth, update_meeting);
meetingRouter.patch("/mark_completed/:id", auth, mark_as_completed);
meetingRouter.get("/get_all", auth, get_all_meetings);

export default meetingRouter;
