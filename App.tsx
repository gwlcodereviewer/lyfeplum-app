import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {LogBox, PermissionsAndroid, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {withIAPContext} from 'react-native-iap';
import Orientation from 'react-native-orientation-locker';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import {store} from './src/redux/store';
import GlobalUpload from './src/screens/GlobalUpload';
import SharedIntent from './src/screens/sharedIntent';
import {isIOS} from './src/utils';

const myGlobal: any = global;

const App = () => {
  LogBox.ignoreAllLogs();

  /**
   * Name: useEffect
   * Desc: useEffect to lock app orientation
   */
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  /**
   * Name: useEffect
   * Desc: useEffect to call on app starts
   */
  useEffect(() => {
    checkPermission();
  }, []);

  /**
   * Name: checkPermission
   * Desc: Function to ask permission from user
   */
  const checkPermission = async () => {
    if (!isIOS()) {
      myGlobal.mediaPermission = true;
      try {
        const results = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);
        if (
          results[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
            'granted' ||
          results[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted'
        ) {
          myGlobal.mediaPermission = true;
        } else {
          myGlobal.mediaPermission = false;
        }
      } catch {
        myGlobal.mediaPermission = false;
      }
    } else {
      myGlobal.mediaPermission = true;
    }
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.gestureView}>
        <NavigationContainer>
          <MainStackNavigator />
          <Toast />
          <GlobalUpload />
          <SharedIntent />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default withIAPContext(App);

const styles = StyleSheet.create({
  gestureView: {
    flex: 1,
  },
});
