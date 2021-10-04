/**
 * index.js, middleware function calls for working with contacts, notes, meetings, orders, labels, user sign in/up/out
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import axios from "axios";

// const API = axios.create({ baseURL: 'https://dream-team-crm-back.herokuapp.com' });
// const API = axios.create({
//   baseURL: "http://localhost:5000",
// });



const API = axios.create({ baseURL: "http://localhost:5000" });
// const newAPI = axios.create({
//   baseURL: "https://dream-team-crm-back.herokuapp.com",
// });

// newAPI.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }
// 
//   return req;
// });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

const noteURL = "http://localhost:5000/note";
const meetingURL = "http://localhost:5000/meeting";

// const noteURL = 'https://dream-team-crm-back.herokuapp.com/note';
// const meetingURL = "https://dream-team-crm-back.herokuapp.com/meeting";

// const noteURL = "http://localhost:5000/note";
// const meetingURL = "http://localhost:5000/meeting";

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

export const create_contact = (newContact) =>
  API.post("/contact", newContact);
export const get_all_contacts = () => API.get("/contact");
export const delete_contact = (id) => API.post(`/contact/delete/${id}`);
export const update_contact = (id, contact) =>
  API.patch(`contact/update/${id}`, contact);
export const get_contact = (id) => API.get("/contact/:id");

//Takes in label id and contact
export const add_contact_label = (id, contact) =>
  API.patch(`/label/${contact}`, id);
export const delete_contact_label = (id, contact) =>
  API.patch(`/label/${contact}`, id);
export const get_labels_by_contact = (contact_id) =>
  API.get(`label/by-contact/${contact_id}`);

export const create_label = (newLabel) => API.post("/label", newLabel);
export const get_all_labels = () => API.get("/label");
export const delete_label = (id) => API.post(`/label/delete/${id}`);
export const get_label = (id) => API.get(`/label/${id}`);

export const create_order = (order) => API.post("/orders", order);
export const get_all_orders = () => API.get("/orders");
export const delete_order = (id) => API.post(`/orders/delete/${id}`);
export const update_order = (id, order) =>
  API.patch(`orders/update/${id}`, order);
export const get_order = (id) => API.get("/orders/:id");

export const createNote = (userText, history) =>
  API.post("/note/add", userText, history);
export const get_allNotes = () => API.get("note/get_all");
export const updateNote = (id, updatedNote) =>
  API.patch(`${noteURL}/update/${id}`, updatedNote);
export const deleteNote = (id) => API.delete(`${noteURL}/delete/${id}`);
export const getMeetingNote = (id) =>
  API.get(`${noteURL}/get_meeting_note/${id}`);

export const getAllMeetings = () => API.get("/meeting/get_all");
export const createMeeting = (userText, history) =>
  API.post("/meeting/create", userText, history);
export const deleteMeeting = (id) => API.delete(`${meetingURL}/delete/${id}`);
export const updateMeeting = (id, updatedMeeting) =>
  API.patch(`${meetingURL}/update/${id}`, updatedMeeting);

export const sendEmail = (formData) => API.post("/email/send", formData);
export const linkEmail = (formData) => API.post("email/link", formData);
