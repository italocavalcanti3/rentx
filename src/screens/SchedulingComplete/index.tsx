import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components';

import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

export function SchedulingComplete() {
  const dimensions = useWindowDimensions();
  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleSchedulingConfirm() {
    navigation.navigate('Home');
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <LogoSvg width={dimensions.width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir{'\n'}
          até a concessionária da RENTX{'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title='OK' onPress={handleSchedulingConfirm} />
      </Footer>

    </Container>
  );
}