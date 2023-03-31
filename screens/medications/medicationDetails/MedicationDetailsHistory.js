import React, { useEffect, useState } from 'react';
//import ConfirmModal from '../../../ConfirmModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import { formatTime } from '../medicationHelpers';
import {getMedHistory, deleteHistory} from '../../../database/sqlite';
import MedicationDetailsHistoryItem from './MedicationDetailsHistoryItem';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

export default function MedicationDetailsHistory(props) {
//  const params = useParams();
//  const medId = params.id;
  console.log('MedHistList');
  const [medHistList, setMedHistList] = useState(null);
  const med = props.route.params.med
  console.log('MedHistList', med.Id);

  useEffect(() => {
    if (medHistList) return;
    async function ghcb(hist) {
      console.log('MHL ghcb');
      setMedHistList(hist);
    }
    getMedHistory(med.Id, ghcb);
  },[medHistList]);

  async function doDelete(hId) {
    console.log('doDelete',hId);
    await deleteHistory(hId);
    setMedHistList(null);
    //navigation.navigate('History');  // is this necessary?
  }

  const renderItem = ({ item }) => {
    //console.log('render', item);
    return (<MedicationDetailsHistoryItem hist={item} doDelete={doDelete} />);
  };

  function goBack() {
    props.navigation.goBack();
  }

  if (!medHistList) return (<></>);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.arrow} onPress={() => goBack()}>
            <FontAwesome5 name="arrow-left" color="#000000" size={20} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{med.Name} History</Text>
        </View>
        <FlatList
          data={medHistList}
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
})
