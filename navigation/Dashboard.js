import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator} from 'react-native';
import {useStateValue} from '../state/StateProvider';
import {AuthContext} from '../screens/auth/AuthContext';
import OnboardingScreen from '../onboarding/OnboardingScreen';
import {getUser, getMeds, getHistory, setCB} from '../database/sqlite';
import MainNavigator from './MainNavigator';
import {Text, View} from 'react-native';

export default function Dashboard() {
  const usv = useStateValue();
  //console.log('Dashboard usv', usv);
  const [userReady, setUserReady] = useState(false);
  const [medsReady, setMedsReady] = useState(false);
  const [histReady, setHistReady] = useState(false);
  const [doRefresh, setDoRefresh] = useState(false);
  const [user, userDispatch] = useStateValue().user;
  const [meds, medsDispatch] = useStateValue().meds;
  const [haveUser, setHaveUser] = useState(false);
  console.log('Dashboard', haveUser);

  function sqlCB(r) {
    console.log('sqlCB', r);
    setDoRefresh(!doRefresh);
  }

  setCB(sqlCB);

  useEffect(() => {
    async function gucb(user) {
      console.log('gucb',user);
      if (user) {
        userDispatch({ type: 'setUser', value: user });
        setHaveUser(true);
      }
      setUserReady(true);
    }
    setUserReady(false);
    getUser(gucb);
  },[doRefresh]);

  useEffect(() => {
    async function ghcb(hist) {
      console.log('ghcb');
      medsDispatch({ type: 'setHistory', value: hist });
      setHistReady(true);
    }
    setHistReady(false);
    getHistory(ghcb);
  },[doRefresh,haveUser]);

  useEffect(() => {
    async function gmcb(meds) {
      console.log('gmcb');
      medsDispatch({ type: 'setMeds', value: meds });
      //meds.map((m) => {console.log(m)});
      setMedsReady(true);
    }
    setMedsReady(false);
    getMeds(gmcb);
  },[doRefresh,haveUser]);


  function refresh() {
    setDoRefresh(!doRefresh);
    console.log('refreshed', doRefresh);
  }

  console.log('ready',userReady, medsReady, histReady);
  if ( !userReady || !medsReady || !histReady) return ( <ActivityIndicator size="large" />);

  //setUserType(user.userType);

  const Main = createNativeStackNavigator();
  const noHeader = () => {return(<></>)}
  return (
    <AuthContext.Provider value={{refresh: {refresh:refresh, setDoRefresh:setDoRefresh}}}>
      { !haveUser &&
        <OnboardingScreen />
        // <View><Text>Temp Onboarding</Text></View>
      }
      { haveUser &&
        // <View><Text>Temp MainNavigator</Text></View>
        <MainNavigator />
      }
      </AuthContext.Provider>
  );
}
