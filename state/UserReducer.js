import React from 'react';

export function userReducer(state, action) {
  //console.log('userReducer state', state);
  //console.log('userReducer action', action);
  switch (action.type) {
    case 'setUser':
      return {
        ...action.value,
      };
    case 'setUserType':
      return {
        ...state,
        UserType: action.value,
      };
    case 'setUserId':
      return {
        ...state,
        UserId: action.value,
      };
    case 'setAuthenticated':
      return {
        ...state,
        authenticated: action.value,
      };
    default:
      return state;
  }
}

export const initialUserState = {
  Id: null,
  UserType: 'first',
  DisplayName: '',
  AwakeTime: '06:00AM',
  BedTime: '10:00PM',
  FirebaseId: '',
  DateCreated: 0,
  DateLastUpdated: 0,
};
