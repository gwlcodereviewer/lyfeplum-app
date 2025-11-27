/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, BackHandler, StyleSheet, Switch} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import colors from '../../../styles/colors';
import {ScrollViewContainer} from '../../../styles/style';
import {rpx} from '../../../styles/styleUtils';
import LogoIcon from '../../assets/images/svgImages/logoIcon';
import Plus from '../../assets/images/svgImages/plus';
import AppStatusBar from '../../components/appStatusBar';
import PrimaryButton from '../../components/button';
import DropdownComponent from '../../components/dropdown';
import Header from '../../components/header';
import ModalBox from '../../components/modalBox';
import CustomLoader from '../../components/screenLoader';
import {STATUS_CODES} from '../../constants/server';
import {
  FOLDER_NAMES,
  MEDIA_SELECTION_LIMIT,
  TOAST_MESSAGE_TYPE,
} from '../../constants/utils';
import {strings} from '../../localization';
import {NAV_ADD_STORY, NAV_CHAPTER_PREVIEW} from '../../navigation/constants';
import {useGetSignedUrlMutation} from '../../redux/api/awsApi';
import {
  useAddChapterMutation,
  useDeleteStoryMutation,
  useEditChapterMutation,
  useSaveFeaturedImageMutation,
  useUpdateChapterMutation,
  useUpdateStoryStatusMutation,
} from '../../redux/api/chapterApi';
import {INavigation} from '../../types/utils';
import {
  onImageLibraryPress,
  photoMediaType,
  showAlert,
  showServerError,
  showToastMessage,
  uploadToS3,
} from '../../utils';
import {
  AddButtonWrapper,
  ButtonWrapper,
  ChapterNameText,
  EditButtonWrapper,
  EmptyImage,
  ErrorContainer,
  ErrorText,
  FeaturedImageContainer,
  FeaturedSelectedImageContainer,
  HeaderContainer,
  HeaderText,
  ImageContainer,
  Input,
  InputContainer,
  LabelText,
  LogoImageContainer,
  PreviewChapterContainer,
  SaveButtonWrapper,
  ScreenWrapper,
  SelectImageContainer,
  SelectImageText,
  StatusButtonWrapper,
  StoryContainer,
  StoryStatusText,
  StoryText,
} from './styled';

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: INavigation;
  route?: INavigation;
}

