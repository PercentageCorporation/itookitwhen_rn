import React, { useEffect, useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import { CreateMedContext } from './CreateProvider';
import CreateTopNav from './CreateTopNav';
import { getStrength } from '../../../drugData/lookupDrugs';
import CreateSummary from './CreateSummary';
import { styles } from '../MedStyles';

export default function MedicationStrength() {
  console.log('MedicationStrength');
  const [strengths, setStrengths] = useState([]);
  const {cs,newMed} = useContext(CreateMedContext);
  //console.log(cs,newMed);

    function selectStrength(s) {
      console.log('selectStrength', s);
      cs.set('Strength', s);
      cs.next();
    }

    useEffect(() => {
      const st = getStrength(newMed.Id,newMed.Form);
      console.log('getStrength', st)
      const st1 = [...st,"NOT LISTED",];
      //st.push('NOT LISTED');
      console.log('pushed', st1)
      setStrengths(st1);
    },[]);

  function renderItem({item}) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => selectStrength(item)}>
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    )
  }
  console.log('render', strengths);
  return (
    <SafeAreaView style={styles.container}>
        <CreateTopNav title={'Medication Strength'} />
        <View style={styles.title}>
          <Text style={styles.titleText}>What is the strength of your medication?</Text>
        </View>
        <FlatList contentContainerStyle={styles.list}
          data={strengths}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
        <CreateSummary />
    </SafeAreaView>
  );
}

