
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import path from 'path';

// import userRouter from "./routes/user.js";
// import contactRouter from "./routes/contactRouter.js"
// import noteRouter from "./routes/note.js";
// import emailRouter from "./routes/email.js";

// const app = express();
// //const __dirname = path.resolve();

// app.use(express.json({ limit: '30mb', extended: true }))
// app.use(express.urlencoded({ limit: '30mb', extended: true }))
// app.use(cors());
// // app.use(express.static(path.resolve(__dirname, '../frontend/build')));
// // app.get('*', function(request, response) {
// //   response.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
// // });

// app.use("/user", userRouter);
// app.use("/contact", contactRouter)
// app.use("/note", noteRouter);
// app.use("/email",emailRouter);

// const CONNECTION_URL = 'mongodb+srv://dreamteam:teamdream@cluster0.dmj7x.mongodb.net/DreamTeamCRM?retryWrites=true&w=majority'
// const PORT = process.env.PORT|| 5000;

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


import userRouter from "./routes/user.js";
import contactRouter from "./routes/contactRouter.js"
import noteRouter from "./routes/note.js";
import labelRouter from "./routes/label.js";
import orderRouter from "./routes/orderRouter.js";
import meetingRouter from "./routes/meeting.js";

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/user", userRouter);
app.use("/contacts", contactRouter);
app.use("/note", noteRouter);
app.use("/label", labelRouter);
app.use("/orders", orderRouter);
app.use("/meeting", meetingRouter);

const CONNECTION_URL = process.env.CONNECTION_MG_URL;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
