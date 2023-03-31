import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//export default withNavigation(<DrawerHeader/>);

export default function DrawerHeader({title}) {
  console.log('DrawerHeader');
  const navigation = useNavigation();

  function goBack() {
    console.log('goBack');
    //navigation.openDrawer();
    navigation.goBack();
  }

  return (
    <View style={styles.header}>
    <TouchableOpacity style={styles.arrow} onPress={() => goBack()}>
      <FontAwesome5 name="arrow-left" color="#000000" size={20} />
    </TouchableOpacity>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);
};

const styles = StyleSheet.create({
  header: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 2,
    paddingLeft: 4,
    paddingRight: 20,
    fontWeight: 800,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000000',
    //backgroundColor: 'green',
  },
headerText: {
  flex: 1,
  textAlign: 'center',
  fontSize: 20,
  color: '#000000',
  fontWeight: 'bold',
  paddingLeft: 20,
  //backgroundColor: 'yellow',
},
arrow: {
  width: 20,
  //backgroundColor: 'pink',
},
  // header: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '100%',
  //   height: 35,
  //   paddingVertical: 2,
  //   paddingHorizontal: 4,
  //   borderRadius: 4,
  //   borderWidth: 1,
  //   borderColor: '#000000',
  // },
  // headerText: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
});

