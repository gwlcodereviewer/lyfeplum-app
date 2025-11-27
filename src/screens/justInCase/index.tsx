/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {ScreenWrapper} from '../../../styles/style';
import AppStatusBar from '../../components/appStatusBar';
import Header from '../../components/header';
import CustomLoader from '../../components/screenLoader';
import {strings} from '../../localization';
import {useJustInCaseMutation} from '../../redux/api/justInCaseApi';
import {showServerError} from '../../utils';
import {WebViewContainer} from './styled';
/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: any;
}

/**
 * Name: Just In Case screen
 * Desc: Screen to render just in case UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const JustInCase: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const [html, setHtml] = useState('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [justInCase, {isLoading, isError, error: apiError, isSuccess, data}] =
    useJustInCaseMutation();

  /**
   * Name: UseEffect
   * Desc: useEffect for calling Just in case
   */
  useEffect(() => {
    setRefreshing(true);
    justInCase('');
  }, []);

  /**
   * Name: UseEffect
   * Desc: useEffect for calling Just in case API and set the html value
   */
  useEffect(() => {
    if (isSuccess) {
      setHtml(data?.just_in_case);
      setRefreshing(false);
    }
    if (isError) {
      setRefreshing(false);
      showServerError(apiError, navigation);
    }
  }, [isLoading]);

  return (
    <ScreenWrapper>
      <AppStatusBar />
      <Header
        title={strings.changePassword}
        onPressLeft={() => navigation.goBack()}
      />
      {refreshing ? (
        <CustomLoader />
      ) : (
        <WebViewContainer>
          <WebView
            source={{
              html: `<html>
                <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"><style>*{color:#000; font-family: mulish,sans-serif !important; -webkit-text-size-adjust: none;} p {font-size: ${18}px; line-height: 1.5;color: #000;margin-top: 15px; padding-right: 8px; -webkit-text-size-adjust:none;}</style></head>
                 <div style="width:100%;height:auto;">
                 <body>
                 <h2 style="padding-left:12px;color:#325A4B;">${
                   strings.justInCaseHeading
                 }</h2>
                ${html}
                </body></html>`,
            }}
            showsVerticalScrollIndicator={false}
          />
        </WebViewContainer>
      )}
    </ScreenWrapper>
  );
};

export default JustInCase;
