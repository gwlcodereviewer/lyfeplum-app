import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';
import {IBorderProps, ITextType} from '../../../styles/types';

/**
 * Wrapper
 * Desc: The screen wrapper view
 */
export const Wrapper = styled.SafeAreaView`
  background-color: ${colors.white};
`;

/**
 * MainContainer
 * Desc: The main container view
 */
export const MainContainer = styled.View`
  background-color: ${colors.darkGray};
  height: 100%;
  width: 100%;
  padding-horizontal: ${rpx(20)}px;
  padding-top: ${rpx(20)}px;
`;

/**
 * HeaderContainer
 * Desc: The header container view
 */
export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: ${rpx(10)}px;
  flex-wrap: wrap;
`;

/**
 * HeaderText
 * Desc: The text for header
 */
export const HeaderText = styled.Text<ITextType>`
  color: ${colors.white};
  font-size: ${rpx(24)}px;
  font-weight: ${props => (props.isSelected ? 800 : 500)};
  margin-top: ${rpx(10)}px;
  text-transform: uppercase;
  letter-spacing: ${rpx(3)}px;
  flex: 1;
`;

/**
 * IconTouchable
 * Desc: The touchable view for icon
 */
export const IconTouchable = styled.TouchableOpacity`
  padding-top: ${rpx(15)}px;
`;

/**
 * TextTouchable
 * Desc: The touchable view for icon
 */
export const TextTouchable = styled.TouchableOpacity``;

/**
 * CategoryContainer
 * Desc: The view for category
 */
export const CategoryContainer = styled.View`
  flex-direction: row;
  padding-right: ${rpx(15)}px;
  padding-bottom: ${rpx(15)}px;
  padding-horizontal: ${rpx(10)}px;
`;

/**
 * CategoryText
 * Desc: The text for category
 */
export const CategoryText = styled.Text<ITextType>`
  color: ${colors.white};
  font-size: ${rpx(18)}px;
  font-weight: ${props => (props.isSelected ? 800 : 500)};
  margin-top: ${rpx(20)}px;
  margin-right: ${rpx(20)}px;
  text-transform: capitalize;
`;

/**
 * GridContainer
 * Desc: The view for list
 */
export const GridContainer = styled.View`
  background-color: ${colors.white};
  border-radius: ${rpx(21)}px;
  margin-bottom: ${rpx(5)}px;
`;

/**
 * ImageTouchable
 * Desc: The touchable view for image
 */
export const ImageTouchable = styled.TouchableOpacity`
  overflow: hidden;
  border-top-right-radius: ${rpx(21)}px;
  border-top-left-radius: ${rpx(21)}px;
`;

/**
 * DescriptionContainer
 * Desc: The view for description
 */
export const DescriptionContainer = styled.View`
  padding-top: ${rpx(12)}px;
  padding-bottom: ${rpx(15)}px;
  align-items: center;
  padding-horizontal: ${rpx(5)}px;
`;

/**
 * ChapterName
 * Desc: The text for chapter name
 */
export const ChapterName = styled.Text`
  color: ${colors.black};
  font-size: ${rpx(16)}px;
  font-weight: 300;
  font-weight: 500;
  padding-horizontal: ${rpx(20)}px;
`;

/**
 * ContentName
 * Desc: The text for content name
 */
export const ContentName = styled.Text`
  color: ${colors.black};
  font-size: ${rpx(14)}px;
  font-weight: 300;
  margin-top: ${rpx(5)}px;
  padding-left: ${rpx(20)}px;
`;

/**
 * Name: ButtonWrapper
 * Desc: The update button view container.
 */
export const ButtonWrapper = styled.View`
  margin-bottom: ${rpx(20)}px;
  border-radius: ${rpx(10)}px;
  padding-horizontal: ${rpx(120)}px;
`;

/**
 * ListContainer
 * Desc: The view for list
 */
export const ListContainer = styled.View`
  flex-direction: row;
  background-color: ${colors.white};
  border-radius: ${rpx(21)}px;
  margin-bottom: ${rpx(5)}px;
  height: ${rpx(150)}px;
