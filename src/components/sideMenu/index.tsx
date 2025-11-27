import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React, {useCallback, useEffect} from 'react';
import LogoIcon from '../../assets/images/svgImages/logoIcon';
import {strings} from '../../localization';
import {
  NAV_CHANGE_PASSWORD,
  NAV_FB_FEEDS,
  NAV_FINAL_WISHES,
  NAV_HOME,
  NAV_LOGIN,
  NAV_MANAGE_USERS,
  NAV_MEDIA,
  NAV_SHARE,
  NAV_SUBSCRIPTION_DRAWER,
  NAV_TAB_LIFE_CELEBRATION,
} from '../../navigation/constants';

import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';
import Cross from '../../assets/images/svgImages/cross';
import configs from '../../configs';
import {LOGIN_TYPES, PLAN_STATUS} from '../../constants/utils';
import {useLogoutUserMutation} from '../../redux/api/logoutApi';
import {
  setFamilyAdminStatus,
  setFamilyPlanStatus,
  setMaxUsers,
  setSubscriptionStatus,
} from '../../redux/api/subscriptionState';
import {setUserData} from '../../redux/api/userState';
import {RootState} from '../../redux/store';
import {clearStorage, showAlert, showServerError} from '../../utils';
import PrimaryButton from '../button';
import {
  CrossImageContainer,
  LogoRowContainer,
  LogoutButton,
  MenuIconContainer,
  MenuItemContainer,
  MenuItemDivider,
  MenuItemRow,
  MenuText,
  ProfileContainer,
  RowView,
  SideMenuContainer,
  SideMenuIcon,
  VersionText,
  VersionView,
} from './styled';

const myGlobal: any = global;

const MENU_OPTIONS = [
  {
    title: strings.changePasswordScreen,
    route: NAV_CHANGE_PASSWORD,
    icon: 'https://img.icons8.com/ios-glyphs/512/forward.png',
  },
  {
    title: strings.home,
    route: NAV_HOME,
    icon: 'https://img.icons8.com/ios-glyphs/512/forward.png',
  },
  {
    title: strings.manageUsers,
    route: NAV_MANAGE_USERS,
    icon: 'https://img.icons8.com/ios-glyphs/512/forward.png',
  },
  {
    title: strings.finalWishes,
    route: NAV_FINAL_WISHES,
    icon: 'https://img.icons8.com/ios-glyphs/512/forward.png',
  },
  // TODO: Commented as per clients request
  // {
  //   title: strings.justInCase,
  //   route: NAV_JUST_IN_CASE,
  //   icon: 'https://img.icons8.com/ios-glyphs/512/forward.png',
  // },
  {
    title: strings.lifeCelebration,
    route: NAV_TAB_LIFE_CELEBRATION,
    icon: 'https://img.icons8.com/ios-glyphs/512/forward.png',
  },
  {
    title: strings.media,
    route: NAV_MEDIA,
    icon: 'https://img.icons8.com/ios-glyphs/512/forward.png',
  },
  {
    title: strings.share,
    route: NAV_SHARE,
    icon: 'https://img.icons8.com/ios-glyphs/512/forward.png',
  },
  {
    title: strings.subscriptionsText,
    route: NAV_SUBSCRIPTION_DRAWER,
    icon: 'https://img.icons8.com/ios-glyphs/512/forward.png',
    params: {fromSideMenu: true},
  },
  {
    title: strings.facebookFeeds,
    route: NAV_FB_FEEDS,
    icon: 'https://img.icons8.com/ios-glyphs/512/forward.png',
  },
];

/**
 * Name: SideMenu
 * desc: Drawer/Side menu UI
 */
