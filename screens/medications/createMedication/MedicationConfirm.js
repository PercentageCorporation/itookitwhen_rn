import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, View, Button, ActivityIndicator, TouchableOpacity} from 'react-native';
import { CreateMedContext } from './CreateProvider';
import CreateTopNav from './CreateTopNav';
import CreateSummary from './CreateSummary';
import { createKey } from '../../../utils/CreateKey';
import { addMed, createMedsTable } from '../../../database/sqlite';

export default function MedicationConfirm() {
  console.log('MedConfirm');
  const {cs,newMed} = useContext(CreateMedContext);
  const navigation = useNavigation();
  //console.log('MC',cs,newMed);

  const [submitting, setSubitting] = useState(false);
  const [error, setError] = useState('');

  const medSummary = [
    ['Medication', newMed.Name],
    ['Brand', newMed.Brand],
    ['Form', newMed.Form],
    ['Strength', newMed.Strength],
    ['How Often', newMed.Often],
    ['Dose Times', newMed.Schedule],
  ];

  async function createMed() {
    console.log('createMed');
    const medVals = {
      Id: '',
      Name: 'new med',
      Brand: '',
      Description: '',
      Form: 'tablet',
      Strength: '',
      Dosage: 1,
      Occurance: 1,
      Often: 'daily',
      Schedule: [],
      SortOrder: 99,
      isPaused: false,
      withMeals: false,
    };

    medVals.Id = createKey();
    medVals.Name = newMed.Name;
    medVals.Brand = newMed.Brand;
    medVals.Form = newMed.Form;
    medVals.Dosage = newMed.Dosage;
    medVals.Strength = newMed.Strength;
    const OftenCode = newMed.OftenCode;
    switch (OftenCode) {
      case 'D1':
        medVals.Often = 'daily';
        medVals.Occurance = 1;
        break;
      case 'D2':
        medVals.Often = 'daily';
        medVals.Occurance = 2;
        break;
      case 'D3':
        medVals.Often = 'daily';
        medVals.Occurance = 3;
        break;
      case 'D4':
        medVals.Often = 'daily';
        medVals.Occurance = 4;
        break;
      case 'D5':
        medVals.Often = 'daily';
        medVals.Occurance = 5;
        break;
      case 'D6':
        medVals.Often = 'daily';
        medVals.Occurance = 6;
        break;
      case 'AS':
        medVals.Often = 'asNeeded';
        medVals.Occurance = newMed.Occurance;;
        break;
      case 'OT':
        medVals.Often = 'other';
        medVals.Occurance = newMed.Occurance;
        break;
      case 'HR':
        medVals.Often = 'hourly';
        medVals.Occurance = newMed.Occurance;
        break;

      default:
        break;
    }
    medVals.Schedule = newMed.Schedule;

    try {
      setSubitting(true);
      // add new med
      console.log('createMed', medVals);
      await createMedsTable();  // just in case (could add test)
      await addMed(medVals);

    } catch (err) {
      setError(err.message);
      console.log('med submit error', err.message);
    } finally {
      cs.reset();
      console.log('MedConfirm done');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Home' },
          ],
        }));
        //setSubitting(false);
      }
  }

  if (submitting) return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>);

  return (
    <SafeAreaView style={styles.container}>
        <CreateTopNav title={'Confirm New Medication'} />
        <View style={styles.confirm}>
          <Button style={styles.confirmBtn} title="Confirm" onPress={() => createMed()} />
        </View>
        <CreateSummary />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 5,
  },
  summary: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtn: {
    width: '50%',
    backgroundColor: 'green',
  },
});
