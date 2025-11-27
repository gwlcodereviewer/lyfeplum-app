/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {ScreenWrapper, ScrollViewContainer} from '../../../styles/style';
import {keyboardType, rpx} from '../../../styles/styleUtils';
import images from '../../assets/images';
import PrimaryButton from '../../components/button';
import InputBox from '../../components/inputBox';
import CustomLoader from '../../components/screenLoader';
import {
  CHILDREN_FORM_TYPE,
  EMOJI_VALIDATION,
  FINAL_WISH_SLAB,
  PLAN_STATUS,
} from '../../constants/utils';
import {strings} from '../../localization';
import {NAV_FINAL_WISHES_TWO} from '../../navigation/constants';
import {
  useGetFinalWishesMutation,
  useUpdateFinalWishesMutation,
} from '../../redux/api/finalWishesApi';
import {RootState} from '../../redux/store';
import {INavigation} from '../../types/utils';
import {
  getFinalWishBadge,
  isIOS,
  isValidAge,
  showAlert,
  showServerError,
  subscriptionAlert,
} from '../../utils';
import {
  AddMoreWrapper,
  BadgeContainer,
  BadgeImage,
  ButtonWrapper,
  DivContainer,
  Divider,
  FunMessageTxt,
  HeaderContainer,
  HeaderText,
  InformationTxt,
  InputContainer,
  LetsStartTxt,
  LogoContainer,
  LogoImage,
  PointsContainer,
  PointsText,
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
const FinalWishes: React.FC<Props> = (props: Props) => {
  const {
    letsStartByGettingToKnowYou,
    finalWishes,
    weNeedALLittleInformation,
    ageTxt,
    phoneTxt,
    firstNameLabel,
    lastNameLabel,
    enterLastName,
    enterFirstName,
    enterPhone,
    phoneLengthError,
    ifMarriedFirst,
    ifMarriedLast,
    otherPhoneNumber,
    childFirstName,
    childLastName,
    childPhone,
    saveContinue,
    sections,
    removeText,
    addMore,
    enterAge,
    validAge,
    fillForm,
  } = strings;
  const {navigation} = props;
  const subscriptionStatus = useSelector(
    (state: RootState) => state.subscription.subscriptionStatus,
  );
  const isSubscriptionExpired =
    subscriptionStatus === PLAN_STATUS.expired ||
    subscriptionStatus === PLAN_STATUS.notPurchased
      ? true
      : false;
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [marriedFirstName, setMarriedFirstName] = useState('');
  const [marriedLastName, setMarriedLastName] = useState('');
  const [marriedPhone, setMarriedPhone] = useState('');
  const [marriedPhoneError, setMarriedPhoneError] = useState('');
  const [childrenData, setChildrenData] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [ageError, setAgeError] = useState('');

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
    updateFinalWishes,
    {
      isLoading: updateWishesLoading,
      isError: isUpdateWishesError,
      error: updateWishesError,
      isSuccess: updateWishesSuccess,
      data: updatedWishesData,
    },
  ] = useUpdateFinalWishesMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to call profile api
   */
  useEffect(() => {
    setRefreshing(true);
    getFinalWishes('');
  }, []);

  /**
   * Name: useEffect
   * Desc: useEffect to call  api on navigation
   */
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      setRefreshing(true);
      getFinalWishes('');
    });
    return unsubscribe;
  }, [navigation]);

  /**
   * Name: useEffect
   * Desc: useEffect for get final wishes API response.
   */
  useEffect(() => {
    if (finalWishesSuccess) {
      if (finalFishesData?.status) {
        setFormData(finalFishesData.final_wishes);
        myGlobal.wishesPoints = finalFishesData?.final_wish_points;
        setRefreshing(false);
      }
    }
    if (isFinalWishesError) {
      setRefreshing(false);
      showServerError(finalWishesError, navigation);
    }
  }, [getFinalWishesLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for update final wishes API response.
   */
  useEffect(() => {
    if (updateWishesSuccess) {
      if (updatedWishesData?.status) {
        setFormData(updatedWishesData.final_wishes);
        navigation?.navigate(NAV_FINAL_WISHES_TWO);
      }
    }
    if (isUpdateWishesError) {
      showServerError(updateWishesError, navigation);
    }
  }, [updateWishesLoading]);

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
    if (field === firstNameLabel || allField) {
      if (firstName === '') {
        setFirstNameError(enterFirstName);
        invalidFields++;
      } else {
        setFirstNameError('');
      }
    }
    if (field === lastNameLabel || allField) {
      if (lastName === '') {
        setLastNameError(enterLastName);
        invalidFields++;
      } else {
        setLastNameError('');
      }
    }
    if (field === phoneTxt || allField) {
      if (phone === '') {
        setPhoneError(enterPhone);
        invalidFields++;
      } else if (phone.length < 10) {
        setPhoneError(phoneLengthError);
        invalidFields++;
      } else if (phone.length > 10) {
        setPhoneError(phoneLengthError);
        invalidFields++;
      } else {
        setPhoneError('');
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
    if (field === ageTxt || allField) {
      if (age === '') {
        setAgeError(enterAge);
        invalidFields++;
      } else if (isValidAge(age)) {
        setAgeError(validAge);
        invalidFields++;
      } else if (parseInt(age, 10) > 100 || parseInt(age, 10) === 0) {
        setAgeError(validAge);
        invalidFields++;
      } else {
        setAgeError('');
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
    updateFinalWishes(requestData);
  };

  /**
   * Name: renderChildrenData
   * Desc: Function to render children data UI
   */
  const renderChildrenData = () => {
    return childrenData.map((item: any, index) => {
      return (
        <React.Fragment key={'childrenList_' + index}>
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
          />
          {index !== 0 && (
            <RemoveWrapper>
              <PrimaryButton
                title={removeText}
                onPress={() => callRemoveForm(index)}
                buttonStyle={{
                  height: rpx(40),
                }}
              />
            </RemoveWrapper>
          )}
          <DivContainer>
            <Divider />
            <LogoContainer>
              <LogoImage source={images.logo} />
            </LogoContainer>
          </DivContainer>
          {childrenData.length - 1 === index && (
            <AddMoreWrapper>
              <PrimaryButton
                title={addMore}
                onPress={() => addFormInputs()}
                buttonStyle={{
                  height: rpx(40),
                  backgroundColor: colors.greenTxt,
                }}
              />
            </AddMoreWrapper>
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
    <ScreenWrapper>
      <HeaderContainer>
        <HeaderText>{finalWishes}</HeaderText>
      </HeaderContainer>
      {refreshing ? (
        <CustomLoader />
      ) : (
        <React.Fragment>
          <PointsContainer>
            <PointsText>{`${
              myGlobal.wishesPoints ? myGlobal.wishesPoints : 0
            } | ${sections}`}</PointsText>
            {myGlobal.wishesPoints >= FINAL_WISH_SLAB.slab_50 && (
              <BadgeContainer>
                <BadgeImage source={getFinalWishBadge(myGlobal.wishesPoints)} />
              </BadgeContainer>
            )}
          </PointsContainer>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            extraHeight={250}>
            <ScrollViewContainer bounces={false}>
              <LetsStartTxt>{letsStartByGettingToKnowYou}</LetsStartTxt>
              <InformationTxt>{weNeedALLittleInformation}</InformationTxt>
              <InputContainer>
                <InputBox
                  value={firstName}
                  onChangeText={(text: string) => setFirstName(text)}
                  onBlur={() => validateField(false, firstNameLabel)}
                  label={firstNameLabel}
                  placeholder={firstNameLabel}
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
                  onBlur={() => validateField(false, lastNameLabel)}
                  label={lastNameLabel}
                  placeholder={lastNameLabel}
                  errorText={lastNameError}
                  inputKeyboardType={
                    isIOS()
                      ? EMOJI_VALIDATION.asciiCapable
                      : EMOJI_VALIDATION.visiblePassword
                  }
                />
                <InputBox
                  value={age}
                  onChangeText={(text: string) => setAge(text)}
                  onBlur={() => validateField(false, ageTxt)}
                  label={ageTxt}
                  placeholder={ageTxt}
                  inputKeyboardType={keyboardType.numeric}
                  maxLength={3}
                  errorText={ageError}
                />
                <InputBox
                  value={phone}
                  onChangeText={(text: string) => setPhone(text)}
                  onBlur={() => validateField(false, phoneTxt)}
                  label={phoneTxt}
                  placeholder={phoneTxt}
                  errorText={phoneError}
                  inputKeyboardType={keyboardType.numeric}
                />
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
                />
                <InputBox
                  value={marriedPhone}
                  onChangeText={(text: string) => setMarriedPhone(text)}
                  onBlur={() => validateField(false, otherPhoneNumber)}
                  label={otherPhoneNumber}
                  placeholder={otherPhoneNumber}
                  errorText={marriedPhoneError}
                  inputKeyboardType={keyboardType.numeric}
                />
                <DivContainer>
                  <Divider />
                  <LogoContainer>
                    <LogoImage source={images.logo} />
                  </LogoContainer>
                </DivContainer>
                {renderChildrenData()}
                <FunMessageTxt>
                  {finalFishesData?.custom_message
                    ? finalFishesData?.custom_message
                    : ''}
                </FunMessageTxt>
                <ButtonWrapper>
                  <PrimaryButton
                    title={saveContinue}
                    onPress={() => {
                      if (isSubscriptionExpired) {
                        subscriptionAlert(navigation);
                      } else {
                        saveAndContinue();
                      }
                    }}
                    showLoader={updateWishesLoading}
                  />
                </ButtonWrapper>
              </InputContainer>
            </ScrollViewContainer>
          </KeyboardAwareScrollView>
        </React.Fragment>
      )}
    </ScreenWrapper>
  );
};

export default FinalWishes;
