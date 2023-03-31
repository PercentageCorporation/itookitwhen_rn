import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scrStyles } from '../ScreenStyles';
import ReturnTitle from '../ReturnTitle';
//import {useStateValue} from '../state/StateProvider';
//import DrawerHeader from './drawers/DrawerHeader';

export default function NotifyTest() {
  //const [user, userDispatch] = useStateValue().user;
  console.log('NotifyTest');
  const navigation = useNavigation();
  //const title = route.name;

  function permission() {

  }

  function sendNotification() {

  }

  function getStatus() {

  }

  return (
    <SafeAreaView style={scrStyles.container}>
        <ReturnTitle title='Notification Test' />
        <View style={scrStyles.vbody}>
          <View style={scrStyles.button}>
            <Button title="Permission" onPress={() => permission()} />
          </View>
          <View style={scrStyles.button}>
            <Button title="Send Notification" onPress={() => sendNotification()} />
          </View>
          <View style={scrStyles.button}>
            <Button title="Status" onPress={() => getStatus()} />
          </View>
        </View>
    </SafeAreaView>
  );
}
