import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-custom-swiper';
import {useStateValue} from '../state/StateProvider';
import {useAuthContext} from '../screens/auth/AuthContext';
import {
  userObject,
  addUser,
  updateUser,
  createAllTables,
} from '../database/sqlite';
import OB1 from './OB1';
import OB2 from './OB2';

export default function OnboardingScreen() {
  const [currentUser, dispatch] = useStateValue().user;
  const refresh = useAuthContext().refresh;
  console.log('Onboarding', currentUser);

  async function ct() {
    console.log('change type', currentUser);
    if (currentUser.Id > 0) {
      currentUser.UserType = 'basic';
      await updateUser(currentUser);
    } else {
      const user = userObject;
      user.DisplayName = 'New User';
      user.FirebaseId = 'FBID';
      user.UserType = 'basic';
      await createAllTables(); // just in case
      await addUser(user);
    }

    dispatch({type: 'setUserType', value: 'basic'});
    refresh.doRefresh();
  }

  function onSkip() {
    console.log('onSkip');
  }

  function onDone() {
    ct();
    console.log('onDone');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Onboarding style={styles.pagerView} initialPage={0}
        useNativeDriver={false}
        pages ={[
          OB1,
          OB2,
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
});
