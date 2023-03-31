import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {formatTime} from '../medicationHelpers';
import moment from 'moment';

export default function MedItem({med, navigation}) {
  //console.log('MedItem', med);

  let ltAgo = "Never taken";
  let t = '';
  if (med.Date) {
    const d = med.Date * 1000;
    t = formatTime(d);
    ltAgo = 'Last taken ' + moment(d).fromNow();
  }

  function doMedHist() {
    console.log('doMedHist',med.Id);
    navigation.navigate('MedHistory', {med: med});
  }

  function doMedDetail() {
    console.log('doMedDetail',med.Id);
    navigation.navigate('MedDetails', {med: med});
  }

  async function doTake() {
    console.log('doTake',med.Id);
    navigation.navigate('Take', {med: med});
  }

  return (
    <View style={styles.medCard}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{med.Name}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.info}>
          <View>
            <Text>{ltAgo}</Text>
            <Text>{t}</Text>
          </View>
          <View style={styles.hbtns}>
            <TouchableOpacity style={styles.btn} onPress={()=>doMedDetail()}>
              <Text style={styles.btnText}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>doMedHist()}>
              <Text style={styles.btnText}>History</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.take} onPress={()=>doTake()}>
          <Text style={styles.takeText}>Take</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  medCard: {
    marginTop: 4,
    marginHorizontal: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    minWidth: 0,
    flex: 1,
  },
  header: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontWeight: 800,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  info: {
    // borderWidth: 1,
    // borderColor: '#000000',
    width: '70%',
  },
  take: {
    //w-10/12 h-10/12 m-1 text-3xl text-white bg-green-600'
    backgroundColor: 'green',
    justifyContent: 'center',
    padding: 10,
    height: 70,
    width: 70,
    margin: 5,
    borderRadius: 10,
  },
  takeText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  hbtns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',   // put at row bottom
    paddingVertical: 4,
    color: '#000000',
    // borderWidth: 1,
    // borderColor: '#000000',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 10,
    width: '40%',
    height: 30,
  },
  btnText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 5,
  },
});
