import styled from 'styled-components/native';
import colors from '../../../../styles/colors';
import {rh, rpx, rw} from '../../../../styles/styleUtils';
import {defaultTheme} from '../../../../styles/theme';

const {secondaryTextColor} = defaultTheme;

const basePaddingHeight = rpx(16);
const basePaddingWidth = rpx(16);

/**
 * ScreenWrapper
 * Desc: The screen wrapper view
 */
export const ScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.pantone};
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
  text-transform: uppercase;
  color: ${colors.white};
  text-align: center;
`;

/**
 * Name: BackgroundView
 * Desc: The main background container.
 */
export const BackgroundView = styled.View`
  background-color: ${colors.servicesColor};
  height: 100%;
  justify-content: center;
  padding-right: ${basePaddingWidth}px;
  padding-left: ${basePaddingWidth}px;
  padding-top: ${basePaddingHeight}px;
  padding-bottom: ${basePaddingHeight}px;
`;

/**
 * Name: PopUpView
 * Desc: The pop-up view that holds both type of views.
 */
export const PopUpView = styled.View`
  background-color: ${colors.white};
  box-shadow: 0px 5px 42px ${colors.modalShadowColor};
  border-radius: ${rpx(15)}px;
  padding-left: ${basePaddingWidth}px;
  padding-right: ${basePaddingWidth}px;
  padding-top: ${rpx(24)}px;
  padding-bottom: ${rpx(24)}px;
  width: auto;
`;

/**
 * Name: LabelText
 * Desc: The text for label.
 */
export const LabelText = styled.Text`
  font-size: ${rpx(20)}px;
  line-height: ${rpx(22)}px;
  color: ${colors.labelColor};
`;

/**
 * Name: CrossImageContainer
 * Desc: The cross icon container.
 */
export const CrossImageContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
`;

/**
 * Name: InputBoxContainer
 * Desc: The input box container.
 */
export const InputBoxContainer = styled.View`
  padding-horizontal: ${rpx(20)}px;
`;

/**
 * Name: RowView
 * Desc: The row view.
 */
export const RowView = styled.View`
  flex-direction: row;
`;

/**
 * Name: Label
 * Desc: The label text view
 */
export const Label = styled.Text`
  font-size: ${rpx(18)}px;
  line-height: ${rh(20)}px;
  color: ${secondaryTextColor};
  font-weight: bold;
  padding-left: ${rpx(5)}px;
  padding-bottom: ${rpx(15)}px;
  margin-top: ${rpx(10)}px;
`;

/**
 * Name: DoubleBtnView
 * Desc: The container that holds the view which has both the buttons.
 */
export const DoubleBtnView = styled.View`
  flex-direction: row;
`;

/**
 * Name: CancelBtn
 * Desc: The cancel or negative button.
 */
export const CancelBtn = styled.TouchableOpacity`
  height: ${rpx(40)}px;
  background-color: ${colors.stormGreyRgba};
  justify-content: center;
  align-items: center;
  border-radius: ${rpx(8)}px;
  width: ${rpx(106)}px;
  align-self: center;
  margin-top: ${rpx(20)}px;
  margin-right: ${rpx(10)}px;
`;

/**
 * Name: ConfirmBtn
 * Desc: The confirm or positive button.
 */
export const ConfirmBtn = styled.TouchableOpacity`
  height: ${rpx(40)}px;
  background-color: ${defaultTheme.primaryButtonColor};
  justify-content: center;
  align-items: center;
  border-radius: ${rpx(8)}px;
  width: ${rpx(106)}px;
  align-self: center;
  margin-top: ${rpx(20)}px;
`;

/**
 * Name: BtnText
 * Desc: The text view for both the buttons.
 */
export const BtnText = styled.Text`
  font-weight: bold;
  font-size: ${rpx(13)}px;
  line-height: ${rpx(19)}px;
  text-align: center;
  color: ${defaultTheme.defaultTextColor};
  text-transform: capitalize;
`;

/**
 * Name: BottomContainer
 * Desc: The view for bottom content
 */
export const BottomContainer = styled.View`
  padding-horizontal: ${rpx(20)}px;
`;

/**
 * Name: Divider
 * Desc: The view for divider
 */
export const Divider = styled.View`
  margin-top: ${rh(20)}px;
  background-color: ${colors.black};
  height: ${rh(2)}px;
`;

/**
 * Name: UploadWrapper
 * Desc: The wrapper for upload
 */
export const UploadWrapper = styled.View`
  margin-top: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
  padding-right: ${rpx(250)}px;
  padding-bottom: ${rpx(20)}px;
  flex-direction: row;
  justify-content: space-between;
`;

/**
 * Name: ImageWrapper
 * Desc: The wrapper for image upload
 */
export const ImageWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${rpx(10)}px;
`;

/**
 * Name: RemoveContainer
 * Desc: The view for remove container
 */
export const RemoveContainer = styled.View`
  margin-top: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
  padding-right: ${rpx(100)}px;
  padding-left: ${rpx(20)}px;
  flex: 1;
`;

/**
 * Name: ImageTouchable
 * Desc: The touchable view for image
 */
export const ImageTouchable = styled.TouchableOpacity``;

/**
 * Name: VideoContainer
 * Desc: The view for video
 */
export const VideoContainer = styled.TouchableOpacity`
  width: ${rpx(150)}px;
  height: ${rpx(150)}px;
  margin-left: ${rpx(10)};
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
/**
 * Name: UploadingText
 * Desc: The text for uploading text.
 */
export const UploadingText = styled.Text`
  font-size: ${rpx(20)}px;
  line-height: ${rpx(22)}px;
  color: ${colors.labelColor};
  padding-bottom: ${rpx(25)}px;
  padding-left: ${rpx(5)}px;
`;
/**
 * Name: DoubleBtnView
 * Desc: The container that holds the view which has both the buttons.
 */
export const ThreeBtnView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: ${rpx(40)}px;
  padding-left: ${rpx(20)}px;
  padding-bottom: ${rpx(20)}px;
`;
/**
 * Name: DeleteStoryContainer
 * Desc: The view for delete story.
 */
export const DeleteStoryContainer = styled.TouchableOpacity`
  border-radius: ${rpx(8)}px;
  border-width: ${rpx(1)}px;
  padding-horizontal: ${rpx(10)}px;
  margin-top: ${rpx(20)}px;
  padding-vertical: ${rh(7)}px;
  border-color: ${colors.greenColor};
  width: ${rpx(110)}px;
`;

/**
 * Name: DeleteStoryText
 * Desc: The text for delete story
 */
export const DeleteStoryText = styled.Text`
  font-size: ${rpx(13)}px;
  line-height: ${rpx(18)}px;
  font-weight: bold;
  align-self: center;
  text-align: center;
  color: ${colors.greenColor};
`;

/**
 * Name: EmptySpace
 * Desc: The view for empty space
 */
export const EmptySpace = styled.View``;
