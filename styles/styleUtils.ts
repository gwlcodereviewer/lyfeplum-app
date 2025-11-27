// @flow

// get responsive dimensions related to a default iPhone X dimensions
// in order to adjust between mobile and tablet
// inspired by https://github.com/marudy/react-native-responsive-screen

import {Dimensions, PixelRatio} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

/**
 * Name: iPadRefDimensions
 * Desc: default reference dimensions (iPad)
 */
export const iPadRefDimensions = {
  width: 1280,
  height: screenHeight <= 554 ? 750 : 850,
};

/**
 * Name: defaultDimensions
 * Desc: all calculations are done based on the initial design dimensions which is based on iPhone X
 */
export const defaultDimensions = {
  width: 375,
  height: 812,
};

const widthRatio = screenWidth / iPadRefDimensions.width;
const heightRatio = screenHeight / iPadRefDimensions.height;
const meanRatio = (widthRatio + heightRatio) / 2;

// This is used to make the scale factor smaller (avoid having very big text on tablets and very small text on smaller phones)
const scaleDiff = 0.3;

/**
 * Name: rw
 * Desc: ResponsiveWidth: this can be used for properties like: width, padding-left, padding-right, padding-horizontal, margin-left, etc.
 */
export const rw = (pixels: number) =>
  PixelRatio.roundToNearestPixel(pixels * widthRatio);

/**
 * Name: rh
 * Desc: ResponsiveHeight: this can be used for properties like: height, padding-top, padding-bottom, padding-vertical, margin-top, etc.
 */
export const rh = (pixels: number) =>
  PixelRatio.roundToNearestPixel(pixels * heightRatio);

/**
 * Name: rpx
 * Desc: ResponsivePX: This is used when we need constrains on both width and height. It can be used for properties like: font-size, border-radius
 */
export const rpx = (pixels: number) => {
  const scale = (meanRatio - 1) * scaleDiff + 1;
  return PixelRatio.roundToNearestPixel(pixels * scale);
};

/**
 * Name: FontsWeight
 * Desc: set font weight bold
 */
export const FontsWeight = {
  BOLD: 'bold',
};

/**
 * Name: FontFamily
 * Desc: define all font family used in project
 */
export const FontFamily = {
  ProximaNovaBold: 'ProximaNova-Bold',
};

/**
 * Name: keyboardType
 * Desc: enum define for keyboard type
 */
export enum keyboardType {
  defaultKeyboard = 'default',
  numeric = 'numeric',
  email = 'email-address',
}

/**
 * Name: AUTO_CAPITALIZE
 * Desc: type of keyboard
 */
export enum AUTO_CAPITALIZE {
  none = 'none',
  sentences = 'sentences',
  words = 'words',
  characters = 'characters',
}
