/**
 * note.js, backend URL routing for note functions
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import express from "express";
import auth from "../middleware/auth.js"
const noteRouter = express.Router();

import { 
    create_note, 
    delete_note, 
    get_one_note, 
    get_all_notes, 
    update_note,
    rename_note, get_one_note_by_meeting } from "../controllers/noteController.js"

noteRouter.post("/add",auth, create_note);
noteRouter.delete("/delete/:id",auth, delete_note);
// noteRouter.get("/get_one",auth, get_one_note);
noteRouter.get("/get_all",auth, get_all_notes);
noteRouter.patch("/update/:id",auth, update_note);
// noteRouter.post("/edit_title",auth, rename_note);
noteRouter.get("/get_meeting_note/:id", auth, get_one_note_by_meeting);

export default noteRouter;
