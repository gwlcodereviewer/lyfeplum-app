import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors';
import {defaultTheme} from '../../styles/theme';
import images from '../assets/images';
import ChapterIcon from '../assets/images/svgImages/chapterIcon';
import FinalWishIcon from '../assets/images/svgImages/finalWishIcon';
import HomeIcon from '../assets/images/svgImages/homeIcon';
import LifeCelebrationIcon from '../assets/images/svgImages/lifeCelebration';
import {strings} from '../localization';
import {RootState} from '../redux/store';
import ChangePassword from '../screens/changePassword';
import Chapters from '../screens/chapters';
import FbFeeds from '../screens/fbFeeds';
import FinalWishesTwo from '../screens/finalWishes/finalWishesTwo';
import StepThree from '../screens/finalWishes/stepThree';
import WishDetails from '../screens/finalWishes/wishesDetails';
import JustInCase from '../screens/justInCase';
import LifeCelebration from '../screens/lifeCelebration';
import ManageUsersScreen from '../screens/manageUsers';
import Media from '../screens/media';
import Profile from '../screens/profile';
import {ProfileBottomImage} from '../screens/profile/styled';
import Share from '../screens/share';
import Subscription from '../screens/subscription';
import {
  NAV_CHANGE_PASSWORD,
  NAV_FB_FEEDS,
  NAV_FINAL_WISHES_TWO,
  NAV_JUST_IN_CASE,
  NAV_MANAGE_USERS,
  NAV_MEDIA,
  NAV_SHARE,
  NAV_STEP_THREE,
  NAV_SUBSCRIPTION_DRAWER,
  NAV_WISHES_DETAILS,
} from './constants';

const myGlobal: any = global;
const Tab = createBottomTabNavigator();
const WishStack = createNativeStackNavigator();

/**
 * Name: WishStackScreen
 * Desc: Function to call final wish stack navigation
 */
function WishStackScreen() {
  return (
    <WishStack.Navigator>
      {/* <WishStack.Screen
        name={NAV_FINAL_WISHES}
        component={FinalWishes}
        options={{headerShown: false}}
      /> */}
      <WishStack.Screen
        name={NAV_FINAL_WISHES_TWO}
        component={FinalWishesTwo}
        options={{headerShown: false}}
      />
      <WishStack.Screen
        name={NAV_STEP_THREE}
        component={StepThree}
        options={{headerShown: false}}
      />
      <WishStack.Screen
        name={NAV_WISHES_DETAILS}
        component={WishDetails}
        options={{headerShown: false}}
      />
    </WishStack.Navigator>
  );
}

/**
 * Name: TabStackNavigator
 * Desc: used for managing the app's screens bottom tab stack/routes
 */
