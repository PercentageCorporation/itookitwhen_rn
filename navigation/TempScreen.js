import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useStateValue} from '../state/StateProvider';
//import DrawerHeader from './drawers/DrawerHeader';

export default function TempScreen({navigation, route}) {
  const [user, userDispatch] = useStateValue().user;
  console.log('TempScreen');
  const title = route.name;

  function doSomething() {
    //navigation.openDrawer();
    console.log('I did it!');
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <DrawerHeader title={title} /> */}
      <View style={styles.info}>
        <View>
          <Text style={styles.user}>{user.DisplayName}</Text>
        </View>
        <View style={styles.button}>
          <Button title="Do Something" onPress={() => doSomething()} />
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
