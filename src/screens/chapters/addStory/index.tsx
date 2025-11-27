/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Image from 'react-native-image-progress';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import ProgressPie from 'react-native-progress/Pie';
import VideoPlayer from 'react-native-video-controls';
import {useSelector} from 'react-redux';
import colors from '../../../../styles/colors';
import {keyboardType, rpx} from '../../../../styles/styleUtils';
import Images from '../../../assets/images';
import AppStatusBar from '../../../components/appStatusBar';
import PrimaryButton from '../../../components/button';
import Header from '../../../components/header';
import InputBox from '../../../components/inputBox';
import ModalBox from '../../../components/modalBox';
import PreviewImage from '../../../components/previewImage';
import {VideoModel} from '../../../components/videoPlayer';
import {STATUS_CODES} from '../../../constants/server';
import {
  FOLDER_NAMES,
  MEDIA_FILE_TYPE,
  MEDIA_SELECTION_LIMIT,
  TOAST_MESSAGE_TYPE,
  IMAGE_PICKER_OPTIONS,
} from '../../../constants/utils';
import {strings} from '../../../localization';
import {NAV_ADD_CHAPTERS} from '../../../navigation/constants';
import {useGetSignedUrlMutation} from '../../../redux/api/awsApi';
import {
  useAddStoryAttachmentMutation,
  useDeleteAttachmentMutation,
  useDeleteStoryMutation,
  useEditChapterMutation,
  useSaveChapterQuestionsMutation,
  useUpdateStoryMutation,
} from '../../../redux/api/chapterApi';
import {RootState} from '../../../redux/store';
import {INavigation} from '../../../types/utils';
import {
  isValidAge,
  mixedMediaType,
  onImageLibraryPress,
  openDeviceCamera,
  photoMediaType,
  showAlert,
  showServerError,
  showToastMessage,
  uploadToS3,
} from '../../../utils';
import {
  BottomContainer,
  BtnText,
  CancelBtn,
  ConfirmBtn,
  DeleteStoryContainer,
  DeleteStoryText,
  Divider,
  DoubleBtnView,
  EmptySpace,
  HeaderContainer,
  HeaderText,
  ImageTouchable,
  ImageWrapper,
  InputBoxContainer,
  Label,
  PlayIconContainer,
  PlayIconWrapper,
  PlayImage,
  RemoveContainer,
  ScreenWrapper,
  ThreeBtnView,
  UploadWrapper,
  UploadingText,
  VideoContainer,
} from './styled';

const myGlobal: any = global;

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: INavigation;
  route?: INavigation;
}

