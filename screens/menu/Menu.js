import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scrStyles } from '../ScreenStyles';
//import {useStateValue} from '../state/StateProvider';
//import DrawerHeader from './drawers/DrawerHeader';

export default function Menu() {
  //const [user, userDispatch] = useStateValue().user;
  console.log('Menu');
  const navigation = useNavigation();
  //const title = route.name;

  return (
    <SafeAreaView style={scrStyles.container}>
        <View style={scrStyles.header}>
          <Text style={scrStyles.headerText}>Menu</Text>
        </View>
        <View style={scrStyles.vbody}>
          <View style={scrStyles.button}>
            <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
          </View>
          <View style={scrStyles.button}>
            <Button title="Settings" onPress={() =>navigation.navigate('Settings')} />
          </View>
          <View style={scrStyles.button}>
            <Button title="Notifications" onPress={() =>navigation.navigate('Notification')} />
          </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    margin: 2,
  },
});
