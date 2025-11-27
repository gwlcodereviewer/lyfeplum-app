import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rh, rpx, rw} from '../../../styles/styleUtils';
import {defaultTheme} from '../../../styles/theme';

const {dodgerBlue, grey, white, black} = colors;
const {secondaryTextColor, primaryBackgroundColor} = defaultTheme;
const borderRadius = rpx(20);

/**
 * Name: ListView
 * Desc: The list card container.
 */
export const ListView = styled.View`
  padding-horizontal: ${rpx(20)}px;
  padding-vertical: ${rpx(17)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: ${rpx(1)}px;
  border-bottom-color: ${grey};
`;

/**
 * Name: CustomerBox
 * Desc: The customer box container.
 */
export const CustomerBox = styled.View`
  justify-content: center;
  flex: 1;
`;

/**
 * Name: CustomerNameTxt
 * Desc: The customer name text.
 */
export const CustomerNameTxt = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(18)}px;
  color: ${secondaryTextColor};
  text-transform: capitalize;
`;

/**
 * Name: ServiceTxt
 * Desc: The service name text.
 */
export const ServiceTxt = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(18)}px;
  color: ${dodgerBlue};
`;

/**
 * Name: ServiceBadge
 * Desc: The service name container.
 */
export const ServiceBadge = styled.View`
  padding-horizontal: ${rpx(8)}px;
  padding-vertical: ${rpx(4)}px;
  border-width: ${rpx(1)}px;
  border-color: ${grey};
  border-radius: ${rpx(5)}px;
  align-self: flex-start;
  margin-top: ${rpx(8)}px;
  margin-right: ${rpx(5)}px;
`;

/**
 * Name: ServicesView
 * Desc: The service view container.
 */
export const ServicesView = styled.View`
  flex-wrap: wrap;
`;

/**
 * Name: ModalContainer
 * Desc: The modal container.
 */
export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${colors.servicesColor};
`;

/**
 * Name: MainContainer
 * Desc: The main view container.
 */
export const MainContainer = styled.View`
  width: 100%;
  margin-top: ${rpx(200)}px;
`;

/**
 * Name: ChooseGuestContainer
 * Desc: The header container.
 */
export const ViewContainer = styled.View`
  box-shadow: 1px 0px 4px rgba(0, 0, 0, 0.06);
  background-color: ${primaryBackgroundColor};
  border-radius: ${borderRadius}px;
  padding-bottom: ${rpx(40)}px;
`;

/**
 * Name: CutterInitialName
 * Desc: The cutter initial name text.
 */
export const CutterInitialName = styled.Text`
  font-style: normal;
  font-size: ${rpx(14)}px;
  line-height: ${rpx(14)}px;
  color: ${white};
  text-transform: uppercase;
`;

/**
 * Name:  AddMoreGuest
 * Desc: The guest count text.
 */
export const AddMoreGuest = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(18)}px;
  color: ${secondaryTextColor};
  margin-left: ${rpx(20)}px;
  margin-top: ${rpx(16)}px;
`;

/**
 * Name: ListViewContainer
 * Desc: The user list container.
 */
export const ListViewContainer = styled.View`
  margin-bottom: ${rpx(16)}px;
`;

/**
 * Name: AddOnHeader
 * Desc: The add-on header container.
 */
export const AddOnHeader = styled.View`
  flex-direction: row;
  padding-vertical: ${rh(16)}px;
  padding-left: ${rw(75)}px;
`;

/**
 * Name: AddOnHeadingText
 * Desc: The add-on heading text.
 */
export const AddOnHeadingText = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: ${rpx(22)}px;
  line-height: ${rpx(32)}px;
  text-transform: uppercase;
  color: ${black};
`;

/**
 * Name: CrossContainer
 * Desc: The cross icon container.
 */
export const CrossContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  padding-right: ${rpx(20)}px;
`;
