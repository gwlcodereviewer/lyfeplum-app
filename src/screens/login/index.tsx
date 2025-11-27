/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  ButtonWrapper,
  Container,
  ScreenWrapper,
  ScrollViewContainer,
} from '../../../styles/style';

import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useDispatch} from 'react-redux';
import {Spacer} from '../../../styles/utils';
import images from '../../assets/images';
import LogoIcon from '../../assets/images/svgImages/logoIcon';
import AppStatusBar from '../../components/appStatusBar';
import PrimaryButton from '../../components/button';
import InputBox from '../../components/inputBox';
import configs from '../../configs';
import {
  ASYNC_CONST,
  KEYBOARD_TYPE,
  LOGIN_TYPES,
  PLAN_STATUS,
  TOAST_MESSAGE_TYPE,
  URL_PATHS,
} from '../../constants/utils';
import {strings} from '../../localization';
import {
  NAV_FORGOT_PASSWORD,
  NAV_HOME,
  NAV_REGISTRATION,
  NAV_SUBSCRIPTION,
} from '../../navigation/constants';
import {
  useLoginUserMutation,
  useResendUserVerificationEmailMutation,
  useSocialLoginMutation,
} from '../../redux/api/authApi';
import {
  setFamilyAdminStatus,
  setFamilyPlanStatus,
  setSubscriptionStatus,
} from '../../redux/api/subscriptionState';
import {
  isValidEmail,
  loginWithApple,
  loginWithFacebook,
  loginWithGoogle,
  setStorageItem,
  showAlert,
  showServerError,
  showToastMessage,
} from '../../utils';
import {
  BottomBannerContainer,
  BottomBannerImage,
  ClickText,
  ForgotPassLink,
  ForgotPassView,
  GrayText,
  HeaderView,
  Link,
  LinkContainer,
  LinkView,
  LoginInputView,
  MediaContainer,
  MediaIcon,
  PolicyText,
  RegistrationLink,
  RegistrationView,
  ResendVerificationLink,
  ResendVerificationLinkText,
  ResendVerificationView,
  RowCenter,
  SocialLoginText,
  SocialMediaContainer,
  TermsText,
  VersionText,
  VersionView,
} from './styled';
const myGlobal: any = global;

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: any;
}

