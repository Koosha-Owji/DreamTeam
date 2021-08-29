import express from "express";
const noteRouter = express.Router();

import { create_note, delete_note, get_one_note, get_all_notes } from "../controllers/noteController.js"

noteRouter.post("/add", create_note);
noteRouter.post("/delete", delete_note);
noteRouter.get("/get_one", get_one_note);
noteRouter.get("/get_all", get_all_notes);

export default noteRouter;
