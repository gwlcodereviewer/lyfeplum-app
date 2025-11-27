/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {ButtonWrapper, Container, ScreenWrapper} from '../../../styles/style';
import {Spacer} from '../../../styles/utils';
import images from '../../assets/images';
import AppStatusBar from '../../components/appStatusBar';
import PrimaryButton from '../../components/button';
import Header from '../../components/header';
import InputBox from '../../components/inputBox';
import {
  ASYNC_CONST,
  EMOJI_VALIDATION,
  KEYBOARD_TYPE,
  LOGIN_TYPES,
  PLAN_STATUS,
  TOAST_MESSAGE_TYPE,
} from '../../constants/utils';
import {strings} from '../../localization';
import {
  NAV_HOME,
  NAV_LOGIN,
  NAV_SUBSCRIPTION,
} from '../../navigation/constants';
import {
  useRegisterUserMutation,
  useSocialLoginMutation,
} from '../../redux/api/authApi';
import {
  setFamilyAdminStatus,
  setFamilyPlanStatus,
  setSubscriptionStatus,
} from '../../redux/api/subscriptionState';
import {
  isIOS,
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
  GrayText,
  Link,
  LoginLink,
  LoginView,
  MediaContainer,
  MediaIcon,
  RowCenter,
  SocialLoginText,
  SocialMediaContainer,
  SubContainer,
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
 * Name: Registration
 * Desc: Screen to render registration UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const Registration: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [confirmPwdError, setConfirmPwdError] = useState('');
  const [referralCode, setReferralCode] = useState('');

  /**
   * Name: API call
   * Desc: Register Mutation call
   */
  const [registerUser, {isLoading, isError, error: apiError, isSuccess, data}] =
    useRegisterUserMutation();

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
   * Name: useEffect
   * Desc: useEffect to hide splash screen
   */
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  /**
   * Name: validateField
   * Desc: Function to validate input fields
   * @param {any} allField - To validate all fields, It could be true and false
   * @param {string} field - Individual field name to validate
   * @returns boolean value
   */
  const validateField = (allField = false, field?: string) => {
    let invalidFields = 0;
    if (field === strings.firstNameLabel || allField) {
      if (firstName === '') {
        setFirstNameError(strings.enterFirstName);
        invalidFields++;
      } else {
        setFirstNameError('');
      }
    }
    if (field === strings.lastNameLabel || allField) {
      if (lastName === '') {
        setLastNameError(strings.enterLastName);
        invalidFields++;
      } else {
        setLastNameError('');
      }
    }
    if (field === strings.emailAddress || allField) {
      if (email === '') {
        setEmailError(strings.pleaseEnterEmail);
        invalidFields++;
      } else if (email !== '' && isValidEmail(email)) {
        setEmailError(strings.enterValidEmail);
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
    if (field === strings.confirmPassword || allField) {
      if (confirmPwd === '') {
        setConfirmPwdError(strings.enterConfirmPassword);
        invalidFields++;
      } else if (confirmPwd !== password) {
        setConfirmPwdError(strings.passwordMustSame);
        invalidFields++;
      } else {
        setConfirmPwdError('');
      }
    }
    return invalidFields === 0;
  };

  /**
   * Name: useEffect
   * Desc: Handle Registration response
   */
  useEffect(() => {
    if (isSuccess) {
      if (data && data?.status) {
        if (
          data?.planStatus &&
          (data?.planStatus === PLAN_STATUS.active ||
            data?.planStatus === PLAN_STATUS.cancelled)
        ) {
          setStorageItem(ASYNC_CONST.accessToken, data?.token.toString());
          showAlert('', data?.message, strings.ok);
          navigation?.reset({
            index: 0,
            routes: [
              {
                name: NAV_HOME,
              },
            ],
          });
        } else {
          showAlert('', data?.message, strings.ok);
          setStorageItem(ASYNC_CONST.accessToken, data?.token.toString());
          navigation.navigate(NAV_SUBSCRIPTION, {fromSideMenu: false});
        }
      } else {
        showAlert('', data?.message, strings.ok);
      }
    }
    if (isError) {
      showServerError(apiError, navigation);
    }
  }, [isLoading]);

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
   * Desc: Registration Form submit handler call
   * @returns Return false if all fields are not valid
   */
  const submitHandler = () => {
    const isValidFields = validateField(true);
    if (!isValidFields) {
      return false;
    }
    const requestData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      referral_code: referralCode,
    };
    registerUser(requestData);
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
            type: LOGIN_TYPES.fb,
          };
          socialLogin(reqParams);
        } else {
          showToastMessage(
            strings.lyfePlum,
            strings.somethingWentWrong,
            TOAST_MESSAGE_TYPE.error,
          );
        }
      })
      .catch(error => {
        showToastMessage(strings.lyfePlum, error, TOAST_MESSAGE_TYPE.error);
      });
  };

  /**
   * Name: onAppleSignUp
   * Desc: Function to login with Apple
   */
  const onAppleSignUp = () => {
    loginWithApple()
      .then((res: any) => {
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
        } else {
          showToastMessage(
            strings.lyfePlum,
            strings.somethingWentWrong,
            TOAST_MESSAGE_TYPE.error,
          );
        }
      })
      .catch(error => {
        showToastMessage(strings.lyfePlum, error, TOAST_MESSAGE_TYPE.error);
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
        } else {
          showToastMessage(
            strings.lyfePlum,
            strings.somethingWentWrong,
            TOAST_MESSAGE_TYPE.error,
          );
        }
      })
      .catch(error => {
        showToastMessage(strings.lyfePlum, error, TOAST_MESSAGE_TYPE.error);
      });
  };

  return (
    <ScreenWrapper>
      <AppStatusBar />
      <Header
        title={strings.registration}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView bounces={false}>
        <Container>
          <SubContainer />
          <InputBox
            value={firstName}
            onChangeText={(text: string) => setFirstName(text)}
            onBlur={() => validateField(false, strings.firstNameLabel)}
            label={strings.firstNameLabel}
            placeholder={strings.firstNameLabel}
            errorText={firstNameError}
            inputKeyboardType={
              isIOS()
                ? EMOJI_VALIDATION.asciiCapable
                : EMOJI_VALIDATION.visiblePassword
            }
          />
          <InputBox
            value={lastName}
            onChangeText={(text: string) => setLastName(text)}
            onBlur={() => validateField(false, strings.lastNameLabel)}
            label={strings.lastNameLabel}
            placeholder={strings.lastNameLabel}
            errorText={lastNameError}
            inputKeyboardType={
              isIOS()
                ? EMOJI_VALIDATION.asciiCapable
                : EMOJI_VALIDATION.visiblePassword
            }
          />
          <InputBox
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            onBlur={() => validateField(false, strings.emailAddress)}
            label={strings.emailAddress}
            placeholder={strings.emailAddress}
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
          <InputBox
            value={confirmPwd}
            onChangeText={(text: string) => setConfirmPwd(text)}
            onBlur={() => validateField(false, strings.confirmPassword)}
            label={strings.confirmPassword}
            placeholder={strings.confirmPassword}
            errorText={confirmPwdError}
            isEncrypt={true}
            maxLength={50}
          />
          <InputBox
            value={referralCode}
            onChangeText={(text: string) => setReferralCode(text)}
            label={strings.referralCodeLabel}
            placeholder={strings.referralCodeLabel}
            inputKeyboardType={
              isIOS()
                ? EMOJI_VALIDATION.asciiCapable
                : EMOJI_VALIDATION.visiblePassword
            }
          />
          <ButtonWrapper>
            <PrimaryButton
              title={strings.createAccount}
              onPress={() => submitHandler()}
              showLoader={isLoading || isSocialLoading}
            />
          </ButtonWrapper>
          <LoginView>
            <LoginLink onPress={() => navigation.navigate(NAV_LOGIN)}>
              <GrayText>{strings.alreadyHaveAnAccount}</GrayText>
              <ClickText> {strings.loginSmall}</ClickText>
            </LoginLink>
          </LoginView>
          <MediaContainer>
            <RowCenter>
              <SocialMediaContainer>
                <Link onPress={() => onFacebookSignUp()}>
                  <MediaIcon source={images.facebook} />
                  <SocialLoginText>
                    {strings.signUpWithFacebook}
                  </SocialLoginText>
                </Link>
              </SocialMediaContainer>
              <Spacer width={10} />
              <SocialMediaContainer>
                <Link onPress={() => onGoogleSignUp()}>
                  <MediaIcon source={images.gmail} />
                  <SocialLoginText>{strings.signUpWithGmail}</SocialLoginText>
                </Link>
              </SocialMediaContainer>
              {isIOS() && (
                <React.Fragment>
                  <Spacer width={10} />
                  <SocialMediaContainer>
                    <Link onPress={() => onAppleSignUp()}>
                      <MediaIcon source={images.apple} />
                      <SocialLoginText>
                        {strings.signUpWithApple}
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
        </Container>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Registration;
