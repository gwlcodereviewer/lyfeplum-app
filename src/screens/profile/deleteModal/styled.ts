import styled from 'styled-components/native';
import colors from '../../../../styles/colors';
import {rpx} from '../../../../styles/styleUtils';
import {defaultTheme} from '../../../../styles/theme';

const {defaultTextColor, primaryButtonColor} = defaultTheme;

const basePaddingHeight = rpx(16);
const basePaddingWidth = rpx(16);

/**
 * Name: BackgroundView
 * Desc: The main background container.
 */
export const BackgroundView = styled.View`
  background-color: ${colors.servicesColor};
  height: 100%;
  justify-content: center;
  align-items: center;
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
 * Name: PopUpText
 * Desc: The pop-up message text.
 */
export const PopUpText = styled.Text`
  font-weight: 500;
  font-size: ${rpx(14)}px;
  line-height: ${rpx(21)}px;
  text-align: center;
  color: ${colors.black};
`;

/**
 * Name: DoubleBtnView
 * Desc: The container that holds the view which has both the buttons.
 */
export const DoubleBtnView = styled.View`
  flex-direction: row;
  justify-content: center;
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
  background-color: ${primaryButtonColor};
  justify-content: center;
  align-items: center;
  border-radius: ${rpx(8)}px;
  width: ${rpx(106)}px;
  align-self: center;
  margin-top: ${rpx(20)}px;
`;

/**
 * Name: SimpleView
 * Desc: The container that holds the pop-up view for single button.
 */
export const SimpleView = styled.View``;

/**
 * Name: BtnText
 * Desc: The text view for both the buttons.
 */
export const BtnText = styled.Text`
  font-weight: bold;
  font-size: ${rpx(13)}px;
  line-height: ${rpx(19)}px;
  text-align: center;
  color: ${defaultTextColor};
  text-transform: capitalize;
`;

/**
 * Name: DeleteText
 * Desc: The delete message text.
 */
export const DeleteText = styled.Text`
  font-weight: 600;
  font-size: ${rpx(14)}px;
  line-height: ${rpx(21)}px;
  text-align: center;
  color: ${colors.red};
  text-transform: uppercase;
`;

/**
 * Name: TextView
 * Desc: The view for text message
 */
export const TextView = styled.View`
  flex-direction: row;
`;
