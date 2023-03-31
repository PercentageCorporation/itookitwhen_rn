import React from 'react';

export function medsReducer(state, action) {
  //console.log('medsReducer', state, action);
  switch (action.type) {
    case 'setMeds':
      return {
        ...state,
        meds: action.value,
      };
    case 'setHistory':
      return {
        ...state,
        history: action.value,
      };
    default:
      return state;
  }
}

export const initialMedsState = {
  meds: [],
  history: [],
};
