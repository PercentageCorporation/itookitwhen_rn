import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CreateMedContext } from './CreateProvider';
import CreateTopNav from './CreateTopNav';
import MedicationSummary from '../MedicationSummary';
import CreateSummary from './CreateSummary';

export default function MedicationHourly() {
  console.log('MedicationHourly');
  const {cs,newMed} = useContext(CreateMedContext);
  const stepStr = cs.step.toString();
  //console.log(cs,newMed);
  
  function handleClick(hrs) {
    console.log('handleClick', hrs);
    const hr = hrs > 1 ? ' hours' : ' hour';
    const often = `Every ${hrs}${hr}`;
    cs.set('Schedule', [often]);
    cs.set('Occurance', hrs);
    cs.set('Often', 'Hourly');
    cs.next();
}

  const hours = [];
  for (let i = 1; i < 7; ++i) {
    const title = (i) => (i.toString() + (i > 1 ? ' hours' : ' hour'));
    hours.push(
      <View key={i} style={styles.hoursRow}>
        <TouchableOpacity style={styles.hour} onPress={()=>handleClick(i)}>
          <Text style={styles.hourText}>{title(i)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hour} onPress={()=>handleClick(i+6)}>
          <Text style={styles.hourText}>{title(i+6)}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
        <CreateTopNav title={'Hourly Schedule'} />
        <View style={styles.body}>
          <Text style={styles.bodyText}>How many hours are there between your doses?</Text>
        </View>
        <View style={styles.list}>
            {hours}
        </View>
        <CreateSummary />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 2,
    flexDirection: 'row',
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
body: {
  alignItems: 'center',
  paddingVertical: 6,
  paddingHorizontal: 4,
//  backgroundColor: 'yellow',
},
bodyText: {
  fontSize: 18,
  fontWeight: 'bold',
},
hoursRow: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    marginBottom:8,
    //backgroundColor: 'pink',
  },
hour: {
  width: '40%',
  borderRadius: 6,
  backgroundColor: 'green',
},
hourText: {
  color: '#000000',
  textAlign: 'center',
  padding: 6,
  fontSize: 20,
  fontWeight: 'bold',
},
list: {
  flex: 1,
  width: '100%',
  paddingTop: 40,
  justifyContent: 'flex-start',
  alignItems: 'center',
},
listItem: {
  width: 300,
  borderWidth: 1,
  borderColor: '#000000',
  borderRadius: 5,
  paddingHorizontal: 5,
},
summary: {
  flex: 1,
  width: '100%',
  backgroundColor: 'green',
  justifyContent: 'center',
  alignItems: 'center',
},
})