const TabStackNavigator = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  let hasNotch = DeviceInfo.hasNotch();
  const [userProfileUri, setUserProfileUri] = useState<string>('');

  /**
   * Name: useEffect
   * Desc: useEffect for get profile API response.
   */
  useEffect(() => {
    if (userData) {
      setUserProfileUri(userData.profile_photo_url);
    } else {
      setUserProfileUri('');
    }
  }, [userData]);

  /**
   * Name: getTabBarLabel
   * Desc: Function to render tab bar label
   * @returns JSX element
   */
  const getTabBarLabel = (name, focused) => {
    return <Text style={styles({focused, hasNotch}).tabStyling}>{name}</Text>;
  };

  return (
    <Tab.Navigator
      initialRouteName={myGlobal.tab}
      screenOptions={{
        tabBarStyle: {
          height: hasNotch ? 100 : 80,
          paddingLeft: 10,
          paddingRight: 10,
        },
        tabBarItemStyle: {
          borderLeftWidth: 1,
          borderLeftColor: defaultTheme.defaultTab,
        },
        tabBarLabelStyle: {
          color: defaultTheme.defaultTabLabelColor,
          fontSize: 10,
        },
      }}>
      <Tab.Screen
        name={strings.chapters}
        component={Chapters}
        options={{
          tabBarLabel: ({focused}) => {
            return getTabBarLabel(strings.chapters, focused);
          },
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <ChapterIcon color={colors.black} strokeColor={colors.black} />
            ) : (
              <ChapterIcon
                color={colors.darkGray}
                strokeColor={colors.darkGray}
              />
            );
          },
          tabBarItemStyle: {
            borderLeftColor: colors.white,
            borderLeftWidth: 0,
          },
        }}
        listeners={() => ({
          tabPress: () => {
            myGlobal.tab = strings.chapters;
          },
        })}
      />
      <Tab.Screen
        name={strings.finalWishes}
        component={WishStackScreen}
        options={{
          tabBarLabel: ({focused}) => {
            return getTabBarLabel(strings.finalWishes, focused);
          },
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => {
            return focused ? (
              <FinalWishIcon color={colors.black} />
            ) : (
              <FinalWishIcon color={colors.darkGray} />
            );
          },
        }}
        listeners={() => ({
          tabPress: () => {
            myGlobal.tab = strings.finalWishes;
          },
        })}
      />
      <Tab.Screen
        name={strings.home}
        component={Chapters}
        options={{
          tabBarLabel: ({focused}) => {
            return getTabBarLabel(strings.home, focused);
          },
          tabBarIcon: ({focused}) => {
            return focused ? (
              <HomeIcon color={colors.black} strokeColor={colors.black} />
            ) : (
              <HomeIcon color={colors.white} strokeColor={colors.darkGray} />
            );
          },
          headerShown: false,
        }}
        listeners={() => ({
          tabPress: () => {
            myGlobal.tab = strings.home;
          },
        })}
      />
      <Tab.Screen
        name={strings.lifeCelebration}
        component={LifeCelebration}
        options={{
          tabBarLabel: ({focused}) => {
            return getTabBarLabel(strings.lifeCelebration, focused);
          },
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return focused ? (
              <LifeCelebrationIcon color={colors.black} />
            ) : (
              <LifeCelebrationIcon color={colors.darkGray} />
            );
          },
        }}
        listeners={() => ({
          tabPress: () => {
            myGlobal.tab = strings.lifeCelebration;
          },
        })}
      />
      <Tab.Screen
        name={strings.profile}
        component={Profile}
        options={{
          tabBarLabel: ({focused}) => {
            return getTabBarLabel(strings.profile, focused);
          },
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <ProfileBottomImage
              focused={focused}
              source={
                userProfileUri
                  ? {
                      uri: userProfileUri,
                    }
                  : images.defaultAvatar
              }
            />
          ),
        }}
        listeners={() => ({
          tabPress: () => {
            myGlobal.tab = strings.profile;
          },
        })}
      />
      <Tab.Screen
        name={NAV_CHANGE_PASSWORD}
        component={ChangePassword}
        options={{
          tabBarItemStyle: {display: 'none'},
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={NAV_FB_FEEDS}
        component={FbFeeds}
        options={{
          tabBarItemStyle: {display: 'none'},
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={NAV_JUST_IN_CASE}
        component={JustInCase}
        options={{
          tabBarItemStyle: {display: 'none'},
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={NAV_MEDIA}
        component={Media}
        options={{
          tabBarItemStyle: {display: 'none'},
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={NAV_SHARE}
        component={Share}
        options={{
          tabBarItemStyle: {display: 'none'},
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={NAV_MANAGE_USERS}
        component={ManageUsersScreen}
        options={{
          tabBarItemStyle: {display: 'none'},
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={NAV_SUBSCRIPTION_DRAWER}
        component={Subscription}
        options={{
          tabBarItemStyle: {display: 'none'},
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStackNavigator;

const styles = props =>
  StyleSheet.create({
    tabStyling: {
      fontSize: 10,
      textAlign: 'center',
      color: props.focused ? colors.black : colors.darkGray,
      paddingBottom: props.hasNotch ? 0 : 10,
    },
  });
