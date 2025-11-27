/* eslint-disable react-hooks/exhaustive-deps */
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {Container, RowView, ScrollViewContainer} from '../../../styles/style';
import {keyboardType, rpx} from '../../../styles/styleUtils';
import images from '../../assets/images';
import CoverPicChange from '../../assets/images/svgImages/coverPicChange';
import ProfilePicChange from '../../assets/images/svgImages/profilePicChange';
import PrimaryButton from '../../components/button';
import {View} from '../../components/header/styled';
import InputBox from '../../components/inputBox';
import ModalBox from '../../components/modalBox';
import CustomLoader from '../../components/screenLoader';
import {STATUS_CODES} from '../../constants/server';
import {
  DATE_FORMAT,
  FINAL_WISH_SLAB,
  FOLDER_NAMES,
  LIFE_CELEBRATION_SLAB,
  LOGIN_TYPES,
  MEDIA_SELECTION_LIMIT,
  TOAST_MESSAGE_TYPE,
  IMAGE_PICKER_OPTIONS,
} from '../../constants/utils';
import {strings} from '../../localization';
import {NAV_LOGIN} from '../../navigation/constants';
import {useGetSignedUrlMutation} from '../../redux/api/awsApi';
import {
  useCoverImageMutation,
  useDeleteProfileMutation,
  useEditProfileMutation,
  useProfileImageMutation,
  useUserProfileMutation,
} from '../../redux/api/profileApi';
import {
  useAddTraitsApiMutation,
  useTraitsListApiMutation,
} from '../../redux/api/traitsApi';
import {setUserData} from '../../redux/api/userState';
import {RootState} from '../../redux/store';
import {INavigation} from '../../types/utils';
import {
  clearStorage,
  formattedStringDate,
  getFinalWishBadge,
  getLifeCelebrationBadge,
  imageCaptureFromCameraWithCrop,
  imagePickerWithCrop,
  isIOS,
  onImageLibraryPress,
  openDeviceCamera,
  photoMediaType,
  showServerError,
  showToastMessage,
  uploadToS3,
} from '../../utils';
import DesignatedContacts from '../designatedContacts';
import DeleteModalBox from './deleteModal';
import FamilyDetail from './familyDetail';
import {
  AccountHeaderText,
  BadgeContainer,
  BadgeImage,
  BadgeSubContainer,
  ButtonWrapper,
  CenterContainer,
  ChangePhotoTxt,
  CoverImage,
  CoverImageContainer,
  CoverPicContainer,
  DateInputContainer,
  DateInputMainContainer,
  DateInputText,
  DateLabelText,
  DeleteButtonText,
  DeleteView,
  DivContainer,
  Divider,
  ErrorContainer,
  ErrorText,
  FormHeader,
  FormScroll,
  LogoContainer,
  LogoImage,
  OpaqueButton,
  PicChangeContainer,
  PointsText,
  ProfileImage,
  ProfileImageContainer,
  TraitsButton,
  TraitsContainer,
  TraitsItemContainer,
  TraitsNameText,
  TraitsText,
  UploadContainer,
  Wrapper,
} from './styled';

const myGlobal: any = global;

/**
 * props type declaration
 */
interface ProfileProps {
  navigation?: INavigation;
}

/**
 * Name: Profile Screen
 * desc: Screen to render Profile screen UI.
 * @param navigation - property
 */
