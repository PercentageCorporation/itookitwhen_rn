import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {StyleSheet, FlatList, Text, View, TouchableOpacity} from 'react-native';
import { timeGrid } from './medicationHelpers';
import moment from 'moment';

export default function TimePicker({ changeTime, date }) {
  const [ctStr, setCtStr] = useState(moment(date).format('hh:mm A'));
  const [ref, setRef] = useState(null);
  const [pos, setPos] = useState(null);
  const [didScroll, setDidScroll] = useState(false);
  const ct = moment(date);
  console.log('TimePicker', pos, date, ct);
  
  const fRef = useRef(null);

  function selectTime(t, ix) {
    //console.log('selectTime', t);
    setCtStr(t);
    changeTime(t);
  }

  const tg = timeGrid();
  //console.log('ini',pos, refs);

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
    setPos(lpos);
    //setTimeout(() => scrollTo(lpos), 1000);
  },[])

  function scrollTo(ix) {
    console.log('scrollTo', ix);
    if (!fRef || !ix) return;
    fRef.current.scrollToIndex({
        animated: true,
        index: ix,
        viewPosition: 0
      })
    console.log('did scrollTo', ix);
    //setDidScroll(true);
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

  function gotRef(ref) {
    console.log('gotRef')
    fRef = ref;
  }

  //if ( ref && pos) scrollTo(pos);
  function getItemLayout(data, index) {
    return { length: styles.btn.height, offset: styles.btn.height * index, index };
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tg}
        renderItem={({ item, index }) => ItemRender(item, index)}
        ref={fRef}
        initialScrollIndex={pos} 
        getItemLayout={getItemLayout}
        />
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
