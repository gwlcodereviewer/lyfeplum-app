/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Video} from 'react-native-compressor';
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import {STATUS_CODES} from '../../constants/server';
import {
  FOLDER_NAMES,
  MEDIA_FILE_TYPE,
  TOAST_MESSAGE_TYPE,
} from '../../constants/utils';
import {strings} from '../../localization';
import {useGetSignedUrlMutation} from '../../redux/api/awsApi';
import {useAddNewMediaMutation} from '../../redux/api/mediaList';
import {
  setUploadData,
  setUploadingComplete,
  setUploadingProgress,
  setUploadingStart,
} from '../../redux/api/uploadState';
import {RootState} from '../../redux/store';
import {
  isIOS,
  showServerError,
  showToastMessage,
  uploadToS3,
} from '../../utils';

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: any;
}

/**
 * Name: GlobalUpload
 * Desc: Component to manage the uploads globally
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const GlobalUpload: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const uploadData = useSelector((state: RootState) => state.upload.uploadData);
  const userData = useSelector((state: RootState) => state.user.userData);

  const [
    addNewMediaList,
    {
      isLoading: isAddNewMediaLoading,
      isError: isAddNewMediaError,
      error: isAddNewMediaApiError,
      isSuccess: isAddNewMediaSuccess,
      data: addNewMediaData,
    },
  ] = useAddNewMediaMutation();

  /**
   * Name: uploadComplete
   * Desc: Function to re map the data after uploading
   */
  const uploadComplete = () => {
    const newState = uploadData.map(obj => {
      return {...obj};
    });
    if (newState.length > 0) {
      newState.splice(0, 1);
      dispatch(setUploadData(newState));
      dispatch(setUploadingComplete(true));
      dispatch(setUploadingStart(false));
      dispatch(setUploadingProgress(100));
    }
  };
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
      if (uploadData.length > 0) {
        dispatch(setUploadingProgress(25));
        startUploadingToS3(uploadData[0]);
      }
    }
    if (isSignedUrlError) {
      uploadComplete();
      showServerError(signedUrlError, navigation);
    }
  }, [isSignedUrlLoading]);

  /*
   * Name: generateSignedUrl
   * Desc: Function to get the signed url from server
   * @params {any} res - Response of the selected media
   */
  const generateSignedUrl = res => {
    try {
      const userId = userData?.id;
      let updateFolderName = FOLDER_NAMES.addNewMedia.replace(
        'user_id',
        userId.toString(),
      );
      const requestData = {
        name: res?.fileName,
        folder_name: updateFolderName,
      };
      getSignedUrl(requestData);
    } catch (error) {
      showToastMessage(
        strings.lyfePlum,
        strings.somethingWentWrong,
        TOAST_MESSAGE_TYPE.error,
      );
    }
  };

  /**
   * Name: useEffect
   * Desc: useEffect to handle save media response
   */
  useEffect(() => {
    if (isAddNewMediaSuccess) {
      if (addNewMediaData && addNewMediaData?.status) {
        uploadComplete();
      } else {
        showToastMessage(
          strings.lyfePlum,
          addNewMediaData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isAddNewMediaError) {
      showServerError(isAddNewMediaApiError, navigation);
    }
  }, [isAddNewMediaLoading]);

  /**
   * Name: startUploadingToS3
   * Desc: Function to upload the files to aws s3
   * @param {any} awsUploadData - Upload data
   */
  const startUploadingToS3 = async awsUploadData => {
    let data = awsUploadData;
    if (awsUploadData?.type.includes(MEDIA_FILE_TYPE.video)) {
      const compressedData = await Video.compress(awsUploadData.uri, {
        compressionMethod: 'auto',
      });
      dispatch(setUploadingProgress(50));
      const uri = isIOS()
        ? compressedData
        : compressedData.replace(/^file:\/\/([^/])/, 'file:///$1');
      const compressedVideoUri = await RNFS.readFile(uri, 'base64');
      const fileData = {
        fileName: awsUploadData.fileName,
        type: awsUploadData.type,
        fileSize: awsUploadData.fileSize,
        uri: awsUploadData.uri,
        fileBase64Path: compressedVideoUri,
      };
      data = fileData;
    } else {
      const fetchedUri = await RNFS.readFile(awsUploadData.uri, 'base64');
      const fileData = {
        fileName: awsUploadData.fileName,
        type: awsUploadData.type,
        fileSize: awsUploadData.fileSize,
        uri: awsUploadData.uri,
        fileBase64Path: fetchedUri,
      };
      data = fileData;
    }
    dispatch(setUploadingProgress(60));
    const responseStatus = await uploadToS3(signedUrlData?.url, data);
    if (responseStatus === STATUS_CODES.ok) {
      dispatch(setUploadingProgress(95));
      if (awsUploadData?.type.includes(MEDIA_FILE_TYPE.video)) {
        addNewMediaList({
          file: [signedUrlData?.image_path],
          file_type: [MEDIA_FILE_TYPE.video],
        });
      } else {
        addNewMediaList({
          file: [signedUrlData?.image_path],
          file_type: [MEDIA_FILE_TYPE.image],
        });
      }
    } else {
      showToastMessage(
        strings.lyfePlum,
        strings.somethingWentWrong,
        TOAST_MESSAGE_TYPE.error,
      );
      uploadComplete();
    }
  };

  /**
   * Name: startUploading
   * Desc: Function to map data for uploading process
   */
  const startUploading = async () => {
    await dispatch(setUploadingProgress(0));
    const newState = uploadData.map((obj, index) => {
      if (index === 0) {
        return {...obj, isInProgress: true};
      }
      return {...obj};
    });
    await dispatch(setUploadData(newState));
    await dispatch(setUploadingComplete(false));
    await dispatch(setUploadingStart(true));
    await dispatch(setUploadingProgress(5));
    generateSignedUrl(newState[0]);
  };

  /**
   * Name: useEffect
   * Desc: useEffect to handle uploading states
   */
  useEffect(() => {
    if (uploadData.length > 0 && !uploadData[0].isInProgress) {
      startUploading();
    }
  }, [uploadData]);

  return <React.Fragment />;
};

export default GlobalUpload;
