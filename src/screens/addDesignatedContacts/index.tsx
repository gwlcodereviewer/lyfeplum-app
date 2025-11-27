import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../styles/colors';
import {ButtonWrapper, Container} from '../../../styles/style';
import PrimaryButton from '../../components/button';
import InputBox from '../../components/inputBox';
import {
  KEYBOARD_TYPE,
  MATERIAL_COMMUNITY_ICONS,
  SUPPORTED_ORIENTATIONS,
  TOAST_MESSAGE_TYPE,
} from '../../constants/utils';
import {strings} from '../../localization';
import {
  useAddDesignatedContactsMutation,
  useUpdateDesignatedContactsMutation,
} from '../../redux/api/designatedContactsApi';
import {INavigation} from '../../types/utils';
import {
  isValidEmail,
  showAlert,
  showServerError,
  showToastMessage,
} from '../../utils';
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
  navigation?: INavigation;
  visible?: boolean;
  closeModal?: any;
  onSubmit?: any;
  modalType?: string;
  data?: any;
}

/**
 * Name: AddDesignatedContact
 * Desc: Component to render add / update designated contact.
 * @param {boolean} visible - If true, then modal will be visible.
 * @param {func} closeModal - Callback function for close modal.
 * @param {func} onSubmit - Callback function for to submit data.
 * @param {string} modalType - Type of modal, add or update type.
 * @param {any} data - Data to edit contact.
 * @param {any} navigation - The navigation.
 */
const AddDesignatedContact = (props: Props) => {
  const {visible, closeModal, onSubmit, modalType, data, navigation} = props;
  const {
    addDesignatedContactsText,
    firstNameField,
    lastNameField,
    firstNameLabel,
    lastNameLabel,
    emailLabel,
    enterFirstName,
    enterLastName,
    emailField,
    addContact,
    updateContact,
  } = strings;
  const {white} = colors;
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  /**
   * Name: useEffect
   * Desc: useEffect to reset state
   */
  useEffect(() => {
    if (modalType === strings.addContactLabel) {
      setFirstName('');
      setFirstNameError('');
      setLastName('');
      setLastNameError('');
      setEmail('');
      setEmailError('');
    } else if (modalType === strings.updateContactLabel) {
      setFirstName(data?.first_name);
      setFirstNameError('');
      setLastName(data?.last_name);
      setLastNameError('');
      setEmail(data?.email);
      setEmailError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  /**
   * Name: API call
   * Desc: Add Designated contacts Mutation call
   */
  const [
    addDesignatedContacts,
    {
      isLoading: isAddContactsLoading,
      isError: isAddContactsError,
      error: addContactsError,
      isSuccess: addContactsSuccess,
      data: addContactsData,
    },
  ] = useAddDesignatedContactsMutation();

  /**
   * Name: API call
   * Desc: update Designated contacts Mutation call
   */
  const [
    updateDesignatedContacts,
    {
      isLoading: isUpdateContactsLoading,
      isError: isUpdateContactsError,
      error: updateContactsError,
      isSuccess: updateContactsSuccess,
      data: updateContactsData,
    },
  ] = useUpdateDesignatedContactsMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to handle add designated contact
   */
  useEffect(() => {
    if (addContactsSuccess) {
      if (addContactsData && addContactsData?.status) {
        onSubmit();
        showToastMessage(
          strings.lyfePlum,
          addContactsData?.message,
          TOAST_MESSAGE_TYPE.success,
        );
      } else {
        showAlert('', addContactsData?.errors, strings.ok);
      }
    }
    if (isAddContactsError) {
      showServerError(addContactsError, navigation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddContactsLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to handle update designated contact
   */
  useEffect(() => {
    if (updateContactsSuccess) {
      if (updateContactsData && updateContactsData?.status) {
        onSubmit();
        showToastMessage(
          strings.lyfePlum,
          updateContactsData?.message,
          TOAST_MESSAGE_TYPE.success,
        );
      } else {
        showToastMessage(
          strings.lyfePlum,
          updateContactsData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isUpdateContactsError) {
      showServerError(updateContactsError, navigation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateContactsLoading]);

  /**
   * Name: renderContent
   * Desc: Function to render input fields.
   * @returns JSX.Element
   */
  const renderContent = () => {
    return (
      <Container>
        <InputBox
          value={firstName}
          onChangeText={text => setFirstName(text)}
          onBlur={() => validateField(false, firstNameField)}
          label={firstNameLabel}
          placeholder={firstNameLabel}
          errorText={firstNameError}
          backgroundColor={white}
        />
        <InputBox
          value={lastName}
          onChangeText={text => setLastName(text)}
          onBlur={() => validateField(false, lastNameField)}
          label={lastNameLabel}
          placeholder={lastNameLabel}
          errorText={lastNameError}
          backgroundColor={white}
        />
        <InputBox
          value={email}
          label={emailLabel}
          placeholder={emailLabel}
          onChangeText={text => setEmail(text)}
          onBlur={() => validateField(false, emailField)}
          errorText={emailError}
          backgroundColor={white}
          inputKeyboardType={KEYBOARD_TYPE.email}
        />
        <ButtonWrapper>
          <PrimaryButton
            title={
              modalType === strings.addContactLabel ? addContact : updateContact
            }
            onPress={submitHandler}
            showLoader={
              modalType === strings.addContactLabel
                ? isAddContactsLoading
                : isUpdateContactsLoading
            }
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
        <AddOnHeadingText>{addDesignatedContactsText}</AddOnHeadingText>
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
   * Desc: Form validations
   * @param allField To validate all fields, It could be true and false
   * @param field Individual field name to validate
   * @returns check validation on form
   */
  const validateField = (allField = false, field?: string) => {
    let invalidFields = 0;
    if (field === firstNameField || allField) {
      if (firstName === '') {
        setFirstNameError(enterFirstName);
        invalidFields++;
      } else {
        setFirstNameError('');
      }
    }
    if (field === lastNameField || allField) {
      if (lastName === '') {
        setLastNameError(enterLastName);
        invalidFields++;
      } else {
        setLastNameError('');
      }
    }
    if (field === strings.emailField || allField) {
      if (email === '') {
        setEmailError(strings.pleaseEnterEmail);
        invalidFields++;
      } else if (isValidEmail(email)) {
        setEmailError(strings.enterValidEmail);
        invalidFields++;
      } else {
        setEmailError('');
      }
    }
    return invalidFields === 0;
  };

  /**
   * Name: submitHandler
   * Desc: Function to call add/update data API.
   */
  const submitHandler = () => {
    const isValidFields = validateField(true);
    if (!isValidFields) {
      return false;
    }
    if (modalType === strings.addContactLabel) {
      const requestData = {
        first_name: firstName,
        last_name: lastName,
        email,
      };
      addDesignatedContacts(requestData);
    } else if (modalType === strings.updateContactLabel) {
      const requestData = {
        id: data?.id,
        first_name: firstName,
        last_name: lastName,
        email,
      };
      updateDesignatedContacts(requestData);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'slide'}
      supportedOrientations={SUPPORTED_ORIENTATIONS}>
      <ModalContainer>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraHeight={50}>
          {renderMainView()}
        </KeyboardAwareScrollView>
      </ModalContainer>
    </Modal>
  );
};

export default AddDesignatedContact;
