/**
 * index.js, middleware function calls for working with contacts, notes, meetings, orders, labels, user sign in/up/out
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import axios from 'axios';

const API = axios.create({ baseURL: 'https://dream-team-crm.herokuapp.com/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

const noteURL = 'https://dream-team-crm.herokuapp.com/note';

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const create_contact = (newContact)=>API.post('/contact', newContact);
export const get_all_contacts = () => API.get('/contact');
export const delete_contact = (id)=>API.post(`/contact/delete/${id}`);
export const update_contact = (id, contact) =>API.patch(`contact/update/${id}`, contact);
export const get_contact =(id)=>API.get('/contact/:id');

export const createNote = (userText, history) => API.post('/note/add', userText, history);
export const get_allNotes = () => API.get('note/get_all');
export const updateNote = (id, updatedNote) => API.patch(`${noteURL}/update/${id}`, updatedNote);
export const deleteNote = (id) => API.delete(`${noteURL}/delete/${id}`);

export const sendEmail = (formData) => API.post('/email/send',formData);
export const linkEmail = (formData) => API.post('email/link',formData);