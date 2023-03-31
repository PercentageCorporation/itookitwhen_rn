import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {StyleSheet, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import { timeGrid } from '../medicationHelpers';
import moment from 'moment';

export default function MedicationTimePicker({ doseCount, doses, setTime}) {
  const [mnan, setMNAN] = useState('X');
  const [ref, setRef] = useState(null);
  const sRef = useRef(null);

  const ct = moment();
  console.log('MedicationTimePicker', doseCount, doses);

  function selectTime(t, ix) {
    console.log('selectTime', t, ix);
    setTime(t);
  }

  const tg = timeGrid();

  useEffect(() => {
    var pos = 24;
    if (doseCount > 1) {
      const offset = ((16 / (doses-1)) | 0) * (doseCount-1) * 4;
      console.log('offset', offset);
      pos = 21 + offset;
      }
    console.log('uE', pos);
    scrollTo(pos);
  }, [doseCount]);


  function scrollTo(ix) {
    console.log('scrollTo', ix);
    if (!sRef) return;
    const y = ix * 44;
    sRef.current.scrollTo({
      x: 0,
      y: y,
      animated: false,
    })    
    console.log('did scrollTo', y);
  }
  
  function ItemRender(t, ix) {
    //console.log('IR', ix);
    const tx = moment(t, 'hh:mm A');
    const tf = moment(tx).format('hh:mm A');
    var minDiff = ct.diff(tx, 'minutes');
    return (
      <View key={ix}>
        <TouchableOpacity style={styles.btn} onPress={()=>selectTime(tf,ix)}>
          <Text style={styles.btnText}>{tf}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function selectMNAN(when) {
    console.log("MNAN",when);
    setMNAN(when);
    switch (when) {
      case 'M':
        scrollTo(21);
        break;
      case 'N':
        scrollTo(45);
        break;
      case 'A':
        scrollTo(61);
        break;
      case 'E':
        scrollTo(69);
        break;
      case 'T':
        scrollTo(85);
        break;
      default:
        break;
    }
  }

  function handleScroll(e) {
    console.log('hs', e.nativeEvent.contentOffset);
  }

  return (
    <View style={styles.container}>
      { true && 
      <View style={styles.mnan}>
        <TouchableOpacity style={styles.mnanBtn} onPress={()=>selectMNAN('M')}>
          <Text style={styles.mnanText}>Morning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mnanBtn} onPress={()=>selectMNAN('N')}>
          <Text style={styles.mnanText}>Noon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mnanBtn} onPress={()=>selectMNAN('A')}>
          <Text style={styles.mnanText}>Afternoon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mnanBtn} onPress={()=>selectMNAN('E')}>
          <Text style={styles.mnanText}>Evening</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mnanBtn} onPress={()=>selectMNAN('T')}>
          <Text style={styles.mnanText}>Night</Text>
        </TouchableOpacity>
      </View>
      }
      { true && 
      <View style={styles.scrollView}>
        <ScrollView style={styles.scroll}
          // onScroll={handleScroll} 
          ref={sRef}
          snapToInterval={44}
          >
          {tg.map((t,ix) => {
            return ItemRender(t,ix);
            })
          }
        </ScrollView>
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 35,
    //backgroundColor: 'blue'
  },
  mnan: {
    marginTop: 40,
    //backgroundColor: 'pink',
  },
  mnanBtn: {
    border: 2,
    width: 150,
    paddingHorizontal: 20,
    borderColor: '#000000',
    borderRadius: 4,
    margin: 2,
  },
 mnanText: {
   textAlign: 'center',
   fontWeight: 'bold',
   fontSize: 20,
   color: '#000000',
 },
 scrollView: {
  height: 314,
  marginTop: 40,
  marginBottom: 5,
  //backgroundColor: 'yellow',
},
scroll: {
  flex: 1,
  //backgroundColor: 'green',
},
btn: {
    justifyContent: 'center',
    border: 2,
    borderColor: '#000000',
    borderRadius: 4,
    margin: 2,
    width: 250,
    height: 40,
    backgroundColor: 'gray',
  },
 btnText: {
   textAlign: 'center',
   fontWeight: 'bold',
   fontSize: 20,
   color: '#000000',
 },
});
