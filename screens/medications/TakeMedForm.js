import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useStateValue } from '../../state/StateProvider';
import { addHistory } from '../../database/sqlite';
import { createKey } from '../../utils/CreateKey';
import TimePicker from './TimePicker';
//import TimePicker from './TimePickerFL';
import moment from 'moment';

export default function TakeMedForm(props) {
  const [currentUser, userDispatch] = useStateValue().user;
  const [submitted, setSubmitted] = useState(false);
  const [ct, setCt] = useState(moment());
  
  const med = props.route.params.med;
  const navigation = props.navigation;


  //console.log('TakeMedForm', props);
  console.log('TakeMedForm', currentUser.Id, med.Id,);

  let curDT = new Date();

  const changeTime = (time) => {
    const tx = moment(time, 'hh:mm A');
    const tf = moment(tx).format('hh:mm A');
    console.log('changeTime', time, tx, tf);
    setCt(tx);
  };

  function handleClose() {
    //history.back();
    navigate(-1);
    return;
  }

  async function doTake() {
    setSubmitted(true);
    const newHist = {
      Id: createKey(),
      Date: ct.unix(),
      MedicationId: med.Id,
      Quantity: 1,
      Status: 'taken',
    };
    console.log('takeMed', newHist);
    await addHistory(newHist);
    navigation.goBack();  // do this to refresh ??

  }

  function doCancel() {
    navigation.goBack();
  }

  const ctStr = 'Take at ' + moment(ct).format('hh:mm A');

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.hbtns}>
            <TouchableOpacity style={styles.btn1} onPress={()=>doTake(med.Id)}>
              <View>
                <Text style={styles.takeText}>{med.Name}</Text>
                <Text style={styles.takeText}>Take at {ctStr}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn2} onPress={()=>doCancel(med.Id)}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <TimePicker changeTime={changeTime}/>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 35,
  },
info: {
  height: '98%',
},
hbtns: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 100,
  padding: 4,
  color: '#000000',
  // borderWidth: 1,
  // borderColor: '#000000',
},
btn1: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'green',
  borderRadius: 10,
  height: '90%',
  width: '65%',
},
btn2: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'orange',
  borderRadius: 10,
  height: '90%',
  width: '30%',
},
takeText: {
  textAlign: 'center',
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 20,
  padding: 0,
},
btnText: {
  color: '#000000',
  fontWeight: 'bold',
  fontSize: 20,
  padding: 5,
},
})
