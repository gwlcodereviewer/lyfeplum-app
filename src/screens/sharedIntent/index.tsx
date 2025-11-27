/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {default as React, useCallback, useEffect} from 'react';
import {AppState} from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import configs from '../../configs';
import {INavigation, IShareFile} from '../../types/utils';
import {
  getAccessToken,
  intentDataLoginError,
  manageIntentData,
} from '../../utils';

/**
 * Name: SharedIntent
 * Desc: Component to manage shared intent globally
 * @param navigation - property
 */
const SharedIntent = () => {
  const navigation = useNavigation() as INavigation;

  /**
   * Name: useFocusEffect
   * Desc: useFocusEffect to call intent fetch function on focus
   */
  useFocusEffect(
    React.useCallback(() => {
      getTheIntentData();
    }, []),
  );

  /**
   * Name: getTheIntentData
   * Desc: Function to fetch the intent data
   */
  const getTheIntentData = () => {
    ReceiveSharingIntent.getReceivedFiles(
      (files: IShareFile[]) => {
        // files returns as JSON Array example
        //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
        handleIntentState(files);
      },
      // @ts-ignore
      error => {
        console.warn(error);
      },
      configs.bundleId, // share url protocol (must be unique to your app, suggest using your apple bundle id)
    );
  };

  /**
   * Name: handleIntentState
   * Desc: Function to handle the intent state
   */
  const handleIntentState = intentData => {
    getAccessToken()
      .then(token => {
        if (token !== null) {
          manageIntentData(intentData || [], navigation);
        } else {
          intentDataLoginError(navigation);
        }
      })
      .catch(() => {
        intentDataLoginError(navigation);
      });
  };

  /**
   * Name: handleAppStateChange
   * Desc: Function to handle when app comes to foreground
   */
  const handleAppStateChange = useCallback(nextAppState => {
    if (nextAppState === 'active') {
      getTheIntentData();
    }
  }, []);

  /**
   * Name: useEffect
   * Desc: useEffect to get the app state
   */
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      return subscription.remove();
    };
  }, [handleAppStateChange]);

  return <React.Fragment />;
};

export default SharedIntent;
