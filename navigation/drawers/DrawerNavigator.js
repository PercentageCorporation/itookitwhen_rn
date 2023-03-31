import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigationState } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from '../BottomTabNavigator';
import CreateMedication from '../../screens/medications/createMedication/CreateMedication';
import UserProfile from '../../screens/profile/UserProfile';
import TempScreen from '../TempScreen'
import ImportData from './ImportData';
import SortOrder from './SortOrder';
import SignOut from './SignOut';
import Development from './Development';

const Drawer = createDrawerNavigator();
const noHeader = () => {return(<></>)}

export default function DrawerNavigator() {
  console.log('DrawerNavigator');

  // const state = useNavigationState(state => state);
  // const history = useNavigationState(state => state.history);
  // history?.map((h) => {
  //   console.log(h);
  //   });
  // console.log('navState', state);

  return (
    <Drawer.Navigator 
      initialRoute='Tabs' 
      screenOptions={{ header:noHeader, drawerActiveTintColor: 'green', }} 
      backBehavior='history'
      >
      <Drawer.Screen name="Tabs" component={BottomTabNavigator} options={{title: 'Close'}} />
      <Drawer.Screen name="Profile" component={UserProfile} options={{title: 'Profile'}} />
      <Drawer.Screen name="Account" component={TempScreen} options={{title: 'Account'}}/>
      <Drawer.Screen name="SortOrder" component={SortOrder} options={{title: 'Sort Order'}}/>
      <Drawer.Screen name="Export" component={TempScreen} options={{title: 'Export'}}/>
      <Drawer.Screen name="Import" component={ImportData} options={{title: 'Import'}}/>
      <Drawer.Screen name="Create" component={CreateMedication} options={{title: 'Add Medication'}}/>
      <Drawer.Screen name="Development" component={Development} options={{title: 'Development'}}/>
      <Drawer.Screen name="SignOut" component={SignOut} options={{title: 'Sign Out'}}/>
    </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({})