import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

interface ImageIndexProps {
  active?: boolean;
}

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  
  padding-right: ${RFValue(24)}px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  width: 6px;
  height: 6px;

  border-radius: 3px;

  background-color: ${({theme, active}) => 
    active ? theme.colors.title : theme.colors.shape
  };
  
  margin-left: 8px;
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(132)}px;

  justify-content: center;
  align-items: center;
`;

export const CarImage = styled.Image`
  width: ${RFValue(280)}px;
  height: ${RFValue(132)}px;
`;
