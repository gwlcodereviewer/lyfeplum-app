import styled from 'styled-components/native';

import colors from '../../../styles/colors';
import {rpx, screenWidth} from '../../../styles/styleUtils';

const {white, black, grey} = colors;

/**
 * Name: Wrapper
 * Desc: The main screen wrapper.
 */
export const Wrapper = styled.View`
  flex: 1;
  margin-horizontal: ${rpx(20)}px;
`;

/**
 * Name: HeaderCard
 * Desc: The view for header section.
 */
export const HeaderCard = styled.View`
  margin-top: ${rpx(25)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${rpx(35)}px;
  padding-horizontal: ${rpx(25)}px;
  border-radius: ${rpx(10)}px;
  background-color: ${white};
`;

/**
 * Name: DetailView
 * Desc: View for header details
 */
export const DetailView = styled.View``;

/**
 * Name: TitleText
 * Desc: text for Heading.
 */
export const TitleText = styled.Text`
  color: ${black};
  font-weight: 500;
  font-size: ${rpx(18)}px;
`;

/**
 * Name: SubTitleText
 * Desc: Text for sub header title
 */
export const SubTitleText = styled.Text`
  color: ${black};
  font-weight: 400;
  font-size: ${rpx(14)}px;
  margin-top: ${rpx(5)}px;
`;

/**
 * Name: DetailContainer
 * Desc: View for displaying users details
 */
export const DetailContainer = styled.View`
  margin-bottom: ${rpx(30)}px;
`;

/**
 * Name: TitleView
 * Desc: The view for added users
 */
export const TitleView = styled.View``;

/**
 * Name: UsersContainer
 * Desc: The view for users list
 */
export const UsersContainer = styled.View`
  margin-top: ${rpx(20)}px;
`;

/**
 * Name: SingleUserView
 * Desc: The view for individual user
 */
export const SingleUserView = styled.View`
  flex-direction: row;
  align-items: center;
`;

/**
 * Name: ProfileImage
 * Desc: The Image container for user profile Images
 */
export const ProfileImage = styled.Image`
  height: ${rpx(50)}px;
  width: ${rpx(50)}px;
  border-radius: ${rpx(50)}px;
`;

/**
 * Name: UserCard
 * Desc: The card view for users
 */
export const UserCard = styled.View`
  margin-bottom: ${rpx(25)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${rpx(20)}px;
  padding-horizontal: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
  background-color: ${white};
`;

/**
 * Name: UserDetailView
 * Desc: The view for individual user
 */
export const UserDetailView = styled.View`
  margin-horizontal: ${rpx(10)}px;
  flex: 1;
`;

/**
 * Name: UserName
 * Desc: Text for displaying user name
 */
export const UserName = styled.Text`
  color: ${black};
  font-weight: 600;
  font-size: ${rpx(18)}px;
  padding-bottom: ${rpx(5)}px;
`;

/**
 * Name: UserEmail
 * Desc: Text for displaying user email
 */
export const UserEmail = styled.Text`
  color: ${black};
  font-weight: 400;
  font-size: ${rpx(14)}px;
`;

/**
 * Name: DivContainer
 * Desc: The view for divider container
 */
export const DivContainer = styled.View`
  padding-vertical: ${rpx(20)}px;
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
  padding-top: ${rpx(15)};
`;

/**
 * Name: Divider
 * Desc: The view for divider
 */
export const Divider = styled.View`
  margin-vertical: ${rpx(10)}px;
  background-color: ${grey};
  height: ${rpx(2)}px;
`;

/**
 * Name: BadgeLayout
 * Desc: The view for status badge
 */
export const BadgeLayout = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: ${rpx(25)}px;
  background-color: ${white};
  width: ${rpx(80)}px;
  height: ${rpx(30)}px;
  border-width: ${rpx(2)}px;
  border-color: ${props => props.borderColor};
`;

/**
 * Name: BadgeText
 * Desc: The text for status badge
 */
export const BadgeText = styled.Text`
  font-size: ${rpx(12)}px;
  line-height: ${rpx(18)}px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => props.color};
`;
