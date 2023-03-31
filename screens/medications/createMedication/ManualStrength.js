import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CreateMedContext } from './CreateProvider';
import CreateTopNav from './CreateTopNav';
import { findBrandNames, getForms, getStrength } from '../../../drugData/lookupDrugs';
import MedicationSummary from '../MedicationSummary';
import CreateSummary from './CreateSummary';
//import { findDrugNames } from '../../../drugData/lookupDrugs';

export default function ManualStrength() {
  console.log('ManualStrength');
  const [strengths, setStrengths] = useState([]);
  const {cs,newMed} = useContext(CreateMedContext);
  const stepStr = cs.step.toString();
  //console.log(cs,newMed);

    function selectStrength(s) {
      console.log('selectStrength', s);
      cs.set('Strength', s);
      nextStep();
    }

    useEffect(() => {
      const st = [];
      console.log('getStrength', st)
      const st1 = [...st,"NOT LISTED",];
      //st.push('NOT LISTED');
      console.log('pushed', st1)
      setStrengths(st1);
    },[]);


  function prevStep() {
    console.log('prevStep');
    cs.prev();
  }

  function nextStep() {
    console.log('nextStep');
    cs.next();
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => selectStrength(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    )
  }
  console.log('render', strengths);
  return (
    <SafeAreaView style={styles.container}>
        <CreateTopNav title={'Medication Strength'} />
        <View style={styles.body}>
          <Text style={styles.bodyText}>What is the strength of your medication?</Text>
        </View>
        <FlatList contentContainerStyle={styles.list}
          data={strengths}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
        <CreateSummary />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 35,
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
  fontSize: 20,
  fontWeight: 'bold',
},
list: {
  width: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'pink',
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
