import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { useNavigationState } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, BackHandler, Alert} from 'react-native';
import MedicationName from './MedicationName';
import MedicationBrand from './MedicationBrand';
import MedicationForm from './MedicationForm';
import MedicationStrength from './MedicationStrength';
import MedicationOften from './MedicationOften';
import MedicationSchedule from './MedicationSchedule';
import MedicationHourly from './MedicationHourly';
import MedicationConfirm from './MedicationConfirm';
//import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@heroicons/react/solid'
//import { medsCreateState, useMedsCreateState, resetMedsCreateState } from '../../../store/storeValtio';
import { CreateProvider } from './CreateProvider';
import { CreateMedContext } from './CreateProvider';
import ManualStrength from './ManualStrength';

export default function CreateSequencer() {
  console.log('CreateSequencer');
  const [bh, setBh] = useState(null);
  const {cs,newMed} = useContext(CreateMedContext);
  const navigation = useNavigation();
  console.log('step', cs.step);
  
  useEffect(() => {
    console.log('CreateSequencer UE', cs.step);
    if (bh) return;

    const doReset = () => {
      cs.reset();
      backHandler.remove();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Home' },
          ],
        }));
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'Tabs'}],
      // });
    }
    const backAction = () => {
      console.log('backAction');
      Alert.alert("Are you sure you want to quit?",
       "You will lose all your input!", [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "YES", onPress: () => doReset() }
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
      );
    setBh(backHandler);
    
    return () => {
      console.log('CreateSequencer unsubscribe', cs.step);
      backHandler.remove();
      }
  }, []);


  const state = useNavigationState(state => state);
  const history = useNavigationState(state => state.history);
  // history.map((h) => {
  //   console.log(h);
  // });
  console.log('navState', state.index);
  // const routes = useNavigationState(state => state.routes);
  // routes.map((r) => {
  //   console.log(r.name);
  // })



  function exit() {
  }

  return(
    <SafeAreaView style={styles.sav}>
      { cs.step === 1 &&<MedicationName />}
      { cs.step === 2 &&<MedicationBrand />}
      { cs.step === 3 &&<MedicationForm />}
      { cs.step === 4 && newMed.Id > 0  &&<MedicationStrength />}
      { cs.step === 4 && newMed.Id == 0  &&<ManualStrength />}
      { cs.step === 5 &&<MedicationOften />}
      { cs.step === 6 &&<MedicationSchedule />}
      { cs.step === 7 &&<MedicationHourly />}
      { cs.step >= 8 &&<MedicationConfirm />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    sav: {
      flex: 1,
    },
});  