import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Button} from 'react-native';
import DrawerHeader from '../../../navigation/drawers/DrawerHeader';
import { deleteMed } from '../../../database/sqlite';
import { styles } from '../MedStyles';

export default function MedicationEdit(props) {
  const navigation = props.navigation;
  const med = props.route.params.med;
  console.log('MedicationEdit', med);

  const medEdit = [
    ['Medication', med.Name],
    ['Brand', med.Brand],
    ['Type', med.Type],
    ['Form', med.Form],
    ['Strength', med.Strength],
    ['Dosage', med.Dosage],
    ['How Often', med.Often],
    ['Dose Times', med.Schedule],
  ];

  async function killMed(Id){
    await deleteMed(Id);
    navigation.navigate('Meds');
  }

  return (
    <SafeAreaView style={styles.container}>
      <DrawerHeader title='Edit Medication' />
      <View style={styles.tbl}>
        {medEdit.map((r, ix) => {
          //console.log('td', r[0], r[1]);
          return (
            <View key={ix+1} style={ix%2 === 0 ? styles.row : styles.altRow}>
                <Text style={styles.col1}>{r[0]}</Text>
                <Text style={styles.col2}>{r[1]}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.confirm}>
        <Button
          style={styles.confirmBtn}
          title={`Delete Med ${med.Name}`}
          onPress={() => killMed(med.Id)}
        />
      </View>
    </SafeAreaView>
  );
}

const estyles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: 'red',
    zIndex: 1,
  },
  tbl: {
    backgroundColor: '#222222',
    borderWidth: 2,
    borderColor: 'green',
  },
  row: {
    minHeight: 30,
    padding: 4,
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
  },
  altRow: {
    minHeight: 30,
    padding: 4,
    flexDirection: 'row',
    backgroundColor: '#cccccc',
  },
  col1: {
    //minWidth: '30%',
    color: '#000000',
    fontWeight: '900',
  },
  col2: {
    flexShrink: 1,
    width: '100%',
    color: '#000000',
    paddingRight: 10,
    textAlign: 'right',
    //backgroundColor: 'pink',
  },
  text: {
    color: '#000000',
  },
});
