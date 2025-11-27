import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {ButtonWrapper, Container, ScreenWrapper} from '../../../styles/style';
import {Spacer} from '../../../styles/utils';
import AppStatusBar from '../../components/appStatusBar';
import PrimaryButton from '../../components/button';
import InputBox from '../../components/inputBox';
import {strings} from '../../localization';
import {useChangePasswordMutation} from '../../redux/api/changePasswordApi';
import {showAlert, showServerError} from '../../utils';

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: any;
}

/**
 * Name: Change Password screen
 * Desc: Screen to render Change Password UI
 * @param {any} navigation property
 * @returns JSX element
 */
const ChangePassword: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

  const [changePassword, {isLoading, isError, error: apiError, data}] =
    useChangePasswordMutation();

  /**
   * Name: validateField
   * Desc: Form validations
   * @param allField To validate all fields, It could be true and false
   * @param field Individual field name to validate
   * @returns check validation on form
   */
  const validateField = (allField = true, field?: string) => {
    let invalidFields = 0;
    if (field === strings.currentPassword || allField) {
      if (currentPassword === '') {
        setCurrentPasswordError(strings.enterCurrentPassword);
        invalidFields++;
      } else {
        setCurrentPasswordError('');
      }
    }
    if (field === strings.newPassword || allField) {
      if (newPassword === '') {
        setNewPasswordError(strings.enterNewPassword);
        invalidFields++;
      } else if (newPassword === currentPassword) {
        setNewPasswordError(strings.currentAndNewCannotBeSame);
        invalidFields++;
      } else {
        setNewPasswordError('');
      }
    }

    if (field === strings.confirmNewPassword || allField) {
      if (confirmNewPassword === '') {
        setConfirmNewPasswordError(strings.enterConfirmNewPassword);
        invalidFields++;
      } else if (confirmNewPassword !== newPassword) {
        setConfirmNewPasswordError(strings.newConfirmDoNotMatch);
        invalidFields++;
      } else {
        setConfirmNewPasswordError('');
      }
    }

    return invalidFields === 0;
  };

  /**
   * Name: submitForm
   * Desc: Password Change Form submit handler call
   * @returns
   */
  const submitForm = () => {
    const isValidFields = validateField(true);
    if (!isValidFields) {
      return false;
    }
    const requestData = {
      current_password: currentPassword,
      new_password: newPassword,
      new_confirm_password: confirmNewPassword,
    };
    changePassword(requestData);
  };

  /**
   * Name: useEffect
   * Desc: useEffect for showing Alert for successful change
   */
  useEffect(() => {
    if (data) {
      showAlert('', data.message, strings.ok);
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    if (isError) {
      showServerError(apiError, navigation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <ScreenWrapper>
      <AppStatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic" bounces={false}>
        <Container>
          <Spacer height={20} />
          <InputBox
            value={currentPassword}
            onChangeText={(text: string) => setCurrentPassword(text)}
            onBlur={() => validateField(false, strings.currentPassword)}
            label={strings.currentPassword}
            placeholder={strings.currentPassword}
            errorText={currentPasswordError}
            isEncrypt={true}
            maxLength={50}
          />
          <InputBox
            value={newPassword}
            onChangeText={(text: string) => setNewPassword(text)}
            onBlur={() => validateField(false, strings.newPassword)}
            label={strings.newPassword}
            placeholder={strings.newPassword}
            errorText={newPasswordError}
            isEncrypt={true}
            maxLength={50}
          />
          <InputBox
            value={confirmNewPassword}
            onChangeText={(text: string) => setConfirmNewPassword(text)}
            onBlur={() => validateField(false, strings.confirmNewPassword)}
            label={strings.confirmNewPassword}
            placeholder={strings.confirmNewPassword}
            errorText={confirmNewPasswordError}
            isEncrypt={true}
            maxLength={50}
          />
          <ButtonWrapper>
            <PrimaryButton
              title={strings.updatePassword}
              onPress={() => submitForm()}
              showLoader={isLoading}
            />
          </ButtonWrapper>
        </Container>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ChangePassword;
