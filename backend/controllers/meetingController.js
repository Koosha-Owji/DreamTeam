import noteModel from "../models/note.js";
import userModel from "../models/user.js";
import meetingModel from "../models/meeting.js";
import contactModel from "../models/contact.js";

// Create a new note
export const create_meeting = async (req, res) => {
  // To-add: check all contacts exist (assumption: Only contacts can be meeting attendees)
  // Check that the meeting title hasn't already been used??

  try {
    // Check that the user with "user_id" exists
    const user = await userModel.findOne({ _id: req.user_id });
    var message = "Meeting creation failed";

    // Check that all attendees exist as contacts
    message = "attendee is not a valid contact";

    // Create the meeting and save it to the database
    message = "Meeting creation failed";

    if (req.body.title && req.body.date && req.body.time && req.body.endtime){
      const date = new getDate(req.body.date, req.body.endtime);
      const non_attendees = "";
      if (req.body.non_attendees) {
        non_attendees = req.body.non_contact_attendees.split(",");
      }

      const newMeeting = meetingModel.create({
        ...req.body,
        user_id: req.user_id,
        date_time: date,
        non_contact_attendees: non_attendees,
      });
      (await newMeeting)
        .save()
        .then((newMeeting) => res.json(newMeeting))
        .catch((err) => res.status(400).json(err));
    } else {
      message = 'Missing Parameters'
      return res.json({message: message})
    }
    
  } catch (err) {
    res.status(500).json({ message: message });
  }
};

export const delete_meeting = async (req, res) => {
  // To-add: Delete the note(s) attached to the meeting

  try {
    // attempt to delete the meeting that matches the user and meeting ids in the request
    meetingModel
      .deleteOne({
        user_id: req.user_id,
        _id: req.params.id,
      })
      .exec();

    // noteModel.deleteOne({ meeting_id: String(req.params.id) }).exec();
    return res
      .status(200)
      .send("Successfully deleted meeting (or meeting does not exist or user is not authorised)");
  } catch (error) {
    return res.status(500).json({ message: "Meeting deletion failed" });
  }
};

// Retrieve all meetings belonging to a single user
export const get_all_meetings = async (req, res) => {
  // To-add: retrieve all notes associated with the meetings

  try {
    const meetings = await meetingModel.find({ user_id: req.user_id });

    // if the user has no notes, return a message
    if (!meetings)
      return res.json({ message: "No meetings associated with this user" });

    // if the user has notes, return the notes
    return res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ message: "Meeting retrieval failed" });
  }
};

export const update_meeting = async (req, res) => {
  try {
    const date = new getDate(req.body.date, req.body.endtime);

    const non_attendees = req.body.non_contact_attendees.split(",");

    await meetingModel
      .findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        agenda: req.body.agenda,
        non_contact_attendees: non_attendees,
        date_time: date,
        date: req.body.date,
        time: req.body.time,
        contact_name_id: req.body.contact_name_id,
        contact_name: req.body.contact_name,
        endtime: req.body.endtime
      })
      .exec();

    // get the updated version
    const meeting = await meetingModel.findById(req.params.id).exec();

    // check that the note exists
    if (!meeting) return res.json("Meeting does not exist");

    // return the update note
    return res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: "Meeting update failed" });
  }
};

export const mark_as_completed = async (req, res) => {
  try {
    const date = new Date();
    await meetingModel
      .findByIdAndUpdate(req.params.id, {
        date_time: date,
        date: req.body.date,
        time: req.body.time,
        endtime: req.body.endtime
      })
      .exec();

    // get the updated version
    const meeting = await meetingModel.findById(req.params.id).exec();

    // check that the note exists
    if (!meeting) return res.json("Meeting does not exist");

    // return the update note
    return res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: "Meeting update failed" });
  }
};

function getDate(date, time) {
  const date_time = new Date();

  // Date
  const date_split = date.split(/(-)/);
  // console.log(date_split);
  date_split.splice(1, 1);
  date_split.splice(2, 1);
  // console.log(date_split);

  date_time.setYear(parseInt(date_split[0]));
  date_time.setMonth(parseInt(date_split[1]) - 1);
  date_time.setDate(parseInt(date_split[2]));

  //Time
  const time_split = time.split(/(:)/);
  // console.log(time_split);
  time_split.splice(1, 1);
  // console.log(time_split);

  date_time.setHours(parseInt(time_split[0]));
  date_time.setMinutes(parseInt(time_split[1]));
  date_time.setSeconds(0);

  return date_time;
}