const SideMenu: React.FC<DrawerContentComponentProps> = (props: any) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const isFamilyAdmin = useSelector(
    (state: RootState) => state.subscription.isFamilyAdmin,
  );
  const subscriptionStatus = useSelector(
    (state: RootState) => state.subscription.subscriptionStatus,
  );
  const userData = useSelector((state: RootState) => state.user.userData);

  /**
   * Name: API call
   * Desc: Login Mutation call
   */
  const [logoutUser, {isLoading, isError, error, isSuccess, data}] =
    useLogoutUserMutation();

  /**
   * Name: clearReduxStore
   * Desc: Function to clear redux store on logout
   */
  const clearReduxStore = () => {
    const userDetails = {
      id: 0,
      profile_photo_url: '',
      cover_image: '',
      social_type: '',
    };
    dispatch(setUserData(userDetails));
    dispatch(setSubscriptionStatus(''));
    dispatch(setFamilyAdminStatus(false));
    dispatch(setFamilyPlanStatus(''));
    dispatch(setMaxUsers(0));
  };

  /**
   * Name: useEffect
   * Desc: useEffect to handle logout response
   */
  useEffect(() => {
    if (isSuccess) {
      if (data && data?.status) {
        clearStorage();
        clearReduxStore();
        navigation.closeDrawer();
        navigation?.reset({
          index: 0,
          routes: [
            {
              name: NAV_LOGIN,
            },
          ],
        });
      } else {
        showAlert('', data?.message, strings.ok);
      }
    }
    if (isError) {
      showServerError(error, navigation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  /**
   * desc: common method to navigate to other screen
   * @param route
   */
  const navigateTo = (navData: any) => {
    if (navData?.route === NAV_HOME) {
      myGlobal.tab = strings.home;
      navigation?.reset({
        index: 0,
        routes: [
          {
            name: NAV_HOME,
          },
        ],
      });
    } else if (navData?.route === NAV_FINAL_WISHES) {
      myGlobal.tab = strings.finalWishes;
      navigation?.reset({
        index: 0,
        routes: [
          {
            name: NAV_HOME,
          },
        ],
      });
    } else if (navData?.route === NAV_TAB_LIFE_CELEBRATION) {
      myGlobal.tab = strings.lifeCelebration;
      navigation?.reset({
        index: 0,
        routes: [
          {
            name: NAV_HOME,
          },
        ],
      });
    } else {
      if (navData?.params) {
        navigation?.navigate(navData?.route, navData?.params);
      } else {
        navigation?.navigate(navData?.route);
      }
    }
  };

  /**
   * desc: method to logout user
   */
  const onLogout = () => {
    logoutUser('');
  };

  /**
   * desc: method to handle menu option on press event
   * @param optionObj
   */
  const handleOnPress = optionObj => {
    closeNavigationDrawer();
    navigateTo(optionObj);
  };

  /**
   * Name: closeNavigationDrawer
   * Desc: Function to close the navigation drawer.
   */
  const closeNavigationDrawer = () => {
    navigation.closeDrawer();
  };

  /**
   * Name: renderMenuOption
   * desc: method to render menu option UI
   * @returns JSX element
   */
  const renderMenuOption = useCallback(() => {
    return MENU_OPTIONS.map((item, index) => {
      if (item?.route === NAV_CHANGE_PASSWORD) {
        if (
          userData.social_type !== LOGIN_TYPES.google &&
          userData.social_type !== LOGIN_TYPES.facebook &&
          userData.social_type !== LOGIN_TYPES.apple
        ) {
          return (
            <MenuItemRow
              key={`menuOption${index}`}
              onPress={() => handleOnPress(item)}>
              <RowView>
                <MenuText>{item.title}</MenuText>
                <MenuIconContainer>
                  <SideMenuIcon source={{uri: item.icon}} />
                </MenuIconContainer>
              </RowView>
              {index !== MENU_OPTIONS.length - 1 && <MenuItemDivider />}
            </MenuItemRow>
          );
        }
        return <React.Fragment key={`menuOption${index}`} />;
      } else if (item?.route === NAV_FB_FEEDS) {
        return (
          <MenuItemRow
            key={`menuOption${index}`}
            onPress={() => handleOnPress(item)}>
            <RowView>
              <MenuText>{item.title}</MenuText>
              <MenuIconContainer>
                <SideMenuIcon source={{uri: item.icon}} />
              </MenuIconContainer>
            </RowView>
            {index !== MENU_OPTIONS.length - 1 && <MenuItemDivider />}
          </MenuItemRow>
        );
      } else if (item?.route === NAV_MANAGE_USERS) {
        if (isFamilyAdmin && subscriptionStatus !== PLAN_STATUS.expired) {
          <MenuItemRow
            key={`menuOption${index}`}
            onPress={() => handleOnPress(item)}>
            <RowView>
              <MenuText>
                {item.title}
                {userData.social_type}
              </MenuText>
              <MenuIconContainer>
                <SideMenuIcon source={{uri: item.icon}} />
              </MenuIconContainer>
            </RowView>
            {index !== MENU_OPTIONS.length - 1 && <MenuItemDivider />}
          </MenuItemRow>;
        } else {
          return <React.Fragment key={`menuOption${index}`} />;
        }
      }
      return (
        <MenuItemRow
          key={`menuOption${index}`}
          onPress={() => handleOnPress(item)}>
          <RowView>
            <MenuText>{item.title}</MenuText>
            <MenuIconContainer>
              <SideMenuIcon source={{uri: item.icon}} />
            </MenuIconContainer>
          </RowView>
          {index !== MENU_OPTIONS.length - 1 && <MenuItemDivider />}
        </MenuItemRow>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, isFamilyAdmin, subscriptionStatus]);

  return (
    <SideMenuContainer>
      <DrawerContentScrollView>
        <ProfileContainer>
          <LogoRowContainer>
            <CrossImageContainer onPress={() => closeNavigationDrawer()}>
              <Cross />
            </CrossImageContainer>
            <LogoIcon width={180} />
          </LogoRowContainer>
          <MenuItemDivider />
        </ProfileContainer>
        <MenuItemContainer>{renderMenuOption()}</MenuItemContainer>
        <LogoutButton onPress={() => onLogout()}>
          <PrimaryButton
            title={strings.logout}
            onPress={() => onLogout()}
            showLoader={isLoading}
            buttonStyle={{
              height: rpx(45),
              backgroundColor: colors.greenColor,
              borderColor: colors.greenColor,
              width: rpx(150),
            }}
          />
        </LogoutButton>
        <VersionView>
          <VersionText>
            {strings.version}
            {configs.appVersion}
          </VersionText>
        </VersionView>
      </DrawerContentScrollView>
    </SideMenuContainer>
  );
};

export default SideMenu;
