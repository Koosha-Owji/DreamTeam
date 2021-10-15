import { combineReducers } from 'redux';

// import note from './note';
import auth from './auth';
import contact from './contact';
import note from './note';
import email from './email';
import label from './label';
import order from './order';
import meeting from './meeting';

export const reducers = combineReducers({ contact,note, auth, email, label, order, meeting});
