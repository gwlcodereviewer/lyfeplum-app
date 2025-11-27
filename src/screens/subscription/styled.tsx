import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';

/**
 * Name: LoginLink
 * Desc: The touchable view for login
 */
export const MainContainer = styled.View`
  flex-direction: row;
  margin-vertical: ${rpx(5)}px;
`;

/**
 * Name: RowMainContainer
 * Desc: row for subscriptions
 */
export const RowMainContainer = styled.View`
  padding-vertical: ${rpx(15)}px;
  padding-horizontal: ${rpx(10)}px;
`;
/**
 * Name: RowContainer
 * Desc: RowContainer
 */
export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-radius: ${rpx(10)}px;
  padding-vertical: ${rpx(25)}px;
  padding-horizontal: ${rpx(20)}px;
  width: 100%;
  background-color: ${colors.white};
`;
/**
 * Name: RowFieldContainer
 * Desc: row for filed subscriptions
 */
export const RowFieldContainer = styled.View``;
/**
 * Name: LabelText
 * Desc: text for subscription label
 */
export const LabelText = styled.Text`
  text-transform: uppercase;
  letter-spacing: 0.3;
  font-weight: 600;
  font-size: ${rpx(12)}px;
  color: ${colors.darkGray};
`;
/**
 * Name: ValueText
 * Desc: text for subscription value
 */
export const ValueText = styled.Text`
  text-transform: uppercase;
  letter-spacing: 0.3;
  font-weight: 600;
  font-size: ${rpx(12)}px;
  color: ${colors.darkGray};
`;
/**
 * Name: ChildContainer
 * Desc: Left and right container
 */
export const ChildContainer = styled.View`
  flex: 0.7;
`;
/**
 * Name: TitleText
 * Desc: title for subscription row
 */
export const PriceText = styled.Text`
  font-size: ${rpx(18)}px;
  color: ${colors.greenColor};
  font-weight: 600;
`;

/**
 * Name: ChapterText
 * Desc: chapter count
 */
export const ChapterText = styled.Text`
  font-size: ${rpx(12)}px;
  color: ${colors.black};
  font-weight: 500;
  margin-left: ${rpx(5)}px;
`;

/**
 * Name: PlanTypeText
 * Desc: show plan
 */
export const PlanTypeText = styled.Text`
  font-size: ${rpx(14)}px;
  color: ${colors.black};
  font-weight: 400;
`;
/**
 * Name: ListContainer
 * Desc: render list of plan
 */
export const ListContainer = styled.View`
  flex-direction: column;
`;
/**
 * Name: ChildRightContainer
 * Desc:  right container of subscription row
 */
export const ChildRightContainer = styled.View`
  align-items: center;
  flex: 0.3;
`;
/**
 * Name: SwitchText
 * Desc:  render monthly and annually text
 */
export const SwitchText = styled.Text`
  align-items: center;
  color: ${colors.black};
  font-size: ${rpx(16)}px;
  font-weight: 500;
  padding_horizontal: ${rpx(16)}px;
`;
/**
 * Name: TickIcon
 * Desc: chapter count
 */
export const TickIcon = styled.Image`
  width: ${rpx(15)}px;
  height: ${rpx(15)}px;
`;
/**
 * Name: ChapterContainer
 * Desc: chapter count
 */
export const ChapterContainer = styled.View`
  flex-direction: row;
  margin-top: ${rpx(15)}px;
`;
/**
 * Name: SubscribedContainer
 * Desc: subscribed container
 */
export const SubscribedContainer = styled.View`
  padding-vertical: ${rpx(15)}px;
  align-items: center;
`;
/**
 * Name: NextRenewalText
 * Desc:  render next renewal text
 */
export const NextRenewalText = styled.Text`
  align-items: center;
  color: ${colors.darkGray};
  font-size: ${rpx(16)}px;
  font-weight: 500;
  padding_horizontal: ${rpx(16)}px;
  margin-top: ${rpx(10)}px;
`;
/**
 * Name: NextRenewalDateText
 * Desc:  render next renewal date text
 */
export const NextRenewalDateText = styled.Text`
  align-items: center;
  color: ${colors.black};
  font-size: ${rpx(16)}px;
  font-weight: 500;
  padding_horizontal: ${rpx(16)}px;
`;

/**
 * Name: PlanContainer
 * Desc: render plan price and access
 */
export const PlanContainer = styled.View`
  padding-vertical: ${rpx(15)}px;
  padding-horizontal: ${rpx(10)}px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightGreenColor};
  border-color: ${colors.greenColor};
  border-width: ${rpx(1)}px;
  border-radius: ${rpx(10)}px;
  width: 80%;
`;
/**
 * Name: PlanText
 * Desc: render selected plan
 */
export const PlanText = styled.Text`
  color: ${colors.greenColor};
  padding-vertical: ${rpx(12)}px;
  font-size: ${rpx(16)}px;
  font-weight: 500;
`;

/**
 * Name: UpperText
 * Desc: render selected plan
 */
export const UpperText = styled.Text`
  color: ${colors.greenColor};
  padding-vertical: ${rpx(20)}px;
  padding-horizontal: ${rpx(20)}px;
  font-size: ${rpx(24)}px;
  font-weight: 500;
  text-align: center;
`;
