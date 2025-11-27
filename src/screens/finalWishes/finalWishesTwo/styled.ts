import styled from 'styled-components/native';
import colors from '../../../../styles/colors';
import {rh, rpx, rw} from '../../../../styles/styleUtils';
import {defaultTheme} from '../../../../styles/theme';

const {secondaryTextColor} = defaultTheme;
const {primaryButton} = colors;

/**
 * Name: LetsGetIdeaTxt
 * Desc: The lets get an text view.
 */
export const LetsGetIdeaTxt = styled.Text`
  margin-horizontal: ${rw(20)}px;
  margin-top: ${rh(20)}px;
  font-size: ${rpx(24)}px;
  color: ${secondaryTextColor};
  padding-horizontal: ${rpx(10)}px;
  text-transform: uppercase;
`;

/**
 * Name: SelectAnythingTxt
 * Desc: The select anything text view.
 */
export const SelectAnythingTxt = styled.Text`
  margin-horizontal: ${rw(20)}px;
  margin-top: ${rh(10)}px;
  font-size: ${rpx(18)}px;
  line-height: ${rpx(18)}px;
  color: ${secondaryTextColor};
  padding-horizontal: ${rpx(10)}px;
`;

/**
 * Name: HeaderContainer
 * Desc: The container for header
 */
export const HeaderContainer = styled.View`
  background-color: ${primaryButton};
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
 * Name: InputContainer
 * Desc: The input box container view.
 */
export const InputContainer = styled.View`
  width: 100%;
  padding-horizontal: ${rpx(20)}px;
  margin-bottom: ${rpx(5)}px;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;
`;

/**
 * Name: ButtonWrapper
 * Desc: The save button view container.
 */
export const ButtonWrapper = styled.View`
  margin-top: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
  margin-right: ${rpx(5)}px;
`;

/**
 * Name: ContentContainer
 * Desc: The container for content
 */
export const ContentContainer = styled.View`
  padding-horizontal: ${rpx(20)}px;
  padding-top: ${rpx(20)}px;
`;

/**
 * Name: TouchableContainer
 * Desc: The container for touchable view
 */
export const TouchableContainer = styled.TouchableOpacity`
  flex-direction: row;
`;

/**
 * Name: CheckboxContainer
 * Desc: The container for checkbox
 */
export const CheckboxContainer = styled.View`
  padding-top: ${rpx(5)}px;
  flex: 0.1;
`;

/**
 * Name: TextContainer
 * Desc: The container for Text
 */
export const TextContainer = styled.View`
  flex: 1;
`;

/**
 * Name: ContentText
 * Desc: The text for header
 */
export const ContentText = styled.Text`
  font-size: ${rpx(22)}px;
  line-height: ${rpx(26)}px;
  font-weight: 300;
  color: ${colors.black};
`;

/**
 * Name: EncouragingTxt
 * Desc: The encouragingTxt text view.
 */
export const EncouragingTxt = styled.Text`
  margin-top: ${rh(20)}px;
  margin-horizontal: ${rw(60)}px;
  font-size: ${rpx(22)}px;
  line-height: ${rpx(22)}px;
  color: ${colors.greenTxt};
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
