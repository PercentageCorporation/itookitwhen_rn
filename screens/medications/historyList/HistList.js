import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { StyleSheet, View, Text, FlatList } from 'react-native'; 
import {useStateValue} from '../../../state/StateProvider';
import { deleteHistory } from '../../../database/sqlite';
import HistItem from './HistItem';

export default function HistList({navigation}) {
  const [meds, medsDispatch] = useStateValue().meds;
  console.log('HistList');

  const histList = meds.history;

  async function doDelete(hId) {
    console.log('doDelete',hId);
    await deleteHistory(hId);
    navigation.navigate('History');  // is this necessary?
  }

  const renderItem = ({ item }) => {
    //console.log('render', item);
    return (<HistItem hist={item} doDelete={doDelete} />);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Medication History</Text>
        </View>
        <FlatList
          data={histList}
          renderItem={renderItem}
          keyExtractor={item => item.Id}
          ListHeaderComponent={() => <></>}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 35,
  },
  header: {
    marginTop: 1,
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
