import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import { CreateMedContext } from './CreateProvider';
import CreateTopNav from './CreateTopNav';
import { getForms } from '../../../drugData/lookupDrugs';
import CreateSummary from './CreateSummary';
import { styles } from '../MedStyles';

export default function MedicationForm() {
  console.log('MedicationForm');
  const [forms, setForms] = useState([]);
  const {cs,newMed} = useContext(CreateMedContext);
  //console.log(cs,newMed);

  const stepStr = cs.step.toString();

  const formData = [
    {key: 'capsule', text: 'Capsule', value: 'CAPSULE'},
    {key: 'tablet', text: 'Tablet', value: 'TABLET'},
    {key: 'tabletER', text: 'Tablet ER', value: 'TABLET, EXTENDED RELEASE'},
    {key: 'tabletOD', text: 'Tablet OD', value: 'TABLET, ORALLY DISINTEGRATING'},
    {key: 'tabletCH', text: 'Tablet Chewable', value: 'TABLET, CHEWABLE'},
    {key: 'gel', text: 'Gel', value: 'GEL'},
    {key: 'ointment', text: 'Ointment', value: 'OINTMENT'},
    {key: 'cream', text: 'Cream', value: 'CREAM'},
    {key: 'shampoo', text: 'Shampoo', value: 'SHAMPOO'},
    {key: 'powder', text: 'Powder', value: 'POWDER'},
    {key: 'liquid', text: 'Liquid', value: 'LIQUID'},
];


  useEffect(() => {
    var forms = getForms(newMed.Id);
    if (forms.length === 0) {
      formData.map(f => {forms.push(f.value)});
    }
    console.log('forms', forms)
    forms.push('NOT LISTED');
    setForms(forms);
  },[]);

  function selectForm(n) {
    console.log('selectForm', n);
    cs.set('Form', n);
    nextStep();
  }

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
      <TouchableOpacity style={styles.item} onPress={() => selectForm(item)}>
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <CreateTopNav title={'Medication Form'} />
        <View style={styles.title}>
          <Text style={styles.titleText}>What is the form of your medication?</Text>
        </View>
        <FlatList contentContainerStyle={styles.list}
          data={forms}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
        <CreateSummary />
    </SafeAreaView>
  );
}
