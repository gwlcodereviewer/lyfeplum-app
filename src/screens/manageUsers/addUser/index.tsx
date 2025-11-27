import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Modal, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../../styles/colors';
import {ButtonWrapper, Container} from '../../../../styles/style';
import PrimaryButton from '../../../components/button';
import InputBox from '../../../components/inputBox';
import {
  KEYBOARD_TYPE,
  MATERIAL_COMMUNITY_ICONS,
  SUPPORTED_ORIENTATIONS,
} from '../../../constants/utils';
import {strings} from '../../../localization';
import {isIOS, isValidEmail} from '../../../utils';
import {
  AddOnHeader,
  AddOnHeadingText,
  CrossContainer,
  MainContainer,
  ModalContainer,
  ViewContainer,
} from './styled';

/**
 * Name: Props
 * Desc: Props type declaration
 */
interface Props {
  visible: boolean;
  closeModal: () => void;
  onSubmit: (email: string) => void;
  isLoading: boolean;
}

/**
 * Name: AddUser
 * Desc: Component to add user UI.
 * @param {boolean} visible - If true, then modal will be visible.
 * @param {func} closeModal - Callback function for close modal.
 * @param {func} onSubmit - Callback function for to submit data.
 * @param {boolean} isLoading - to show loader
 */
const AddUser = (props: Props) => {
  const {visible, closeModal, onSubmit, isLoading} = props;
  const {emailLabel, add, inviteUser, pleaseEnterEmail, enterValidEmail} =
    strings;
  const {white} = colors;
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  /**
   * Name: useEffect
   * Desc: useEffect to reset state
   */
  useEffect(() => {
    setEmail('');
    setEmailError('');
  }, [visible]);

  /**
   * Name: renderContent
   * Desc: Function to render input fields.
   * @returns JSX.Element
   */
  const renderContent = () => {
    return (
      <Container>
        <InputBox
          value={email}
          label={emailLabel}
          placeholder={emailLabel}
          onChangeText={text => setEmail(text)}
          onBlur={() => validateField()}
          errorText={emailError}
          backgroundColor={white}
          inputKeyboardType={KEYBOARD_TYPE.email}
        />
        <ButtonWrapper>
          <PrimaryButton
            title={add}
            onPress={submitHandler}
            showLoader={isLoading}
          />
        </ButtonWrapper>
      </Container>
    );
  };

  /**
   * Name: renderHeader
   * Desc: Function to render header.
   * @returns JSX.Element
   */
  const renderHeader = () => {
    return (
      <AddOnHeader>
        <AddOnHeadingText>{inviteUser}</AddOnHeadingText>
        <CrossContainer onPress={() => closeModal()}>
          <MaterialCommunityIcons
            name={MATERIAL_COMMUNITY_ICONS.close}
            size={25}
            color={colors.black}
          />
        </CrossContainer>
      </AddOnHeader>
    );
  };

  /**
   * Name: renderMainView
   * Desc: Function to render main view.
   * @returns JSX.Element
   */
  const renderMainView = () => {
    return (
      <MainContainer>
        <ViewContainer>
          {renderHeader()}
          {renderContent()}
        </ViewContainer>
      </MainContainer>
    );
  };

  /**
   * Name: validateField
   * Desc: Function to validate email
   * @returns check validation on form
   */
  const validateField = () => {
    let invalidFields = 0;
    if (email === '') {
      setEmailError(pleaseEnterEmail);
      invalidFields++;
    } else if (isValidEmail(email)) {
      setEmailError(enterValidEmail);
      invalidFields++;
    } else {
      setEmailError('');
    }
    return invalidFields === 0;
  };

  /**
   * Name: submitHandler
   * Desc: Function to call add user API.
   */
  const submitHandler = () => {
    const isValidFields = validateField();
    if (!isValidFields) {
      return false;
    }
    onSubmit(email);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'slide'}
      supportedOrientations={SUPPORTED_ORIENTATIONS}>
      <KeyboardAvoidingView
        behavior={isIOS() ? 'padding' : undefined}
        enabled
        style={styles.scrollStyle}>
        <ModalContainer>{renderMainView()}</ModalContainer>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
  },
});
