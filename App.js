import React from 'react';
import {StateProvider} from './state/StateProvider';
import {rootReducers} from './state/RootReducer';
//import {Text, View} from 'react-native';
import Dashboard from './navigation/Dashboard';

export default function App() {
  console.log('App');
  
  const reducers = rootReducers();
  return (
      <StateProvider reducers={reducers}>
        <Dashboard />
        {/* <View><Text>No Dashboard</Text></View> */}
      </StateProvider>
    );
}
