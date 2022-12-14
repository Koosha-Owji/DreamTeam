/**
 * server.js, sets up the backend server
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user.js";
import contactRouter from "./routes/contact.js";
import noteRouter from "./routes/note.js";
import labelRouter from "./routes/label.js";
import orderRouter from "./routes/order.js";
import meetingRouter from "./routes/meeting.js";
import emailRouter from "./routes/email.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRouter);
app.use("/contacts", contactRouter);
app.use("/note", noteRouter);
app.use("/label", labelRouter);
app.use("/orders", orderRouter);
app.use("/meeting", meetingRouter);
app.use("/email", emailRouter);

const CONNECTION_URL = process.env.CONNECTION_MG_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);

export default app;
