import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {defaultTheme} from '../../../styles/theme';
import {IInput, ILabel} from '../../../styles/types';
import {rpx, rh, rw} from '../../../styles/styleUtils';

const {
  secondaryBorderColor,
  secondaryTextColor,
  primaryTextColor,
  primaryButtonColor,
} = defaultTheme;

const height = rpx(50);

/**
 * Name: Label
 * Desc: The label text view
 */
export const Label = styled.Text`
  font-size: ${(props: IInput) => props.textSize || rpx(18)}px;
  line-height: ${rh(20)}px;
  color: ${secondaryTextColor};
  font-weight: bold;
  padding-left: ${rpx(5)}px;
  flex: 1;
`;

/**
 * Name: InputContainer
 * Desc: The text input view container
 */
export const InputContainer = styled.View`
  background-color: ${(props: IInput) => props.bgColor};
  border-width: ${rpx(1)}px;
  border-style: solid;
  border-color: ${(props: IInput) => props.color || secondaryBorderColor};
  border-radius: ${rpx(15)}px;
  padding-horizontal: ${rw(15)}px;
  height: ${(props: IInput) => props.containerHeight || height}px;
  margin-vertical: ${rh(8)}px;
  justify-content: center;
  align-items: center;
`;

/**
 * Name: Input
 * Desc: The text input view
 */
export const Input = styled.TextInput`
  font-size: ${rpx(18)}px;
  line-height: ${rpx(22)}px;
  color: ${secondaryTextColor};
  padding-left: ${rpx(8)}px;
  flex: 1;
  justify-content: center;
`;

/**
 * Name: LabelContainer
 * Desc: The label text view container
 */
export const LabelContainer = styled.View`
  flex-direction: row;
  margin-top: ${(props: IInput) => props.marginTop || rpx(15)}px;
`;

/**
 * Name: ErrorContainer
 * Desc: The error text view container
 */
export const ErrorContainer = styled.View``;

/**
 * Name: ErrorText
 * Desc: The error text view
 */
export const ErrorText = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(18)}px;
  color: ${colors.amaranth};
  padding-left: ${rpx(5)}px;
`;

/**
 * Name: RightViewContainer
 * Desc: The right view container
 */
export const RightViewContainer = styled.TouchableOpacity`
  justify-content: center;
  margin-left: ${rw(10)}px;
  height: 100%;
  padding-left: ${rw(10)}px;
  padding-right: ${rw(20)}px;
`;

/**
 * Name: RightText
 * Desc: The right text view
 */
export const RightText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: ${rpx(14)}px;
  line-height: ${rpx(18)}px;
  text-align: right;
  color: ${(props: ILabel) => props.color || primaryButtonColor};
`;

/**
 * Name: LeftViewContainer
 * Desc: The left view container
 */
export const LeftViewContainer = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-right: ${rw(16)}px;
  height: 100%;
  border-width: ${rpx(1)}px;
  border-style: solid;
  border-right-color: ${secondaryBorderColor};
  border-color: ${colors.transparent};
`;

/**
 * Name: LeftText
 * Desc: The left text view
 */
export const LeftText = styled.Text`
  font-size: ${rpx(16)}px;
  line-height: ${rpx(20)}px;
  color: ${primaryTextColor};
  right: ${rw(5)}px;
`;
