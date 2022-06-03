import React from 'react';
import LottieView from 'lottie-react-native';

import loadCar from '../../assets/loadingCar.json';

import {
  Container,
} from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView 
        source={loadCar}
        autoPlay
        style={{height: 200}}
      />
    </Container>
  );
}