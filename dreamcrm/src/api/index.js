import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const create_contact = (newContact)=>API.post('/contacts', newContact);
export const get_all_contacts = () => axios.get('/contacts');
export const createNote = (userText, history) => API.post('/note/add', userText, history);
export const get_allNotes = (initial_state) => API.get('note/get_all', initial_state);
export const delete_contact = (contact)=>API.get('/contacts/delete/:id');
