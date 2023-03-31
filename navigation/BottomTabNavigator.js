import React from 'react'
import { StyleSheet, Text, View, Fragment, Image } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MedsList from '../screens/medications/medicationList/MedsList';
import HistList from '../screens/medications/historyList/HistList';
//import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import TempScreen from './TempScreen';
import Schedule from '../screens/medications/Schedule';
import Menu from '../screens/menu/Menu';

export default function BottomTabNavigator() {
  console.log('BottomTabNavigator');
  
  const Tab = createBottomTabNavigator();
  const noHeader = () => {return (<></>)}
  return (
    <Tab.Navigator
      initialRouteName='Meds'
      screenOptions={{header:noHeader}}
      >
        
        {/* <Tab.Screen name="Meds" title="Medications" component={MedsList} options={{ tabBarIcon: () => (<FontAwesome5 name="pills" color="#000000" size={20} />) }} /> 
        <Tab.Screen name="History" component={HistList} options={{ tabBarIcon: () => (<FontAwesome5 name="history" color="#000000" size={20} />) }} /> 
        <Tab.Screen name="Schedule" component={Schedule} options={{ tabBarIcon: () => (<FontAwesome5 name="user-clock" color="#000000" size={20} />) }} />
        <Tab.Screen name="Condition" component={Schedule} options={{ tabBarIcon: () => (<Image source={require('../assets/images/face-48.png')} style={styles.icon} />) }} />
        <Tab.Screen name="Menu" component={TempScreen} options={{ tabBarIcon: () => (<FontAwesome5 name="bars" color="#000000" size={20} />)}}  */}
       

        <Tab.Screen name="Meds" component={MedsList} options={{ tabBarIcon: () => (<Image source={require('../assets/images/pills-50.png')} style={styles.icon} /> )}}/>
        <Tab.Screen name="History" component={HistList} options={{ tabBarIcon: () => (<Image source={require('../assets/images/history-48.png')} style={styles.icon} />)}} />
        <Tab.Screen name="Schedule" component={Schedule} options={{ tabBarIcon: () => (<Image source={require('../assets/images/schedule-50.png')} style={styles.icon} />) }} />
        <Tab.Screen name="Condition" component={Schedule} options={{ tabBarIcon: () => (<Image source={require('../assets/images/face-48.png')} style={styles.icon} />) }} />
        <Tab.Screen name="Menu" component={Menu} options={{ tabBarIcon: () => (<Image source={require('../assets/images/menu-48.png')} style={styles.icon} />)}}/>
    </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  }
})