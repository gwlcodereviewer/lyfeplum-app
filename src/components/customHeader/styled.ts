import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';

/**
 * Name: HeaderBody
 * Desc: The view for header body
 */
export const HeaderBody = styled.View`
  flex-direction: row;
  width: 100%;
  min-height: ${rpx(50)}px;
  background-color: ${colors.white};
  border-bottom-width: ${rpx(1)}px;
  border-bottom-color: ${colors.grey};
`;

/**
 * Name: HeaderLeft
 * Desc: The view for header left
 */
export const HeaderLeft = styled.View`
  flex: 0.15;
  padding-left: ${rpx(10)}px;
  justify-content: center;
`;

/**
 * Name: HeaderCenter
 * Desc: The view for header center
 */
export const HeaderCenter = styled.View`
  flex: 0.7;
  justify-content: center;
  align-items: center;
`;

/**
 * Name: MenuIcon
 * Desc: The image for menu icon
 */
export const MenuIcon = styled.Image`
  width: ${rpx(25)}px;
  height: ${rpx(25)}px;
  margin-left: ${rpx(5)}px;
`;

/**
 * Name: ToggleTouchable
 * Desc: The touchable view for menu
 */
export const ToggleTouchable = styled.TouchableOpacity``;

/**
 * Name: Container
 * Desc: The view for parent container
 */
export const Container = styled.View`
  background-color: ${colors.white};
`;

/**
 * Name: HeaderRight
 * Desc: The view for header right
 */
export const HeaderRight = styled.View`
  flex: 0.15;
  align-items: center;
  justify-content: center;
`;

/**
 * Name: UploadButton
 * Desc: The view for upload button
 */
export const UploadButton = styled.TouchableOpacity`
  min-height: ${rpx(30)}px;
  justify-content: center;
  border-bottom-width: ${rpx(3)}px;
`;