/**
 * Name: Login screen
 * Desc: Screen to render login UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const Login: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showResendVerificationEmailLink, setShowResendVerificationEmailLink] =
    useState(false);

  /**
   * Name: API call
   * Desc: Login Mutation call
   */
  const [
    loginUser,
    {
      isLoading: isGeneralLoading,
      isError: isGeneralError,
      error: generalError,
      isSuccess: generalSuccess,
      data: generalData,
    },
  ] = useLoginUserMutation();

  /**
   * Name: API call
   * Desc: Social Login Mutation call
   */
  const [
    socialLogin,
    {
      isLoading: isSocialLoading,
      isError: isSocialError,
      error: socialError,
      isSuccess: socialSuccess,
      data: socialData,
    },
  ] = useSocialLoginMutation();

  /**
   * API Resend Verification Email Mutation call
   */
  const [
    resendUserVerificationEmail,
    {
      isLoading: isResendEmailLoading,
      isError: isResendEmailError,
      error: resendEmailapiError,
      isSuccess: isResendEmailSuccess,
      data: resendEmailData,
    },
  ] = useResendUserVerificationEmailMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to hide splash screen
   */
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  /**
   * Name: useEffect
   * Desc: useEffect to hide splash screen
   */
  useEffect(() => {
    resetState();
  }, [navigation]);

  /**
   * Name: validateField
   * Desc: Function to validate input fields
   * @param {any} allField - To validate all fields, It could be true and false
   * @param {string} field - Individual field name to validate
   * @returns check validation on form
   */
  const validateField = (allField = false, field?: string) => {
    let invalidFields = 0;
    if (field === strings.emailField || allField) {
      if (email === '') {
        setEmailError(strings.pleaseEnterUsername);
        invalidFields++;
      } else if (isValidEmail(email)) {
        setEmailError(strings.enterValidUsername);
        invalidFields++;
      } else {
        setEmailError('');
      }
    }
    if (field === strings.password || allField) {
      if (password === '') {
        setPasswordError(strings.pleaseEnterPassword);
        invalidFields++;
      } else {
        setPasswordError('');
      }
    }
    return invalidFields === 0;
  };

  /**
   * Name: useEffect
   * Desc: useEffect to handle login response
   */
  useEffect(() => {
    if (generalSuccess) {
      if (generalData && generalData?.status) {
        resetState();
        setStorageItem(ASYNC_CONST.accessToken, generalData?.token.toString());
        const isFamilyAdmin = generalData?.isFamilyPlanAdmin
          ? generalData?.isFamilyPlanAdmin
          : false;
        dispatch(setFamilyAdminStatus(isFamilyAdmin));
        const subscriptionStatus = generalData?.planStatus
          ? generalData?.planStatus
          : '';
        dispatch(setSubscriptionStatus(subscriptionStatus));
        const familyPlanStatus = generalData?.familyPlanStatus
          ? generalData?.familyPlanStatus
          : '';
        dispatch(setFamilyPlanStatus(familyPlanStatus));
        myGlobal.tab = strings.home;
        navigation?.replace(NAV_HOME);
      } else {
        if (
          typeof generalData?.isUserVerified !== 'undefined' &&
          !generalData?.isUserVerified
        ) {
          setShowResendVerificationEmailLink(true);
        } else {
          setShowResendVerificationEmailLink(false);
        }
        showAlert('', generalData?.message, strings.ok);
      }
    }
    if (isGeneralError) {
      showServerError(generalError, navigation);
    }
  }, [isGeneralLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to handle social login response
   */
  useEffect(() => {
    if (socialSuccess) {
      if (socialData && socialData?.status) {
        setStorageItem(ASYNC_CONST.accessToken, socialData?.token.toString());
        const subscriptionStatus = socialData?.planStatus
          ? socialData?.planStatus
          : '';
        dispatch(setSubscriptionStatus(subscriptionStatus));
        const isPlanExpired =
          socialData?.planStatus === PLAN_STATUS.expired ||
          socialData?.planStatus === PLAN_STATUS.notPurchased
            ? true
            : false;
        if (isPlanExpired) {
          navigation.navigate(NAV_SUBSCRIPTION, {fromSideMenu: false});
        } else {
          const isFamilyAdmin = socialData?.isFamilyPlanAdmin
            ? socialData?.isFamilyPlanAdmin
            : false;
          dispatch(setFamilyAdminStatus(isFamilyAdmin));
          const familyPlanStatus = socialData?.familyPlanStatus
            ? socialData?.familyPlanStatus
            : '';
          dispatch(setFamilyPlanStatus(familyPlanStatus));
          myGlobal.tab = strings.home;
          navigation.replace(NAV_HOME);
        }
      } else {
        showToastMessage(
          strings.lyfePlum,
          socialData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isSocialError) {
      showServerError(socialError, navigation);
    }
  }, [isSocialLoading]);

  /**
   * Name: submitHandler
   * Desc: Function for Login Form submit handler call
   * @returns Return false if all fields are not valid
   */
  const submitHandler = () => {
    const isValidFields = validateField(true);
    if (!isValidFields) {
      return false;
    }
    const requestData = {
      email: email,
      password: password,
    };

    loginUser(requestData);
  };

  /**
   * Name: resetState
   * Desc: Function to reset state
   */
  const resetState = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
  };

  /**
   * Name: onFacebookSignUp
   * Desc: Function to login with Facebook
   */
  const onFacebookSignUp = () => {
    loginWithFacebook()
      .then((res: any) => {
        if (res && !res.errorData) {
          const reqParams = {
            first_name: res?.userData?.first_name,
            last_name: res?.userData?.last_name,
            email: res.userData.email || '',
            unique_key: res.userData.id,
            token: res.accessToken,
            profile_photo: res.userData.picture.data.url,
            type: LOGIN_TYPES.fb,
          };
          socialLogin(reqParams);
        }
      })
      .catch(e => {
        console.log('loginWithFacebook eror', e);
      });
  };

  /**
   * Name: onAppleSignUp
   * Desc: Function to login with Apple
   */
  const onAppleSignUp = () => {
    loginWithApple().then((res: any) => {
      if (res) {
        const reqParams = {
          first_name: res?.fullName?.givenName || '',
          last_name: res?.fullName?.familyName || '',
          email: res?.email || '',
          unique_key: res?.user,
          token: res?.identityToken,
          type: LOGIN_TYPES.apple,
        };
        socialLogin(reqParams);
      }
    });
  };

  /**
   * Name: onGoogleSignUp
   * Desc: Function to login with Google
   */
  const onGoogleSignUp = () => {
    loginWithGoogle()
      .then((res: any) => {
        if (res && !res.errorData && res.user.email) {
          const reqParams = {
            first_name: res?.user?.givenName,
            last_name: res?.user?.familyName,
            email: res?.user?.email || '',
            unique_key: res?.user?.id,
            type: LOGIN_TYPES.gmail,
          };
          socialLogin(reqParams);
        }
      })
      .catch(error => {
        console.warn(
          'src/screens/login/index.tsx - onGoogleSignUp -> error: ',
          error,
        );
      });
  };

  /**
   * Name: useEffect
   * Desc: Handle Resend Verification Email response
   */
  useEffect(() => {
    if (isResendEmailSuccess) {
      if (resendEmailData && resendEmailData?.status) {
        showAlert('', resendEmailData?.message, strings.ok);
        setShowResendVerificationEmailLink(false);
      } else {
        setShowResendVerificationEmailLink(true);
        showAlert('', resendEmailData?.message, strings.ok);
      }
    }
    if (isResendEmailError) {
      setShowResendVerificationEmailLink(true);
      showServerError(resendEmailapiError, navigation);
    }
  }, [isResendEmailLoading]);

  /**
   * Name: resendVerificationEmail
   * Desc: Function to trigger verification email
   */
  const resendVerificationEmail = () => {
    const requestData = {
      email: email,
    };
    setShowResendVerificationEmailLink(false);
    resendUserVerificationEmail(requestData);
  };

  /**
   * Name: openLink
   * Desc: Function to open privacy policy link in in-app browser.
   */
  const openLink = async index => {
    if (await InAppBrowser.isAvailable()) {
      if (index === 1) {
        await InAppBrowser.open(URL_PATHS.privacyPolicy);
      } else {
        await InAppBrowser.open(URL_PATHS.termsAndConditions);
      }
    } else {
      if (index === 1) {
        Linking.openURL(URL_PATHS.privacyPolicy);
      } else {
        Linking.openURL(URL_PATHS.termsAndConditions);
      }
    }
  };

  return (
    <ScreenWrapper>
      <ScrollViewContainer bounces={false}>
        <Container>
          <AppStatusBar />
          <HeaderView>
            <LogoIcon />
          </HeaderView>
          <LoginInputView />
          <InputBox
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            onBlur={() => validateField(false, strings.emailField)}
            label={strings.username}
            placeholder={strings.username}
            errorText={emailError}
            inputKeyboardType={KEYBOARD_TYPE.email}
          />
          <InputBox
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            onBlur={() => validateField(false, strings.password)}
            label={strings.password}
            placeholder={strings.password}
            errorText={passwordError}
            isEncrypt={true}
            maxLength={50}
          />
          {showResendVerificationEmailLink && (
            <ResendVerificationView>
              <ResendVerificationLink onPress={() => resendVerificationEmail()}>
                <ResendVerificationLinkText>
                  {strings.resendVerificationLinkText}
                </ResendVerificationLinkText>
              </ResendVerificationLink>
            </ResendVerificationView>
          )}
          <ButtonWrapper>
            <PrimaryButton
              title={strings.login}
              onPress={() => submitHandler()}
              showLoader={isGeneralLoading || isSocialLoading}
            />
          </ButtonWrapper>
          <RegistrationView>
            <RegistrationLink
              onPress={() => navigation.navigate(NAV_REGISTRATION)}>
              <GrayText>{strings.noAccount}</GrayText>
              <ClickText>{strings.signUp}</ClickText>
            </RegistrationLink>
          </RegistrationView>
          <ForgotPassView>
            <ForgotPassLink
              onPress={() => navigation.navigate(NAV_FORGOT_PASSWORD)}>
              <GrayText>{strings.forgotPassword}</GrayText>
              <ClickText>{strings.clickHere}</ClickText>
            </ForgotPassLink>
          </ForgotPassView>
          <LinkView>
            <LinkContainer onPress={() => openLink(1)}>
              <PolicyText>{strings.privacyPolicy}</PolicyText>
            </LinkContainer>
            <LinkContainer onPress={() => openLink(2)}>
              <TermsText>{strings.termsAndConditions}</TermsText>
            </LinkContainer>
          </LinkView>
          <MediaContainer>
            <RowCenter>
              <SocialMediaContainer>
                <Link onPress={() => onFacebookSignUp()}>
                  <MediaIcon source={images.facebook} />
                  <SocialLoginText>{strings.loginWithFacebook}</SocialLoginText>
                </Link>
              </SocialMediaContainer>
              <Spacer width={10} />
              <SocialMediaContainer>
                <Link onPress={() => onGoogleSignUp()}>
                  <MediaIcon source={images.gmail} />
                  <SocialLoginText>{strings.loginWithGmail}</SocialLoginText>
                </Link>
              </SocialMediaContainer>
              {Platform.OS === 'ios' && (
                <React.Fragment>
                  <Spacer width={10} />
                  <SocialMediaContainer>
                    <Link onPress={() => onAppleSignUp()}>
                      <MediaIcon source={images.apple} />
                      <SocialLoginText>
                        {strings.loginWithApple}
                      </SocialLoginText>
                    </Link>
                  </SocialMediaContainer>
                </React.Fragment>
              )}
            </RowCenter>
          </MediaContainer>
          <BottomBannerContainer>
            <BottomBannerImage source={images.bottomBanner} />
          </BottomBannerContainer>
          <VersionView>
            <VersionText>
              {strings.version}
              {configs.appVersion}
            </VersionText>
          </VersionView>
        </Container>
      </ScrollViewContainer>
    </ScreenWrapper>
  );
};

export default Login;
