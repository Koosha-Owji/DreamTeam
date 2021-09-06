import { combineReducers } from 'redux';

import note from './note';
import auth from './auth';

export const reducers = combineReducers({ note, auth });
