import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rh, rpx, rw} from '../../../styles/styleUtils';
import {ITraitsNameText} from '../../../styles/types';

const screenWidth = Dimensions.get('window').width;
const {
  white,
  pantone,
  stormGreyRgba,
  labelColor,
  black,
  red,
  primaryButton,
  amaranth,
} = colors;

/**
 * Name: Wrapper
 * Desc: The main screen wrapper.
 */
export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${white};
`;

/**
 * Name: FormScroll
 * Desc: The profile form view.
 */
export const FormScroll = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${pantone};
`;

/**
 * Name: CoverImageContainer
 * Desc: The cover image view container.
 */
export const CoverImageContainer = styled.View`
  height: ${rpx(250)}px;
  width: ${screenWidth};
`;

/**
 * Name: CoverImage
 * Desc: The cover image view.
 */
export const CoverImage = styled.Image`
  height: ${rpx(200)}px;
  width: ${screenWidth};
`;

/**
 * Name: CenterContainer
 * Desc: The center view container.
 */
export const CenterContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 55%;
`;

/**
 * Name: ProfileImageContainer
 * Desc: The profile image view container.
 */
export const ProfileImageContainer = styled.View`
  height: ${rpx(100)}px;
  width: ${rpx(100)}px;
  background-color: ${white};
  border-radius: ${rpx(50)}px;
  align-items: center;
  justify-content: center;
`;

/**
 * Name: ProfileImage
 * Desc: The profile image view.
 */
export const ProfileImage = styled.Image`
  height: ${rpx(100)}px;
  width: ${rpx(100)}px;
  border-radius: ${rpx(50)}px;
`;

/**
 * Name: PicChangeContainer
 * Desc: The profile pic change view container.
 */
export const PicChangeContainer = styled.View`
  position: absolute;
  bottom: ${rpx(-8)}px;
`;

/**
 * Name: CoverPicContainer
 * Desc: The cover image view container.
 */
export const CoverPicContainer = styled.View`
  position: absolute;
  bottom: 0;
  top: 65%;
  right: ${rpx(20)}px;
  z-index: 1;
`;

/**
 * Name: FormHeader
 * Desc: The form header text view.
 */
export const FormHeader = styled.Text`
  font-size: ${rpx(22)}px;
  color: ${labelColor};
`;

/**
 * Name: ButtonWrapper
 * Desc: The update button view container.
 */
export const ButtonWrapper = styled.View`
  margin-bottom: ${rpx(30)}px;
  margin-top: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
`;

/**
 * Name: DateInputMainContainer
 * Desc: The calendar view container.
 */
export const DateInputMainContainer = styled.TouchableOpacity``;

/**
 * Name: DateInputContainer
 * Desc: The date view container.
 */
export const DateInputContainer = styled.TouchableOpacity`
  height: ${rpx(50)}px;
  margin-vertical: ${rpx(8)}px;
  justify-content: center;
  width: 100%;
  border-radius: ${rpx(15)}px;
  border-width: ${rpx(1)}px;
  border-color: ${stormGreyRgba};
  padding-left: ${rpx(12)}px;
  background-color: ${white};
  border-width: ${rw(1)}px;
`;

/**
 * Name: DateLabelText
 * Desc: The date of birth label text view.
 */
export const DateLabelText = styled.Text`
  color: ${labelColor};
  font-size: ${rpx(17)}px;
  font-weight: bold;
  text-align: left;
  margin-top: ${rpx(10)}px;
`;

/**
 * Name: DateInputText
 * Desc: The date label text view.
 */
export const DateInputText = styled.Text`
  color: ${black};
`;

/**
 * Name: TraitsContainer
 * Desc: The traits list container.
 */
export const TraitsContainer = styled.View`
  background-color: ${primaryButton};
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: ${rpx(15)}px;
  margin-bottom: ${rpx(0)}px;
`;

/**
 * Name: TraitsText
 * Desc: The traits heading text.
 */
export const TraitsText = styled.Text`
  font-size: ${rpx(22)}px;
  font-weight: 400;
  align-self: flex-start;
  text-align: justify;
  color: ${white};
  margin-top: ${rpx(20)}px;
  margin-bottom: ${rpx(20)}px;
  margin-horizontal: ${rpx(15)}px;
