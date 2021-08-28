const router = require("express").Router();
const noteModel = require("../models/note");
//const noteController = require("../contollers/noteController")
import { create_note } from "../contollers/noteController";

router.route("/").get( (req, res) => {
    res.send("The notes page");
})

router.use("/new", create_note);