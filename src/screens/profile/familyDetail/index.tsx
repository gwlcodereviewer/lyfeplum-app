/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import colors from '../../../../styles/colors';
import {keyboardType, rpx} from '../../../../styles/styleUtils';
import images from '../../../assets/images';
import PrimaryButton from '../../../components/button';
import InputBox from '../../../components/inputBox';
import {
  CHILDREN_FORM_TYPE,
  EMOJI_VALIDATION,
  MATERIAL_ICONS,
  TOAST_MESSAGE_TYPE,
} from '../../../constants/utils';
import {strings} from '../../../localization';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useGetFinalWishesMutation,
  useStoreFinalWishesInfoMutation,
} from '../../../redux/api/finalWishesApi';
import {INavigation} from '../../../types/utils';
import {
  isIOS,
  showAlert,
  showServerError,
  showToastMessage,
} from '../../../utils';
import {
  AddMoreWrapper,
  ButtonWrapper,
  DivContainer,
  Divider,
  FamilyFormHeader,
  FormHeaderView,
  FormTitle,
  InputContainer,
  LogoContainer,
  LogoImage,
  PlusText,
  RemoveWrapper,
} from './styles';
const myGlobal: any = global;

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: INavigation;
}

/**
 * Name: Final wish screen
 * Desc: Screen to render final wish UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const FamilyDetail: React.FC<Props> = (props: Props) => {
  const {
    phoneLengthError,
    ifMarriedFirst,
    ifMarriedLast,
    otherPhoneNumber,
    childFirstName,
    childLastName,
    childPhone,
    fillForm,
    saveFamilyDetail,
    familyDetail,
  } = strings;
  const {navigation} = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [marriedFirstName, setMarriedFirstName] = useState('');
  const [marriedLastName, setMarriedLastName] = useState('');
  const [marriedPhone, setMarriedPhone] = useState('');
  const [marriedPhoneError, setMarriedPhoneError] = useState('');
  const [childrenData, setChildrenData] = useState([]);
  const [
    getFinalWishes,
    {
      isLoading: getFinalWishesLoading,
      isError: isFinalWishesError,
      error: finalWishesError,
      isSuccess: finalWishesSuccess,
      data: finalFishesData,
    },
  ] = useGetFinalWishesMutation();

  const [
    storeFinalWishesInfo,
    {
      isLoading: isStoreFinalWishesLoading,
      isError: isStoreFinalWishesError,
      error: storeFinalWishesError,
      isSuccess: isStoreFinalWishesSuccess,
      data: storeFinalWishesData,
    },
  ] = useStoreFinalWishesInfoMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to call profile api
   */
  useEffect(() => {
    getFinalWishes('');
  }, []);

  /**
   * Name: useEffect
   * Desc: useEffect for get final wishes API response.
   */
  useEffect(() => {
    if (finalWishesSuccess) {
      if (finalFishesData?.status) {
        setFormData(finalFishesData.final_wishes);
        myGlobal.wishesPoints = finalFishesData?.final_wish_points;
      }
    }
    if (isFinalWishesError) {
      showServerError(finalWishesError, navigation);
    }
  }, [getFinalWishesLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for family details update API response.
   */
  useEffect(() => {
    if (isStoreFinalWishesSuccess) {
      if (storeFinalWishesData?.status) {
        setFormData(storeFinalWishesData.final_wishes);
        showToastMessage(
          strings.lyfePlum,
          storeFinalWishesData?.message,
          TOAST_MESSAGE_TYPE.success,
        );
      }
    }
    if (isStoreFinalWishesError) {
      showServerError(storeFinalWishesError, navigation);
    }
  }, [isStoreFinalWishesLoading]);

  /**
   * Name: setFormData
   * Desc: Function to set data in form from api response.
   * @param apiResponse - The api response.
   */
  const setFormData = apiResponse => {
    setFirstName(apiResponse?.first_name || '');
    setLastName(apiResponse?.last_name || '');
    setAge(apiResponse?.age || '');
    setPhone(apiResponse?.phone || '');
    setMarriedFirstName(apiResponse?.other_first_name || '');
    setMarriedLastName(apiResponse?.other_last_name || '');
    setMarriedPhone(apiResponse?.other_contact_no || '');
    const updatedData: any = [];
    const data = apiResponse?.childrens || [];
    if (data.length > 0) {
      data.map(item => {
        let obj = {
          ...item,
          children_first_name_error: '',
          children_last_name_error: '',
          children_phone_error: '',
        };
        updatedData.push(obj);
      });
      setChildrenData(updatedData);
    }
  };

  /**
   * Name: validateField
   * Desc: Function to validate input fields
   * @param {any} allField - To validate all fields, It could be true and false
   * @param {string} field - Individual field name to validate
   * @returns boolean value
   */
  const validateField = (allField = false, field?: string) => {
    let invalidFields = 0;
    if (field === otherPhoneNumber || allField) {
      if (marriedPhone.length > 0) {
        if (marriedPhone.length < 10) {
          setMarriedPhoneError(phoneLengthError);
          invalidFields++;
        } else if (marriedPhone.length > 10) {
          setMarriedPhoneError(phoneLengthError);
          invalidFields++;
        } else {
          setMarriedPhoneError('');
        }
      } else {
        setMarriedPhoneError('');
      }
    }
    if (field === otherPhoneNumber || allField) {
      if (marriedPhone.length > 0) {
        if (marriedPhone.length < 10) {
          setMarriedPhoneError(phoneLengthError);
          invalidFields++;
        } else if (marriedPhone.length > 10) {
          setMarriedPhoneError(phoneLengthError);
          invalidFields++;
        } else {
          setMarriedPhoneError('');
        }
      } else {
        setMarriedPhoneError('');
      }
    }
    return invalidFields === 0;
  };

  /**
   * Name: saveAndContinue
   * Desc: Function to save wishes and continue to another step.
   */
  const saveAndContinue = () => {
    const isValidFields = validateField(true);
    if (!isValidFields) {
      showAlert('', fillForm, strings.ok);
      return false;
    }
    const childrenFirstNameList: any = [];
    const childrenLastNameList: any = [];
    const childrenPhoneList: any = [];
    childrenData.map((item: any) => {
      childrenFirstNameList.push(item?.children_first_name);
      childrenLastNameList.push(item?.children_last_name);
      childrenPhoneList.push(item?.children_contact_no);
    });
    const requestData = {
      first_name: firstName,
      last_name: lastName,
      age,
      phone,
      other_first_name: marriedFirstName,
      other_last_name: marriedLastName,
      other_contact_no: marriedPhone,
      children_first_name: childrenFirstNameList,
      children_last_name: childrenLastNameList,
      children_contact_no: childrenPhoneList,
    };
    storeFinalWishesInfo(requestData);
  };

  /**
   * Name: renderChildrenData
   * Desc: Function to render children data UI
   */
  const renderChildrenData = () => {
    return childrenData.map((item: any, index) => {
      return (
        <React.Fragment key={'childrenList_' + index}>
          <FormHeaderView>
            <FormTitle>{`Children Details Form - ${index + 1}`}</FormTitle>
            {index !== 0 && (
              <RemoveWrapper onPress={() => callRemoveForm(index)}>
                <MaterialIcons
                  name={MATERIAL_ICONS.removeCircleOutline}
                  size={30}
                  color={colors.red}
                />
              </RemoveWrapper>
            )}
          </FormHeaderView>
          <InputBox
            value={item?.children_first_name}
            onChangeText={(text: string) =>
              addChildrenData(
                text,
                index,
                CHILDREN_FORM_TYPE.children_first_name,
              )
            }
            label={childFirstName}
            placeholder={childFirstName}
            inputKeyboardType={
              isIOS()
                ? EMOJI_VALIDATION.asciiCapable
                : EMOJI_VALIDATION.visiblePassword
            }
            errorText={item?.children_first_name_error}
            backgroundColor={colors.white}
          />
          <InputBox
            value={item?.children_last_name}
            onChangeText={(text: string) =>
              addChildrenData(
                text,
                index,
                CHILDREN_FORM_TYPE.children_last_name,
              )
            }
            label={childLastName}
            placeholder={childLastName}
            inputKeyboardType={
              isIOS()
                ? EMOJI_VALIDATION.asciiCapable
                : EMOJI_VALIDATION.visiblePassword
            }
            errorText={item?.children_last_name_error}
            backgroundColor={colors.white}
          />
          <InputBox
            value={item?.children_contact_no}
            onChangeText={(text: string) =>
              addChildrenData(
                text,
                index,
                CHILDREN_FORM_TYPE.children_contact_no,
              )
            }
            label={childPhone}
            placeholder={childPhone}
            inputKeyboardType={keyboardType.numeric}
            errorText={item?.children_phone_error}
            backgroundColor={colors.white}
          />
          {childrenData.length - 1 !== index && (
            <DivContainer>
              <Divider />
              <LogoContainer>
                <LogoImage source={images.logo} />
              </LogoContainer>
            </DivContainer>
          )}
        </React.Fragment>
      );
    });
  };

  /**
   * Name: addChildrenData
   * Desc: Function to add children data to array
   */
  const addChildrenData = (text, index, fieldType) => {
    const listData: any = childrenData.slice(0);
    let item: any = listData[index];
    item = {...item, [fieldType]: text};
    listData[index] = item;
    setChildrenData(listData);
  };

  /**
   * Name: addFormInputs
   * Desc: Function to add extra from inputs
   */
  const addFormInputs = () => {
    let data: any = childrenData.slice(0);
    const obj: any = {
      [CHILDREN_FORM_TYPE.children_first_name]: '',
      [CHILDREN_FORM_TYPE.children_last_name]: '',
      [CHILDREN_FORM_TYPE.children_contact_no]: '',
    };
    data.push(obj);
    setChildrenData(data);
  };

  /**
   * Name: callRemoveForm
   * Desc: Function to remove extra from inputs
   */
  const callRemoveForm = index => {
    let data = childrenData.slice(0);
    data.splice(index, 1);
    setChildrenData(data);
  };

  return (
    <InputContainer>
      <FamilyFormHeader>{familyDetail}</FamilyFormHeader>
      <InputBox
        value={marriedFirstName}
        onChangeText={(text: string) => setMarriedFirstName(text)}
        label={ifMarriedFirst}
        placeholder={ifMarriedFirst}
        inputKeyboardType={
          isIOS()
            ? EMOJI_VALIDATION.asciiCapable
            : EMOJI_VALIDATION.visiblePassword
        }
        backgroundColor={colors.white}
      />
      <InputBox
        value={marriedLastName}
        onChangeText={(text: string) => setMarriedLastName(text)}
        label={ifMarriedLast}
        placeholder={ifMarriedLast}
        inputKeyboardType={
          isIOS()
            ? EMOJI_VALIDATION.asciiCapable
            : EMOJI_VALIDATION.visiblePassword
        }
        backgroundColor={colors.white}
      />
      <InputBox
        value={marriedPhone}
        onChangeText={(text: string) => setMarriedPhone(text)}
        onBlur={() => validateField(false, otherPhoneNumber)}
        label={otherPhoneNumber}
        placeholder={otherPhoneNumber}
        errorText={marriedPhoneError}
        backgroundColor={colors.white}
        inputKeyboardType={keyboardType.numeric}
      />
      <DivContainer>
        <Divider />
        <LogoContainer>
          <LogoImage source={images.logo} />
        </LogoContainer>
      </DivContainer>
      {renderChildrenData()}
      <ButtonWrapper>
        <AddMoreWrapper onPress={() => addFormInputs()}>
          <PlusText>+</PlusText>
        </AddMoreWrapper>
        <PrimaryButton
          title={saveFamilyDetail}
          onPress={() => {
            saveAndContinue();
          }}
          showLoader={isStoreFinalWishesLoading}
          buttonStyle={{width: rpx(230), height: rpx(50)}}
        />
      </ButtonWrapper>
    </InputContainer>
  );
};

export default FamilyDetail;
