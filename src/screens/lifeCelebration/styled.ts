import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';
import {defaultTheme} from '../../../styles/theme';

const {secondaryTextColor, primaryTextColor} = defaultTheme;
/**
 * Name: ItemListContainer
 * Desc: The item list container.
 */
export const ItemListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-vertical: ${rpx(20)}px;
`;

/**
 * Name: ItemListView
 * Desc: The item list view.
 */
export const ItemListView = styled.View`
  width: 90%;
  margin-top: ${rpx(20)}px;
  border-radius: ${rpx(10)}px;
  border-width: ${rpx(2)}px;
  padding-vertical: ${rpx(20)}px;
  padding-horizontal: ${rpx(20)}px;
  border-color: ${colors.darkGray};
`;

/**
 * Name: QuestionText
 * Desc: The question text.
 */
export const QuestionText = styled.Text`
  font-size: ${rpx(18)}px;
  line-height: ${rpx(20)}px;
  color: ${secondaryTextColor};
  margin-horizontal: ${rpx(5)}px;
  margin-bottom: ${rpx(15)}px;
  text-align: center;
`;

/**
 * Name: SaveButtonWrapper
 * Desc: The save button container container.
 */
export const SaveButtonWrapper = styled.View`
  border-radius: ${rpx(10)}px;
  align-items: center;
  padding-top: ${rpx(10)}px;
`;

/**
 * Name: ActionContainer
 * Desc: The view for action
 */
export const ActionContainer = styled.View`
  flex-direction: row;
  margin-top: ${rpx(20)}px;
  margin-horizontal: ${rpx(20)}px;
  justify-content: space-between;
`;

/**
 * Name: CountText
 * Desc: The count text.
 */
export const CountText = styled.Text`
  font-size: ${rpx(20)}px;
  line-height: ${rpx(22)}px;
  font-weight: 500;
  color: ${primaryTextColor};
  margin-horizontal: ${rpx(5)}px;
  margin-top: ${rpx(5)}px;
  text-align: center;
`;