/**
 * Name: Add Chapters screen
 * Desc: Screen to render add chapters UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const AddChapters: React.FC<Props> = (props: Props) => {
  const {
    addNewChapter,
    newChapter,
    addNewChapterSmall,
    saveContinue,
    enterTitle,
    addCustomStory,
    featuredImage,
    selectImage,
    previewChapter,
    chapterName,
    preview,
    findAStory,
    editStory,
    sureDelete,
    draft,
    published,
    saveChapter,
  } = strings;

  const {navigation, route} = props;
  const myGlobal: any = global;
  let fromTemplate = false;
  if (route?.params) {
    fromTemplate = route?.params?.isFromTemplate;
  }
  let hashId = '';
  if (fromTemplate) {
    hashId = myGlobal.hashId;
  }
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterId, setChapterId] = useState(hashId || '');
  const [chapterTitleError, setChapterTitleError] = useState('');
  const [imageData, setImageData] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState<any>({});
  const [imageUri, setImageUri] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isPreviewDisabled, setIsPreviewDisabled] = useState<boolean>(false);
  const [chapterTitleUpdate, setChapterTitleUpdate] = useState('');
  const [awsUploadData, setAwsUploadData] = useState<any[]>([]);

  /**
   * Name: useEffect
   * Desc: useEffect to call  api on navigation
   */
  useEffect(() => {
    if (myGlobal.hashId) {
      setRefreshing(true);
      editChapter(myGlobal.hashId);
    } else if (chapterId !== '') {
      setRefreshing(true);
      editChapter(chapterId);
    }
    const backAction = () => {
      if (chapterId) {
        editChapter(chapterId);
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [route?.params]);

  const [
    addChapter,
    {
      isLoading: isAddChapterLoading,
      isError: isAddChapterError,
      error: addChapterError,
      isSuccess: isAddChapterSuccess,
      data: addChapterData,
    },
  ] = useAddChapterMutation();

  const [
    updateStoryStatus,
    {
      isLoading: isUpdateStatusLoading,
      isError: isUpdateStatusError,
      error: updateStatusError,
      isSuccess: isUpdateStatusSuccess,
      data: updateStatusData,
    },
  ] = useUpdateStoryStatusMutation();

  const [
    saveFeaturedImage,
    {
      isLoading: isSaveFeaturedImageLoading,
      isError: isSaveFeaturedImageError,
      error: saveFeaturedImageError,
      isSuccess: isSaveFeaturedImageSuccess,
      data: saveFeaturedImageData,
    },
  ] = useSaveFeaturedImageMutation();

  const [
    deleteStory,
    {
      isLoading: isDeleteStoryLoading,
      isError: isDeleteStoryError,
      error: deleteStoryError,
      isSuccess: isDeleteStorySuccess,
      data: deleteStoryData,
    },
  ] = useDeleteStoryMutation();

  const [
    editChapter,
    {
      isLoading: isEditChapterLoading,
      isError: isEditChapterError,
      error: editChapterError,
      isSuccess: isEditChapterSuccess,
      data: editChapterData,
    },
  ] = useEditChapterMutation();

  const [
    updateChapter,
    {
      isLoading: isUpdateChapterLoading,
      isError: isUpdateChapterError,
      error: updateChapterError,
      isSuccess: isUpdateChapterSuccess,
      data: updateChapterData,
    },
  ] = useUpdateChapterMutation();

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
          saveFeaturedImageAPI();
        } else {
          setIsPreviewDisabled(false);
          setImageData([]);
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
      setIsPreviewDisabled(false);
      setImageData([]);
      showServerError(signedUrlError, navigation);
    }
  }, [isSignedUrlLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to edit chapter details.
   */
  useEffect(() => {
    if (isEditChapterSuccess) {
      if (editChapterData && editChapterData?.status) {
        setQuestionData(editChapterData?.questions);
        updateQuestionList(editChapterData?.questions);
        if (editChapterData?.chapter?.is_published) {
          setIsEnabled(true);
        }
        editChapterData?.questions.map(item => {
          if (item?.question_id === selectedQuestion?.question_id) {
            setSelectedQuestion(item);
          }
        });
        if (fromTemplate) {
          setImageUri(editChapterData?.chapter?.featured_image);
        }
        setChapterTitle(editChapterData?.chapter?.title);
        setChapterTitleUpdate(editChapterData?.chapter?.title);
        setRefreshing(false);
      } else {
        setRefreshing(false);
        showToastMessage(
          strings.lyfePlum,
          editChapterData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isEditChapterError) {
      setRefreshing(false);
      showServerError(editChapterError, navigation);
    }
  }, [isEditChapterLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for add chapter API response.
   */
  useEffect(() => {
    if (isAddChapterSuccess) {
      if (addChapterData?.status) {
        setChapterId(addChapterData?.chapter_id);
        myGlobal.hashId = addChapterData?.chapter_id;
        showToastMessage(
          strings.lyfePlum,
          addChapterData.message,
          TOAST_MESSAGE_TYPE.success,
        );
        setChapterTitle(addChapterData?.chapter_name);
      } else {
        showAlert('', addChapterData?.errors, strings.ok);
      }
    }
    if (isAddChapterError) {
      showServerError(addChapterError, navigation);
    }
  }, [isAddChapterLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for delete story API response.
   */
  useEffect(() => {
    if (isDeleteStorySuccess) {
      if (deleteStoryData?.status) {
        editChapter(chapterId);
      }
    }
    if (isDeleteStoryError) {
      showServerError(deleteStoryError, navigation);
    }
  }, [isDeleteStoryLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for update chapter API response.
   */
  useEffect(() => {
    if (isUpdateChapterSuccess) {
      if (updateChapterData?.status) {
        showToastMessage(
          strings.lyfePlum,
          updateChapterData.message,
          TOAST_MESSAGE_TYPE.success,
        );
        setChapterTitle(chapterTitleUpdate);
      }
    }
    if (isUpdateChapterError) {
      showServerError(updateChapterError, navigation);
    }
  }, [isUpdateChapterLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for update story status API response.
   */
  useEffect(() => {
    if (isUpdateStatusSuccess) {
      if (updateStatusData?.status) {
        showToastMessage(
          strings.lyfePlum,
          updateStatusData.message,
          TOAST_MESSAGE_TYPE.success,
        );
      }
    }
    if (isUpdateStatusError) {
      showServerError(updateStatusError, navigation);
    }
  }, [isUpdateStatusLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for image upload API response.
   */
  useEffect(() => {
    if (isSaveFeaturedImageSuccess) {
      if (saveFeaturedImageData?.status) {
        showToastMessage(
          strings.lyfePlum,
          saveFeaturedImageData.message,
          TOAST_MESSAGE_TYPE.success,
        );
        setIsPreviewDisabled(false);
      }
    }
    if (isSaveFeaturedImageError) {
      showServerError(saveFeaturedImageError, navigation);
      setIsPreviewDisabled(false);
    }
  }, [isSaveFeaturedImageLoading]);

  /**
   * Name: resetState
   * Desc: Function to reset all states.
   */
  const resetState = () => {
    setChapterTitle('');
    setChapterTitleUpdate('');
    setChapterId('');
    setChapterTitleError('');
    setImageData([]);
    setQuestionData([]);
    setQuestionList([]);
    setImageUri('');
    myGlobal.hashId = '';
  };

  /**
   * Name: updateQuestionList
   * Desc: Function to create questions list.
   * @param questions - The questions response.
   */
  const updateQuestionList = async (questionsArray: any[]) => {
    const questions: any = [];
    await questionsArray.map(item => {
      const questionObj = {
        label: item?.question,
        value: item?.question,
      };
      questions.push(questionObj);
    });
    setQuestionList(questions);
  };

  /**
   * Name: validateField
   * Desc: Function to validate input fields
   * @param {any} allField - To validate all fields, It could be true and false
   * @param {string} field - Individual field name to validate
   * @returns check validation on form
   */
  const validateField = (allField = false, field?: string) => {
    let invalidFields = 0;
    if (field === addNewChapter || allField) {
      if (chapterTitleUpdate === '') {
        setChapterTitleError(enterTitle);
        invalidFields++;
      } else {
        setChapterTitleError('');
      }
    }
    return invalidFields === 0;
  };

  /**
   * Name: addChapterAPI
   * Desc: Function to call add chapter API.
   */
  const addChapterAPI = () => {
    const isValidFields = validateField(true);
    if (!isValidFields) {
      return false;
    }
    const requestData = {
      title: chapterTitleUpdate,
    };
    addChapter(requestData);
  };

  /**
   * Name: saveFeaturedImageAPI
   * Desc: Function to call save featured image API.
   */
  const saveFeaturedImageAPI = () => {
    const requestData = {
      chapter_id: chapterId,
      file: signedUrlData?.image_path,
    };
    setAwsUploadData([]);
    saveFeaturedImage(requestData);
  };

  /*
   * Name: generateSignedUrl
   * Desc: Function to get the signed url from server
   * @params {any} res - Response of the selected media
   */
  const generateSignedUrl = res => {
    try {
      const modifiedChapterTitle = chapterTitle.trim().replace(/ /g, '_');
      let updateFolderName = FOLDER_NAMES.saveFeaturedImage.replace(
        'chapter_title',
        modifiedChapterTitle,
      );
      updateFolderName = updateFolderName.replace('chapter_id', chapterId);
      const requestData = {
        name: res?.fileName,
        folder_name: updateFolderName,
      };
      getSignedUrl(requestData);
    } catch (error) {
      setIsPreviewDisabled(false);
      setImageData([]);
      showToastMessage(
        strings.lyfePlum,
        strings.somethingWentWrong,
        TOAST_MESSAGE_TYPE.error,
      );
    }
  };

  /**
   * Name: selectFeaturedImage
   * Desc: Function to select featured image from gallery.
   */
  const selectFeaturedImage = () => {
    setImageData([]);
    onImageLibraryPress(photoMediaType, MEDIA_SELECTION_LIMIT.featuredImage, [])
      .then((res: any) => {
        if (res) {
          setIsPreviewDisabled(true);
          setImageData(res);
          setAwsUploadData(res);
          generateSignedUrl(res[0]);
        } else {
          setIsPreviewDisabled(false);
          setImageData([]);
        }
      })
      .catch(() => {
        setIsPreviewDisabled(false);
        setImageData([]);
      });
  };

  /**
   * Method to render error
   * @returns {string} error text view
   */
  const renderError = () => {
    return (
      <ErrorContainer>
        <ErrorText>{chapterTitleError}</ErrorText>
      </ErrorContainer>
    );
  };

  /**
   * Name: selectQuestion
   * Desc: Function to set selected question.
   * @param questionText - The selected question.
   */
  const selectQuestion = (questionText: string) => {
    questionData.map((item: any) => {
      if (item?.question === questionText) {
        setSelectedQuestion(item);
        setTimeout(() => {
          onUpdateStory(item);
        }, 200);
      }
    });
  };

  /**
   * Name: callDeleteAPI
   * Desc: Function to call delete story API.
   */
  const callDeleteAPI = () => {
    if (selectedQuestion) {
      setShowDeleteModal(false);
      setSelectedQuestion({});
      deleteStory(selectedQuestion?.question_id);
    }
  };

  /**
   * Name: toggleSwitch
   * Desc: Function to update status of story
   */
  const toggleSwitch = () => {
    const requestData = {
      chapter_id: chapterId,
      status: isEnabled ? draft : published,
    };
    updateStoryStatus(requestData);
    setIsEnabled(previousState => !previousState);
  };

  /**
   * Name: updateChapterDetail
   * Desc: Function to update chapter
   */
  const updateChapterDetail = () => {
    const requestData = {
      chapter_id: chapterId,
      title: chapterTitleUpdate,
    };
    updateChapter(requestData);
  };
  const onRefresh = () => {
    editChapter(chapterId);
  };
  const onDelete = () => {
    setSelectedQuestion({});
    editChapter(chapterId);
  };
  const onUpdateStory = (selectedQuestionItem?: any) => {
    navigation?.navigate(NAV_ADD_STORY, {
      editData: selectedQuestionItem || selectedQuestion,
      isEdit: true,
      chapter_id: chapterId,
      onRefresh: () => onRefresh(),
      onDelete: () => onDelete(),
    });
  };
  return (
    <ScreenWrapper>
      <AppStatusBar />
      <Header
        title={addNewChapter}
        onPressLeft={() => {
          resetState();
          navigation?.goBack();
        }}
      />
      <HeaderContainer>
        <HeaderText>{chapterId !== '' ? chapterTitle : newChapter}</HeaderText>
      </HeaderContainer>
      {refreshing ? (
        <CustomLoader />
      ) : (
        <ScrollViewContainer>
          {chapterId !== '' && (
            <StatusButtonWrapper>
              <StoryStatusText>{draft}</StoryStatusText>
              <Switch
                trackColor={{false: colors.lineColor, true: colors.greenColor}}
                thumbColor={isEnabled ? colors.primaryButton : colors.white}
                ios_backgroundColor={colors.black}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <StoryStatusText>{published}</StoryStatusText>
            </StatusButtonWrapper>
          )}
          <InputContainer>
            <Input
              placeholder={addNewChapterSmall}
              placeholderTextColor={colors.labelColor}
              value={chapterTitleUpdate}
              onChangeText={text => setChapterTitleUpdate(text)}
              multiline={true}
              autoCorrect={false}
              maxLength={100}
            />
          </InputContainer>
          {chapterTitleError !== '' && renderError()}
          {chapterId !== '' && (
            <SaveButtonWrapper>
              <PrimaryButton
                title={saveChapter}
                onPress={() => updateChapterDetail()}
                showLoader={isUpdateChapterLoading}
                buttonStyle={{
                  height: rpx(45),
                  borderColor: colors.white,
                  borderWidth: rpx(3),
                }}
              />
            </SaveButtonWrapper>
          )}
          {chapterId !== '' && questionList.length !== 0 && (
            <React.Fragment>
              <DropdownComponent
                data={questionList}
                dropDownLabel={findAStory}
                onChange={text => selectQuestion(text)}
                isSearch={false}
                isChapter={true}
                selectedValue={
                  selectedQuestion?.question ? selectedQuestion?.question : ''
                }
              />
              {selectedQuestion?.question && (
                <StoryContainer>
                  <StoryText>{selectedQuestion.question}</StoryText>
                  <EditButtonWrapper>
                    <PrimaryButton
                      title={editStory}
                      onPress={() => onUpdateStory()}
                      buttonStyle={{height: rpx(32), width: rpx(125)}}
                    />
                  </EditButtonWrapper>
                </StoryContainer>
              )}
            </React.Fragment>
          )}
          <ButtonWrapper>
            <PrimaryButton
              title={chapterId === '' ? saveContinue : addCustomStory}
              onPress={() =>
                chapterId === ''
                  ? addChapterAPI()
                  : navigation?.navigate(NAV_ADD_STORY, {
                      chapter_id: chapterId,
                      isEdit: false,
                      onRefresh: () => onRefresh(),
                      onDelete: () => onDelete(),
                    })
              }
              showLoader={isAddChapterLoading}
              buttonStyle={{height: rpx(45)}}
            />
          </ButtonWrapper>
          {chapterId !== '' && (
            <React.Fragment>
              <LabelText>{featuredImage}</LabelText>
              {imageData.length === 0 ? (
                <React.Fragment>
                  {isPreviewDisabled ? (
                    <FeaturedImageContainer>
                      <SelectImageContainer>
                        <ActivityIndicator color={colors.primaryButton} />
                      </SelectImageContainer>
                    </FeaturedImageContainer>
                  ) : (
                    <React.Fragment>
                      {imageUri === '' ? (
                        <FeaturedImageContainer
                          onPress={() => selectFeaturedImage()}>
                          <SelectImageContainer>
                            <Plus />
                            <SelectImageText>{selectImage}</SelectImageText>
                          </SelectImageContainer>
                        </FeaturedImageContainer>
                      ) : (
                        <FeaturedSelectedImageContainer
                          onPress={() => selectFeaturedImage()}>
                          <Image
                            source={{uri: imageUri}}
                            indicator={ProgressPie}
                            indicatorProps={{
                              color: colors.primaryButton,
                            }}
                            style={styles.imageView}
                          />
                        </FeaturedSelectedImageContainer>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {isPreviewDisabled ? (
                    <FeaturedImageContainer>
                      <SelectImageContainer>
                        <ActivityIndicator color={colors.primaryButton} />
                      </SelectImageContainer>
                    </FeaturedImageContainer>
                  ) : (
                    <FeaturedSelectedImageContainer
                      onPress={() => selectFeaturedImage()}>
                      <Image
                        source={{uri: imageData[imageData.length - 1]?.uri}}
                        indicator={ProgressPie}
                        indicatorProps={{
                          color: colors.primaryButton,
                        }}
                        style={styles.imageView}
                      />
                    </FeaturedSelectedImageContainer>
                  )}
                </React.Fragment>
              )}
              <LabelText>{previewChapter}</LabelText>
              <PreviewChapterContainer>
                <ImageContainer>
                  {imageData.length === 0 ? (
                    <React.Fragment>
                      {isPreviewDisabled ? (
                        <EmptyImage>
                          <ActivityIndicator color={colors.primaryButton} />
                        </EmptyImage>
                      ) : (
                        <React.Fragment>
                          {imageUri === '' ? (
                            <LogoImageContainer>
                              <LogoIcon />
                            </LogoImageContainer>
                          ) : (
                            <Image
                              source={{uri: imageUri}}
                              indicator={ProgressPie}
                              indicatorProps={{
                                color: colors.primaryButton,
                              }}
                              style={styles.previewImageView}
                            />
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {isPreviewDisabled ? (
                        <EmptyImage>
                          <ActivityIndicator color={colors.primaryButton} />
                        </EmptyImage>
                      ) : (
                        <Image
                          source={{
                            uri: imageData[imageData.length - 1]?.uri,
                          }}
                          indicator={ProgressPie}
                          indicatorProps={{
                            color: colors.primaryButton,
                          }}
                          style={styles.previewImageView}
                        />
                      )}
                    </React.Fragment>
                  )}
                </ImageContainer>
                <ChapterNameText>{chapterTitle || chapterName}</ChapterNameText>
                <AddButtonWrapper>
                  <PrimaryButton
                    title={preview}
                    buttonStyle={{height: rpx(40)}}
                    onPress={() => {
                      navigation?.navigate(NAV_CHAPTER_PREVIEW);
                    }}
                    isDisable={isPreviewDisabled}
                  />
                </AddButtonWrapper>
              </PreviewChapterContainer>
            </React.Fragment>
          )}
          <ModalBox
            visible={showDeleteModal}
            message={sureDelete}
            onPressPositiveBtn={() => callDeleteAPI()}
            onPressNegativeBtn={() => setShowDeleteModal(false)}
          />
        </ScrollViewContainer>
      )}
    </ScreenWrapper>
  );
};

export default AddChapters;

const styles = StyleSheet.create({
  imageView: {
    width: '100%',
    height: rpx(200),
  },
  previewImageView: {
    width: rpx(150),
    height: rpx(150),
  },
});
