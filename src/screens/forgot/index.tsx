import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {ButtonWrapper, Container, ScreenWrapper} from '../../../styles/style';
import AppStatusBar from '../../components/appStatusBar';
import PrimaryButton from '../../components/button';
import Header from '../../components/header';
import InputBox from '../../components/inputBox';
import {KEYBOARD_TYPE} from '../../constants/utils';
import {strings} from '../../localization';
import {NAV_LOGIN} from '../../navigation/constants';
import {useForgotPasswordMutation} from '../../redux/api/authApi';
import {isValidEmail, showAlert, showServerError} from '../../utils';
import {
  BaseTitle,
  ClickText,
  GrayText,
  HeaderTitle,
  LoginLink,
  LoginView,
} from './styled';

/**
 * Name: ForgotPassword screen
 * Desc: Screen to render ForgotPassword UI
 * @param {any} navigation property
 * @returns JSX element
 */
const ForgotPassword = (props: any) => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [
    forgotPassword,
    {isLoading, isError, error: apiError, isSuccess, data},
  ] = useForgotPasswordMutation();

  /**
   * Name: validateField
   * Desc: Form validations
   * @param allField To validate all fields, It could be true and false
   * @param field Individual field name to validate
   * @returns check validation on form
   */
  const validateField = (allField = true, field?: string) => {
    let invalidFields = 0;
    if (field === strings.emailLabel || allField) {
      if (email === '') {
        setEmailError(strings.pleaseEnterEmail);
        invalidFields++;
      } else {
        if (field === strings.emailLabel || allField) {
          if (email !== '' && isValidEmail(email)) {
            setEmailError(strings.enterValidEmail);
            invalidFields++;
          } else {
            setEmailError('');
          }
        }
      }
    }
    return invalidFields === 0;
  };

  /**
   * Name: useEffect
   * Desc: Handle forgotPassword response
   */
  useEffect(() => {
    if (isSuccess) {
      if (data && data.status) {
        showAlert('', data.message, strings.ok);
        setEmail('');
        navigation.navigate(NAV_LOGIN);
      } else {
        showAlert('', data?.message, strings.ok);
      }
    }
    if (isError) {
      showServerError(apiError, navigation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  /**
   * Name: submitForm
   * Desc: ForgotPassword Form submit handler call
   * @returns Naviagte to login
   */
  const submitForm = () => {
    const isValidFields = validateField(true);
    if (!isValidFields) {
      return false;
    }
    const requestData = {
      email: email,
    };
    forgotPassword(requestData);
  };

  return (
    <ScreenWrapper>
      <AppStatusBar />
      <Header
        title={strings.forgotPwd}
        onPressLeft={() => navigation.goBack()}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" bounces={false}>
        <Container>
          <HeaderTitle>{strings.forgotPwd}</HeaderTitle>
          <BaseTitle>{strings.forgotPasswordTitle}</BaseTitle>
          <InputBox
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            onBlur={() => validateField(false, strings.emailLabel)}
            label={strings.emailLabel}
            placeholder={strings.emailLabel}
            errorText={emailError}
            inputKeyboardType={KEYBOARD_TYPE.email}
          />
          <ButtonWrapper>
            <PrimaryButton
              title={strings.send}
              onPress={() => submitForm()}
              showLoader={isLoading}
            />
          </ButtonWrapper>
          <LoginView>
            <LoginLink onPress={() => navigation.navigate(NAV_LOGIN)}>
              <GrayText>{strings.backTo}</GrayText>
              <ClickText> {strings.loginSmall}</ClickText>
            </LoginLink>
          </LoginView>
        </Container>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ForgotPassword;
