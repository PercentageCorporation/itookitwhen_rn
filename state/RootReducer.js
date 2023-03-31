import React, {useReducer} from 'react';
import {userReducer, initialUserState} from './UserReducer';
import {medsReducer, initialMedsState} from './MedsReducer';

export function rootReducers() {
  const reducers = {
    user: useReducer(userReducer,initialUserState),
    meds: useReducer(medsReducer,initialMedsState),
    };
  return reducers;
};