`;

/**
 * Name: TraitsItemContainer
 * Desc: The traits item container.
 */
export const TraitsItemContainer = styled.View`
  margin-vertical: ${rpx(12)}px;
  margin-horizontal: ${rpx(10)}px;
`;

/**
 * Name: OpaqueButton
 * Desc: The traits name container.
 */
export const OpaqueButton = styled.TouchableOpacity``;

/**
 * Name: TraitsNameText
 * Desc: The traits name text.
 */
export const TraitsNameText = styled.Text<ITraitsNameText>`
  box-shadow: ${rpx(0)}px ${rpx(0)}px ${white};
  background-color: ${props =>
    props.isSelected === 1 ? colors.white : colors.magentaShadow};
  color: ${props => (props.isSelected === 1 ? colors.black : colors.white)};
  font-weight: 500;
  text-align: center;
  font-size: ${rpx(20)}px;
  letter-spacing: ${rpx(1)}px;
  padding: ${rpx(5)}px ${rpx(10)}px;
  overflow: hidden;
  border-radius: ${rpx(5)}px;
`;

/**
 * Name: TraitsButton
 * Desc: The edit traits button.
 */
export const TraitsButton = styled.TouchableOpacity``;

/**
 * Name: ErrorContainer
 * Desc: The error date container.
 */
export const ErrorContainer = styled.View``;

/**
 * Name: ErrorText
 * Desc: The error date text.
 */
export const ErrorText = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(18)}px;
  color: ${amaranth};
`;

/**
 * Name: UploadContainer
 * Desc: The touchable container for upload
 */
export const UploadContainer = styled.TouchableOpacity``;

/**
 * Name: AccountHeaderText
 * Desc: The text for delete account
 */
export const AccountHeaderText = styled.Text`
  font-size: ${rpx(14)}px;
  font-weight: 400;
  align-self: flex-start;
  text-align: justify;
  color: ${white};
  margin-top: ${rpx(20)}px;
  margin-bottom: ${rpx(10)}px;
  margin-horizontal: ${rpx(15)}px;
`;

/**
 * Name: DeleteView
 * Desc: The delete container.
 */
export const DeleteView = styled.View`
  background-color: ${primaryButton};
  flex: 1;
  padding-bottom: ${rpx(20)}px;
  border-bottom-color: ${white};
  flex-direction: row;
`;

/**
 * Name: DeleteButtonText
 * Desc: The delete button text.
 */
export const DeleteButtonText = styled.Text`
  margin-top: ${rpx(20)}px;
  margin-bottom: ${rpx(10)}px;
  color: ${red};
`;

/**
 * Name: ProfileBottomImage
 * Desc: The Image container for upload Images
 */
export const ProfileBottomImage = styled.Image`
  height: ${rpx(30)}px;
  width: ${rpx(30)}px;
  border-radius: ${rpx(50)}px;
  border-color: ${props => (props.focused ? colors.darkGray : colors.black)};
  border-width: ${props => (props.focused ? rpx(2) : rpx(0))}px;
`;

/**
 * Name: ChangePhotoTxt
 * Desc: The change photo text view.
 */
export const ChangePhotoTxt = styled.Text`
  color: ${white};
  font-size: ${rpx(10)}px;
`;

/**
 * Name: BadgeContainer
 * Desc: The container for badges
 */
export const BadgeContainer = styled.View`
  flex: 1;
  background-color: ${pantone};
  padding-bottom: ${rpx(20)}px;
  padding-horizontal: ${rpx(10)}px;
`;

/**
 * Name: PointsText
 * Desc: The points text.
 */
export const PointsText = styled.Text`
  font-size: ${rpx(22)}px;
  font-weight: 400;
  align-self: flex-start;
  text-align: justify;
  color: ${black};
  margin-top: ${rpx(20)}px;
  margin-bottom: ${rpx(20)}px;
  margin-horizontal: ${rpx(15)}px;
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
 * Name: BadgeSubContainer
 * Desc: The container for sub badges
 */
export const BadgeSubContainer = styled.View`
  flex-direction: row;
`;

/**
 * Name: DivContainer
 * Desc: The view for divider container
 */
export const DivContainer = styled.View`
  background-color: ${pantone};
  padding-bottom: ${rpx(10)};
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
  padding-horizontal: ${rpx(screenWidth / 2 - 10)}px;
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
