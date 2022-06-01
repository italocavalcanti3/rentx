import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { Feather } from '@expo/vector-icons';

import { getPlatformDate } from '../../utils/getPlatformDate';
import { getAccessoryIcon } from '../../utils/getAccessortIcon';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { Loading } from '../../components/Loading';

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

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation<any>();

  const routes = useRoute();
  const { car, dates } = routes.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    setIsLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ];

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates: unavailable_dates
    }).then(() => {
      navigation.navigate('SchedulingComplete')
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
      Alert.alert('', 'Não foi possível confirmar o agendamento.')
    });
    
  }

  useEffect(() => {

    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy')
    });

  }, []);

  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />

      <Header>
        <BackButton onPress={navigation.goBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>

        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
          
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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>

        </RentalPeriod>

        <RentalPrice>

          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} ${dates.length > 1 ? 'diárias' : 'diária'}`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>

        </RentalPrice>

      </Content>

      <Footer>
        { !isLoading ?
          <Button
            title='Alugar agora'
            color={theme.colors.success}
            onPress={handleConfirmRental}
          /> :
          <View style={{
            width: '100%',
            height: 72,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 19,
            backgroundColor: theme.colors.success,
          }}>
            <Loading />
          </View>
        }
      </Footer>

    </Container>
  );
}