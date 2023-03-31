import React from 'react';
import {Container, Header, Logo} from '../components/StyledComponents';

export default function OB1() {
  //console.log('OB1');

  return (
    <Container>
      <Logo source={require('../assets/images/pill512.png')} size={'100px'} />
      <Header
          text = {`Thank you for trying I Took It When?\n\n
          Many people have trouble navigating and selecting items using the small screens on today's mobile devices. \n\n
          Unlike other apps, we designed ours to make recording when you took your medications as easy as possible.\n\n
          To get started we need to gather some information to help manage your medications.`}
      />
    </Container>
  );
}

