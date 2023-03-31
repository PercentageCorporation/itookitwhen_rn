import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';
import {useStateValue} from '../../../state/StateProvider';
//import { getMeds } from '../../../database/sqlite';
import MedItem from './MedItem';
import NoMeds from './NoMeds';

export default function MedsList({navigation}) {
  //const usv = useStateValue();
  //console.log('usv',usv);
//  const [user, userDispatch] = useStateValue().user;
  const [meds, medsDispatch] = useStateValue().meds;
  const medList = meds.meds;
  if (meds.meds.length === 0) return (<NoMeds navigation={navigation} />);
  //console.log('MedsList', medList);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Medications</Text>
        </View>
        <View style={styles.body}>
          <ScrollView style={styles.scroll}>
            {medList.map((m, ix) => (
              <MedItem key={ix} med={m} navigation={navigation} />
            ))}
          </ScrollView>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 4,
    //backgroundColor: 'pink',
  },
  body: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 1,
    //backgroundColor: 'green',
  },
  header: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    //backgroundColor: 'blue',
},
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
