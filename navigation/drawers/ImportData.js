import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import moment from 'moment';
import DrawerHeader from './DrawerHeader';
import {checkTableExists, createAllTables, createHistoryTable, createMedsTable, dropAllTables, dropTable} from '../../database/sqlite';
import {userObject, addUser, getUser, deleteUsers} from '../../database/sqlite';
import {MedsObject, addMed, getMeds, deleteMeds} from '../../database/sqlite';
import {HistoryObject, addHistory, getHistory, deleteHistory, dropTableHistory, createTableHistory} from '../../database/sqlite';
import { testMeds } from '../../utils/Meds';
import { testHist } from '../../utils/History';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ImportData({route}) {

  async function importMeds() {
    testMeds.forEach((m) => {
      console.log('medId', m.id);
      let med = {
        Id: m.id,
        Name: m.name,
        Brand: m.name,
        Description: '',
        Form: m.form,
        Schedule: m.schedule,
        Occurance: m.occurance,
        Often: m.often,
        Dosage: 1,
        Strength: m.dosage,
        SortOrder: m.sortOrder,
        DateCreated: moment().unix(),
        DateLastUpdated: moment().unix(),
        }
      addMed(med)
      //console.log('addMed',med);
    })
  };

  async function importHistory() {
    testHist.forEach((h) => {
      console.log('histId', h.id);
      let hist = {
        Id: h.id,
        Date: h.date,
        Status: h.status,
        Quantity: h.quantity,
        MedicationId: h.medicationId,
        }
      addHistory(hist)
      //console.log('addHist',hist);
    })
  };

function checkDb() {
    console.log('checkDb');
    checkTableExists('Users');
    checkTableExists('Meds');
    checkTableExists('History');
  }

  function createDb() {
    console.log('createDb');
    createAllTables();
  }

  function deleteDb() {
    console.log('deleteDb');
    dropAllTables();
  }

  function loadDb() {
    console.log('loadDb');
  }

  async function addUserToDB() {
    console.log('addUserToDB');
    const user = userObject;
    user.DisplayName = 'New User';
    user.FirebaseId = 'FBID';
    await addUser(user);
  }

  async function gucb(user) {
    console.log('gucb', user);
  }

  async function gmcb(meds) {
    console.log('gmcb', meds);
  }

  async function ghcb(hist) {
    //console.log('ghcb', hist);
  }

  async function getUserFromDB() {
    await getUser(gucb);
  }

  async function deleteMedsFromDB() {
    console.log('deleteMedsFromDB');
    await dropTable('Meds');
  }

  async function getMedsFromDB() {
    console.log('getMedsFromDB')
    await createMedsTable();
    await getMeds(gmcb);
  }

  async function deleteHistoryFromDB() {
    //await deleteHistory();
    await dropTable('History');
    await createHistoryTable();
    console.log('deleteHistoryFromDB');
  }

  async function getHistoryFromDB() {
    await getHistory(ghcb);
  }

  return (
    <SafeAreaView style={styles.container}>
        <DrawerHeader title='Import' />
        <View style={styles.button}>
          <Button title="Create Database" onPress={() => createDb()} />
        </View>
        <View style={styles.button}>
          <Button title="Delete Database" onPress={() => deleteDb()} />
        </View>
        <View style={styles.button}>
          <Button title="Check Tables" onPress={() => checkDb()} />
        </View>
        <View style={styles.button}>
          <Button title="Add User" onPress={() => addUserToDB()} />
        </View>
        <View style={styles.button}>
          <Button title="Get User" onPress={() => getUserFromDB()} />
        </View>
        <View style={styles.button}>
          <Button title="Drop Meds" onPress={() => deleteMedsFromDB()} />
        </View>
        <View style={styles.button}>
          <Button title="Import Meds" onPress={() => importMeds()} />
        </View>
        <View style={styles.button}>
          <Button title="Get Meds" onPress={() => getMedsFromDB()} />
        </View>
        <View style={styles.button}>
          <Button title="Delete History" onPress={() => deleteHistoryFromDB()} />
        </View>
        <View style={styles.button}>
          <Button title="Import History" onPress={() => importHistory()} />
        </View>
        <View style={styles.button}>
          <Button title="Get History" onPress={() => getHistoryFromDB()} />
        </View>
      </SafeAreaView>      
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start',
  },
  button: {
    margin: 2,
  }
})