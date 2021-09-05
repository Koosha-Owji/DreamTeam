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
export const delete_contact = (id)=>API.delete('/contacts/delete/:id');
export const update_contact = (id, contact) =>API.patch(`contacts/update/${id}`, contact);
export const get_contact =(id)=>API.get('/contacts/:id');

export const createNote = (userText, history) => API.post('/note/add', userText, history);
export const get_allNotes = (initial_state) => API.get('note/get_all', initial_state);
