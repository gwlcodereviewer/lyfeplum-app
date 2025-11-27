import styled from 'styled-components/native';
import colors from '../../../../styles/colors';
import {rh, rpx, rw, screenWidth} from '../../../../styles/styleUtils';
import {defaultTheme} from '../../../../styles/theme';

const {secondaryTextColor} = defaultTheme;

/**
 * Name: LetsStartTxt
 * Desc: The lets start text view.
 */
export const LetsStartTxt = styled.Text`
  margin-horizontal: ${rpx(20)}px;
  margin-top: ${rh(20)}px;
  font-size: ${rpx(24)}px;
  color: ${secondaryTextColor};
  text-transform: uppercase;
`;

/**
 * Name: InformationTxt
 * Desc: The information text view.
 */
export const InformationTxt = styled.Text`
  margin-horizontal: ${rpx(20)}px;
  margin-top: ${rh(10)}px;
  font-size: ${rpx(18)}px;
  line-height: ${rpx(18)}px;
  color: ${secondaryTextColor};
`;

/**
 * Name: InputContainer
 * Desc: The input box container view.
 */
export const InputContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-horizontal: ${rpx(20)}px;
  background-color: ${colors.pantone};
`;

/**
 * Name: FunMessageTxt
 * Desc: The fun message text view.
 */
export const FunMessageTxt = styled.Text`
  margin-top: ${rh(20)}px;
  font-size: ${rpx(22)}px;
  line-height: ${rpx(22)}px;
  color: ${colors.greenTxt};
`;

/**
 * Name: ButtonWrapper
 * Desc: The save button view container.
 */
export const ButtonWrapper = styled.View`
  margin-bottom: ${rpx(20)}px;
  margin-top: ${rpx(15)}px;
  flex-direction: row;
  justify-content: space-between;
`;

/**
 * Name: HeaderContainer
 * Desc: The container for header
 */
export const HeaderContainer = styled.View`
  background-color: ${colors.primaryButton};
  padding-vertical: ${rpx(15)}px;
`;

/**
 * Name: HeaderText
 * Desc: The text for header
 */
export const HeaderText = styled.Text`
  margin-left: ${rw(20)}px;
  font-size: ${rpx(24)}px;
  line-height: ${rpx(26)}px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.white};
  text-align: center;
`;

/**
 * Name: PointsContainer
 * Desc: The container for header
 */
export const PointsContainer = styled.View`
  background-color: ${colors.labelBackground};
  padding-vertical: ${rpx(5)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

/**
 * Name: PointsText
 * Desc: The text for header
 */
export const PointsText = styled.Text`
  font-size: ${rpx(24)}px;
  line-height: ${rpx(26)}px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.greenTxt};
  padding-vertical: ${rpx(20)};
  padding-right: ${rpx(5)};
  text-align: center;
`;

/**
 * Name: DivContainer
 * Desc: The view for divider container
 */
export const DivContainer = styled.View`
  background-color: ${colors.pantone};
  padding-bottom: ${rpx(10)}px;
`;

/**
 * Name: LogoImage
 * Desc: The logo image view.
 */
export const LogoImage = styled.Image`
  height: ${rpx(30)}px;
  width: ${rpx(30)}px;
`;

/**
 * Name: LogoContainer
 * Desc: The view for logo container
 */
export const LogoContainer = styled.View`
  position: absolute;
  padding-horizontal: ${rpx(screenWidth / 2 - 30)}px;
`;

/**
 * Name: Divider
 * Desc: The view for divider
 */
export const Divider = styled.View`
  margin-vertical: ${rh(10)}px;
  background-color: ${colors.lightGray};
  height: ${rh(2)}px;
`;

/**
 * Name: AddMoreWrapper
 * Desc: The view container for add more button.
 */
export const AddMoreWrapper = styled.TouchableOpacity`
  align-self: flex-end;
  width: ${rpx(50)}px;
  height: ${rpx(50)}px;
  border-radius: ${rpx(25)}px;
  background-color: ${colors.primaryButton};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-align: center;
  margin-right: ${rpx(5)}px;
`;

/**
 * Name: RemoveWrapper
 * Desc: The wrapper for input form remove
 */
export const RemoveWrapper = styled.TouchableOpacity`
  padding-right: ${rpx(10)}px;
`;

/**
 * Name: BadgeContainer
 * Desc: The view for badge container
 */
export const BadgeContainer = styled.View`
  padding-left: ${rpx(5)};
`;

/**
 * Name: BadgeImage
 * Desc: The badge image view.
 */
export const BadgeImage = styled.Image`
  height: ${rpx(70)}px;
  width: ${rpx(150)}px;
`;

/**
 * Name: PlusText
 * Desc: plus text.
 */
export const PlusText = styled.Text`
  color: ${colors.white};
  font-size: ${rpx(36)}px;
  width: ${rpx(50)}px;
  height: ${rpx(50)}px;
  text-align: center;
  align-self: center;
`;

/**
 * Name: FamilyFormHeader
 * Desc: The family form header text view.
 */
export const FamilyFormHeader = styled.Text`
  font-size: ${rpx(22)}px;
  color: ${colors.labelColor};
  align-self: flex-start;
  font-weight: 400;
  text-align: justify;
  color: ${colors.black};
  margin-top: ${rpx(20)}px;
`;

/**
 * Name: FormTitle
 * Desc: The form title text
 */
export const FormTitle = styled.Text`
  font-size: ${rpx(18)}px;
  color: ${colors.labelColor};
  align-self: flex-start;
  font-weight: 400;
  color: ${colors.black};
`;

/**
 * Name: FormHeaderView
 * Desc: The form title text
 */
export const FormHeaderView = styled.View`
  flex-direction: row;
  margin-top: ${rpx(10)}px;
  justify-content: space-between;
`;

/**
 * Name: ParentLogoContainer
 * Desc: The view for logo container
 */
export const ParentLogoContainer = styled.View`
  position: absolute;
  padding-horizontal: ${rpx(screenWidth / 2 - 10)}px;
`;
