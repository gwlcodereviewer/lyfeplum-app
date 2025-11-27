import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rh, rpx, rw} from '../../../styles/styleUtils';

const {dividerColor, labelColor} = colors;

/**
 * Name: SideMenuContainer
 * Desc: The main menu container
 */
export const SideMenuContainer = styled.SafeAreaView`
  flex: 1;
`;

/**
 * Name: ProfileContainer
 * Desc: The profile container.
 */
export const ProfileContainer = styled.View`
  height: ${rpx(60)}px;
`;

/**
 * Name: MenuItemContainer
 * Desc: The menu item container.
 */
export const MenuItemContainer = styled.View`
  width: 100%;
`;

/**
 * Name: RowView
 * Desc: The row view.
 */
export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: ${rh(20)}px;
`;

/**
 * Name: MenuItemRow
 * Desc: The menu item row view.
 */
export const MenuItemRow = styled.TouchableOpacity`
  margin-horizontal: ${rw(50)}px;
`;

/**
 * Name: MenuItemDivider
 * Desc: The menu item divider view.
 */
export const MenuItemDivider = styled.View`
  width: 100%;
  height: ${rh(1)}px;
  background-color: ${dividerColor};
  opacity: 0.15;
`;

/**
 * Name: SideMenuIcon
 * Desc: The menu icon.
 */
export const SideMenuIcon = styled.Image`
  resize-mode: center;
  width: ${rpx(28)}px;
  height: ${rpx(28)}px;
  align-items: flex-end;
  justify-content: flex-end;
  align-self: flex-end;
`;

/**
 * Name: MenuIconContainer
 * Desc: The menu icon container.
 */
export const MenuIconContainer = styled.View`
  flex: 1;
`;

/**
 * Name: MenuText
 * Desc: The menu text.
 */
export const MenuText = styled.Text`
  font-size: ${rpx(20)}px;
  line-height: ${rpx(22)}px;
  color: ${labelColor};
  margin-right: ${rw(10)}px;
  margin-left: ${rw(20)}px;
`;

/**
 * Name: LogoutButton
 * Desc: The logout button.
 */
export const LogoutButton = styled.TouchableOpacity`
  width: 60%;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: ${rh(30)}px;
`;

/**
 * Name: LogoRowContainer
 * Desc: The logo row view.
 */
export const LogoRowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding-bottom: ${rh(10)}px;
`;

/**
 * Name: LogoStartImage
 * Desc: The logo start image view.
 */
export const LogoStartImage = styled.Image`
  height: ${rpx(30)}px;
  width: ${rpx(110)}px;
  margin-left: ${rw(25)}px;
`;

/**
 * Name: LogoEndImage
 * Desc: The logo end image view.
 */
export const LogoEndImage = styled.Image`
  height: ${rpx(25)}px;
  width: ${rpx(100)}px;
  margin-left: ${rw(15)}px;
`;

/**
 * Name: CrossImageContainer
 * Desc: The cross icon container.
 */
export const CrossImageContainer = styled.TouchableOpacity`
  width: ${rpx(20)}px;
  height: ${rpx(20)}px;
  margin-horizontal: ${rw(40)}px;
  margin-top: ${rw(20)}px;
`;

/**
 * Name: VersionText
 * Desc: The text for version
 */
export const VersionText = styled.Text`
  font-size: ${rpx(14)}px;
  line-height: ${rpx(22)}px;
  color: ${labelColor};
`;

/**
 * Name: VersionView
 * Desc: The version view.
 */
export const VersionView = styled.View`
  align-items: center;
  padding-top: ${rw(80)}px;
`;
