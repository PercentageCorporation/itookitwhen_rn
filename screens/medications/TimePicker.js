import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {StyleSheet, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import { timeGrid } from './medicationHelpers';
import moment from 'moment';

export default function TimePicker({ changeTime }) {
  const [ctStr, setCtStr] = useState(moment().format('hh:mm A'));
  const [ref, setRef] = useState(null);
  const sRef = useRef(null);
  const ct = moment();
  const tg = timeGrid();
  console.log('TimePicker', ct);

  useEffect(() => {
    var lpos = 0;
    tg.map((t,ix) => {
      const tx = moment(t, 'hh:mm A');
      var minDiff = ct.diff(tx, 'minutes');
      //console.log('md', minDiff)
      if (minDiff > 0 && minDiff <= 15) {
        //console.log('pos', ix)
        lpos = ix;
      }
    });
    console.log('lpos', lpos)
    setTimeout(() => scrollTo(lpos), 500);
  },[])

  function scrollTo(ix) {
    console.log('scrollTo', ix);
    if (!sRef || !ix) return;
    const y = ix * 40;
    sRef.current.scrollTo({
      x: 0,
      y: y,
      animated: false,
    })    
    console.log('did scrollTo', y);
  }
  
  function selectTime(tf,ix) {
    console.log('selectTime', tf, ix);
    changeTime(tf);
  }

  function ItemRender(t, ix) {
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}
        ref={sRef}
        >
        {tg.map((t,ix) => {
          return ItemRender(t,ix);
          })
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 35,
    backgroundColor: 'blue'
  },
  scroll: {
    flex: 1,
    marginTop: 5,
    marginBottom: 35,
  },
  btn: {
    border: 2,
    borderColor: '#000000',
    borderRadius: 4,
    margin: 2,
    width: 250,
    height: 40,
    backgroundColor: 'pink',
  },
 btnText: {
   textAlign: 'center',
   fontWeight: 'bold',
   fontSize: 20,
   color: '#000000',

 }
});
