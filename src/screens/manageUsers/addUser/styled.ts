import styled from 'styled-components/native';
import colors from '../../../../styles/colors';
import {rpx} from '../../../../styles/styleUtils';
import {defaultTheme} from '../../../../styles/theme';

const {servicesColor, black} = colors;
const {primaryBackgroundColor} = defaultTheme;

/**
 * Name: ModalContainer
 * Desc: The modal container.
 */
export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${servicesColor};
`;

/**
 * Name: MainContainer
 * Desc: The main view container.
 */
export const MainContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

/**
 * Name: ChooseGuestContainer
 * Desc: The header container.
 */
export const ViewContainer = styled.View`
  background-color: ${primaryBackgroundColor};
  border-radius: ${rpx(20)}px;
  padding-bottom: ${rpx(40)}px;
`;

/**
 * Name: AddOnHeader
 * Desc: The add-on header container.
 */
export const AddOnHeader = styled.View`
  flex-direction: row;
  padding-vertical: ${rpx(16)}px;
  padding-horizontal: ${rpx(20)}px;
`;

/**
 * Name: AddOnHeadingText
 * Desc: The add-on heading text.
 */
export const AddOnHeadingText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: ${rpx(22)}px;
  line-height: ${rpx(32)}px;
  text-transform: capitalize;
  color: ${black};
  text-align: center;
  flex: 1;
`;

/**
 * Name: CrossContainer
 * Desc: The cross icon container.
 */
export const CrossContainer = styled.TouchableOpacity`
  align-items: flex-end;
  padding-right: ${rpx(20)}px;
`;
