import styled from 'styled-components/native';
import {rpx, rw} from '../../../styles/styleUtils';
import colors from '../../../styles/colors';

/**
 * CheckBoxContainer
 * Desc: The main check box container.
 */
export const CheckBoxContainer = styled.TouchableOpacity`
  height: ${rpx(18)}px;
  width: ${rpx(18)}px;
  border-radius: ${rpx(3)}px;
  border-width: ${rw(2)}px;
  border-color: ${colors.black};
  border-style: solid;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`;
