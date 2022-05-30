import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: ${RFValue(100)}px;
  height: ${RFValue(92)}px;

  justify-content: center;
  align-items: center;

  background-color: ${({theme}) => theme.colors.background_primary};

  padding: ${RFValue(16)}px;
  margin-bottom: ${RFValue(8)}px;
`;

export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(13)}px;
`;