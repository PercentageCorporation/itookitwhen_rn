import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Button} from 'react-native';


export default function NoMeds({navigation}) {
  console.log('NoMeds');

  function doSomething() {
    console.log('doSomething');

      navigation.navigate('Create');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <View>
          <Text style={styles.user}>
              You have no medications entered.{'\n'}
              Press the button below to start entering one.
          </Text>
        </View>
        <View style={styles.button}>
          <Button title="Add Medication" onPress={() => doSomething()} />
        </View>
      </View>
    </SafeAreaView>
  )
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
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      margin: 2,
    },
  });
  