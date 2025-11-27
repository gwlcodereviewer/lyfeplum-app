import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';
import {defaultTheme} from '../../../styles/theme';
const {secondaryTextColor, defaultBtnText} = defaultTheme;

/**
 * Name: Wrapper
 * Desc: view for Feed
 */
export const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.fbBgColor};
`;

/**
 * Name: FlatListWrapper
 * Desc: view for FlatList
 */
export const FlatListWrapper = styled.View`
  padding: ${rpx(5)}px;
  flex: 1;
`;

/**
 * Name: ListItemContainer
 * Desc: view list item
 */
export const ListItemContainer = styled.TouchableOpacity`
  margin: ${rpx(10)}px;
  background-color: ${colors.white};
  padding: ${rpx(18)}px;
  border-radius: ${rpx(10)}px;
`;

/**
 * Name: ListItemRowContainer
 * Desc: child view list item
 */
export const ListItemRowContainer = styled.View`
  flex-direction: row;
`;

/**
 * Name: Profile image
 * Desc: fb feed profile image
 */
export const ProfileImage = styled.Image`
  width: ${rpx(40)}px;
  height: ${rpx(40)}px;
  border-radius: ${rpx(40)}px;
`;

/**
 * Name: ProfileNameText
 * Desc: profile name  text.
 */
export const ProfileNameText = styled.Text`
  font-size: ${rpx(18)}px;
  color: ${secondaryTextColor};
  font-weight: 700;
`;

/**
 * Name: DateText
 * Desc: date text.
 */
export const DateText = styled.Text`
  font-size: ${rpx(16)}px;
  line-height: ${rpx(20)}px;
  color: ${secondaryTextColor};
  margin-top: ${rpx(5)}px;
`;

/**
 * Name: ListItemRowRightContainer
 * Desc: right child view list item
 */
export const ListItemRightContainer = styled.View`
  flex-direction: column;
  margin-left: ${rpx(15)}px;
`;

/**
 * Name: Feed image
 * Desc: fb feed image
 */
export const FeedImage = styled.Image`
  width: auto;
  height: auto;
  min-height: ${rpx(200)}px;
  max-height: ${rpx(500)}px;
  border-radius: ${rpx(10)}px;
  margin-top: ${rpx(10)}px;
  margin-bottom: ${rpx(10)}px;
`;

/**
 * Name: CommentText
 * Desc: date text.
 */
export const CommentText = styled.Text`
  font-size: ${rpx(16)}px;
  line-height: ${rpx(20)}px;
  color: ${secondaryTextColor};
  font-weight: bold;
`;

/**
 * Name: CommentContainer
 * Desc: comment text container
 */
export const CommentContainer = styled.TouchableOpacity`
  margin-left: ${rpx(10)}px;
  background-color: ${colors.fbBgColor};
  height: ${rpx(40)}px;
  width: ${rpx(100)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${rpx(5)}px;
`;

/**
 * Name: NoDataText
 * Desc: if no post available
 */
export const NoDataText = styled.Text`
  text-align: center;
  font-weight: bold;
  color: ${defaultBtnText};
  font-size: ${rpx(18)}px;
`;

/**
 * Name: ActionView
 * Desc: View for action button
 */
export const ActionView = styled.TouchableOpacity`
  padding-left: ${rpx(15)}px;
  padding-right: ${rpx(5)}px;
  align-items: center;
`;

/**
 * Name: PostDetail
 * Desc: View for the name and date
 */
export const PostDetail = styled.View`
  flex: 1;
`;

/**
 * Name: NoRecordView
 * Desc: view for no record container
 */
export const NoRecordView = styled.View`
  flex: 1;
  justify-content: center;
`;
