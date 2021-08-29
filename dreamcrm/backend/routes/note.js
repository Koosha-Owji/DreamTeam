import express from "express";
const noteRouter = express.Router();

import { 
    create_note, 
    delete_note, 
    get_one_note, 
    get_all_notes, 
    update_note,
    rename_note } from "../controllers/noteController.js"

noteRouter.post("/add", create_note);
noteRouter.post("/delete", delete_note);
noteRouter.get("/get_one", get_one_note);
noteRouter.get("/get_all", get_all_notes);
noteRouter.post("/update", update_note);
noteRouter.post("/edit_title", rename_note);

export default noteRouter;
