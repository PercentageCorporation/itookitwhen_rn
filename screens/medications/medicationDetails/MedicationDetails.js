import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { formatDosage, formatOften, formatTime } from '../medicationHelpers';
import { getMedHistory } from '../../../database/sqlite';
//import MedicationSummary from '../createMedication/MedicationSummary';
import moment from 'moment';
import { useStateValue } from '../../../state/StateProvider';
import MedicationSummary from '../MedicationSummary';

export default function MedicationDetails(props) {
  const [medHistoryList, setMedHistoryList] = useState(null);
  const [currentUser, userDispatch] = useStateValue().user;
  const med = props.route.params.med
  const navigation = props.navigation;
  console.log('MedDetails', med);


  useEffect(() => {
    async function ghcb(hist) {
      console.log('MD ghcb');
      setMedHistoryList(hist);
    }
    getMedHistory(med.Id, ghcb);
  },[]);

  function goBack() {
    navigation.goBack();
  }

  if (!medHistoryList) return (<></>);

  const medSummary = [
    ['Medication', med.Name],
    ['Brand', med.Brand],
    ['Type', med.Type],
    ['Form', med.Form],
    ['Strength', med.Strength],
    ['Dosage', med.Dosage],
    ['How Often', med.Often],
    ['Dose Times', med.Schedule],
  ];


  function getJD(time) {
    var JD =  time/86400000 + 2440587.5;
    return Math.floor(JD);
  }

  const todayJD =  getJD(moment())
  //console.log('today', todayJD);

  var today = 0;
  var yesterday = 0;
  var sevenDays = 0;
  var thirtyDays = 0;

  medHistoryList.forEach((h,ix) => {
    const taken = moment(h.Date*1000);
    const takenJD = getJD(taken);
    //console.log(h.Date, taken, takenJD);
    const days = todayJD - takenJD;
    if (days === 1) ++today;
    else if (days === 2) ++yesterday;
    else if (days < 7) ++sevenDays;
    else if (days < 30) ++thirtyDays;
  });

  const lt = formatTime(med.Date);

  const usage = [
    ['Last taken:',lt],
    ['Taken today:',today],
    ['Takey yesterday:',yesterday],
    ['Taken in the past 7 days',sevenDays],
    ['Taken in the past 30 days',thirtyDays],
  ];

  function doTake(med) {
    console.log('doTake', med.Id)
    navigation.navigate('Take', {med: med});
  }

  function doEdit(med) {
    console.log('doEdit', med.Id)
    navigation.navigate('Edit', {med: med});
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.arrow} onPress={() => goBack()}>
            <FontAwesome5 name="arrow-left" color="#000000" size={20} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{med.Name} Details</Text>
        </View>
        {/* <View style={styles.body}>
          <Text>{med.Description}</Text>
          <Text>{formatDosage(med,currentUser)}</Text>
        </View> */}
        <View style={styles.hbtns}>
            <TouchableOpacity style={styles.btn1} onPress={()=>doTake(med)}>
              <Text style={styles.btnText}>Take</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} onPress={()=>doEdit(med)}>
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
        </View>
        {/* <View style={styles.info}>
          <Text>Some text</Text>
        </View> */}
        <View style={styles.summary}>
          <MedicationSummary data={usage} />
        </View>
        <View style={styles.summary}>
          <MedicationSummary data={medSummary} />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
body: {
  paddingVertical: 2,
  paddingHorizontal: 4,
  //backgroundColor: 'yellow',
},
info: {
  paddingVertical: 2,
  fontWeight: 'bold',
  //backgroundColor: 'orange',
},
summary: {
  flex: 1,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  //backgroundColor: 'yellow',
},
hbtns: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 75,
  marginHorizontal: 20,
  marginTop: 15,
  color: '#000000',
  // borderWidth: 1,
  // borderColor: '#000000',
  //backgroundColor: 'pink',
},
btn1: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'green',
  borderRadius: 10,
  height: '90%',
  width: '60%',
},
btn2: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'orange',
  borderRadius: 10,
  width: '30%',
  height: '90%',
},
btnText: {
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 15,
  padding: 5,
},
})
