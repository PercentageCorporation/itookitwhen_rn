import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import { CreateMedContext } from './CreateProvider';
import CreateTopNav from './CreateTopNav';
import CreateSummary from './CreateSummary';
import { styles } from '../MedStyles';

export default function MedicationOften() {
  console.log('MedicationOften');
  const {cs,newMed} = useContext(CreateMedContext);
  //console.log(cs,newMed);

  function selectOften(n) {
    console.log('selectOften', n);
    // reset the schedule 
    cs.set('Schedule', []);
    cs.set('Often', n.descr);
    cs.set('OftenCode', n.code);

    cs.next();
  }

  const oftenList = [
    { 'descr': 'Once a day', 'code': 'D1' },
    { 'descr': 'Twice a day', 'code': 'D2' },
    { 'descr': 'Three times a day', 'code': 'D3' },
    { 'descr': 'Four times a day', 'code': 'D4' },
    { 'descr': 'Five times a day', 'code': 'D5' },
    { 'descr': 'Six times a day', 'code': 'D6' },
    { 'descr': 'As needed', 'code': 'AN' },
    { 'descr': 'Hourly', 'code': 'HR' },
    { 'descr': 'Other', 'code': 'OT' },
  ];

  function renderItem({item}) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => selectOften(item)}>
        <Text style={styles.itemText}>{item.descr}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <CreateTopNav title={'Medication Occurance'} />
        <View style={styles.title}>
          <Text style={styles.titleText}>How often do you take your medication?</Text>
        </View>
        <FlatList contentContainerStyle={styles.list}
          data={oftenList}
          renderItem={renderItem}
          keyExtractor={item => item.code}
        />
        <CreateSummary />
    </SafeAreaView>
  );
}

