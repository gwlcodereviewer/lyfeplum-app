import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rh, rpx} from '../../../styles/styleUtils';
import {defaultTheme} from '../../../styles/theme';

const {secondaryTextColor} = defaultTheme;

/**
 * Name: HeaderTitle
 * Desc: The text for header
 */
export const HeaderTitle = styled.Text`
  margin-top: ${rh(20)}px;
  font-size: ${rpx(24)}px;
  font-weight: 500;
  color: ${colors.black};
  text-transform: capitalize;
  padding-left: ${rpx(5)}px;
`;

/**
 * Name: BaseTitle
 * Desc: The text for header
 */
export const BaseTitle = styled.Text`
  margin-top: ${rh(20)}px;
  font-size: ${rpx(18)}px;
  color: ${colors.black};
  padding-left: ${rpx(5)}px;
`;

/**
 * Name: LoginLink
 * Desc: The touchable view for login
 */
export const LoginLink = styled.TouchableOpacity`
  align-self: flex-start;
  flex-direction: row;
  margin-vertical: ${rpx(5)}px;
`;

/**
 * Name: LoginView
 * Desc: The view for login
 */
export const LoginView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${rpx(5)}px;
  margin-bottom: ${rh(40)}px;
`;

/**
 * Name: GrayText
 * Desc: The gray text
 */
export const GrayText = styled.Text`
  color: ${secondaryTextColor};
`;

/**
 * Name: ClickText
 * Desc: The clickable text
 */
export const ClickText = styled.Text`
  color: ${secondaryTextColor};
  text-decoration-line: underline;
`;
