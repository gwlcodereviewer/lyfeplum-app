import styled from 'styled-components/native';
import colors from '../../../../styles/colors';
import {rh, rpx, rw, screenWidth} from '../../../../styles/styleUtils';

/**
 * Wrapper
 * Desc: The screen wrapper view
 */
export const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

/**
 * MainContainer
 * Desc: The main container view
 */
export const MainContainer = styled.View`
  background-color: ${colors.white};
  padding-horizontal: ${rpx(30)}px;
  padding-bottom: ${rpx(30)}px;
`;

/**
 * TopContainer
 * Desc: The top container view
 */
export const TopContainer = styled.View`
  position: absolute;
  top: ${rpx(100)}px;
`;

/**
 * ChapterText
 * Desc: The text for chapter title
 */
export const ChapterText = styled.Text`
  color: ${colors.white};
  font-size: ${rpx(28)}px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: ${rpx(3)}px;
  text-align: center;
  padding-horizontal: ${rpx(20)}px;
`;

/**
 * BottomContainer
 * Desc: The bottom container view
 */
export const BottomContainer = styled.View`
  background-color: ${colors.labelBackground};
  flex: 1;
  padding-horizontal: ${rpx(40)}px;
  padding-vertical: ${rpx(30)}px;
`;

/**
 * QuestionText
 * Desc: The text for question
 */
export const QuestionText = styled.Text`
  color: ${colors.black};
  font-size: ${rpx(24)}px;
  font-weight: 600;
  padding-vertical: ${rpx(20)}px;
`;

/**
 * ScrollViewContainer
 * Desc: The scroll view container
 */
export const ScrollViewContainer = styled.ScrollView.attrs({
  contentContainerStyle: {flexGrow: 1},
})``;

/**
 * Name: Divider
 * Desc: The view for divider
 */
export const Divider = styled.View`
  margin-vertical: ${rh(10)}px;
  background-color: ${colors.grey};
  height: ${rh(2)}px;
`;

/**
 * Name: ListItemView
 * Desc: The view for attachment item view
 */
export const ListItemView = styled.View`
  padding-vertical: ${rh(10)}px;
`;

/**
 * Name: ImgContainer
 * Desc: The view for ImgContainer
 */
export const ImgContainer = styled.TouchableOpacity`
  overflow: hidden;
  border-radius: ${rpx(15)}px;
`;

/**
 * Name: VideoContainer
 * Desc: The view for video
 */
export const VideoContainer = styled.TouchableOpacity`
  width: ${rw(450)}px;
  height: ${rh(100)}px;
`;

/**
 * Name: ViewContainer
 * Desc: The view for top container
 */
export const ViewContainer = styled.View`
  align-items: center;
`;

/**
 * WebViewContainer
 * Desc: View container for webview component
 */
export const WebViewContainer = styled.View`
  flex: 1;
`;

/**
 * Name: DivContainer
 * Desc: The view for divider container
 */
export const DivContainer = styled.View``;

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
 * Name: PlayIconContainer
 * Desc: The container for play icon
 */
export const PlayIconContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

/**
 * Name: PlayIconWrapper
 * Desc: The wrapper for play icon
 */
export const PlayIconWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/**
 * Name: PlayImage
 * Desc: The image for play icon
 */
export const PlayImage = styled.Image`
  width: ${rpx(30)}px;
  height: ${rpx(30)}px;
`;
