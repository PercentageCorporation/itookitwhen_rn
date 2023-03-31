import React, { useState } from 'react';
import { SafeAreaView, Image, StyleSheet, FlatList, View, Text, StatusBar, TouchableOpacity, Dimensions, } from 'react-native';
import {useAuthContext} from '../screens/auth/AuthContext';
import { addUser, createAllTables, userObject } from '../database/sqlite';
import OB1 from './OB1';
import OB2 from './OB2';
import OB3 from './OB3';
import { createKey } from '../utils/CreateKey';

const {width, height} = Dimensions.get('window');
const COLORS = {primary: '#282534', white: '#fff'};
const slides = [1,2,3];
const NUM_SLIDES = slides.length;

const OnboardingScreen = ({navigation}) => {
  const [displayName, setDisplayName] = useState('Guest');
  const [awakeTime, setAwakeTime] = useState('08:00 AM');
  const [bedTime, setBedTime] = useState('10:00 PM');
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const refresh = useAuthContext().refresh;
  //console.log(refresh);

  async function getStarted() {
    console.log('getStarted');
    const user = userObject;
    user.Id = createKey();
    user.DisplayName = displayName;
    user.awakeTime = awakeTime;
    user.bedTime = bedTime;
    user.FirebaseId = 'FBID';
    user.UserType = 'basic';
    await createAllTables(); // just in case
    await addUser(user);
    //setTimeout(() => {refresh.refresh();}, 3000);
    refresh.refresh();
  }

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != NUM_SLIDES) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = NUM_SLIDES - 1;
    setCurrentSlideIndex(lastSlideIndex);
  };

  const OnboardingFooter = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((i) => {
            <View
              key={i}
              style={[
                styles.indicator,
                currentSlideIndex == i && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          })}
        </View>
  
        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == NUM_SLIDES - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity style={styles.btn} onPress={() => getStarted()}>
                <Text style={{fontWeight: 'bold', fontSize: 15}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: COLORS.white,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.white,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };
  
return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={styles.slides} >
        { currentSlideIndex === 0 && <OB1 />}
        { currentSlideIndex === 1 && <OB2
          dn={displayName}
          sdn={setDisplayName}
          at={awakeTime}
          sat={setAwakeTime}
          bt={bedTime}
          sbt={setBedTime}
         />}
        { currentSlideIndex === 2 && <OB3/>}
      </View>
      <OnboardingFooter />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  flat: {
    backgroundColor: 'pink',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  slides: {
    flex: 1,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default OnboardingScreen;
