import React from 'react';
import {Form, FormLabel, FormInput, FormTextBox, Container, Header} from '../components/StyledComponents';
const displayName = '';
const awakeTime = '';
const bedTime = '';

export const OB2 = [];
export const OB2x = (
  <Container key='1'>
    <Header text={`Please enter the information below`} />
    <Form width="80%">
      <FormLabel>Display Name</FormLabel>
      <FormInput
        color="#ffffff"
        onChangeText={text => setDisplayName(text)}
        value={displayName}
        textContentType="nickname"
        autoCompleteType="text"
        autoFocus={true}
        autoCapitalize="words"
      />

      <FormLabel>Awake Time</FormLabel>
      <FormTextBox onPress={() => doAwake()}>{awakeTime}</FormTextBox>

      <FormLabel>Bed Time</FormLabel>
      <FormTextBox onPress={() => doBed()}>{bedTime}</FormTextBox>
    </Form>
  </Container>
);
OB2.push(OB2x);
