import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useStateValue} from '../../state/StateProvider';
import DrawerHeader from './DrawerHeader';

export default function SignOut({route}) {
  const [user, userDispatch] = useStateValue().user;
  console.log('SignOut', user);

  return (
    <SafeAreaView style={styles.container}>
      <DrawerHeader title="Sign Out" />
      <View style={styles.info}>
        <View>
          <Text style={styles.user}>{user.DisplayName}</Text>
          <Text style={styles.user}>{user.Email}</Text>
        </View>
        <View style={styles.button}>
          <Button title="Delete Database" onPress={() => deleteDb()} />
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
