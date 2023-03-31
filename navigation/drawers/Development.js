import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View} from 'react-native';
import {Dimensions} from 'react-native';
import DrawerHeader from './DrawerHeader';

export default function Development() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={styles.container}>
      <DrawerHeader title="Development Info" />
      <View style={styles.tbl}>
        <View style={styles.row}>
            <Text style={styles.col1}>Height:</Text>
            <Text style={styles.col2}>{windowHeight}</Text>
        </View>
        <View style={styles.altRow}>
            <Text style={styles.col1}>Width:</Text>
            <Text style={styles.col2}>{windowWidth}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  tbl: {
    marginTop: 20,
    backgroundColor: '#222222',
    borderWidth: 2,
    borderColor: 'green',
    width: '80%',
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
