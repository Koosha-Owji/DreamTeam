import express from "express";
import auth from "../middleware/auth.js";

const label_router = express.Router();

import {
    create_label,
    delete_label, 
    get_all_labels,
    get_labels_by_contact
} from "../controllers/labelController.js"

//label_router.post('/', auth, create_label);
label_router.post('/', create_label);
label_router.patch('/delete/:id', delete_label);
label_router.get('/', get_all_labels);
label_router.get('/by-contact/:id', get_labels_by_contact);

export default label_router;