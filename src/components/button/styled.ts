import styled from 'styled-components/native';
import {rpx, rw} from '../../../styles/styleUtils';

export const ButtonLayout = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: ${rpx(25)}px;
  padding-vertical: ${rw(13)}px;
`;

export const ButtonText = styled.Text`
  font-size: ${rpx(16)}px;
  line-height: ${rpx(18)}px;
  font-weight: bold;
  text-transform: uppercase;
`;
