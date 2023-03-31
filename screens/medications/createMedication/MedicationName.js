import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert} from 'react-native';
import { CreateMedContext } from './CreateProvider';
import CreateTopNav from './CreateTopNav';
import { findDrugNames } from '../../../drugData/lookupDrugs';
import { styles } from '../MedStyles';

export default function MedicationName() {
  const [name,setName] = useState('');
  const [medNames, setMedNames] = useState([]);
  const {cs,newMed} = useContext(CreateMedContext);
  console.log('MedicationName');

  function nameChange(txt) {
    const tu = txt.toUpperCase();
    setName(tu);
    const names = findDrugNames(txt);
    if (names.length === 0 ){
      const nl = {
        name: tu,
        type: 'N',
        id: 0,
      }
      names.push(nl);
    }
    //console.log('names',names)
    setMedNames(names)
  }

  function selectDrug(n) {
    console.log('selectDrug', n);
    setName(n.name);
    if (n.type === 'N') {
      confirmName(n)
      return;
      }

    doSelect(n);
    }

  function doSelect(n) {
    console.log('doSelect', n);
    cs.set('Name', n.name);
    cs.set('Id', n.id);
    if (n.type === 'T') {
      cs.next(1);
    } else {
      cs.next();
    }
  }

  function confirmName(n) {
    var doIt = false;
    Alert.alert(
      "Do you want to use this name?",
      n.name,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Use Name", onPress: () => doSelect(n) }
      ]
    );
    return doIt;
  };

  function renderItem({item}) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => selectDrug(item)}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
        <CreateTopNav title={'Medication Name'} />
        <View style={styles.title}>
          <Text style={styles.titleText}>What is the name of your medication?</Text>
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            defaultValue = {newMed.Name}
            value = {name}
            onChangeText = {txt => nameChange(txt)}
            autoFocus = {true}
            autoCapitalize = 'characters'
            />
        </View>
        <KeyboardAwareFlatList contentContainerStyle={styles.list}
          keyboardShouldPersistTaps='handled'
          data={medNames}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
  );
}

export const nstyles = StyleSheet.create({
  list: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    paddingBottom: 20,
    zIndex: 5,
    //backgroundColor: 'pink',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 4,
    backgroundColor: '#cccccc',
  },
});