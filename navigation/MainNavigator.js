import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
//import DrawerNavigator from './drawers/DrawerNavigator';
import MedicationDetailsHistory from '../screens/medications/medicationDetails/MedicationDetailsHistory';
import MedicationDetails from '../screens/medications/medicationDetails/MedicationDetails';
import TakeMedForm from '../screens/medications/TakeMedForm';
import MedicationEdit from '../screens/medications/medicationDetails/MedicationEdit';
import TempScreen from './TempScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CreateMedication from '../screens/medications/createMedication/CreateMedication';
import UserProfile from '../screens/menu/UserProfile';
import NotifyTest from '../screens/menu/NotifyTest';

const HomeStack = createNativeStackNavigator();

export default function MainNavigator() {
  console.log('MainNavigator');

  const noHeader = () => {return(<></>)}
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRoute='Home' screenOptions={{header:noHeader}}>
          <HomeStack.Screen name="Home" component={BottomTabNavigator} />
          {/* <HomeStack.Screen name="Home" component={DrawerNavigator} /> */}
          <HomeStack.Screen name="MedHistory" component={MedicationDetailsHistory} />
          <HomeStack.Screen name="MedDetails" component={MedicationDetails} />
          <HomeStack.Screen name="Take" component={TakeMedForm} />
          <HomeStack.Screen name="Edit" component={MedicationEdit} />
          <HomeStack.Screen name="Create" component={CreateMedication} />
          <HomeStack.Screen name="Profile" component={UserProfile} />
          <HomeStack.Screen name="Notification" component={NotifyTest} />
      </HomeStack.Navigator>
    </NavigationContainer>
  )
}