const Profile: React.FC<ProfileProps> = (props: ProfileProps) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData);
  const {
    enterFirstName,
    enterLastName,
    zipCodeErrorMsg,
    enterDob,
    dateOfBirth,
    accountInfo,
    firstNameLabel,
    lastNameLabel,
    emailLabel,
    zipCodeLabel,
    updateProfile,
    traits,
    firstNameField,
    lastNameField,
    zipCodeField,
    deleteAccount,
    deleteAccountText,
    changePhoto,
  } = strings;
  const {white} = colors;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');
  const [date, setDate] = useState('');
  const actionSheet = useRef<any>();
  const [imageLoader, setImageLoader] = useState(false);
  const [coverLoader, setCoverLoader] = useState(false);
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [dateErrorText, setDateErrorText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [profileUri, setProfileUri] = useState('');
  const [coverUri, setCoverUri] = useState('');
  const [alertModal, setAlertModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [trait, setTrait] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [finalWishPoint, setFinalWishPoint] = useState(0);
  const [lifeCelebrationPoint, setLifeCelebrationPoint] = useState(0);
  const [awsUploadData, setAwsUploadData] = useState<any[]>([]);

  const [
    userProfile,
    {
      isLoading: userProfileLoading,
      isError: isUserProfileError,
      error: userProfileError,
      isSuccess: userProfileSuccess,
      data: userProfileData,
    },
  ] = useUserProfileMutation();

  const [
    profileImage,
    {
      isLoading: isProfileImageLoading,
      isError: isProfileImageError,
      error: profileImageError,
      isSuccess: isProfileImageSuccess,
      data: profileImageData,
    },
  ] = useProfileImageMutation();

  const [
    coverImage,
    {
      isLoading: isCoverImageLoading,
      isError: isCoverImageError,
      error: coverImageError,
      isSuccess: isCoverImageSuccess,
      data: coverImageData,
    },
  ] = useCoverImageMutation();

  const [
    traitsListApi,
    {
      isLoading: traitsListApiLoading,
      isError: isTraitsListApiError,
      error: traitsListApiError,
      isSuccess: traitsListApiSuccess,
      data: traitsListApiData,
    },
  ] = useTraitsListApiMutation();

  const [
    addTraitsApi,
    {
      isLoading: addTraitsApiLoading,
      isError: isAddTraitsApiError,
      error: addTraitsApiError,
    },
  ] = useAddTraitsApiMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to handle traits response
   */
  useEffect(() => {
    if (traitsListApiSuccess) {
      setTrait(traitsListApiData?.all_traits);
    }
    if (isTraitsListApiError) {
      showServerError(traitsListApiError, navigation);
    }
  }, [traitsListApiLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to handle traits alert response
   */
  useEffect(() => {
    if (isAddTraitsApiError) {
      showServerError(addTraitsApiError, navigation);
    }
  }, [addTraitsApiLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to handle Image upload response
   */
  useEffect(() => {
    if (isProfileImageSuccess) {
      if (profileImageData && profileImageData?.status) {
        setImageLoader(false);
        myGlobal.uploadStatus = '';
        userProfile('');
        showToastMessage(
          strings.lyfePlum,
          profileImageData.message,
          TOAST_MESSAGE_TYPE.success,
        );
      } else {
        showToastMessage(
          strings.lyfePlum,
          profileImageData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
        setImageLoader(false);
        myGlobal.uploadStatus = '';
      }
    }
    if (isProfileImageError) {
      setImageLoader(false);
      myGlobal.uploadStatus = '';
      showServerError(profileImageError, navigation);
    }
  }, [isProfileImageLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to handle Image upload response
   */
  useEffect(() => {
    if (isCoverImageSuccess) {
      if (coverImageData && coverImageData?.status) {
        setCoverLoader(false);
        myGlobal.uploadStatus = '';
        userProfile('');
        showToastMessage(
          strings.lyfePlum,
          coverImageData.message,
          TOAST_MESSAGE_TYPE.success,
        );
      } else {
        showToastMessage(
          strings.lyfePlum,
          coverImageData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
        setCoverLoader(false);
        myGlobal.uploadStatus = '';
      }
    }
    if (isCoverImageError) {
      setCoverLoader(false);
      myGlobal.uploadStatus = '';
      showServerError(coverImageError, navigation);
    }
  }, [isCoverImageLoading]);

  const [
    getSignedUrl,
    {
      isLoading: isSignedUrlLoading,
      isError: isSignedUrlError,
      error: signedUrlError,
      isSuccess: isSignedUrlSuccess,
      data: signedUrlData,
    },
  ] = useGetSignedUrlMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to handle Image upload response
   */
  useEffect(() => {
    if (isSignedUrlSuccess) {
      const startUploadingToS3 = async () => {
        const awsUrl = signedUrlData?.url;
        const responseStatus = await uploadToS3(awsUrl, awsUploadData[0]);
        if (responseStatus === STATUS_CODES.ok) {
          setAwsUploadData([]);
          if (myGlobal.uploadStatus === strings.profileImage) {
            profileImage({
              image: signedUrlData?.image_path,
            });
          } else if (myGlobal.uploadStatus === strings.coverImage) {
            coverImage({
              image: signedUrlData?.image_path,
            });
          }
        } else {
          setImageLoader(false);
          setCoverLoader(false);
          myGlobal.uploadStatus = '';
          showToastMessage(
            strings.lyfePlum,
            strings.somethingWentWrong,
            TOAST_MESSAGE_TYPE.error,
          );
        }
      };
      startUploadingToS3();
    }
    if (isSignedUrlError) {
      setImageLoader(false);
      setCoverLoader(false);
      myGlobal.uploadStatus = '';
      showServerError(signedUrlError, navigation);
    }
  }, [isSignedUrlLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to call profile api
   */
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      setLoading(true);
      userProfile('');
      traitsListApi('');
      resetState();
    });
    return unsubscribe;
  }, [navigation]);

  /**
   * Name: resetState
   * Desc: Function to reset the state
   */
  const resetState = () => {
    setCoverLoader(false);
    setImageLoader(false);
    myGlobal.uploadStatus = '';
  };

  const [
    editProfile,
    {
      isLoading: editProfileLoading,
      isError: isEditProfileError,
      error: editProfileError,
      isSuccess: editProfileSuccess,
      data: editProfileData,
    },
  ] = useEditProfileMutation();

  const [
    deleteProfile,
    {
      isLoading: isDeleteProfileLoading,
      isError: isDeleteProfileError,
      error: deleteProfileError,
      isSuccess: isDeleteProfileSuccess,
      data: deleteProfileData,
    },
  ] = useDeleteProfileMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to user account delete
   */
  useEffect(() => {
    if (isDeleteProfileSuccess) {
      if (deleteProfileData && deleteProfileData?.status) {
        setConfirmModal(false);
        if (
          userProfileData?.authenticated_user?.social_type ===
          LOGIN_TYPES.google
        ) {
          revokeGoogleAccess();
        } else {
          redirectToLogin();
        }
      } else {
        setConfirmModal(false);
        showToastMessage(
          strings.lyfePlum,
          deleteProfileData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isDeleteProfileError) {
      setConfirmModal(false);
      showServerError(deleteProfileError, navigation);
    }
  }, [isDeleteProfileLoading]);

  /**
   * Name: revokeGoogleAccess
   * Desc: Function to revoke google account access
   */
  const revokeGoogleAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      redirectToLogin();
    } catch (error) {
      showToastMessage(
        strings.lyfePlum,
        error?.Message,
        TOAST_MESSAGE_TYPE.error,
      );
    }
  };

  /**
   * Name: redirectToLogin
   * Desc: Function to clear storage and redirect to login
   */
  const redirectToLogin = () => {
    clearStorage();
    navigation?.navigate(NAV_LOGIN);
  };

  /**
   * Name: useEffect
   * Desc: useEffect for user Profile API response.
   */
  useEffect(() => {
    if (userProfileSuccess) {
      if (userProfileData?.authenticated_user) {
        setEmail(userProfileData?.authenticated_user.email || '');
        setFirstName(userProfileData?.authenticated_user.first_name || '');
        setLastName(userProfileData?.authenticated_user.last_name || '');
        setZipCode(userProfileData?.authenticated_user.zip_code || '');
        setFinalWishPoint(
          userProfileData?.authenticated_user.final_wish_points || 0,
        );
        setLifeCelebrationPoint(
          userProfileData?.authenticated_user.life_celebration_points || 0,
        );
        setSelectedDate(
          new Date(userProfileData?.authenticated_user.date_of_birth),
        );
        setDate(
          formattedStringDate(
            userProfileData?.authenticated_user.date_of_birth,
            DATE_FORMAT.MM_DD_YYYY,
          ),
        );
        setMonth(
          formattedStringDate(
            userProfileData?.authenticated_user.date_of_birth,
            DATE_FORMAT.MM,
          ),
        );
        setDay(
          formattedStringDate(
            userProfileData?.authenticated_user.date_of_birth,
            DATE_FORMAT.DD,
          ),
        );
        setYear(
          formattedStringDate(
            userProfileData?.authenticated_user.date_of_birth,
            DATE_FORMAT.YYYY,
          ),
        );
        setProfileUri(userProfileData?.authenticated_user.profile_photo_url);
        setCoverUri(userProfileData?.authenticated_user.cover_image);
        setRefreshing(false);
        setLoading(false);
        const userDetails = {
          id: userProfileData?.authenticated_user.id || 0,
          profile_photo_url:
            userProfileData?.authenticated_user.profile_photo_url || '',
          cover_image: userProfileData?.authenticated_user.cover_image || '',
          social_type: userProfileData?.authenticated_user.social_type || '',
        };
        dispatch(setUserData(userDetails));
      }
    }
    if (isUserProfileError) {
      setRefreshing(false);
      setLoading(false);
      showServerError(userProfileError, navigation);
    }
  }, [userProfileLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for edit Profile API response.
   */
  useEffect(() => {
    if (editProfileSuccess) {
      if (editProfileData && editProfileData.status) {
        showToastMessage(
          strings.lyfePlum,
          editProfileData.message,
          TOAST_MESSAGE_TYPE.success,
        );
      }

      if (isEditProfileError) {
        showServerError(editProfileError, navigation);
      }
    }
  }, [editProfileLoading]);

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
    if (field === zipCodeField || allField) {
      if (zipCode === '') {
        setZipCodeError(zipCodeErrorMsg);
        invalidFields++;
      } else {
        setZipCodeError('');
      }
    }
    if (allField) {
      if (date === '') {
        setDateErrorText(enterDob);
        invalidFields++;
      } else {
        setDateErrorText('');
      }
    }

    return invalidFields === 0;
  };

  /**
   * Name: showDatePicker
   * Desc: Function to render date picker.
   */
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  /**
   * Name: hideDatePicker
   * Desc: Function to hide date picker.
   */
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  /**
   * Name: CalendarView
   * Desc: Function to render calendar view.
   * @returns JSX.Element
   */
  const CalendarView = () => {
    return (
      <DateInputMainContainer>
        <DateLabelText>{dateOfBirth}</DateLabelText>
        <DateInputContainer
          onPress={() => {
            showDatePicker();
          }}>
          <DateInputText>{date}</DateInputText>
        </DateInputContainer>
      </DateInputMainContainer>
    );
  };

  /**
   * Name: handleConfirm
   * Desc: Callback function for date selection.
   * @param dateSelected - The selected date.
   */
  const handleConfirm = dateSelected => {
    setMonth(formattedStringDate(dateSelected, DATE_FORMAT.MM));
    setDay(formattedStringDate(dateSelected, DATE_FORMAT.DD));
    setYear(formattedStringDate(dateSelected, DATE_FORMAT.YYYY));
    setDate(formattedStringDate(dateSelected, DATE_FORMAT.MM_DD_YYYY));
    setSelectedDate(new Date(dateSelected));
    hideDatePicker();
  };

  /**
   * Name: editTraitsHandler
   * Desc: Function to handle traits list.
   * @param item - the traits data
   * @return updates the traits array
   */
  const editTraitsHandler = (item, index) => {
    const updateTraits = trait.map((newItem, newIndex) => {
      if (newIndex === index) {
        return {
          ...newItem,
          is_user_trait: newItem.is_user_trait === 1 ? 0 : 1,
        };
      }
      return newItem;
    });
    addTraitsApi({
      trait_id: item.id,
    });
    setTrait(updateTraits);
  };

  /**
   * Name: renderTraitsItem
   * Desc: Function to render traits list.
   * @param item - The traits data.
   * @returns JSX.Element.
   */
  const renderTraitsItem = ({item, index}) => (
    <TraitsItemContainer>
      <OpaqueButton onPress={() => editTraitsHandler(item, index)}>
        <TraitsNameText isSelected={item.is_user_trait}>
          {item.trait}
        </TraitsNameText>
      </OpaqueButton>
    </TraitsItemContainer>
  );

  /**
   * Name: updateProfileHandler
   * Desc: Function to call update profile API.
   */
  const updateProfileHandler = () => {
    const isValidFields = validateField(true);
    if (!isValidFields) {
      return false;
    }

    const requestData = {
      dob_year: year,
      dob_month: month,
      dob_day: day,
      first_name: firstName,
      last_name: lastName,
      zip_code: zipCode,
    };
    editProfile(requestData);
  };

  /**
   * Name: dateError
   * Desc: Function to render date error view.
   * @returns JSX.Element
   */
  const dateError = () => (
    <ErrorContainer>
      <ErrorText>{dateErrorText}</ErrorText>
    </ErrorContainer>
  );

  /*
   * Name: showActionSheet
   * Desc: open action sheet for profile image upload.
   */
  const showActionSheet = request => {
    if (request === strings.profileImage) {
      myGlobal.uploadStatus = strings.profileImage;
    } else if (strings.coverImage) {
      myGlobal.uploadStatus = strings.coverImage;
    }
    actionSheet?.current?.show();
  };

  /*
   * Name: generateSignedUrl
   * Desc: Function to get the signed url from server
   * @params {any} res - Response of the selected media
   * @params {string} folderName - Folder name for aws
   */
  const generateSignedUrl = (res: any, folderName: string) => {
    try {
      const requestData = {
        name: res?.fileName,
        folder_name: folderName,
      };
      getSignedUrl(requestData);
    } catch (error) {
      setImageLoader(false);
      setCoverLoader(false);
      myGlobal.uploadStatus = '';
      showToastMessage(
        strings.lyfePlum,
        strings.somethingWentWrong,
        TOAST_MESSAGE_TYPE.error,
      );
    }
  };

  /**
   * Name: onSelectAction
   * Desc: Function to call on click on action sheet
   */
  const onSelectAction = (index: number) => {
    if (index === 0) {
      if (myGlobal.uploadStatus === strings.profileImage) {
        openDeviceCamera([], photoMediaType).then((res: any) => {
          if (res) {
            setImageLoader(true);
            setAwsUploadData(res);
            generateSignedUrl(res[0], FOLDER_NAMES.changeProfilePic);
          } else {
            setImageLoader(false);
            myGlobal.uploadStatus = '';
            showToastMessage(
              strings.lyfePlum,
              strings.somethingWentWrong,
              TOAST_MESSAGE_TYPE.error,
            );
          }
        });
      } else if (myGlobal.uploadStatus === strings.coverImage) {
        imageCaptureFromCameraWithCrop(photoMediaType).then((res: any) => {
          if (res?.mime && res?.data) {
            const userId = userData?.id;
            const fileExtension = res?.mime.split('/')[1];
            const today = new Date();
            const timestamp = today.getTime();
            const formattedDate = today.toISOString().split('T')[0];
            const tempFileName = `cover_image_${userId}_${formattedDate}_${timestamp}.${fileExtension}`;
            const updatedRes = [
              {
                fileName: res?.filename || tempFileName,
                type: res?.mime,
                uri: isIOS() ? res?.sourceURL : res?.path,
                fileBase64Path: res?.data,
              },
            ];
            setCoverLoader(true);
            setAwsUploadData(updatedRes);
            generateSignedUrl(updatedRes[0], FOLDER_NAMES.changeCover);
          } else {
            setCoverLoader(false);
            myGlobal.uploadStatus = '';
            showToastMessage(
              strings.lyfePlum,
              strings.somethingWentWrong,
              TOAST_MESSAGE_TYPE.error,
            );
          }
        });
      }
    } else if (index === 1) {
      if (myGlobal.uploadStatus === strings.profileImage) {
        onImageLibraryPress(
          photoMediaType,
          MEDIA_SELECTION_LIMIT.profileImage,
          [],
        ).then((res: any) => {
          if (res) {
            setImageLoader(true);
            setAwsUploadData(res);
            generateSignedUrl(res[0], FOLDER_NAMES.changeProfilePic);
          } else {
            setImageLoader(false);
            myGlobal.uploadStatus = '';
            showToastMessage(
              strings.lyfePlum,
              strings.somethingWentWrong,
              TOAST_MESSAGE_TYPE.error,
            );
          }
        });
      } else if (myGlobal.uploadStatus === strings.coverImage) {
        imagePickerWithCrop(photoMediaType).then((res: any) => {
          if (res?.mime && res?.data) {
            const userId = userData?.id;
            const fileExtension = res?.mime.split('/')[1];
            const today = new Date();
            const timestamp = today.getTime();
            const formattedDate = today.toISOString().split('T')[0];
            const tempFileName = `cover_image_${userId}_${formattedDate}_${timestamp}.${fileExtension}`;
            const updatedRes = [
              {
                fileName: res?.filename || tempFileName,
                type: res?.mime,
                uri: isIOS() ? res?.sourceURL : res?.path,
                fileBase64Path: res?.data,
              },
            ];
            setCoverLoader(true);
            setAwsUploadData(updatedRes);
            generateSignedUrl(updatedRes[0], FOLDER_NAMES.changeCover);
          } else {
            setCoverLoader(false);
            myGlobal.uploadStatus = '';
            showToastMessage(
              strings.lyfePlum,
              strings.somethingWentWrong,
              TOAST_MESSAGE_TYPE.error,
            );
          }
        });
      }
    }
  };

  /**
   * Name: callDelete
   * Desc: Function to delete user account
   */
  const callDelete = () => {
    setAlertModal(false);
    setTimeout(() => {
      setConfirmModal(true);
    }, 500);
  };

  /**
   * Name: onRefresh
   * Desc: Function to refresh page
   */
  const onRefresh = () => {
    setRefreshing(true);
    userProfile('');
  };

  /**
   * Name: checkSubscriptionState
   * Desc: Function to check subscription state before delete process
   */
  const checkSubscriptionState = () => {
    setAlertModal(true);
  };

  return (
    <Wrapper>
      {loading ? (
        <CustomLoader />
      ) : (
        <ScrollViewContainer
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }>
          <FormScroll>
            <View>
              <CoverImageContainer>
                {coverLoader ? (
                  <ActivityIndicator
                    color={colors.dodgerBlue}
                    style={styles.indicatorStyle}
                  />
                ) : (
                  <CoverImage
                    source={coverUri ? {uri: coverUri} : images.defaultAvatar}
                  />
                )}
              </CoverImageContainer>
              <CoverPicContainer>
                <UploadContainer
                  onPress={() => showActionSheet(strings.coverImage)}>
                  <RowView>
                    <ChangePhotoTxt>{changePhoto}</ChangePhotoTxt>
                    <CoverPicChange />
                  </RowView>
                </UploadContainer>
              </CoverPicContainer>
              <CenterContainer>
                <ProfileImageContainer>
                  {imageLoader ? (
                    <ActivityIndicator color={colors.dodgerBlue} />
                  ) : (
                    <ProfileImage
                      source={
                        profileUri ? {uri: profileUri} : images.defaultAvatar
                      }
                    />
                  )}
                </ProfileImageContainer>
                <PicChangeContainer>
                  <UploadContainer
                    onPress={() => showActionSheet(strings.profileImage)}>
                    <ProfilePicChange />
                  </UploadContainer>
                </PicChangeContainer>
              </CenterContainer>
            </View>
            <Container>
              <FormHeader>{accountInfo}</FormHeader>
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
                editable={false}
                onChangeText={() => {}}
              />
              <CalendarView />
              {dateErrorText !== '' && dateError()}
              <InputBox
                value={zipCode}
                onChangeText={text => setZipCode(text)}
                onBlur={() => validateField(false, zipCodeField)}
                label={zipCodeLabel}
                placeholder={zipCodeLabel}
                errorText={zipCodeError}
                backgroundColor={white}
                inputKeyboardType={keyboardType.numeric}
              />
              <ButtonWrapper>
                <PrimaryButton
                  title={updateProfile}
                  onPress={updateProfileHandler}
                  showLoader={editProfileLoading}
                />
              </ButtonWrapper>
            </Container>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              date={selectedDate}
              maximumDate={new Date()}
            />
          </FormScroll>
          <DivContainer>
            <Divider />
            <LogoContainer>
              <LogoImage source={images.logo} />
            </LogoContainer>
          </DivContainer>
          <FamilyDetail navigation={navigation} />
          <DivContainer>
            <Divider />
            <LogoContainer>
              <LogoImage source={images.logo} />
            </LogoContainer>
          </DivContainer>
          <BadgeContainer>
            <PointsText>{`${strings.totalPoints} ${
              finalWishPoint + lifeCelebrationPoint
            }`}</PointsText>
            <BadgeSubContainer>
              {finalWishPoint >= FINAL_WISH_SLAB.slab_50 && (
                <BadgeImage source={getFinalWishBadge(finalWishPoint)} />
              )}
              {lifeCelebrationPoint >= LIFE_CELEBRATION_SLAB.slab_50 && (
                <BadgeImage
                  source={getLifeCelebrationBadge(lifeCelebrationPoint)}
                />
              )}
            </BadgeSubContainer>
          </BadgeContainer>
          <DesignatedContacts />
          <TraitsContainer>
            <TraitsText>{traits}</TraitsText>
            <View>
              {renderTraitsItem.length && (
                <FlatList
                  data={trait}
                  renderItem={renderTraitsItem}
                  keyExtractor={item => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  extraData={trait}
                />
              )}
            </View>
          </TraitsContainer>
          <DeleteView>
            <AccountHeaderText>{deleteAccount}</AccountHeaderText>
            <TraitsButton onPress={() => checkSubscriptionState()}>
              <DeleteButtonText>{deleteAccountText}</DeleteButtonText>
            </TraitsButton>
          </DeleteView>
          <ActionSheet
            ref={actionSheet}
            options={IMAGE_PICKER_OPTIONS}
            cancelButtonIndex={2}
            destructiveButtonIndex={2}
            onPress={(index: number) => {
              onSelectAction(index);
            }}
          />
          <ModalBox
            visible={alertModal}
            message={strings.deleteUser}
            onPressPositiveBtn={callDelete}
            onPressNegativeBtn={() => setAlertModal(false)}
          />
          <DeleteModalBox
            visible={confirmModal}
            onPressPositiveBtn={() => deleteProfile('')}
            onPressNegativeBtn={() => setConfirmModal(false)}
          />
        </ScrollViewContainer>
      )}
    </Wrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  indicatorStyle: {
    marginTop: rpx(60),
  },
});
