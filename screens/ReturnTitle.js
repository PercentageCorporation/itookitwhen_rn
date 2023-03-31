import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { scrStyles } from './ScreenStyles';

export default function ReturnTitle({title}) {
    const navigation = useNavigation();

    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.goBack()}>
          <Image source={require("../assets/images/angle-left-64.png")} 
            style={styles.arrow} 
            />
        </TouchableOpacity>
        <Text style={scrStyles.headerText}>{title} Details</Text>
      </View>
    )
  
}

export const styles = StyleSheet.create({
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowContainer: {
        height: 25,
        width: 25,
        marginLeft: 10,
        marginRight: 20,
    },
    arrow: {
        flex: 1,
        resizeMode: "cover",
        width: "100%",
        alignItems: "center",    }
})