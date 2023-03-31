import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.home}>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>I Took It When?</Text>
        <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}/>
        <View style={styles.buttons}>
          <Button style={styles.button} title="Sign In" onPress={() => navigation.navigate('Login')} />
          <Button style={styles.button} title="Register" onPress={() => navigation.navigate('Register')} /> 
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    marginTop: 50,
    padding: 50,
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttons: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: 75,
    borderWidth: 20,
    borderColor: '#fcc083',
    padding: 35,
    borderRadius: 100/2,  
  },
  logo: {
    margin: 50,
    width: 200,
    height: 200,
  },
});
