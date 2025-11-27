import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rh, rpx, rw} from '../../../styles/styleUtils';
import {defaultTheme} from '../../../styles/theme';
import {IMediaIcon} from '../../../styles/types';

const {secondaryTextColor} = defaultTheme;

/**
 * Name: ForgotPassLink
 * Desc: The touchable view for forgot password
 */
export const ForgotPassLink = styled.TouchableOpacity`
  align-self: flex-start;
  flex-direction: row;
  margin-vertical: ${rh(5)}px;
`;

/**
 * Name: ForgotPassView
 * Desc: The view for forgot password
 */
export const ForgotPassView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${rh(5)}px;
  margin-bottom: ${rh(10)}px;
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
  align-items: center;
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
 * Name: SocialLoginText
 * Desc: The text for social login
 */
export const SocialLoginText = styled.Text`
  font-size: ${rpx(16)}px;
  font-weight: bold;
  align-self: center;
  padding-left: ${rw(30)}px;
  align-self: center;
  font-weight: bold;
  padding: ${rpx(10)}px;
  text-align: left;
  color: ${secondaryTextColor};
`;

/**
 * Name: SocialMediaContainer
 * Desc: The view for social login
 */
export const SocialMediaContainer = styled.View`
  border-radius: ${rpx(25)}px;
  border-width: ${rpx(1)}px;
  width: 100%;
  margin-bottom: ${rpx(15)}px;
  padding-vertical: ${rh(5)}px;
  flex-direction: row;
  padding-left: 25%;
  border-color: ${colors.borderColor};
`;

/**
 * Name: RegistrationView
 * Desc: The view for registration
 */
export const RegistrationView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${rh(5)}px;
`;

/**
 * Name: RegistrationLink
 * Desc: The touchable view for registration link
 */
export const RegistrationLink = styled.TouchableOpacity`
  align-self: flex-start;
  flex-direction: row;
  margin-vertical: ${rh(5)}px;
`;

/**
 * Name: LoginInputView
 * Desc: The view for input field
 */
export const LoginInputView = styled.View`
  margin-vertical: ${rh(10)}px;
`;

/**
 * Name: BottomBannerContainer
 * Desc: The view for bottom banner container
 */
export const BottomBannerContainer = styled.View``;

/**
 * Name: BottomBannerImage
 * Desc: The image for bottom banner
 */
export const BottomBannerImage = styled.Image`
  width: ${rw(1000)}px;
  height: ${rh(320)}px;
  align-self: center;
  margin-top: ${rh(15)}px;
`;

/**
 * Name: ResendVerificationView
 * Desc: The view for resend verification
 */
export const ResendVerificationView = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${rh(5)}px;
`;

/**
 * Name: ResendVerificationLink
 * Desc: The touchable view for resend verification
 */
export const ResendVerificationLink = styled.TouchableOpacity`
  align-self: flex-start;
  flex-direction: row;
  margin-vertical: ${rh(5)}px;
`;

/**
 * Name: ResendVerificationLinkText
 * Desc: The text for resend verification
 */
export const ResendVerificationLinkText = styled.Text`
  color: ${secondaryTextColor};
  text-decoration-line: underline;
  font-weight: bold;
`;

/**
 * Name: HeaderView
 * Desc: The view for header
 */
export const HeaderView = styled.View`
  margin-top: ${rh(10)}px;
  align-items: center;
  justify-content: center;
`;

/**
 * Name: LinkContainer
 * Desc: The touchable view for link
 */
export const LinkContainer = styled.TouchableOpacity``;

/**
 * Name: LinkView
 * Desc: The view for links
 */
export const LinkView = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-bottom: ${rpx(20)}px;
`;

/**
 * Name: PolicyText
 * Desc: The policy text
 */
export const PolicyText = styled.Text`
  color: ${secondaryTextColor};
  text-decoration: underline;
  padding-right: ${rpx(10)}px;
`;

/**
 * Name: TermsText
 * Desc: The terms text
 */
export const TermsText = styled.Text`
  color: ${secondaryTextColor};
  text-decoration: underline;
  padding-left: ${rpx(10)}px;
`;

/**
 * Name: VersionText
 * Desc: The text for version
 */
export const VersionText = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(22)}px;
  color: ${colors.labelColor};
`;

/**
 * Name: VersionView
 * Desc: The version view.
 */
export const VersionView = styled.View`
  align-items: center;
`;
