import styled from 'styled-components/native';

import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';

const {white, pantone, labelColor, black} = colors;

/**
 * Name: Wrapper
 * Desc: The main screen wrapper.
 */
export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${pantone};
`;

/**
 * Name: TitleContainer
 * Desc: The title container for heading.
 */
export const TitleContainer = styled.View`
  margin-top: ${rpx(25)}px;
`;

/**
 * Name: TitleText
 * Desc: text for Heading.
 */
export const TitleText = styled.Text`
  color: ${black};
  font-weight: 400;
  font-size: ${rpx(25)}px;
  letter-spacing: ${rpx(5)}px;
`;

/**
 * Name: ComponentView
 * Desc: UI View layout for the share components.
 */
export const ComponentView = styled.View`
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: ${rpx(30)}px;
  margin-bottom: ${rpx(10)}px;
`;

/**
 * Name: ComponentText
 * Desc: text used inside the components view.
 */
export const ComponentText = styled.Text`
  text-align: center;
  margin-vertical: ${rpx(10)}px;
  font-size: ${rpx(20)}px;
  color: ${labelColor};
`;

/**
 * Name: ImageView
 * Desc: View for handling Svg image background.
 */
export const ImageView = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${white};
  border-radius: ${rpx(100)}px;
  height: ${rpx(100)}px;
  width: ${rpx(100)}px;
`;

/**
 * Name: ImageContainer
 * Desc: Container for centered Image.
 */
export const ImageContainer = styled.View`
  align-items: center;
`;
