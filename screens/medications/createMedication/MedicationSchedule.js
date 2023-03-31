import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text } from 'react-native';
import { CreateMedContext } from './CreateProvider';
import CreateTopNav from './CreateTopNav';
import MedicationTimePicker from './MedicationTimePicker';
import { styles } from '../MedStyles';

export default function MedicationSchedule() {
  console.log('MedicationSchedule');
  const [doseTimes, setDoseTimes] = useState(['']);
  const [doseCount, setDoseCount] = useState(1);
  const {cs,newMed} = useContext(CreateMedContext);
  //console.log(cs,newMed);
  
  const oftenCode = newMed.OftenCode;
  const doses = parseInt(oftenCode[1]);

  function setTime(time) {
    console.log('MS setTime', time, doseTimes, oftenCode);
    const newTimes = [
      ...doseTimes.slice(0, doseCount-1),
      time, 
      ...doseTimes.slice(doseCount)
      ]
    console.log('doseTimes', newTimes);
    setDoseTimes(newTimes);
    console.log('setTime', time, newTimes);

    if (doses === 1) {
      cs.set('Schedule', newTimes);
      cs.set('Occurance', 1);
      cs.next();
      }
    else if (doseCount < doses) {
      setDoseCount(doseCount+1);
      } 
    else {
      cs.set('Schedule', newTimes);
      cs.set('Occurance', doses);
      cs.next();
      }
    }

  let dQ = 'when?';
  if (doses === 1) dQ = 'When do you normally take your medication?';
  if (doses > 1 && doseCount === 1) dQ = 'When do you normally take your first dose?';
  if (doses > 1 && doseCount === 2) dQ = 'When do you normally take your second dose?';
  if (doses > 1 && doseCount === 3) dQ = 'When do you normally take your third dose?';
  if (doses > 1 && doseCount === 4) dQ = 'When do you normally take your fourth dose';
  if (doses > 1 && doseCount === 5) dQ = 'When do you normally take your fifth dose?';

  return (
    <SafeAreaView style={styles.container}>
        <CreateTopNav title={'Medication Schedule'} />
        <View style={styles.title}>
          <Text style={styles.titleText}>{dQ}</Text>
        </View>
        <View style={lstyles.times}>
           <MedicationTimePicker doseCount={doseCount} doses={doses} setTime={setTime} />
        </View>
    </SafeAreaView>
  );
}

const lstyles = StyleSheet.create({
  times: {
    height: '98%',
  },
});