`;

/**
 * ListImageTouchable
 * Desc: The touchable view for image
 */
export const ListImageTouchable = styled.TouchableOpacity`
  flex: 0.4;
  overflow: hidden;
  border-bottom-left-radius: ${rpx(21)}px;
  border-top-left-radius: ${rpx(21)}px;
`;

/**
 * ListDescriptionContainer
 * Desc: The view for description
 */
export const ListDescriptionContainer = styled.View`
  flex: 0.6;
  margin-top: ${rpx(20)}px;
`;

/**
 * Name: ListButtonWrapper
 * Desc: The update button view container.
 */
export const ListButtonWrapper = styled.View`
  border-bottom-right-radius: ${rpx(21)}px;
  background-color: ${colors.primaryButton};
  flex-direction: row;
  position: absolute;
  bottom: 0;
`;

/**
 * EmptyContainer
 * Desc: The view for add chapter
 */
export const EmptyContainer = styled.View<ITextType>`
  background-color: ${colors.white};
  border-radius: ${rpx(21)}px;
  margin-bottom: ${rpx(5)}px;
  height: ${props => (props.isSelected ? 140 : 215)}px;
  border-width: ${rpx(2)}px;
  border-color: ${colors.black};
  border-style: dashed;
  align-items: center;
  justify-content: center;
`;

/**
 * Name: AddButtonWrapper
 * Desc: The add button view wrapper.
 */
export const AddButtonWrapper = styled.View`
  border-radius: ${rpx(10)}px;
  margin-top: ${rpx(10)}px;
`;

/**
 * AddName
 * Desc: The text for add chapter
 */
export const AddName = styled.Text`
  color: ${colors.black};
  font-size: ${rpx(16)}px;
  font-weight: 500;
`;

/**
 * Name: GridButtonWrapper
 * Desc: The update button view container.
 */
export const GridButtonWrapper = styled.View`
  border-bottom-left-radius: ${rpx(21)}px;
  border-bottom-right-radius: ${rpx(21)}px;
  flex-direction: row;
  background-color: ${colors.primaryButton};
`;

/**
 * Name: DeleteView
 * Desc: The delete button view container.
 */
export const DeleteView = styled.View`
  margin-top: ${rpx(5)}px;
  border-radius: ${rpx(10)}px;
`;

/**
 * Name: MainWrapper
 * Desc: The screen wrapper view
 */
export const MainWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

/**
 * Name: ButtonTouchable
 * Desc: The touchable view for button
 */
export const ButtonTouchable = styled.TouchableOpacity<IBorderProps>`
  padding-vertical: ${rpx(10)}px;
  flex: 1;
  align-items: center;
  border-color: ${colors.white};
  border-left-width: ${props => (props.isLeftBorder ? rpx(1) : rpx(0))}px;
  border-right-width: ${props => (props.isRightBorder ? rpx(1) : rpx(0))}px;
`;

/**
 * Name: HeaderCard
 * Desc: The view for header section.
 */
export const HeaderCard = styled.View`
  margin-bottom: ${rpx(20)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: ${rpx(15)}px;
  padding-left: ${rpx(15)}px;
  padding-right: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
  background-color: ${colors.white};
  border-left-width: ${rpx(15)}px;
  border-left-color: ${colors.greenColor};
`;

/**
 * Name: DetailView
 * Desc: View for header details
 */
export const DetailView = styled.View`
  flex: 1;
  padding-right: ${rpx(10)}px;
`;

/**
 * Name: TitleText
 * Desc: text for Heading.
 */
export const TitleText = styled.Text`
  color: ${colors.primaryButton};
  font-weight: 600;
  font-size: ${rpx(18)}px;
  font-style: italic;
`;

/**
 * Name: SubTitleText
 * Desc: text for Heading.
 */
export const SubTitleText = styled.Text`
  color: ${colors.black};
  font-weight: 400;
  font-size: ${rpx(18)}px;
  font-style: normal;
`;
