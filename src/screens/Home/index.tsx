import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { useNavigation } from '@react-navigation/native';

import { RectButtonProps } from 'react-native-gesture-handler';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Loading } from '../../components/Loading';
import { useTheme } from 'styled-components/native';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton,
} from './styles';



export function Home({...rest}: RectButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState<CarDTO[]>([]);
  const navigation = useNavigation<any>();
  
  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        setIsLoading(true);
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert('Erro ao buscar lista de carros.');
      } finally {
        setIsLoading(false);
      }
      
    }

    fetchCars();
    
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de {cars.length} carros
          </TotalCars>
        </HeaderContent>
      </Header>

      { isLoading ?
        <Loading /> :
        <CarList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
          <Car data={item} onPress={() => handleCarDetails(item)} />
        }
        />
      }

      <MyCarsButton {...rest} onPress={handleOpenMyCars}>
        <Ionicons 
          name='ios-car-sport'
          size={32}
          color={theme.colors.background_secondary}
        />
      </MyCarsButton>
        
    </Container>
  );
}