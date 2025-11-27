import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';
import {IBorderProps} from '../../../styles/types';

const {white, labelColor, grey, primaryButton} = colors;

/**
 * Name: ListContainer
 * Desc: The contact list container.
 */
export const ListContainer = styled.View`
  background-color: ${white};
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: ${rpx(40)}px;
`;

/**
 * Name: ListText
 * Desc: The contact list heading text.
 */
export const ListText = styled.Text`
  font-size: ${rpx(22)}px;
  font-weight: 400;
  align-self: flex-start;
  color: ${labelColor};
  margin-top: ${rpx(50)}px;
  margin-bottom: ${rpx(20)}px;
  margin-horizontal: ${rpx(15)}px;
`;

/**
 * Name: ListView
 * Desc: The list view for contact list
 */
export const ListView = styled.Text``;

/**
 * Name: AddNewText
 * Desc: The add new button text.
 */
export const AddNewText = styled.Text`
  text-align: center;
  font-size: ${rpx(16)}px;
  font-weight: bold;
  color: ${white};
  text-transform: uppercase;
`;

/**
 * Name: AddNewButton
 * Desc: The add new button.
 */
export const AddNewButton = styled.TouchableOpacity`
  width: 80%;
  height: ${rpx(45)}px;
  border-width: ${rpx(1)}px;
  border-radius: ${rpx(25)}px;
  background-color: ${primaryButton};
  border-color: ${primaryButton};
  justify-content: center;
  align-items: center;
  margin-top: ${rpx(12)}px;
`;

/**
 * Name: ListItemContainer
 * Desc: The contact data view container.
 */
export const ListItemContainer = styled.View`
  background-color: ${grey};
  width: ${rpx(340)}px;
  height: ${rpx(180)}px;
  margin-horizontal: ${rpx(7)}px;
  border-radius: ${rpx(15)}px;
  align-items: center;
  justify-content: space-between;
`;

/**
 * Name: ListNameText
 * Desc: The contact name text view.
 */
export const ListNameText = styled.Text`
  font-size: ${rpx(22)}px;
  color: ${labelColor};
  text-align: center;
  margin-horizontal: ${rpx(10)}px;
  margin-top: ${rpx(30)}px;
`;

/**
 * Name: ListEmailText
 * Desc: The contact email text view.
 */
export const ListEmailText = styled.Text`
  font-size: ${rpx(16)}px;
  color: ${labelColor};
  text-align: center;
  margin-horizontal: ${rpx(10)}px;
  margin-top: ${rpx(15)}px;
`;

/**
 * Name: EditButton
 * Desc: The contact edit button view.
 */
export const EditButton = styled.TouchableOpacity`
  width: 60%;
  height: ${rpx(30)}px;
  border-width: ${rpx(1)}px;
  border-radius: ${rpx(25)}px;
  background-color: ${primaryButton};
  border-color: ${primaryButton};
  justify-content: center;
  align-items: center;
`;

/**
 * Name: EditText
 * Desc: The contact edit button text.
 */
export const EditText = styled.Text`
  text-align: center;
  font-size: ${rpx(16)}px;
  font-weight: bold;
  color: ${white};
  text-transform: uppercase;
`;
/**
 * Name: ButtonWrapper
 * Desc: The update button view container.
 */
export const ButtonWrapper = styled.View`
  border-bottom-left-radius: ${rpx(21)}px;
  border-bottom-right-radius: ${rpx(21)}px;
  flex-direction: row;
  background-color: ${colors.primaryButton};
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
 * Name: ListItemTopContainer
 * Desc: The contact text data view container.
 */
export const ListItemTopContainer = styled.View``;
