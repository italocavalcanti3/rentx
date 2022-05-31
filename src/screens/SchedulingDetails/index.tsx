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

import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

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
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  Footer,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';


export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleConfirmRental() {
    navigation.navigate('SchedulingComplete');
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2022</DateValue>
          </DateInfo>

          <Feather 
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>18/06/2022</DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>

          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900,00</RentalPriceTotal>
          </RentalPriceDetails>

        </RentalPrice>

      </Content>

      <Footer>
        <Button
          title='Confirmar'
          color={theme.colors.success}
          onPress={handleConfirmRental}
        />
      </Footer>

    </Container>
  );
}