import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);
import { 
  RectButton, 
  RectButtonProps,
  PanGestureHandler,
} from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { useNavigation } from '@react-navigation/native';

import theme from '../../styles/theme';
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
} from './styles';

export function Home({...rest}: RectButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState<CarDTO[]>([]);
  const navigation = useNavigation<any>();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });
  
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

      <PanGestureHandler onGestureEvent={onGestureEvent} >
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 16,
              right: 16
            }
          ]}
        >
          <ButtonAnimated
          {...rest}
          onPress={handleOpenMyCars}
          style={styles.button}
          >
            <Ionicons 
              name='ios-car-sport'
              size={32}
              color={theme.colors.background_secondary}
              />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
        
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.main,
  }
});