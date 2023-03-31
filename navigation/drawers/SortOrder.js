import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useStateValue} from '../../state/StateProvider';
import DrawerHeader from './DrawerHeader';
//import { ScrollView } from 'react-native-gesture-handler';
import { updateSortOrder } from '../../database/sqlite';

export default function SortOrder({navigation}) {
  const [meds, medsDispatch] = useStateValue().meds;
  const [sortedMeds, setSortedMeds] = useState(meds.meds);
  const [medsLoaded, setMedsLoaded] = useState(false);
  console.log('SortOrder');

  const medList = meds.meds;
  if (!medList) return <></>;

  console.log('SortOrder');

  function goUp(ix) {
    console.log('goUp', ix);
    var sm = [...sortedMeds];
    [sm[ix - 1], sm[ix]] = [sm[ix], sm[ix - 1]];
    setSortedMeds(sm);
  }

  function goDown(ix) {
    console.log('goDown', ix);
    var sm = [...sortedMeds];
    [sm[ix + 1], sm[ix]] = [sm[ix], sm[ix + 1]];
    //console.log('down', sm);
    setSortedMeds(sm);
  }

  function doUpdate() {
    console.log('doUpdate');
    var changes = 0;
    for (var ix = 0; ix < sortedMeds.length; ++ix) {
      const m = sortedMeds[ix];
      if (m.SortOrder != ix) {
        // only update what has changed
        updateSortOrder(m.Id, ix)
        ++changes;
        }
    }
    setMedsLoaded(false);
    console.log('doUpdate changes', changes);
  }

  function doCancel() {
    console.log('doCancel');
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <DrawerHeader title="Edit Sort Order" />
        <View style={styles.hbtns}>
          <TouchableOpacity style={styles.btn1} onPress={() => doUpdate()}>
            <Text style={styles.btnText}>Update Sort Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2} onPress={() => doCancel()}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      <ScrollView style={styles.scroll}>
        {sortedMeds.map((m, ix) => {
          return (
            <View key={ix} style={styles.listItems}>
              <View style={styles.info}>
                  <Text style={styles.medText}>{m.Name}({m.SortOrder})</Text>
              </View>
              <View style={styles.udBtns}>
                { ix > 0 &&
                <TouchableOpacity style={styles.uBtn} onPress={() => goUp(ix)}>
                  <Text style={styles.btnText}>Up</Text>
                </TouchableOpacity>
                }
                {ix+1 < sortedMeds.length ?
                <TouchableOpacity style={styles.dBtn} onPress={() => goDown(ix)}> 
                  <Text style={styles.btnText}>Down</Text>
                </TouchableOpacity>
                :
                <View style={{width: 75}}></View>
                }
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    fontWeight: 800,
    // backgroundColor: 'green',
  },
  headerText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  hbtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: 48,
    padding: 4,
    color: '#000000',
    borderBottomWidth: 1,
    borderColor: '#000000',
    // backgroundColor: 'pink',
  },
  btn1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
    width: '60%',
    height: 40,
  },
  btn2: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 10,
    width: '30%',
    height: 40,
  },
  btnText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 5,
  },
  scroll: {
    paddingBottom: 1,
    width: '95%',
  },
  info: {
    fontWeight: 'bold',
  },
  listItems: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000000',
  },
  udBtns: {
    flexDirection: 'row',
  },
  dBtn: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#cccccc',
    width: 75,
    height: 50,
  },
  uBtn: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#cccccc',
    width: 75,
    height: 50,
  },
});
