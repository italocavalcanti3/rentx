import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { CarDTO } from '../../dtos/CarDTO';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
width: 100%;
height: ${RFValue(325)}px;

background-color: ${({theme}) => theme.colors.header};

justify-content: center;
padding: ${RFValue(25)}px;

padding-top: ${getStatusBarHeight() + RFValue(30)}px;
`;

export const Title = styled.Text`
color: ${({theme}) => theme.colors.shape};
font-family: ${({theme}) => theme.fonts.secondary_600};
font-size: ${RFValue(30)}px;

margin-top: ${RFValue(24)}px;
`;

export const SubTitle = styled.Text`
color: ${({theme}) => theme.colors.shape};
font-family: ${({theme}) => theme.fonts.secondary_400};
font-size: ${RFValue(15)}px;

`;

export const CarList = styled(
  FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>
).attrs({
  contentContainerStyle: {
    padding: 24 
  },
  showsVerticalScrollIndicator: false
})``;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: ${RFValue(0)}px ${RFValue(6)}px;
`;

export const Appointments = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${RFValue(24)}px 0;
`;

export const AppointmentsTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled.View`
  margin-bottom: ${RFValue(16)}px;
    
`;

export const CarFooter = styled.View`
  width: 100%;
  
  padding: ${RFValue(12)}px;

  margin-top: ${RFValue(-10)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({theme}) => theme.colors.background_secondary};
`;

export const CarFooterTitle = styled.Text`
  color: ${({theme}) => theme.colors.text_detail};
  font-family: ${({theme}) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarFooterDate = styled.Text`
  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
`;

