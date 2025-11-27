import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rh, rpx, rw} from '../../../styles/styleUtils';
import {defaultTheme} from '../../../styles/theme';
import {IMediaIcon} from '../../../styles/types';

const {secondaryTextColor} = defaultTheme;

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

/**
 * Name: MediaIcon
 * Desc: The image for media
 */
export const MediaIcon = styled.Image<IMediaIcon>`
  width: ${rpx(30)}px;
  height: ${rpx(30)}px;
  align-self: center;
  margin-right: ${(props: any) =>
    props.marginRight ? props.marginRight : rpx(0)}px;
  margin-left: ${(props: any) =>
    props.marginLeft ? props.marginLeft : rpx(0)}px;
`;

/**
 * Name: MediaContainer
 * Desc: The view for media
 */
export const MediaContainer = styled.View``;

/**
 * Name: RowCenter
 * Desc: The center view for row
 */
export const RowCenter = styled.View`
  flex-direction: column;
`;

/**
 * Name: Link
 * Desc: The touchable view for link
 */
export const Link = styled.TouchableOpacity`
  min-height: ${rpx(30)}px;
  justify-content: center;
  flex-direction: row;
`;

/**
 * Name: SocialLoginText
 * Desc: The text for social login
 */
export const SocialLoginText = styled.Text`
  font-size: ${rpx(14)}px;
  align-self: center;
  font-weight: bold;
  padding: ${rpx(10)}px;
  text-align: left;
  color: ${colors.labelColor};
`;

/**
 * Name: SocialMediaContainer
 * Desc: The view for social login
 */
export const SocialMediaContainer = styled.View`
  border-radius: ${rpx(25)}px;
  border-width: 1px;
  width: 100%;
  margin-bottom: ${rpx(15)}px;
  padding-vertical: ${rh(5)}px;
  padding-left: 25%;
  flex-direction: row;
  border-color: ${colors.borderColor};
`;
/**
 * Name: BottomBannerContainer
 * Desc: The view for bottom container
 */
export const BottomBannerContainer = styled.View``;

/**
 * Name: BottomBannerImage
 * Desc: The Image for bottom banner
 */
export const BottomBannerImage = styled.Image`
  width: ${rw(1000)}px;
  height: ${rh(320)}px;
  align-self: center;
  margin-top: ${rh(15)}px;
  margin-bottom: ${rh(40)}px;
`;

/**
 * Name: SubContainer
 * Desc: The view for child container
 */
export const SubContainer = styled.View`
  margin-vertical: ${rpx(10)}px;
`;