/**
 * Name: AddStory
 * Desc: Screen to render add story UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const AddStory: React.FC<Props> = (props: Props) => {
  const {navigation, route} = props;
  const {chapter_id, isEdit, editData, onRefresh, onDelete} = route?.params;
  const richText = React.useRef();
  const userData = useSelector((state: RootState) => state.user.userData);
  const {
    addStory,
    editStory,
    question,
    answer,
    questionValidation,
    ageTxt,
    cancel,
    saveText,
    addPhotos,
    uploadText,
    removeText,
    enterAge,
    validAge,
  } = strings;
  const actionSheet = useRef<any>();
  const [questionTxt, setQuestionTxt] = useState(editData?.question || '');
  const [questionError, setQuestionError] = useState('');
  const [ageValue, setAgeValue] = useState(
    editData?.age ? editData?.age.toString() : '',
  );
  const [descriptionValue, setDescriptionValue] = useState(
    editData?.answer || '',
  );
  const [fileDetail, setFileDetail] = useState(
    editData?.attachments_array || [],
  );
  const [ageError, setAgeError] = useState('');
  const [imageModal, setImageModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState({isVisible: false, data: null});
  const [awsUploadData, setAwsUploadData] = useState<any[]>([]);

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
          if (awsUploadData[0]?.type.includes(MEDIA_FILE_TYPE.video)) {
            addStoryAttachment({
              file: signedUrlData?.image_path,
              question_id: editData?.question_id,
              file_type: MEDIA_FILE_TYPE.video,
            });
          } else {
            addStoryAttachment({
              file: signedUrlData?.image_path,
              question_id: editData?.question_id,
              file_type: MEDIA_FILE_TYPE.image,
            });
          }
          setAwsUploadData([]);
        } else {
          setIsUploading(false);
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
      setIsUploading(false);
      showServerError(signedUrlError, navigation);
    }
  }, [isSignedUrlLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for reset image list
   */
  useEffect(() => {
    myGlobal.images = [];
  }, []);

  const [
    saveChapterQuestions,
    {
      isLoading: isSaveQuestionLoading,
      isError: isSaveQuestionError,
      error: saveQuestionError,
      isSuccess: isSaveQuestionSuccess,
      data: saveQuestionData,
    },
  ] = useSaveChapterQuestionsMutation();

  const [
    updateStory,
    {
      isLoading: isUpdateStoryLoading,
      isError: isUpdateStoryError,
      error: updateStoryError,
      isSuccess: isUpdateStorySuccess,
      data: updateStoryData,
    },
  ] = useUpdateStoryMutation();

  const [
    deleteAttachment,
    {
      isLoading: isDeleteAttachmentLoading,
      isError: isDeleteAttachmentError,
      error: deleteAttachmentError,
      isSuccess: isDeleteAttachmentSuccess,
      data: deleteAttachmentData,
    },
  ] = useDeleteAttachmentMutation();

  const [
    addStoryAttachment,
    {
      isLoading: isAddAttachmentLoading,
      isError: isAddAttachmentError,
      error: addAttachmentError,
      isSuccess: isAddAttachmentSuccess,
      data: addAttachmentData,
    },
  ] = useAddStoryAttachmentMutation();

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
  /**
   * Name: useEffect
   * Desc: useEffect to edit chapter details.
   */
  useEffect(() => {
    if (isEditChapterSuccess) {
      editChapterData?.questions.map(item => {
        if (item?.question_id === editData?.question_id) {
          setFileDetail(item?.attachments_array || []);
        }
      });
    }
    if (isEditChapterError) {
      showServerError(editChapterError, navigation);
    }
  }, [isEditChapterLoading]);
  /**
   * Name: useEffect
   * Desc: useEffect for get API response of save story
   */
  useEffect(() => {
    if (isSaveQuestionSuccess) {
      if (saveQuestionData?.status) {
        navigation?.navigate(NAV_ADD_CHAPTERS, {
          isRefresh: true,
        });
      } else {
        showAlert('', saveQuestionData?.errors, strings.ok);
      }
    }
    if (isSaveQuestionError) {
      showServerError(saveQuestionError, navigation);
    }
  }, [isSaveQuestionLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for get API response of update story
   */
  useEffect(() => {
    if (isUpdateStorySuccess) {
      if (updateStoryData?.status) {
        navigation?.navigate(NAV_ADD_CHAPTERS, {
          isRefresh: true,
        });
      } else {
        showAlert('', updateStoryData?.errors, strings.ok);
      }
    }
    if (isUpdateStoryError) {
      showServerError(updateStoryError, navigation);
    }
  }, [isUpdateStoryLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for get remove image API response.
   */
  useEffect(() => {
    if (isDeleteAttachmentSuccess) {
      if (deleteAttachmentData?.status) {
        myGlobal.removeIndex = 0;
        showToastMessage(
          strings.lyfePlum,
          deleteAttachmentData?.message,
          TOAST_MESSAGE_TYPE.success,
        );
        editChapter(chapter_id);
      }
    }
    if (isDeleteAttachmentError) {
      showServerError(deleteAttachmentError, navigation);
    }
  }, [isDeleteAttachmentLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for get API response of add attachment
   */
  useEffect(() => {
    if (isAddAttachmentSuccess) {
      setIsUploading(false);
      if (addAttachmentData?.status) {
        editChapter(chapter_id);
        showToastMessage(
          strings.lyfePlum,
          addAttachmentData?.message,
          TOAST_MESSAGE_TYPE.success,
        );
      } else {
        showAlert('', addAttachmentData?.errors, strings.ok);
      }
    }
    if (isAddAttachmentError) {
      setIsUploading(false);
      showServerError(addAttachmentError, navigation);
    }
  }, [isAddAttachmentLoading]);
  /**
   * Name: useEffect
   * Desc: useEffect for delete story API response.
   */
  useEffect(() => {
    if (isDeleteStorySuccess) {
      if (deleteStoryData?.status) {
        navigation?.goBack();
        onDelete();
      }
    }
    if (isDeleteStoryError) {
      showServerError(deleteStoryError, navigation);
    }
  }, [isDeleteStoryLoading]);
  /**
   * Name: validateField
   * Desc: Function to validate input fields
   * @param {any} allField - To validate all fields, It could be true and false
   * @param {string} field - Individual field name to validate
   * @returns check validation on form
   */
  const validateField = (allField = false, field?: string) => {
    let invalidFields = 0;
    if (field === question || allField) {
      if (questionTxt === '') {
        setQuestionError(questionValidation);
        invalidFields++;
      } else {
        setQuestionError('');
      }
    }
    if (field === ageTxt || allField) {
      if (ageValue === '') {
        setAgeError(enterAge);
        invalidFields++;
      } else if (isValidAge(ageValue)) {
        setAgeError(validAge);
        invalidFields++;
      } else if (parseInt(ageValue, 10) > 100 || parseInt(ageValue, 10) === 0) {
        setAgeError(validAge);
        invalidFields++;
      } else {
        setAgeError('');
      }
    }
    return invalidFields === 0;
  };

  /**
   * Name: callSaveMethod
   * Desc: Function to validate and save
   */
  const callSaveMethod = () => {
    const res = validateField(true);
    if (res) {
      if (isEdit) {
        const requestData = {
          question_id: editData?.question_id,
          question: questionTxt,
          answer: descriptionValue,
          age: ageValue,
        };
        updateStory(requestData);
      } else {
        const requestData = {
          chapter_id: chapter_id,
          chapter_question: questionTxt,
          answer: descriptionValue,
          age: ageValue,
        };
        saveChapterQuestions(requestData);
      }
    }
  };
  const isMediaUploading = () => {
    return isAddAttachmentLoading || isEditChapterLoading || isUploading;
  };
  /**
   * Name: renderImageSection
   * Desc: Function to render image section
   * @returns JSX element
   */
  const renderImageSection = () => {
    return (
      <BottomContainer>
        <Divider />
        <Label>{addPhotos}</Label>
        <UploadWrapper>
          <PrimaryButton
            title={uploadText}
            onPress={showActionSheet}
            showLoader={isMediaUploading()}
            buttonStyle={{
              paddingHorizontal: rpx(30),
              height: rpx(40),
            }}
          />
        </UploadWrapper>
        {isMediaUploading() && (
          <UploadingText>{strings.uploadingText}</UploadingText>
        )}
        {renderUploadedData()}
      </BottomContainer>
    );
  };

  /*
   * Name: showActionSheet
   * Desc: open action sheet for image or document upload.
   */
  const showActionSheet = () => {
    actionSheet?.current?.show();
  };

  /*
   * Name: generateSignedUrl
   * Desc: Function to get the signed url from server
   * @params {any} res - Response of the selected media
   */
  const generateSignedUrl = res => {
    try {
      const userId = userData?.id;
      const updateFolderName = FOLDER_NAMES.addStoryAttachment.replace(
        'user_id',
        userId.toString(),
      );
      const requestData = {
        name: res?.fileName,
        folder_name: updateFolderName,
      };
      getSignedUrl(requestData);
    } catch (error) {
      setIsUploading(false);
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
      setTimeout(() => {
        setIsUploading(true);
      }, 500);
      openDeviceCamera([], photoMediaType)
        .then(async (res: any) => {
          if (res.length >= 1) {
            setAwsUploadData(res);
            generateSignedUrl(res[0]);
          } else {
            setIsUploading(false);
            showToastMessage(
              strings.lyfePlum,
              strings.somethingWentWrong,
              TOAST_MESSAGE_TYPE.error,
            );
          }
        })
        .catch(() => {
          setIsUploading(false);
        });
    } else if (index === 1) {
      setTimeout(() => {
        setIsUploading(true);
      }, 500);
      onImageLibraryPress(
        mixedMediaType,
        MEDIA_SELECTION_LIMIT.storyAttachment,
        [],
      )
        .then((res: any) => {
          if (res.length >= 1) {
            setAwsUploadData(res);
            generateSignedUrl(res[0]);
          } else {
            setIsUploading(false);
            showToastMessage(
              strings.lyfePlum,
              strings.somethingWentWrong,
              TOAST_MESSAGE_TYPE.error,
            );
          }
        })
        .catch(() => {
          setIsUploading(false);
        });
    }
  };
  /**
   * Name: callDeleteAPI
   * Desc: Function to call delete story API.
   */
  const callDeleteAPI = () => {
    setShowDeleteModal(false);
    deleteStory(editData?.question_id);
  };
  /**
   * Name: setImagesList
   * Desc: Function to set images list in array
   * @param {string} link - link of image
   */
  const setImagesList = link => {
    let imageList: any = [];
    imageList.push({uri: link});
    fileDetail?.map(item => {
      if (item?.link !== link) {
        imageList.push({uri: item?.link});
      }
    });
    myGlobal.images = imageList;
    setImageModal(true);
  };

  /**
   * Name: renderUploadedData
   * Desc: Function to render upload content
   */
  const renderUploadedData = () => {
    if (fileDetail.length !== 0) {
      return fileDetail.map((item, index) => {
        return (
          <ImageWrapper key={'uploadedData_' + index}>
            {item.attachment_type === 1 && (
              <ImageTouchable
                onPress={() => {
                  setImagesList(item.link);
                }}>
                <Image
                  source={{uri: item.link}}
                  indicator={ProgressPie}
                  indicatorProps={{
                    color: colors.primaryButton,
                  }}
                  style={styles.imageView}
                />
              </ImageTouchable>
            )}
            {item.attachment_type === 2 && (
              <VideoContainer
                onPress={() => {
                  setShowModal({
                    isVisible: true,
                    data: item,
                  });
                }}>
                <PlayIconContainer>
                  <PlayIconWrapper>
                    <PlayImage source={Images.playIcon} />
                  </PlayIconWrapper>
                </PlayIconContainer>
                <VideoPlayer
                  style={{borderRadius: rpx(15)}}
                  source={{
                    uri: item.link,
                  }}
                  paused
                  resizeMode="contain"
                  disablePlayPause
                  disableSeekbar
                  disableVolume
                  disableTimer
                  disableBack
                  disableFullscreen
                />
              </VideoContainer>
            )}
            <RemoveContainer>
              <PrimaryButton
                title={removeText}
                onPress={() => callRemoveImage(item.attch_id, index)}
                showLoader={
                  myGlobal.removeIndex === index
                    ? isDeleteAttachmentLoading
                    : false
                }
                buttonStyle={{
                  height: rpx(40),
                }}
              />
            </RemoveContainer>
          </ImageWrapper>
        );
      });
    }
    return <></>;
  };

  /*
   * Name: toggleModal
   * Desc: open modal for video
   */
  const toggleModal = state => {
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };

  /*
   * Name: callRemoveImage
   * Desc: Function to remove uploaded file or image
   */
  const callRemoveImage = (item_id, index) => {
    myGlobal.removeIndex = index;
    deleteAttachment(item_id);
  };

  return (
    <ScreenWrapper>
      <AppStatusBar />
      <Header
        title={isEdit ? editStory : addStory}
        onPressLeft={() => {
          navigation?.goBack();
          onRefresh();
        }}
      />
      <HeaderContainer>
        <HeaderText>{isEdit ? editStory : addStory}</HeaderText>
      </HeaderContainer>
      <KeyboardAwareScrollView
        style={styles.keyboardView}
        showsVerticalScrollIndicator={false}>
        <InputBoxContainer>
          <InputBox
            value={questionTxt}
            onChangeText={(text: string) => setQuestionTxt(text)}
            onBlur={() => validateField(false, question)}
            label={question}
            placeholder={question}
            errorText={questionError}
            multiline={true}
            maxLength={500}
            containerHeight={rpx(80)}
          />
        </InputBoxContainer>
        <InputBoxContainer>
          <InputBox
            value={ageValue}
            onChangeText={(text: string) => setAgeValue(text)}
            onBlur={() => validateField(false, ageTxt)}
            label={ageTxt}
            placeholder={ageTxt}
            inputKeyboardType={keyboardType.numeric}
            maxLength={3}
            errorText={ageError}
          />
        </InputBoxContainer>
        <InputBoxContainer>
          <Label>{answer}</Label>
          <RichEditor
            ref={richText}
            onChange={text => setDescriptionValue(text)}
            style={styles.editorStyle}
            androidLayerType="software"
            useContainer={false}
            containerStyle={styles.containerStyle}
            initialContentHTML={descriptionValue}
            returnKeyType={'Google'}
          />
          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.heading1,
            ]}
          />
        </InputBoxContainer>
        {isEdit && renderImageSection()}
        <ThreeBtnView>
          {isEdit ? (
            <DeleteStoryContainer
              onPress={() => {
                setShowDeleteModal(true);
              }}>
              {isDeleteStoryLoading ? (
                <ActivityIndicator color={colors.greenColor} />
              ) : (
                <DeleteStoryText>{strings.deleteStoryTxtSmall}</DeleteStoryText>
              )}
            </DeleteStoryContainer>
          ) : (
            <EmptySpace />
          )}
          <DoubleBtnView>
            <CancelBtn
              onPress={() => {
                navigation?.goBack();
                onRefresh();
              }}>
              <BtnText>{cancel}</BtnText>
            </CancelBtn>
            <ConfirmBtn onPress={() => callSaveMethod()}>
              {isSaveQuestionLoading || isUpdateStoryLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <BtnText>{saveText}</BtnText>
              )}
            </ConfirmBtn>
          </DoubleBtnView>
        </ThreeBtnView>
      </KeyboardAwareScrollView>
      <ActionSheet
        ref={actionSheet}
        options={IMAGE_PICKER_OPTIONS}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index: number) => {
          onSelectAction(index);
        }}
      />
      <PreviewImage
        visible={imageModal}
        swipeDown={() => {
          myGlobal.images = [];
          setImageModal(false);
        }}
      />
      {showModal.isVisible ? (
        <VideoModel
          isVisible={showModal.isVisible}
          toggleModal={toggleModal}
          videoDetail={showModal.data}
          {...props}
        />
      ) : null}
      <ModalBox
        visible={showDeleteModal}
        message={strings.deleteStoryMessage}
        onPressPositiveBtn={() => callDeleteAPI()}
        onPressNegativeBtn={() => setShowDeleteModal(false)}
      />
    </ScreenWrapper>
  );
};

export default AddStory;

const styles = StyleSheet.create({
  imageView: {
    width: rpx(150),
    height: rpx(150),
    marginLeft: rpx(10),
  },
  keyboardView: {
    flex: 1,
  },
  editorStyle: {
    borderColor: colors.lightGrey,
    borderWidth: rpx(1),
    borderRadius: rpx(15),
  },
  containerStyle: {minHeight: rpx(100)},
});
