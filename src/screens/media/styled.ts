import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rh, rpx, rw} from '../../../styles/styleUtils';
import {defaultTheme} from '../../../styles/theme';
import {FONT_BOLD, FONT_WEIGHT_REGULAR} from '../../../styles/typography';
import {IFilterType} from '../../types/utils';

const {primaryBackgroundColor, secondaryTextColor, defaultBtnText} =
  defaultTheme;

/**
 * Name:Wrapper
 * Desc: The wrapper view
 */
export const Wrapper = styled.View`
  flex: 1;
  background-color: ${primaryBackgroundColor};
`;

/**
 * Name: HeaderView
 * Desc: The view for header
 */
export const HeadingView = styled.View`
  flex-direction: row;
  padding-bottom: ${rpx(34)}px;
  padding-horizontal: ${rpx(34)}px;
  padding-top: ${rpx(20)}px;
`;

/**
 * Name:HeadingText
 * Desc: The Heading Text
 */
export const HeadingText = styled.Text`
  font-size: ${rpx(20)}px;
  color: ${secondaryTextColor};
  letter-spacing: ${rpx(4)}px;
  text-transform: uppercase;
  opacity: ${rpx(1)};
`;

/**
 * Name: FilterView
 * Desc: The view for FilterTab
 */
export const FilterView = styled.View`
  flex-direction: row;
  padding-left: ${rpx(34)}px;
`;

/**
 * Name: SortText
 * Desc: The text for SortText
 */
export const SortText = styled.Text`
  color: ${secondaryTextColor};
  opacity: 1;
  font-weight: bold;
  text-align: left;
  font-size: ${rpx(18)}px;
`;

/**
 * Name: FilterLabelView
 * Desc: The touchable view for FilterLabelView
 */
export const FilterLabelView = styled.TouchableOpacity`
  padding-left: ${rw(25)}px;
`;

/**
 * Name: FilterLabelAll
 * Desc: The text for AllLabel
 */
export const FilterLabelAll = styled.Text<IFilterType>`
  color: ${secondaryTextColor};
  opacity: ${rpx(1)};
  text-align: left;
  font-size: ${rpx(18)}px;
  font-weight: bold;
  padding-left: ${rw(22)}px;
  font-weight: ${props => (props.isSelected ? FONT_BOLD : FONT_WEIGHT_REGULAR)};
`;

/**
 * Name: FilterLabelVideo
 * Desc: The text for video label
 */
export const FilterLabelVideo = styled.Text<IFilterType>`
  color: ${secondaryTextColor};
  opacity: 1;
  font-size: ${rpx(18)}px;
  padding-left: ${rw(22)}px;
  font-weight: ${props => (props.isSelected ? FONT_BOLD : FONT_WEIGHT_REGULAR)};
`;

/**
 * Name: FilterLabelImages
 * Desc: The text for Images Text
 */
export const FilterLabelImages = styled.Text<IFilterType>`
  color: ${secondaryTextColor};
  opacity: 1;
  font-size: ${rpx(18)}px;
  padding-left: ${rw(22)}px;
  font-weight: ${props => (props.isSelected ? FONT_BOLD : FONT_WEIGHT_REGULAR)};
`;

/**
 * Name: DateView
 * Desc: The view for date
 */
export const DateView = styled.View`
  margin-vertical: ${rh(20)}px;
  flex-direction: row;
`;

/**
 * Name: DateText
 * Desc: The text for Date Text
 */
export const DateText = styled.Text`
  font-weight: bold;
  letter-spacing: 1.26px;
  color: ${secondaryTextColor};
  text-transform: uppercase;
  opacity: ${rpx(0.49)};
  margin-left: ${30}px;
  font-size: ${rpx(18)}px;
`;

/**
 * Name: HorizontalLine
 * Desc: The view draw horizontal line
 */
export const HorizontalLine = styled.View`
  height: ${rh(1)}px;
  flex: 1;
  background-color: ${colors.lineColor};
  margin-vertical: ${rpx(10)}px;
  margin-horizontal: ${rw(20)}px;
`;

/**
 * Name: FlatListData
 * Desc: The Flat list show  FlatList
 */
export const FlatListData = styled.FlatList`
  flex: 1;
`;

/**
 * Name: ListItemView
 * Desc: The view for flat list item view
 */
export const ListItemView = styled.View`
  margin-horizontal: ${rw(40)}px;
  margin-vertical: ${rh(10)}px;
`;

/**
 * Name:ListItemImage
 * Desc: TThe image for listIem Image
 */
export const ListItemImage = styled.Image`
  width: ${rw(500)}px;
  height: ${rh(100)}px;
  border-radius: ${rpx(15)}px;
`;

/**
 * Name: VideoContainer
 * Desc: The view for video
 */
export const VideoContainer = styled.TouchableOpacity`
  width: ${rw(500)}px;
  height: ${rh(100)}px;
  border-radius: ${rpx(15)}px;
`;

/**
 * Name: ListContainer
 * Desc: The view for contain flat list
 */
export const ListContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

/**
 * Name: ButtonContainer
 * Desc: The touchable view for Add new media
 */
export const ButtonContainer = styled.TouchableOpacity`
  margin-horizontal: ${rpx(35)}px;
  margin-vertical: ${rpx(25)}px;
  border-radius: ${rpx(22)}px;
  padding-vertical: ${rh(14)}px;
  background-color: ${colors.lightGray};
`;

/**
 * Name: ButtonTxt
 * Desc: The Text is used for AddNewMedia text
 */
export const ButtonTxt = styled.Text`
  text-align: center;
  font-weight: bold;
  letter-spacing: ${rpx(1.6)}px;
  color: ${defaultBtnText};
  text-transform: uppercase;
`;

/**
 * Name: ListFooter
 * Desc: The view for List Footer
 */
export const ListFooter = styled.View`
  padding: ${rpx(10)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

/**
 * Name: NoMediaView
 * Desc: The view for no media
 */
export const NoMediaView = styled.View`
  margin-vertical: ${rh(50)}px;
`;

/**
 * Name: NoMediaText
 * Desc: The Text is used for AddNewMedia text
 */
export const NoMediaText = styled.Text`
  text-align: center;
  font-weight: bold;
  color: ${defaultBtnText};
  font-size: ${rpx(18)}px;
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

/**
 * Name: ThumbImage
 * Desc: The image for video
 */
export const ThumbImage = styled.Image`
  width: 100%;
  height: ${rpx(100)}px;
  justify-content: center;
`;

/**
 * Name: ImageContainer
 * Desc: Container for centered Image.
 */
export const ImageContainer = styled.TouchableOpacity`
  align-items: center;
  border-radius: ${rpx(15)}px;
  overflow: hidden;
`;

/**
 * Name: LoaderContainer
 * Desc: Contain activity indicator and loader text.
 */
export const LoaderContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
/**
 * Name: UploadingText
 * Desc: The text for uploading text.
 */
export const UploadingText = styled.Text`
  font-size: ${rpx(20)}px;
  line-height: ${rpx(22)}px;
  color: ${colors.labelColor};
  padding-top: ${rpx(10)}px;
`;
