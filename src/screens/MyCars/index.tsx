import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../../components/Loading';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { AntDesign } from '@expo/vector-icons';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { FlatList, StatusBar } from 'react-native';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const navigation = useNavigation<any>();

  useEffect(() => {
    async function fetchCars() {
      setIsLoading(true);
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    // navigation.navigate('CarDetails', { cars });
  }

  return (
    <Container>

      <Header>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <BackButton
          color={theme.colors.shape}
          onPress={navigation.goBack}
        />
        <Title>
          Seus agendamentos,{'\n'}
          estão aqui.{'\n'}
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      {
        isLoading ?
          <Loading /> :

          <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
            </Appointments>

            <FlatList
              data={cars}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name='arrowright'
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />

          </Content>
      }

    </Container>
  );
}