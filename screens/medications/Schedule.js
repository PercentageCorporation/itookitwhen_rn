import React from 'react';
import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';
import {testMeds} from '../../utils/Meds';
import MedItem from '../medications/medicationList/MedItem';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Schedule() {
  console.log('Schedule');

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Schedule</Text>
        </View>
        <View>
          <ScrollView>
            {testMeds.map((m, ix) => (
              <MedItem key={ix} med={m} />
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
    paddingBottom: 35,
  },
  scroll: {
    paddingBottom: 1,
  },
  header: {
    marginTop: 35,
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontWeight: 800,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
},
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
