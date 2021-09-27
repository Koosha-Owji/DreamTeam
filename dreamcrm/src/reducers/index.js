import { combineReducers } from 'redux';

// import note from './note';
import auth from './auth';
import contact from './contact';
import note from './note';
import email from './email';


export const reducers = combineReducers({ contact,note, auth, email });
