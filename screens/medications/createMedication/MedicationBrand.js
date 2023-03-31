import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, View, Text, TextInput, Alert, FlatList, TouchableOpacity} from 'react-native';
import { CreateMedContext } from './CreateProvider';
import CreateTopNav from './CreateTopNav';
import { findBrandNames } from '../../../drugData/lookupDrugs';
import CreateSummary from './CreateSummary';
import { styles } from '../MedStyles';

export default function MedicationBrand() {
  console.log('MedicationBrand');
  const [brandNames, setBrandNames] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const {cs,newMed} = useContext(CreateMedContext);
  //console.log(cs,newMed);

  useEffect(() => {
    const names = findBrandNames(newMed.Name);
    const nl = {
        name: 'NOT LISTED',
        type: 'N',
        id: 0,
    }
    names.push(nl);
    setBrandNames(names)
    setDisplayList(names);
  },[]);

  function inputChange(txt) {
    console.log('inputChange',txt);
    if (txt && txt.length > 0) {
      var newItem = {id: 0, type: 'M', name: txt.toUpperCase()};
      var newList = [newItem, ...brandNames];
      console.log('newList',newList);
      setDisplayList(newList);
    }
  }

  function selectBrand(b) {
    console.log('selectBrand', b);
    if (b.type === 'M') {
      confirmName(b)
      return;
      }
    doSelect(b);
    }

  function doSelect(b) {
    console.log('doSelect', b);
    let name = newMed.Name; // default if not Trade name
    if (b.type === 'T') { // if Trade name, update Id and Name
      cs.set('Id', b.id);
      name = b.name;
    }
    if (b.type === 'M') { // if Manual name, leave Id as is
      name = b.name;
    }
    cs.set('Brand', name);
    //console.log('selectBrand', name, b.id);
    cs.next();
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
      <TouchableOpacity style={styles.item} onPress={() => selectBrand(item)}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
        <CreateTopNav title={'Medication Brand'} />
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            autoCapitalize = "characters"
            onChangeText = {txt => inputChange(txt)}
            autoFocus={false}
            />
        </View>
        <FlatList contentContainerStyle={styles.list}
          keyboardShouldPersistTaps='handled'
          data={displayList}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
        <CreateSummary />
    </SafeAreaView>
  );
}
