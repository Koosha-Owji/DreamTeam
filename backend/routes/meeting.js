import express from "express";
import auth from "../middleware/auth.js"


import {
  create_meeting,
  delete_meeting,
  get_all_meetings,
  //get_one_meeting,
  //update_date_time,
  //rename_meeting,
  add_attendee,
  remove_attendee,
  update_meeting,
  mark_as_completed,
} from "../controllers/meeting.js";
const meetingRouter = express.Router();

meetingRouter.post("/create", auth, create_meeting);
meetingRouter.delete("/delete/:id", auth, delete_meeting);
meetingRouter.patch("/update/:id", auth, update_meeting)
meetingRouter.patch("/mark_completed/:id", auth, mark_as_completed);
// meetingRouter.post("/update_time", auth, update_date_time);
// meetingRouter.post("/rename", auth, rename_meeting);
meetingRouter.post("/add_attendee", auth, add_attendee);
meetingRouter.post("/remove_attendee", auth, remove_attendee);
// meetingRouter.get("/get_one", auth, get_one_meeting);
meetingRouter.get("/get_all", auth, get_all_meetings);

export default meetingRouter;