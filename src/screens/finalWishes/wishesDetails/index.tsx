/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Image from 'react-native-image-progress';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ProgressPie from 'react-native-progress/Pie';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import colors from '../../../../styles/colors';
import {ScreenWrapper, ScrollViewContainer} from '../../../../styles/style';
import {rpx, screenWidth} from '../../../../styles/styleUtils';
import images from '../../../assets/images';
import Document from '../../../assets/images/svgImages/document';
import PrimaryButton from '../../../components/button';
import DropdownComponent from '../../../components/dropdown';
import InputBox from '../../../components/inputBox';
import ModalBox from '../../../components/modalBox';
import PreviewImage from '../../../components/previewImage';
import CustomLoader from '../../../components/screenLoader';
import {STATUS_CODES} from '../../../constants/server';
import {
  EMOJI_VALIDATION,
  FILE_TYPE,
  FINAL_WISH_SLAB,
  FOLDER_NAMES,
  IMPORTANT_DOCUMENT_ID,
  INPUT_TYPE,
  MEDIA_SELECTION_LIMIT,
  PROFESSIONAL_ADVISOR_CONTACT_INFO_ID,
  TOAST_MESSAGE_TYPE,
  URL_PATHS,
  WHO_TO_CONTACT_ID,
  IMAGE_EXTENSIONS,
  UPLOAD_PICKER_OPTIONS,
  MATERIAL_COMMUNITY_ICONS,
} from '../../../constants/utils';
import {strings} from '../../../localization';
import {NAV_STEP_THREE} from '../../../navigation/constants';
import {useGetSignedUrlMutation} from '../../../redux/api/awsApi';
import {
  useGetQuestionDetailsMutation,
  useRemoveDocumentsMutation,
  useRemoveImageMutation,
  useSaveWishesMutation,
} from '../../../redux/api/finalWishesApi';
import {RootState} from '../../../redux/store';
import {
  IExtraForm,
  IImageData,
  INavigation,
  ISignedResponse,
  IUploadedDocuments,
} from '../../../types/utils';
import {
  attachmentDownload,
  getFinalWishBadge,
  isIOS,
  onImageLibraryPress,
  openDeviceCamera,
  photoMediaType,
  pickDocument,
  showServerError,
  showToastMessage,
  uploadToS3,
} from '../../../utils';
import {
  AddMoreFormWrapper,
  AddMoreText,
  AddMoreWrapper,
  BadgeContainer,
  BadgeImage,
  ButtonContainer,
  ButtonWrapper,
  ContentView,
  ContentWrapper,
  DeleteWrapper,
  DivContainer,
  Divider,
  DocumentContainer,
  DocumentSubContainer,
  DocumentText,
  DownloadWrapper,
  FormTitle,
  HeaderContainer,
  HeaderText,
  ImageTouchable,
  ImageWrapper,
  InputContainer,
  LetsStartTxt,
  LinkContainer,
  LogoContainer,
  LogoImage,
  MessageText,
  MessageWrapper,
  MoreFormWrapper,
  PointsContainer,
  PointsText,
  PolicyText,
  RemoveContainer,
  RemoveDocumentsContainer,
  UploadText,
  UploadWrapper,
  UploadedContainer,
} from './styled';

const myGlobal: any = global;
/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: INavigation;
}

