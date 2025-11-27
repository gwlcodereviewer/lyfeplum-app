import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {strings} from '../localization';
import AddChapterTemplate from '../screens/addChapterTemplate';
import AddChapters from '../screens/addChapters';
import AddStory from '../screens/chapters/addStory';
import ChapterPreview from '../screens/chapters/chapterDetails';
import ForgotPassword from '../screens/forgot';
import Login from '../screens/login';
import Registration from '../screens/registration';
import Subscription from '../screens/subscription';
import {getAccessToken} from '../utils';
import {
  NAV_ADD_CHAPTERS,
  NAV_ADD_CHAPTERS_TEMPLATE,
  NAV_ADD_STORY,
  NAV_CHAPTER_PREVIEW,
  NAV_FORGOT_PASSWORD,
  NAV_HOME,
  NAV_HOME_SESSION,
  NAV_LOGIN,
  NAV_LOGIN_SESSION,
  NAV_REGISTRATION,
  NAV_SUBSCRIPTION,
} from './constants';
import DrawerNavigationStack from './drawerStackNavigator';

const myGlobal: any = global;

const Stack = createStackNavigator();

function MainStackNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  /**
   * Name: useEffect
   * Desc: useEffect to check logged in user data.
   */
  useEffect(() => {
    getAccessToken()
      .then(token => {
        if (token !== null) {
          myGlobal.tab = strings.home;
        }
        setIsLoggedIn(token != null);
      })
      .catch(error => {
        console.warn(
          'src/navigation/MainStackNavigator.tsx - useEffect -> error: ',
          error,
        );
      });

    return () => {
      setIsLoggedIn(false);
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
      }}>
      {isLoggedIn ? (
        <Stack.Screen
          name={NAV_HOME_SESSION}
          component={DrawerNavigationStack}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name={NAV_LOGIN_SESSION}
          component={Login}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name={NAV_LOGIN}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAV_HOME}
        component={DrawerNavigationStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAV_FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAV_REGISTRATION}
        component={Registration}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAV_ADD_CHAPTERS}
        component={AddChapters}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAV_CHAPTER_PREVIEW}
        component={ChapterPreview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAV_ADD_CHAPTERS_TEMPLATE}
        component={AddChapterTemplate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAV_ADD_STORY}
        component={AddStory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NAV_SUBSCRIPTION}
        component={Subscription}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
