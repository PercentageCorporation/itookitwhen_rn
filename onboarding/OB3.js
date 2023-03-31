import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native';


export default function OB3({dn}) {
  //console.log('OB3');

  return (
      <View style={styles.info}>
        <View>
          <Text style={styles.user}>
              You are now ready to start using the app.{'\n'}
              The next thing you need to do is enter your medications...{'\n'}
          </Text>
        </View>
      </View>
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
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
  