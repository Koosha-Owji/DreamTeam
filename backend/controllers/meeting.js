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
    // console.log(req.user_id)
    const user = await userModel.findOne({ _id: req.user_id });
    // console.log(user);
    var message = "Meeting creation failed";

    // Check that all attendees exist as contacts
    message = "attendee is not a valid contact";
    // const attendees = req.body.attendees;

    // for (let i = 0; i < attendees.length; i++) {

    //     const attendee = await contactModel.find(
    //         {_id: attendees[i], user_id: req.body.user_id})

    //     // 'find' will return an array which will be empty if there is no existing contact
    //     if (attendee.length === 0) return res.status(400).json({message: message});
    //     console.log(attendee);
    // }

    // Create the meeting and save it to the database
    message = "Meeting creation failed";

    // console.log(req.body.date);
    // console.log(req.body.time);
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
    res.send(
      "Successfully deleted meeting (or meeting does not exist or user is not authorised)"
    );
  } catch (error) {
    res.status(500).json({ message: "Meeting deletion failed" });
  }
};

// Retrieve all meetings belonging to a single user
export const get_all_meetings = async (req, res) => {
  // To-add: retrieve all notes associated with the meetings

  try {
    const meetings = await meetingModel.find({ user_id: req.user_id }).exec();

    // if the user has no notes, return a message
    if (!meetings)
      return res.json({ message: "No meetings associated with this user" });

    // if the user has notes, return the notes
    return res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: "Meeting retrieval failed" });
  }
};

// Retrieve a single meeting by its id
// export const get_one_meeting = async (req, res) => {
//     // To-add: meeting notes retrieval and check that the user is authorised
//     try {
//         const meeting = await meetingModel.findById(req.body._id)
//             .exec();

//         // check that the meeting exists
//         if (! meeting) return res.json("Meeting does not exist");
//         // if the note exists, return it
//         return res.json(meeting);

//     } catch (err) {
//         res.status(500).json({ message: "Meeting retrieval failed" });
//     }
// }

// updates the date and time of a meeting and sends the updated version back via res
// export const update_date_time = async (req, res) => {
//     try {
//         // update the meeting
//         await meetingModel.findByIdAndUpdate(req.body._id,
//             {date_time: req.body.date_time}).exec();

//         // get the updated version
//         const meeting = await meetingModel.findById(req.body._id).exec();

//         // check that the note exists
//         if (! meeting) return res.json("Meeting does not exist");

//         // return the update note
//         return res.json(meeting);

//     } catch (err) {
//         res.status(500).json({ message: "Meeting update failed" });
//     }
// }

// Retrive a meeting from the db and update its name
// export const rename_meeting = async (req, res) => {
//     try {
//         await meetingModel.findByIdAndUpdate(req.body._id,
//             {title: req.body.title}).exec();

//         // retrieve the updated note
//         const meeting = await meetingModel.findById(req.body._id).exec();

//         // check that the note exists
//         if (! meeting) return res.json("Meeting does not exist");

//         // return the update note
//         return res.json(meeting);

//     } catch (err) {
//         res.status(500).json({ message: "Meeting rename failed"});
//     }
// }

export const add_attendee = async (req, res) => {
  try {
    // Retrieve the meeting and contact and check that both exist
    const meeting = await meetingModel.findById(req.body._id).exec();
    const contact = await contactModel.findById(req.body.contact_id).exec();
    if (!meeting) return res.json({ message: "Meeting doesn't exist" });
    if (!contact) return res.json({ message: "Contact doesn't exist" });

    const newAttendees = insert(meeting.attendees, req.body.contact_id);
    meeting.attendees = newAttendees;
    meeting.save();

    return res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: "Add attendee to meeting failed" });
  }
};

export const remove_attendee = async (req, res) => {
  try {
    // Retrieve the meeting and check that it exists
    const meeting = await meetingModel.findById(req.body._id).exec();
    if (!meeting) return res.json({ message: "Meeting doesn't exist" });

    const newAttendees = meeting.attendees;

    // iterate through attendees and remove the contact
    for (let i = 0; i < newAttendees.length; i++) {
      if (newAttendees[i] === req.body.contact_id) {
        newAttendees.splice(i, 1);
      }
    }

    meeting.attendees = newAttendees;
    meeting.save();

    return res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: "Remove attendee from meeting failed" });
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

// insert and elem into array if elem is not already an element of array
function insert(array, elem) {
  const n = array.length;
  var absent = true;
  // iterate through the array and check for elem
  for (let i = 0; i < n; i++) {
    if (array[i] == elem) {
      absent = false;
      break;
    }
  }
  // if elem is not in array, add it
  if (absent) {
    array.push(elem);
  }
  return array;
}

// check that a list of contact ids belong to a specified user
function valid_contacts(contact_ids, user_id) {}

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
