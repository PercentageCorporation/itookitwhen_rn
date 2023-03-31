import React, { useState } from 'react'
import {StyleSheet, Text, View, Button} from 'react-native';
import {Form, FormLabel, FormInput, FormTextBox, Container, Header} from '../components/StyledComponents';

export default function OB2({dn, sdn, at, sat, bt, sbt}) {
  //console.log('OB2');

  function doAwake() {
    console.log('doAwake');
  }

  function doBed() {
    console.log('doBed');
  }

  return (
      <Container>
        <Header text={`Please enter the information below`} />
        <Form width='80%'>
          <FormLabel>Display Name</FormLabel>
          <FormInput
            color='#ffffff'
            onChangeText={text => sdn(text)}
            value={dn}
            textContentType="nickname"
            autoCompleteType="text"
            autoFocus={true}
            autoCapitalize = 'words'
            />

          <FormLabel>Awake Time</FormLabel>
          <FormTextBox onPress={()=>sat()}>
            {at}
          </FormTextBox>

          <FormLabel>Bed Time</FormLabel>
          <FormTextBox onPress={()=>sbt()}>
            {bt}
          </FormTextBox>
          </Form>
      </Container>
  )
}

const styles = StyleSheet.create({
  txtBox: {
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 18,
    padding: 8,
    marginBottom: 25,
  },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    info: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    user: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#ffffff',
    },
    button: {
      margin: 2,
    },
  });
  