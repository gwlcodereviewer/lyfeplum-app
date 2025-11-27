import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rh, rpx, rw} from '../../../styles/styleUtils';

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
  padding-horizontal: ${rpx(10)}px;
`;

/**
 * Name: Input
 * Desc: The text input view
 */
export const Input = styled.TextInput`
  font-size: ${rpx(24)}px;
  line-height: ${rpx(26)}px;
  height: ${rpx(30)}px;
  color: ${colors.labelColor};
  background-color: ${colors.chapterBackground};
  padding-left: ${rpx(8)}px;
  flex: 1;
  justify-content: center;
  text-transform: capitalize;
`;

/**
 * Name: InputContainer
 * Desc: The text input view container
 */
export const InputContainer = styled.View`
  background-color: ${colors.chapterBackground};
  border-style: solid;
  border-radius: ${rpx(15)}px;
  padding-horizontal: ${rw(15)}px;
  height: ${rpx(70)}px;
  margin-horizontal: ${rpx(20)}px;
  margin-top: ${rpx(20)}px;
`;

/**
 * Name: ButtonWrapper
 * Desc: The save button view container.
 */
export const ButtonWrapper = styled.View`
  margin-top: ${rpx(15)}px;
  margin-horizontal: ${rpx(20)}px;
  border-radius: ${rpx(10)}px;
`;

/**
 * Name: ErrorContainer
 * Desc: The error text view container
 */
export const ErrorContainer = styled.View``;

/**
 * Name: ErrorText
 * Desc: The error text view
 */
export const ErrorText = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(18)}px;
  color: ${colors.amaranth};
  padding-left: ${rpx(5)}px;
  margin-left: ${rpx(20)}px;
`;

/**
 * Name: LabelText
 * Desc: The text for label.
 */
export const LabelText = styled.Text`
  margin-left: ${rpx(30)}px;
  margin-top: ${rpx(35)}px;
  font-size: ${rpx(20)}px;
  line-height: ${rpx(22)}px;
  color: ${colors.labelColor};
`;

/**
 * FeaturedImageContainer
 * Desc: The featured image container.
 */
export const FeaturedImageContainer = styled.TouchableOpacity`
  background-color: ${colors.white};
  border-radius: ${rpx(21)}px;
  margin-top: ${rpx(25)}px;
  margin-bottom: ${rpx(40)}px;
  margin-horizontal: ${rpx(25)}px;
  border-width: ${rpx(2)}px;
  border-color: ${colors.greenTxt};
  border-style: dashed;
  align-items: center;
  justify-content: center;
`;

/**
 * Name: SelectImageContainer
 * Desc: The select image container.
 */
export const SelectImageContainer = styled.View`
  margin-vertical: ${rpx(55)}px;
  align-items: center;
  justify-content: center;
`;

/**
 * Name: SelectImageText
 * Desc: The select image text view.
 */
export const SelectImageText = styled.Text`
  font-size: ${rpx(20)}px;
  line-height: ${rpx(22)}px;
  color: ${colors.greenTxt};
  margin-top: ${rpx(16)}px;
`;

/**
 * PreviewChapterContainer
 * Desc: The preview chapter container.
 */
export const PreviewChapterContainer = styled.View`
  background-color: ${colors.white};
  border-radius: ${rpx(21)}px;
  margin-top: ${rpx(25)}px;
  margin-bottom: ${rpx(40)}px;
  margin-horizontal: ${rpx(25)}px;
`;

/**
 * Name: ImageContainer
 * Desc: The image container.
 */
export const ImageContainer = styled.View`
  background-color: ${colors.previewBackground};
  border-top-left-radius: ${rpx(21)}px;
  border-top-right-radius: ${rpx(21)}px;
  align-items: center;
  justify-content: center;
`;

/**
 * Name: ImageContainer
 * Desc: The image container.
 */
export const LogoImageContainer = styled.View`
  padding-vertical: ${rpx(20)}px;
`;

/**
 * Name: ChapterNameText
 * Desc: The chapter name text view.
 */
export const ChapterNameText = styled.Text`
  font-size: ${rpx(20)}px;
  line-height: ${rpx(22)}px;
  color: ${colors.labelColor};
  margin-vertical: ${rpx(15)}px;
  text-align: center;
`;

/**
 * Name: AddButtonWrapper
 * Desc: The add button view wrapper.
 */
export const AddButtonWrapper = styled.View`
  border-radius: ${rpx(10)}px;
  margin-bottom: ${rpx(20)}px;
  margin-horizontal: ${rpx(80)}px;
`;

/**
 * FeaturedImageContainer
 * Desc: The featured image container.
 */
export const FeaturedSelectedImageContainer = styled.TouchableOpacity`
  background-color: ${colors.white};
  border-radius: ${rpx(21)}px;
  margin-top: ${rpx(25)}px;
  margin-bottom: ${rpx(40)}px;
  margin-horizontal: ${rpx(25)}px;
  overflow: hidden;
`;

/**
 * StoryContainer
 * Desc: The story container.
 */
export const StoryContainer = styled.View`
  background-color: ${colors.white};
  border-radius: ${rpx(10)}px;
  margin-top: ${rpx(20)}px;
  margin-bottom: ${rpx(30)}px;
  margin-horizontal: ${rpx(20)}px;
`;

/**
 * Name: StoryText
 * Desc: The story text view.
 */
export const StoryText = styled.Text`
  font-size: ${rpx(18)}px;
  line-height: ${rpx(20)}px;
  color: ${colors.labelColor};
  margin: ${rpx(15)}px;
`;

/**
 * Name: EditButtonWrapper
 * Desc: The edit story button view container.
 */
export const EditButtonWrapper = styled.View`
  margin: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
`;

/**
 * Name: DeleteStoryContainer
 * Desc: The view for delete story.
 */
export const DeleteStoryContainer = styled.TouchableOpacity`
  border-radius: ${rpx(25)}px;
  border-width: ${rpx(1)}px;
  margin-horizontal: ${rpx(20)}px;
  margin-top: ${rpx(10)}px;
  padding-vertical: ${rh(10)}px;
  border-color: ${colors.greenColor};
`;

/**
 * Name: DeleteStoryText
 * Desc: The text for delete story
 */
export const DeleteStoryText = styled.Text`
  font-size: ${rpx(16)}px;
  line-height: ${rpx(18)}px;
  font-weight: bold;
  align-self: center;
  text-align: center;
  color: ${colors.greenColor};
`;

/**
 * Name: StoryStatusText
 * Desc: The story status text view.
 */
export const StoryStatusText = styled.Text`
  font-size: ${rpx(22)}px;
  line-height: ${rpx(24)}px;
  color: ${colors.black};
  margin-horizontal: ${rpx(15)}px;
  margin-top: ${rpx(5)}px;
  text-transform: uppercase;
`;

/**
 * Name: StatusButtonWrapper
 * Desc: The view container for status
 */
export const StatusButtonWrapper = styled.View`
  margin: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
  flex-direction: row;
  flex: 1;
  justify-content: center;
`;

/**
 * Name: SaveButtonWrapper
 * Desc: The save button view container.
 */
export const SaveButtonWrapper = styled.View`
  margin-top: ${rpx(15)}px;
  padding-right: ${rpx(250)}px;
  padding-left: ${rpx(20)}px;
  border-radius: ${rpx(10)}px;
  padding-bottom: ${rpx(20)}px;
`;

/**
 * Name: EmptyImage
 * Desc: The empty image view.
 */
export const EmptyImage = styled.View`
  width: ${rpx(150)}px;
  height: ${rpx(150)}px;
  justify-content: center;
`;
