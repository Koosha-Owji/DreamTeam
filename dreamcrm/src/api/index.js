import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

const noteURL = 'http://localhost:5000/note';

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const createNote = (userText) => API.post('/note/add', userText);
export const get_allNotes = () => API.get('note/get_all');
export const updateNote = (id, updatedNote) => API.patch(`${noteURL}/update/${id}`, updatedNote);
export const deleteNote = (id) => API.delete(`${noteURL}/delete/${id}`);
