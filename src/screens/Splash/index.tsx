import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

import {
  Container,
} from './styles';
import { useNavigation } from '@react-navigation/native';

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation<any>();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 100], [1, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 100], [0, -50], Extrapolate.CLAMP)
        }
      ]
    };
  });
  
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [100, 200], [0, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [100, 200], [-50, 0], Extrapolate.CLAMP)
        }
      ]
    };
  });

  function startApp() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      200, 
      { duration: 2000 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    );
  }, []);

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={95} height={65}/>
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>     

    </Container>
  );
}