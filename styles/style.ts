import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {isIOS} from '../src/utils';
import colors from './colors';
import {rh, rpx, rw} from './styleUtils';
import {defaultTheme} from './theme';
import {IScreenWrapper} from './types';

const {defaultTextColor} = defaultTheme;
const {white, amaranth, primaryButton} = colors;

/**
 * Name: ScreenWrapper
 * Desc: The screen wrapper view
 */
export const ScreenWrapper = styled.SafeAreaView<IScreenWrapper>`
  flex: 1;
  background-color: ${white};
`;

/**
 * Name: Container
 * Desc: The view for container
 */
export const Container = styled.View`
  flex: 1;
  width: 100%;
  padding-horizontal: ${rpx(20)}px;
`;

/**
 * Name: RowView
 * Desc: The view for row
 */
export const RowView = styled.View`
  flex-direction: row;
`;

/**
 * Name: AsteriskLabel
 * Desc: The text for asterisk
 */
export const AsteriskLabel = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rh(18)}px;
  color: ${amaranth};
`;

/**
 * Name: ButtonWrapper
 * Desc: The view for button
 */
export const ButtonWrapper = styled.View`
  margin-vertical: ${rpx(10)}px;
  border-radius: ${rpx(10)}px;
`;

/**
 * Name: Button
 * Desc: The touchable view for button
 */
export const Button = styled.TouchableOpacity`
  background-color: ${primaryButton};
  height: ${rpx(49)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${rpx(20)}px;
`;

/**
 * Name: ButtonText
 * Desc: The text for button
 */
export const ButtonText = styled.Text`
  color: ${defaultTextColor};
  font-weight: bold;
  background: transparent;
  font-size: ${rpx(16)}px;
`;
/**
 * Name: RowCenterView
 * Desc: The view for row
 */
export const RowCenterView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: ${rpx(16)}px;
`;
/**
 * Name: ScrollViewContainer
 * Desc: The scroll view container
 */
export const ScrollViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: {flexGrow: 1},
})`
  flex: 1;
`;

/**
 * Name: checkBoxStyles
 * Desc: The style for checkbox
 */
export const checkBoxStyles = StyleSheet.create({
  checkBox: {
    width: isIOS() ? rw(16) : rw(30),
    height: isIOS() ? rh(16) : rh(30),
    marginLeft: rh(5),
  },
});

/**
 * Name: checkBoxStyles
 * Desc: The style for checkbox
 */
export const shadowStyle = StyleSheet.create({
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

/**
 * Name: fbConnectStyle
 * Desc: The style for fbConnectButton
 */
export const fbConnectStyle = StyleSheet.create({
  buttonContainer: {
    marginTop: '70%',
    width: '90%',
    marginLeft: '5%',
  },
  shadowProp: {
    shadowColor: colors.darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
