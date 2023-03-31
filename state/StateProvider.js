import React, {createContext, useContext, useReducer} from 'react';
export const StateContext = createContext();
export const StateProvider = ({reducers, children}) =>(
  <StateContext.Provider value={reducers}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);