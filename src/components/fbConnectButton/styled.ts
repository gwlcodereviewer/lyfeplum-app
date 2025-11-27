import styled from 'styled-components/native';
import {rh, rpx, rw} from '../../../styles/styleUtils';
import colors from '../../../styles/colors';
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
/**
 * Name: SocialMediaContainer
 * Desc: The view for social login
 */
export const FacebookConnectButton = styled.TouchableOpacity`
  border-radius: ${rpx(10)}px;
  width: 90%;
  margin-left: 5%;
  margin-top: 70%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${colors.fbButtonColor};
  height: ${rpx(50)}px;
`;
/**
 * Name: Link
 * Desc: The touchable view for link
 */
export const Link = styled.TouchableOpacity`
  min-height: ${rh(30)}px;
  justify-content: center;
  flex-direction: row;
`;
/**
 * Name: MediaIcon
 * Desc: The image for media
 */
export const FbIcon = styled.Image`
  width: ${rpx(30)}px;
  height: ${rpx(30)}px;
  align-self: center;
`;
/**
 * Name: SocialLoginText
 * Desc: The text for social login
 */
export const FbLoginText = styled.Text`
  font-size: ${rpx(18)}px;
  font-weight: bold;
  align-self: center;
  padding-left: ${rw(30)}px;
  align-self: center;
  font-weight: bold;
  padding: ${rpx(10)}px;
  text-align: left;
  font-weight: 700;
  color: ${colors.white};
`;
