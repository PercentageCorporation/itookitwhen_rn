import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {lookupMed, formatTime} from '../medicationHelpers';
import moment from 'moment';

export default function HistItem({hist,doDelete}) {
  //console.log('HistItem', hist);


  const d = hist.Date * 1000;
  const t = formatTime(d);
  const ltAgo = moment(d).fromNow();
  const td = `Taken ${ltAgo} at ${t}`;

  function confirmDelete() {
    Alert.alert(
      "Delete this entry?",
      t,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => doDelete(hist.Id) }
      ]
    );
  };


  return (
    <View style={styles.medCard}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{hist.Name}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.info}>
          <Text>Last taken {ltAgo}</Text>
          <Text>{t}</Text>
        </View>
        <TouchableOpacity style={styles.delete} onPress={()=>confirmDelete()}>
          <Text style={styles.deleteText}>Delete</Text>
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
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  info: {
    paddingVertical: 2,
    width: '75%',
    fontWeight: 'bold',
  },
  delete: {
    // borderWidth: 1,
    // borderColor: '#000000',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 35,
    borderRadius: 4,
  },
  deleteText: {
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
