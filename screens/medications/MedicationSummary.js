import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function MedicationSummary({data}) {
  const tableHead = ['Head', 'Head2', 'Head3', 'Head4'];

  return (
    <View style={styles.container}>
      <View style={styles.tbl}>
        {data.map((r, ix) => {
          //console.log('td', r[0], r[1]);
          return (
            <View key={ix+1} style={ix%2 === 0 ? styles.row : styles.altRow}>
                <Text style={styles.col1}>{r[0]}</Text>
                <Text style={styles.col2}>{r[1]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
