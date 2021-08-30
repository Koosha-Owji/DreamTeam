import { combineReducers } from 'redux';

// import note from './note';
import auth from './auth';
import contact from './contact';


export const reducers = combineReducers({ contact, auth });