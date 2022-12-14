/**
 * label.js, backend URL routing for label functions
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import express from "express";
import auth from "../middleware/auth.js";

const label_router = express.Router();

import {
  create_label,
  delete_label,
  get_all_labels,
  get_labels_by_contact,
} from "../controllers/labelController.js";

label_router.post("/", auth, create_label);
label_router.post("/delete/:id", auth, delete_label);
label_router.get("/", auth, get_all_labels);
label_router.get("/by-contact/:id", auth, get_labels_by_contact);

export default label_router;
