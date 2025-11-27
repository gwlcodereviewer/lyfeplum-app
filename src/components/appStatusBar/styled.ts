import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';

export const StatusView = styled.View`
  height: ${rpx(70)}px;
  width: 100%;
  top: 0;
  position: absolute;
  background-color: ${colors.white};
`;
