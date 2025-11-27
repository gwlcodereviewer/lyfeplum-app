import styled from 'styled-components/native';
import colors from '../../../../styles/colors';
import {rpx} from '../../../../styles/styleUtils';
import {defaultTheme} from '../../../../styles/theme';

const {servicesColor, black, borderColor, stormGrey, grey, white} = colors;
const {primaryBackgroundColor} = defaultTheme;

/**
 * Name: ModalContainer
 * Desc: The modal container.
 */
export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${servicesColor};
`;

/**
 * Name: MainContainer
 * Desc: The main view container.
 */
export const MainContainer = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  margin-top: ${rpx(200)}px;
  justify-content: flex-end;
`;

/**
 * Name: ChooseGuestContainer
 * Desc: The header container.
 */
export const ViewContainer = styled.View`
  background-color: ${primaryBackgroundColor};
  border-radius: ${rpx(20)}px;
  flex: 1;
`;

/**
 * Name: AddOnHeader
 * Desc: The add-on header container.
 */
export const AddOnHeader = styled.View`
  flex-direction: row;
  padding-vertical: ${rpx(16)}px;
  padding-horizontal: ${rpx(20)}px;
  border-bottom-width: ${rpx(1)}px;
  border-bottom-color: ${borderColor};
`;

/**
 * Name: AddOnHeadingText
 * Desc: The add-on heading text.
 */
export const AddOnHeadingText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: ${rpx(22)}px;
  line-height: ${rpx(32)}px;
  text-transform: capitalize;
  color: ${black};
  text-align: center;
  flex: 1;
`;

/**
 * Name: CrossContainer
 * Desc: The cross icon container.
 */
export const CrossContainer = styled.TouchableOpacity`
  align-items: flex-end;
  padding-right: ${rpx(10)}px;
  padding-top: ${rpx(5)}px;
`;

/**
 * Name: CommentContainer
 * Desc: The comment view container.
 */
export const CommentContainer = styled.View`
  flex-direction: row;
  padding-horizontal: ${rpx(15)}px;
  padding-vertical: ${rpx(5)}px;
`;

/**
 * Name: ProfileContainer
 * Desc: The profile view container.
 */
export const ProfileContainer = styled.View`
  padding-right: ${rpx(15)}px;
  padding-top: ${rpx(5)}px;
`;

/**
 * Name: ContentContainer
 * Desc: The content view container.
 */
export const ContentContainer = styled.View`
  flex: 1;
  background-color: ${grey};
  border-radius: ${rpx(10)}px;
  padding-vertical: ${rpx(7)}px;
  padding-horizontal: ${rpx(20)}px;
`;

/**
 * Name: UserImage
 * Desc: The Image container for user Images
 */
export const UserImage = styled.Image`
  height: ${rpx(35)}px;
  width: ${rpx(35)}px;
  border-radius: ${rpx(50)}px;
`;

/**
 * Name: Container
 * Desc: The view for container
 */
export const Container = styled.View`
  flex: 1;
  background-color: ${white};
  padding-horizontal: ${rpx(10)}px;
`;

/**
 * Name: UserNameText
 * Desc: The user name text.
 */
export const UserNameText = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: ${rpx(16)}px;
  line-height: ${rpx(20)}px;
  text-transform: capitalize;
  color: ${black};
  padding-bottom: ${rpx(5)}px;
`;

/**
 * Name: CommentText
 * Desc: The comment text.
 */
export const CommentText = styled.Text`
  font-style: normal;
  font-size: ${rpx(14)}px;
  line-height: ${rpx(18)}px;
  color: ${black};
  padding-bottom: ${rpx(5)}px;
`;

/**
 * Name: DateText
 * Desc: The Date text.
 */
export const DateText = styled.Text`
  font-style: normal;
  font-size: ${rpx(14)}px;
  line-height: ${rpx(18)}px;
  color: ${stormGrey};
`;

/**
 * Name: ScrollContainer
 * Desc: The view for scroll container
 */
export const ScrollContainer = styled.ScrollView`
  margin-bottom: ${rpx(50)}px;
`;
