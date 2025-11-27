import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';

const screenWidth = Dimensions.get('screen').width;

export const Container = styled.View`
  width: ${screenWidth}px;
`;
export const HeaderBody = styled.View`
  flex-direction: row;
  width: 100%;
  min-height: 60px;
  background-color: ${colors.white};
  border-bottom-width: ${rpx(1)}px;
  border-bottom-color: ${colors.grey};
`;
export const HeaderLeft = styled.View`
  flex: 0.15;
  align-items: center;
  justify-content: center;
`;
export const HeaderCenter = styled.View`
  flex: 0.7;
  align-items: center;
  justify-content: center;
`;
export const HeaderRight = styled.View`
  flex: 0.15;
  align-items: center;
  justify-content: center;
`;
export const BackButton = styled.TouchableOpacity`
  min-height: 30px;
  justify-content: center;
`;
export const Title = styled.Text`
  font-size: 24px;
`;

export const MenuIcon = styled.Image`
  width: 25px;
  height: 25px;
  margin-left: 5px;
`;

export const BackIcon = styled.Image`
  width: 30px;
  height: 30px;
`;
export const View = styled.View`
  flex-direction: row;
`;
export const ToggleTouchable = styled.TouchableOpacity``;
