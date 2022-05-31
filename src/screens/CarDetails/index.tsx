import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import acceleration from '../../assets/acceleration.svg';
import force from '../../assets/force.svg';
import gasoline from '../../assets/gasoline.svg';
import exchange from '../../assets/exchange.svg';
import people from '../../assets/people.svg';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';


export function CarDetails() {
  const navigation = useNavigation<any>();

  function handleConfirmRental() {
    navigation.navigate('Scheduling');
  }
  
  return (
    <Container>

      <Header>
        <BackButton onPress={navigation.goBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png',
          ]}
        />
      </CarImages>

      <Content>

        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name='380Km/h' icon={speedSvg}/>
          <Accessory name='3.2s' icon={acceleration}/>
          <Accessory name='800 HP' icon={force}/>
          <Accessory name='Gasolina' icon={gasoline}/>
          <Accessory name='Auto' icon={exchange}/>
          <Accessory name='2 pessoas' icon={people}/>
        </Accessories>

        <About>
          Este é um automóvel desportivo. Surgiu do lendário touro de lide indultado
          na praça Real Mastranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período do aluguel' onPress={handleConfirmRental}/>
      </Footer>

    </Container>
  );
}