import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import {CreateMedContext} from './CreateProvider';
import MedicationSummary from '../MedicationSummary';

export default function CreateSummary() {
  //console.log('CreateSummary');
  const {cs, newMed} = useContext(CreateMedContext);
  //console.log(cs, newMed);

  const medSummary = [
    ['Medication', newMed.Name],
    ['Brand', newMed.Brand],
    ['Form', newMed.Form],
    ['Strength', newMed.Strength],
    ['How Often', newMed.Often],
    ['Dose Times', newMed.Schedule.join('/')],
  ];

  return (
    <HideWithKeyboard>
      <View style={styles.summary}>
        <MedicationSummary data={medSummary} />
      </View>
    </HideWithKeyboard>
  );
}

const styles = StyleSheet.create({
  summary: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
    //backgroundColor: 'yellow',
  },
});