/**
 * Name: WishDetails
 * Desc: Screen to render wish details UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const WishDetails: React.FC<Props> = (props: Props) => {
  const {
    finalWishes,
    previous,
    saveContinue,
    sections,
    locationHere,
    uploadHere,
    uploadText,
    addMore,
    saveAddMore,
    contactList,
  } = strings;
  const {navigation} = props;
  const userData = useSelector((state: RootState) => state.user.userData);
  const actionSheet = useRef<any>();
  const [questionDetail, setQuestionDetail] = useState<any>({});
  const [imageData, setImageData] = useState<IImageData[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const [fileDetail, setFileDetail] = useState({});
  const [extraForm, setExtraForm] = useState<IExtraForm[]>([]);
  const [moreExtraForm, setMoreExtraForm] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [isImageRemove, setIsImageRemove] = useState<boolean>(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<
    IUploadedDocuments[]
  >([]);
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [isSaveInProgress, setIsSaveInProgress] = useState<boolean>(false);

  const [
    getQuestionDetails,
    {
      isLoading: isQuestionLoading,
      isError: isQuestionError,
      error: questionError,
      isSuccess: isQuestionSuccess,
      data: questionData,
    },
  ] = useGetQuestionDetailsMutation();

  const [
    saveWishes,
    {
      isLoading: isSaveWishesLoading,
      isError: isSaveWishesError,
      error: saveWishesError,
      isSuccess: isSaveWishesSuccess,
      data: saveWishesData,
    },
  ] = useSaveWishesMutation();

  const [
    removeImage,
    {
      isLoading: isRemoveImageLoading,
      isError: isRemoveImageError,
      error: removeImageError,
      isSuccess: isRemoveImageSuccess,
      data: removeImageData,
    },
  ] = useRemoveImageMutation();

  const [
    removeDocument,
    {
      isLoading: isRemoveDocumentLoading,
      isError: isRemoveDocumentError,
      error: removeDocumentError,
      isSuccess: isRemoveDocumentSuccess,
      data: removeDocumentData,
    },
  ] = useRemoveDocumentsMutation();

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
   * Desc: useEffect to call  api on navigation
   */
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      setRefreshing(true);
      resetState();
      getQuestionDetails(myGlobal.item?.id);
    });
    return unsubscribe;
  }, [navigation]);

  /**
   * Name: useEffect
   * Desc: useEffect for get final wishes API response.
   */
  useEffect(() => {
    if (isQuestionSuccess) {
      if (questionData?.status) {
        setQuestionDetail(questionData);
        setAnswer(questionData?.location_answer);
        const filesData = questionData?.files;
        if (Object.keys(filesData).length !== 0) {
          setFileDetail(filesData);
        }
        if (questionData?.extra_forms.length >= 0) {
          if (
            myGlobal.item?.document_checklist_id === IMPORTANT_DOCUMENT_ID ||
            myGlobal.item?.document_checklist_id ===
              PROFESSIONAL_ADVISOR_CONTACT_INFO_ID
          ) {
            const updatedForm: IExtraForm[] = [];
            questionData?.extra_forms.map(item => {
              const obj: IExtraForm = {
                ...item,
                answer: '',
              };
              updatedForm.push(obj);
            });
            setExtraForm(updatedForm);
          } else {
            setExtraForm(questionData?.extra_forms);
          }
        }
        if (questionData?.who_to_contact_extra_forms.length >= 0) {
          setMoreExtraForm(questionData?.who_to_contact_extra_forms);
        }
        if (questionData.documents.length > 0) {
          if (
            myGlobal.item?.document_checklist_id === IMPORTANT_DOCUMENT_ID ||
            myGlobal.item?.document_checklist_id ===
              PROFESSIONAL_ADVISOR_CONTACT_INFO_ID
          ) {
            setUploadedDocuments(questionData.documents);
          } else {
            setUploadedDocuments([]);
          }
        }
        setRefreshing(false);
        if (isImageRemove) {
          setTimeout(() => {
            saveAndContinue(false);
          }, 1000);
        }
      }
    }
    if (isQuestionError) {
      setRefreshing(false);
      showServerError(questionError, navigation);
    }
  }, [isQuestionLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for get save wishes API response.
   */
  useEffect(() => {
    if (isSaveWishesSuccess) {
      if (saveWishesData?.status) {
        setIsSaveInProgress(false);
        myGlobal.wishesPoints = saveWishesData?.final_wish_points;
        if (!isImageRemove) {
          if (myGlobal.isSaveAndAddMore) {
            myGlobal.isSaveAndAddMore = false;
            setRefreshing(true);
            if (
              saveWishesData?.documents &&
              saveWishesData?.documents.length > 0
            ) {
              setUploadedDocuments(saveWishesData?.documents);
            }
            if (questionData?.extra_forms.length >= 0) {
              const updatedForm: IExtraForm[] = [];
              questionData?.extra_forms.map(item => {
                const obj: IExtraForm = {
                  ...item,
                  answer: '',
                };
                updatedForm.push(obj);
              });
              setExtraForm(updatedForm);
            }
            setImageData([]);
            myGlobal.images = [];
            setRefreshing(false);
            showToastMessage(
              strings.lyfePlum,
              saveWishesData.message,
              TOAST_MESSAGE_TYPE.success,
            );
          } else {
            showToastMessage(
              strings.lyfePlum,
              saveWishesData.message,
              TOAST_MESSAGE_TYPE.success,
            );
            navigation?.navigate(NAV_STEP_THREE);
            resetState();
          }
        } else {
          setIsImageRemove(false);
        }
      }
    }
    if (isSaveWishesError) {
      setIsSaveInProgress(false);
      showServerError(saveWishesError, navigation);
    }
  }, [isSaveWishesLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for get remove image API response.
   */
  useEffect(() => {
    if (isRemoveImageSuccess || isRemoveDocumentSuccess) {
      if (removeImageData?.status || removeDocumentData?.status) {
        const toastMessage = removeImageData?.status
          ? removeImageData.message
          : removeDocumentData?.status
          ? removeDocumentData?.message
          : '';
        resetState();
        myGlobal.removeIndex = 0;
        myGlobal.removeParentIndex = 0;
        myGlobal.deleteModalData = {
          removeIndex: 0,
          removeParentIndex: 0,
          file_id: '',
        };
        setRefreshing(true);
        getQuestionDetails(myGlobal.item?.id);
        showToastMessage(
          strings.lyfePlum,
          toastMessage,
          TOAST_MESSAGE_TYPE.success,
        );
      }
    }
    if (isRemoveImageError) {
      showServerError(removeImageError, navigation);
    } else if (isRemoveDocumentError) {
      showServerError(removeDocumentError, navigation);
    }
  }, [isRemoveImageLoading, isRemoveDocumentLoading]);

  /**
   * Name: startUploadingToS3
   * Desc: Function to upload data to aws s3
   * @param {any} response - Response of the signed url
   * @param {any} selectedData - upload data
   * @returns boolean value
   */
  const startUploadingToS3 = async (response, selectedData) => {
    const awsUrl = response?.url;
    const responseStatus = await uploadToS3(awsUrl, selectedData);
    if (responseStatus === STATUS_CODES.ok) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Name: saveAndContinue
   * Desc: Function to save wishes and continue to previous step.
   * @param {boolean} isAddMore - to determine is it save and add more press
   */
  const saveAndContinue = async (isAddMore: boolean) => {
    setIsSaveInProgress(true);
    myGlobal.isSaveAndAddMore = isAddMore;
    let requestData = {
      checklist_id: myGlobal.item?.id.toString(),
      location: answer,
    };
    if (imageData.length) {
      const filePaths: string[] = [];
      const fileTypes: string[] = [];
      for (const item of imageData) {
        const signedRequest = await generateSignedRequest(item);
        let isUploadingSuccess = false;
        const response: ISignedResponse = (await getSignedUrl(
          signedRequest,
        )) as ISignedResponse;
        if (response) {
          isUploadingSuccess = await startUploadingToS3(response?.data, item);
        }
        if (item?.type.includes(FILE_TYPE.video)) {
          filePaths.push(response?.data?.image_path);
          fileTypes.push(FILE_TYPE.video);
        } else if (item?.type.includes(FILE_TYPE.image) && isUploadingSuccess) {
          filePaths.push(response?.data?.image_path);
          fileTypes.push(FILE_TYPE.image);
        } else if (item?.type.includes(FILE_TYPE.application)) {
          filePaths.push(response?.data?.image_path);
          fileTypes.push(FILE_TYPE.file);
        }
      }
      if (filePaths.length > 0 && fileTypes.length > 0) {
        requestData = {
          ...requestData,
          upload_file: filePaths,
          file_type: fileTypes,
        };
      }
    }
    if (!isImageRemove) {
      if (extraForm.length) {
        const formatterData = extraForm.map((item: any) => {
          return item?.answer;
        });
        requestData = {...requestData, extra: formatterData};
      }
      if (moreExtraForm.length) {
        const formatterData = moreExtraForm.map(item => {
          const listData: any = item;
          return listData.map(val => {
            return val?.answer;
          });
        });
        requestData = {
          ...requestData,
          extra_val: formatterData,
          who_to_contact_count: moreExtraForm.length,
        };
      }
    }
    saveWishes(requestData);
  };

  /**
   * Name: onPreviousClick
   * Desc: Function to go to previous step
   */
  const onPreviousClick = () => {
    resetState();
    navigation?.navigate(NAV_STEP_THREE);
  };

  /**
   * Name: resetState
   * Desc: Function to reset data
   */
  const resetState = () => {
    setAnswer('');
    setQuestionDetail({});
    setImageData([]);
    setExtraForm([]);
    setFileDetail({});
    setMoreExtraForm([]);
    myGlobal.images = [];
  };

  /**
   * Name: openLink
   * Desc: Function to open privacy policy link in in-app browser.
   */
  const openLink = async () => {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(URL_PATHS.privacyPolicy);
    } else {
      Linking.openURL(URL_PATHS.privacyPolicy);
    }
  };

  /**
   * Name: renderContent
   * Desc: Function to render content
   */
  const renderContent = () => {
    let uploadStatus = false;
    if (questionData?.is_file_allowed) {
      if (
        Object.keys(questionData?.files).length !== 0 ||
        imageData.length !== 0
      ) {
        uploadStatus = false;
      } else {
        uploadStatus = true;
      }
    }
    const multipleUpload = parseInt(questionData?.is_multiple_file_allowed, 10)
      ? true
      : false;
    return (
      <ContentWrapper>
        <LetsStartTxt>{questionDetail?.location_question}</LetsStartTxt>
        {myGlobal.item?.document_checklist_id !== IMPORTANT_DOCUMENT_ID &&
          myGlobal.item?.document_checklist_id !==
            PROFESSIONAL_ADVISOR_CONTACT_INFO_ID && (
            <InputContainer>
              <InputBox
                value={answer}
                onChangeText={(text: string) => setAnswer(text)}
                placeholder={locationHere}
                inputKeyboardType={
                  isIOS()
                    ? EMOJI_VALIDATION.asciiCapable
                    : EMOJI_VALIDATION.visiblePassword
                }
              />
            </InputContainer>
          )}
        {myGlobal.item?.document_checklist_id === WHO_TO_CONTACT_ID && (
          <DivContainer>
            <Divider />
            <LogoContainer>
              <LogoImage source={images.logo} />
            </LogoContainer>
          </DivContainer>
        )}
        {extraForm.length !== 0 && renderExtraForm()}
        {moreExtraForm.length !== 0 && renderMoreForm()}
        {myGlobal.item?.document_checklist_id === WHO_TO_CONTACT_ID &&
          extraForm.length !== 0 && (
            <AddMoreWrapper>
              <AddMoreText>{addMore}</AddMoreText>
              <AddMoreFormWrapper onPress={() => addFormInputs()}>
                <MaterialCommunityIcons
                  name={MATERIAL_COMMUNITY_ICONS.plus}
                  size={22}
                  color={colors.white}
                />
              </AddMoreFormWrapper>
            </AddMoreWrapper>
          )}
        {myGlobal.item?.document_checklist_id === IMPORTANT_DOCUMENT_ID ||
        myGlobal.item?.document_checklist_id ===
          PROFESSIONAL_ADVISOR_CONTACT_INFO_ID ? (
          <React.Fragment>
            {imageData.length === 0 && <UploadText>{uploadHere}</UploadText>}
            {renderLocalData()}
            <UploadWrapper>
              <PrimaryButton
                title={uploadText}
                onPress={showActionSheet}
                buttonStyle={{paddingHorizontal: rpx(30), height: rpx(40)}}
              />
            </UploadWrapper>
            <LinkContainer onPress={() => openLink()}>
              <PolicyText>{strings.privacyPolicy}</PolicyText>
            </LinkContainer>
            <DivContainer>
              <Divider />
              <LogoContainer>
                <LogoImage source={images.logo} />
              </LogoContainer>
            </DivContainer>
            {renderUploadedDocuments()}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {(uploadStatus || multipleUpload) &&
              imageData.length === 0 &&
              Object.keys(fileDetail).length === 0 && (
                <UploadText>{uploadHere}</UploadText>
              )}
            {renderUploadedData()}
            {renderLocalData()}
            {(uploadStatus || multipleUpload) && (
              <React.Fragment>
                <UploadWrapper>
                  <PrimaryButton
                    title={uploadText}
                    onPress={showActionSheet}
                    buttonStyle={{paddingHorizontal: rpx(30), height: rpx(40)}}
                  />
                </UploadWrapper>
              </React.Fragment>
            )}
            <LinkContainer onPress={() => openLink()}>
              <PolicyText>{strings.privacyPolicy}</PolicyText>
            </LinkContainer>
          </React.Fragment>
        )}
      </ContentWrapper>
    );
  };

  /**
   * Name: renderExtraForm
   * Desc: Function to render extra form content
   */
  const renderExtraForm = () => {
    return (
      <React.Fragment>
        <InputContainer>
          {extraForm.map((item: any, index) => {
            const dropDownData: any = [];
            if (item?.type === INPUT_TYPE.select) {
              const data = item?.options;
              data.map(list => {
                const obj = {
                  label: list,
                  value: list,
                };
                dropDownData.push(obj);
              });
            }
            return (
              <React.Fragment key={'input_' + index}>
                {(item?.type === INPUT_TYPE.email ||
                  item?.type === INPUT_TYPE.input) && (
                  <InputBox
                    value={item.answer}
                    onChangeText={(text: string) => updateForm(text, index)}
                    placeholder={item.question}
                    key={`extraFrom${index}`}
                    inputKeyboardType={
                      isIOS()
                        ? EMOJI_VALIDATION.asciiCapable
                        : EMOJI_VALIDATION.visiblePassword
                    }
                  />
                )}
                {item?.type === INPUT_TYPE.select && (
                  <DropdownComponent
                    data={dropDownData}
                    selectedValue={item.answer}
                    dropDownLabel={item.question}
                    onChange={text => updateForm(text, index)}
                  />
                )}
              </React.Fragment>
            );
          })}
        </InputContainer>
        {myGlobal.item?.document_checklist_id === WHO_TO_CONTACT_ID && (
          <DivContainer>
            <Divider />
            <LogoContainer>
              <LogoImage source={images.logo} />
            </LogoContainer>
          </DivContainer>
        )}
      </React.Fragment>
    );
  };

  /**
   * Name: renderMoreForm
   * Desc: Function to render more form content
   */
  const renderMoreForm = () => {
    return (
      <React.Fragment>
        <InputContainer>
          {moreExtraForm.map((item, index) => {
            let itemData = [];
            itemData = item;
            return (
              <React.Fragment>
                {myGlobal.item?.document_checklist_id === WHO_TO_CONTACT_ID && (
                  <MoreFormWrapper>
                    <FormTitle>{`${contactList} ${index + 1}`}</FormTitle>
                    <DeleteWrapper onPress={() => callRemoveForm(index)}>
                      <MaterialCommunityIcons
                        name={MATERIAL_COMMUNITY_ICONS.deleteOutline}
                        size={22}
                        color={colors.darkGray}
                      />
                    </DeleteWrapper>
                  </MoreFormWrapper>
                )}
                <React.Fragment>
                  {itemData.map((list: any, indexVal) => {
                    return (
                      <React.Fragment key={`moreExtraFrom_${index}${indexVal}`}>
                        {(list?.type === INPUT_TYPE.email ||
                          list?.type === INPUT_TYPE.input) && (
                          <InputBox
                            value={list.answer}
                            onChangeText={(text: string) =>
                              updateExtraForm(text, index, indexVal)
                            }
                            placeholder={list.question}
                            key={`moreExtraFrom${index}${indexVal}`}
                            inputKeyboardType={
                              isIOS()
                                ? EMOJI_VALIDATION.asciiCapable
                                : EMOJI_VALIDATION.visiblePassword
                            }
                          />
                        )}
                        {itemData.length - 1 === indexVal && (
                          <React.Fragment>
                            <DivContainer customMargin={-20}>
                              <Divider />
                              <LogoContainer>
                                <LogoImage source={images.logo} />
                              </LogoContainer>
                            </DivContainer>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              </React.Fragment>
            );
          })}
        </InputContainer>
      </React.Fragment>
    );
  };

  /**
   * Name: callRemoveForm
   * Desc: Function to remove extra from inputs
   */
  const callRemoveForm = index => {
    let data = moreExtraForm.slice(0);
    data.splice(index, 1);
    setMoreExtraForm(data);
  };

  /**
   * Name: addFormInputs
   * Desc: Function to add extra from inputs
   */
  const addFormInputs = () => {
    let data = moreExtraForm;
    const extraFormType = extraForm.map((item: any) => {
      return {...item, answer: ''};
    });
    if (data.length) {
      setMoreExtraForm([...moreExtraForm, extraFormType]);
    } else {
      setMoreExtraForm([extraFormType]);
    }
  };

  /**
   * Name: updateForm
   * Desc: Function to update form content
   */
  const updateForm = (text, index) => {
    const data: any = [...extraForm];
    let updateData: any = data[index];
    updateData = {...updateData, answer: text};
    data[index] = updateData;
    setExtraForm(data);
  };

  /**
   * Name: updateExtraForm
   * Desc: Function to update extra form content
   */
  const updateExtraForm = (text, parentIndex, childIndex) => {
    const data = moreExtraForm.slice(0);
    let childList = data[parentIndex].slice(0);
    let finalData = childList[childIndex];
    finalData = {...finalData, answer: text};
    childList[childIndex] = finalData;
    data[parentIndex] = childList;
    setMoreExtraForm(data);
  };

  /**
   * Name: renderUploadedData
   * Desc: Function to render upload content
   */
  const renderUploadedData = () => {
    if (Object.keys(fileDetail).length !== 0) {
      return Object.keys(fileDetail).map(function (key, index) {
        return (
          <ImageWrapper key={'uploadedFiles' + index}>
            {FILE_TYPE.image === fileDetail[key].type ? (
              <ImageTouchable
                onPress={() => {
                  setImagesList(fileDetail[key].file_url);
                }}>
                <Image
                  source={{uri: fileDetail[key].file_url}}
                  indicator={ProgressPie}
                  indicatorProps={{
                    color: colors.primaryButton,
                  }}
                  style={styles.imageView}
                />
              </ImageTouchable>
            ) : (
              <DocumentSubContainer>
                <Document />
                <DocumentText>{fileDetail[key].file_name}</DocumentText>
              </DocumentSubContainer>
            )}
            <RemoveContainer>
              <DownloadWrapper
                onPress={() => {
                  myGlobal.downloadIndex = index;
                  setDownloading(true);
                  attachmentDownload(
                    fileDetail[key].file_url,
                    fileDetail[key].file_name,
                    () => {
                      setDownloading(false);
                      myGlobal.downloadIndex = 0;
                    },
                    () => {},
                    () => {
                      setDownloading(false);
                      myGlobal.downloadIndex = 0;
                    },
                  );
                }}>
                {myGlobal.downloadIndex === index ? (
                  downloading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <MaterialCommunityIcons
                      name={MATERIAL_COMMUNITY_ICONS.cloudDeleteOutline}
                      size={22}
                      color={colors.white}
                    />
                  )
                ) : (
                  <MaterialCommunityIcons
                    name={MATERIAL_COMMUNITY_ICONS.cloudDeleteOutline}
                    size={22}
                    color={colors.white}
                  />
                )}
              </DownloadWrapper>
              <DeleteWrapper
                onPress={() =>
                  callDeleteAction(fileDetail[key].file_id, index, 0)
                }>
                {myGlobal.removeIndex === index ? (
                  isRemoveImageLoading || isRemoveDocumentLoading ? (
                    <ActivityIndicator color={colors.primaryButton} />
                  ) : (
                    <MaterialCommunityIcons
                      name={MATERIAL_COMMUNITY_ICONS.deleteOutline}
                      size={22}
                      color={colors.darkGray}
                    />
                  )
                ) : (
                  <MaterialCommunityIcons
                    name={MATERIAL_COMMUNITY_ICONS.deleteOutline}
                    size={22}
                    color={colors.darkGray}
                  />
                )}
              </DeleteWrapper>
            </RemoveContainer>
          </ImageWrapper>
        );
      });
    }
    return <></>;
  };
  /**
   * Name: renderUploadedList
   * Desc: Function to render upload documents elements
   */
  const renderUploadedList = (data, parentIndex) => {
    const location = data?.Location || '';
    const docName =
      myGlobal.item?.document_checklist_id ===
      PROFESSIONAL_ADVISOR_CONTACT_INFO_ID
        ? data?.Type || ''
        : data?.DocumentName || '';

    const documentList = data?.images || [];
    if (Object.keys(documentList).length > 0) {
      return Object.keys(documentList).map(function (key, index) {
        return (
          <ImageWrapper key={`uploadedFiles_${parentIndex}_${index}`}>
            <DocumentContainer>
              <DocumentText
                numberOfLines={1}>{`${location} - ${docName}`}</DocumentText>
            </DocumentContainer>
            <RemoveDocumentsContainer>
              <DownloadWrapper
                onPress={() => {
                  myGlobal.downloadIndex = index;
                  myGlobal.downloadParentIndex = parentIndex;
                  setDownloading(true);
                  attachmentDownload(
                    documentList[key].file_url,
                    documentList[key].file_name,
                    () => {
                      setDownloading(false);
                      myGlobal.downloadIndex = 0;
                      myGlobal.downloadParentIndex = 0;
                    },
                    () => {},
                    () => {
                      setDownloading(false);
                      myGlobal.downloadIndex = 0;
                      myGlobal.downloadParentIndex = 0;
                      showToastMessage(
                        strings.lyfePlum,
                        strings.somethingWentWrong,
                        TOAST_MESSAGE_TYPE.error,
                      );
                    },
                  );
                }}>
                {myGlobal.downloadIndex === index &&
                myGlobal.downloadParentIndex === parentIndex ? (
                  downloading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <MaterialCommunityIcons
                      name={MATERIAL_COMMUNITY_ICONS.cloudDeleteOutline}
                      size={22}
                      color={colors.white}
                    />
                  )
                ) : (
                  <MaterialCommunityIcons
                    name={MATERIAL_COMMUNITY_ICONS.cloudDeleteOutline}
                    size={22}
                    color={colors.white}
                  />
                )}
              </DownloadWrapper>
              <DeleteWrapper
                onPress={() =>
                  callDeleteAction(
                    documentList[key].file_id,
                    index,
                    parentIndex,
                  )
                }>
                {myGlobal.removeIndex === index &&
                myGlobal.removeParentIndex === parentIndex ? (
                  isRemoveImageLoading || isRemoveDocumentLoading ? (
                    <ActivityIndicator color={colors.primaryButton} />
                  ) : (
                    <MaterialCommunityIcons
                      name={MATERIAL_COMMUNITY_ICONS.deleteOutline}
                      size={22}
                      color={colors.darkGray}
                    />
                  )
                ) : (
                  <MaterialCommunityIcons
                    name={MATERIAL_COMMUNITY_ICONS.deleteOutline}
                    size={22}
                    color={colors.darkGray}
                  />
                )}
              </DeleteWrapper>
            </RemoveDocumentsContainer>
          </ImageWrapper>
        );
      });
    } else if (location !== '' || docName !== '') {
      return (
        <ImageWrapper key={`uploadedFiles_${parentIndex}`}>
          <DocumentContainer>
            {location !== '' && docName !== '' ? (
              <DocumentText
                numberOfLines={1}>{`${location} - ${docName}`}</DocumentText>
            ) : location !== '' ? (
              <DocumentText numberOfLines={1}>{location}</DocumentText>
            ) : (
              <DocumentText numberOfLines={1}>{docName}</DocumentText>
            )}
          </DocumentContainer>
          <RemoveDocumentsContainer>
            <DeleteWrapper
              onPress={() => callDeleteAction(data?.id, 0, parentIndex)}>
              {myGlobal.removeParentIndex === parentIndex ? (
                isRemoveImageLoading || isRemoveDocumentLoading ? (
                  <ActivityIndicator color={colors.primaryButton} />
                ) : (
                  <MaterialCommunityIcons
                    name={MATERIAL_COMMUNITY_ICONS.deleteOutline}
                    size={22}
                    color={colors.darkGray}
                  />
                )
              ) : (
                <MaterialCommunityIcons
                  name={MATERIAL_COMMUNITY_ICONS.deleteOutline}
                  size={22}
                  color={colors.darkGray}
                />
              )}
            </DeleteWrapper>
          </RemoveDocumentsContainer>
        </ImageWrapper>
      );
    }
  };

  /**
   * Name: renderUploadedDocuments
   * Desc: Function to render upload documents
   */
  const renderUploadedDocuments = () => {
    if (uploadedDocuments.length !== 0) {
      return uploadedDocuments.map((item, index) => {
        const location = item?.Location || '';
        const docName =
          myGlobal.item?.document_checklist_id ===
          PROFESSIONAL_ADVISOR_CONTACT_INFO_ID
            ? item?.Type || ''
            : item?.DocumentName || '';
        return (
          <UploadedContainer key={`uploadedList_${index}`}>
            {(location !== '' ||
              docName !== '' ||
              (item?.images && Object.keys(item?.images).length > 0)) && (
              <React.Fragment>
                <ContentView>{renderUploadedList(item, index)}</ContentView>
                <DivContainer>
                  <Divider />
                  <LogoContainer>
                    <LogoImage source={images.logo} />
                  </LogoContainer>
                </DivContainer>
              </React.Fragment>
            )}
          </UploadedContainer>
        );
      });
    }
    return <></>;
  };
  /**
   * Name: renderLocalData
   * Desc: Function to render local content
   */
  const renderLocalData = () => {
    if (imageData.length !== 0) {
      return imageData.map((item: any, index) => {
        return (
          <ImageWrapper key={'localData_' + index}>
            {IMAGE_EXTENSIONS.includes(item?.type) ||
            IMAGE_EXTENSIONS.includes(item?.FileExtension) ? (
              <ImageTouchable
                onPress={() => {
                  setImagesList(item?.uri || item?.fileUri);
                }}>
                <Image
                  source={{uri: item?.uri || item?.fileUri}}
                  indicator={ProgressPie}
                  indicatorProps={{
                    color: colors.primaryButton,
                  }}
                  style={styles.imageView}
                />
              </ImageTouchable>
            ) : (
              <DocumentSubContainer>
                <Document />
                <DocumentText>{item?.fileName}</DocumentText>
              </DocumentSubContainer>
            )}
            <RemoveContainer>
              <DeleteWrapper onPress={() => callRemoveTempImage(index)}>
                <MaterialCommunityIcons
                  name={MATERIAL_COMMUNITY_ICONS.deleteOutline}
                  size={22}
                  color={colors.darkGray}
                />
              </DeleteWrapper>
            </RemoveContainer>
          </ImageWrapper>
        );
      });
    }
    return <></>;
  };

  /**
   * Name: setImagesList
   * Desc: Function to set images list in array
   * @param {string} link - link of image
   */
  const setImagesList = link => {
    let imageList: any = [];
    imageList.push({uri: link});
    imageData?.map((item: any) => {
      if (
        IMAGE_EXTENSIONS.includes(item?.type) ||
        IMAGE_EXTENSIONS.includes(item?.FileExtension)
      ) {
        if (link !== item?.uri || item?.fileUri) {
          imageList.push({uri: item?.uri || item?.fileUri});
        }
      }
    });
    Object.keys(fileDetail).map(function (key) {
      if (FILE_TYPE.image === fileDetail[key].type) {
        if (link !== fileDetail[key].file_url) {
          imageList.push({uri: fileDetail[key].file_url});
        }
      }
    });
    myGlobal.images = imageList;
    setImageModal(true);
  };

  /*
   * Name: callRemoveTempImage
   * Desc: Function to remove un uploaded file or image
   */
  const callRemoveTempImage = index => {
    const data = imageData.slice(0);
    data.splice(index, 1);
    setImageData(data);
  };

  /**
   * Name: callDeleteAction
   * Desc: Function to open delete alert modal
   */
  const callDeleteAction = (item_id, index, parentIndex) => {
    setAlertModal(true);
    myGlobal.deleteModalData = {
      removeIndex: index,
      removeParentIndex: parentIndex,
      file_id: item_id,
    };
  };

  /*
   * Name: deleteFileFromServer
   * Desc: Function to remove uploaded file or image
   */
  const deleteFileFromServer = () => {
    setAlertModal(false);
    setIsImageRemove(true);
    myGlobal.removeIndex = myGlobal.deleteModalData.removeIndex;
    myGlobal.removeParentIndex = myGlobal.deleteModalData.removeParentIndex;
    const requestData = {
      checklist_id: myGlobal.item?.id,
      file_id: myGlobal.deleteModalData.file_id,
    };
    if (
      myGlobal.item?.document_checklist_id === IMPORTANT_DOCUMENT_ID ||
      myGlobal.item?.document_checklist_id ===
        PROFESSIONAL_ADVISOR_CONTACT_INFO_ID
    ) {
      removeDocument(requestData);
    } else {
      removeImage(requestData);
    }
  };

  /*
   * Name: showActionSheet
   * Desc: open action sheet for image or document upload.
   */
  const showActionSheet = () => {
    actionSheet?.current?.show();
  };

  /*
   * Name: generateSignedRequest
   * Desc: Function to get the signed request
   * @params {any} res - Response of the selected media
   */
  const generateSignedRequest = async res => {
    const userId = userData?.id || 0;
    let updateFolderName = FOLDER_NAMES.saveChaptersQuestions.replace(
      'user_id',
      userId.toString(),
    );
    const requestData = {
      name: res?.fileName,
      folder_name: updateFolderName,
    };
    return requestData;
  };

  /**
   * Name: onSelectAction
   * Desc: Function to call on click on action sheet
   */
  const onSelectAction = (index: number) => {
    if (index === 0) {
      openDeviceCamera(imageData, photoMediaType)
        .then(async (res: any) => {
          if (res.length >= 1) {
            let data = [];
            data = res.slice(0);
            setImageData(data);
          }
        })
        .catch(() => {});
    } else if (index === 1) {
      onImageLibraryPress(
        photoMediaType,
        MEDIA_SELECTION_LIMIT.myVault,
        imageData,
      )
        .then((res: any) => {
          if (res.length >= 1) {
            let data = [];
            data = res.slice(0);
            setImageData(data);
          }
        })
        .catch(() => {});
    } else if (index === 2) {
      pickDocument(imageData, false)
        .then(async (res: any) => {
          const response = [...res];
          if (response.length >= 1) {
            let data: any = [];
            data = response.slice(0);
            setImageData(data);
          }
        })
        .catch(() => {});
    }
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
            <ScrollViewContainer
              refreshControl={
                <RefreshControl
                  refreshing={isQuestionLoading}
                  onRefresh={() => {
                    getQuestionDetails(myGlobal.item?.id);
                  }}
                />
              }>
              {renderContent()}
              <MessageWrapper>
                <MessageText>{questionDetail?.custom_message}</MessageText>
              </MessageWrapper>
            </ScrollViewContainer>
          </KeyboardAwareScrollView>
          {myGlobal.item?.document_checklist_id === IMPORTANT_DOCUMENT_ID ||
          myGlobal.item?.document_checklist_id ===
            PROFESSIONAL_ADVISOR_CONTACT_INFO_ID ? (
            <React.Fragment>
              <ButtonContainer>
                <ButtonWrapper>
                  <PrimaryButton
                    title={saveAddMore}
                    onPress={() => saveAndContinue(true)}
                    buttonStyle={{
                      paddingHorizontal: rpx(10),
                      height: rpx(45),
                      width: rpx(screenWidth / 2),
                    }}
                    showLoader={myGlobal.isSaveAndAddMore && isSaveInProgress}
                  />
                </ButtonWrapper>
                <ButtonWrapper>
                  <PrimaryButton
                    title={saveContinue}
                    onPress={() => saveAndContinue(false)}
                    buttonStyle={{
                      paddingHorizontal: rpx(10),
                      height: rpx(45),
                      width: rpx(screenWidth / 2),
                    }}
                    showLoader={
                      !myGlobal.isSaveAndAddMore &&
                      !isImageRemove &&
                      isSaveInProgress
                    }
                  />
                </ButtonWrapper>
              </ButtonContainer>
              <ButtonContainer>
                <ButtonWrapper>
                  <PrimaryButton
                    title={previous}
                    onPress={onPreviousClick}
                    buttonStyle={{
                      height: rpx(45),
                      paddingHorizontal: rpx(30),
                      backgroundColor: colors.greenTxt,
                      width: rpx(screenWidth),
                    }}
                  />
                </ButtonWrapper>
              </ButtonContainer>
            </React.Fragment>
          ) : (
            <ButtonContainer>
              <ButtonWrapper>
                <PrimaryButton
                  title={previous}
                  onPress={onPreviousClick}
                  buttonStyle={{
                    height: rpx(45),
                    paddingHorizontal: rpx(30),
                    backgroundColor: colors.greenTxt,
                  }}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <PrimaryButton
                  title={saveContinue}
                  onPress={() => saveAndContinue(false)}
                  buttonStyle={{
                    paddingHorizontal: rpx(30),
                    height: rpx(45),
                    width: rpx(250),
                  }}
                  showLoader={!isImageRemove && isSaveInProgress}
                />
              </ButtonWrapper>
            </ButtonContainer>
          )}
        </React.Fragment>
      )}
      <PreviewImage
        visible={imageModal}
        swipeDown={() => {
          myGlobal.images = [];
          setImageModal(false);
        }}
      />
      <ActionSheet
        ref={actionSheet}
        options={UPLOAD_PICKER_OPTIONS}
        cancelButtonIndex={3}
        destructiveButtonIndex={3}
        onPress={(index: number) => {
          onSelectAction(index);
        }}
      />
      <ModalBox
        visible={alertModal}
        message={strings.deleteMessage}
        onPressPositiveBtn={deleteFileFromServer}
        onPressNegativeBtn={() => {
          setAlertModal(false);
          myGlobal.deleteModalData = {
            removeIndex: 0,
            removeParentIndex: 0,
            file_id: '',
          };
        }}
      />
    </ScreenWrapper>
  );
};

export default WishDetails;

const styles = StyleSheet.create({
  imageView: {
    width: rpx(150),
    height: rpx(150),
    marginLeft: rpx(20),
  },
});
