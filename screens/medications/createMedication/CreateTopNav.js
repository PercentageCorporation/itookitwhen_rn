import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CreateMedContext } from './CreateProvider';

export default function CreateTopNav({title}) {
  //console.log('CreateTopNav');
  const {cs,newMed} = useContext(CreateMedContext);
  const stepStr = cs.step.toString();
  const navigation = useNavigation();
  //console.log('CreateTopNav',title);

  function exit() {
    navigation.navigate('Meds');
  }

  if (!title) title = "Say What?";

  return (
    <View style={styles.header}>
    { cs.step > 1 ?
    <TouchableOpacity style={styles.arrow} onPress={() => cs.prev()}>
      <FontAwesome5 name="arrow-left" color="#000000" size={20} />
    </TouchableOpacity>
    : <View style={styles.arrow} />
    }
    <Text style={styles.headerText}>{title} ({stepStr})</Text>
    <TouchableOpacity style={styles.arrow} onPress={() => exit()}>
      <FontAwesome5 name="times" color="#000000" size={20} />
    </TouchableOpacity>
    { cs.step < cs.maxStep ?
    <TouchableOpacity style={styles.arrow} onPress={() => cs.next()}>
      <FontAwesome5 name="arrow-right" color="#000000" size={20} />
    </TouchableOpacity>
    : <View style={styles.arrow} />
    }
  </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 35,
    },
    header: {
      marginTop: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: 4,
      fontWeight: 800,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#000000',
  },
  headerText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  arrow: {
    width: 20,
    //backgroundColor: 'pink',
  },

});  