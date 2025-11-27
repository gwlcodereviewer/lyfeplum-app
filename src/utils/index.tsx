/* eslint-disable no-useless-escape */
import {appleAuth} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert, PixelRatio, Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  Settings,
} from 'react-native-fbsdk-next';
import {
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Toast, {ToastPosition} from 'react-native-toast-message';
import {
  ASYNC_CONST,
  DATE_FORMAT,
  FACEBOOK_APP_ID,
  FINAL_WISH_SLAB,
  GOOGLE_CONFIG,
  LIFE_CELEBRATION_SLAB,
  MEDIA_FILE_TYPE,
  MEDIA_LIMITATIONS,
  SERVER_ERROR,
  TOAST_MESSAGE_TYPE,
  VALID_REGEX,
  subscriptionSKU,
} from '../constants/utils';
import {IFbUserDataType, INavigation, IRules, IShareFile} from '../types/utils';

import {decode} from 'base64-arraybuffer';
import moment from 'moment';
import {Video} from 'react-native-compressor';
import RNFS from 'react-native-fs';
import {getAvailablePurchases, validateReceiptIos} from 'react-native-iap';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {screenWidth} from '../../styles/styleUtils';
import images from '../assets/images';
import {HEADER_KEYS} from '../constants/server';
import {REQUEST_METHODS} from '../helpers/constants';
import {strings} from '../localization';
import {
  NAV_FB_FEEDS,
  NAV_LOGIN,
  NAV_SUBSCRIPTION_DRAWER,
} from '../navigation/constants';
import {store} from '../redux/store';
import {setShowSessionExpireAlert} from '../redux/api/userState';
export const photoMediaType: MediaType = 'photo';
export const mixedMediaType: MediaType = 'mixed';

let isToastVisible = false;

/**
 * Name: isIOS
 * Desc: Function to identify the device is ios or not
 * @returns boolean value
 */
export function isIOS() {
  return Platform.OS === 'ios';
}

/**
 * Name: scaleFont
 * Desc: Font Scale according to pixel ratio.
 * @param val
 */
export const scaleFont = (size: any) => size * PixelRatio.getFontScale();

/**
 * Name: isValidEmail
 * Desc: To validating the email address
 * @param {String} email
 * @returns {Boolean}
 */
export function isValidEmail(email: string): boolean {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !regex.test(String(email).toLowerCase());
}

/**
 * Name: isEmpty
 * Desc: For validating the empty field
 * @param {String} fieldValue
 * @returns {Boolean}
 */
export function isEmpty(fieldValue: string): boolean {
  return fieldValue === '';
}

/**
 * Name: isValidPassword
 * Desc: For validating the confirm password
 * @param {any} password
 * @returns {Boolean}
 */
export function isValidPassword(password: string): boolean {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
  return !regex.test(String(password));
}

/**
 * Name: validateConfirmPwd
 * Desc: For validating the confirm password
 * @param {String} pwd
 * @param {String} conPwd
 * @returns {Boolean}
 */
export function validateConfirmPwd(pwd: string, conPwd: string): boolean {
  return pwd !== conPwd;
}

/**
 * Name: validateField
 * Desc: For validating the multiple fields
 * @param {IRules} rules
 * @param {String} value
 * @param {String} compareValue
 * @returns error message
 */
export const validateField = (
  rules: IRules,
  value = '',
  compareValue = '',
): string => {
  if (rules.required && isEmpty(value)) {
    return `${rules.title} is required`;
  }
  if (rules.email && isValidEmail(value)) {
    return `Enter a correct ${rules.title.toLowerCase()}`;
  }
  if (rules.password && isValidPassword(value)) {
    return "Password must be at least 6 characters long, must have at least one non alphanumeric character, one numeric, one lowercase ('a'-'z'), uppercase('A'-'Z')";
  }
  if (rules.confirmPwd && validateConfirmPwd(value, compareValue)) {
    return 'Password and confirm password must be same';
  }
  return '';
};

/**
 * Name: setStorageItem
 * Desc: Set storage method of Async storage
 */
export const setStorageItem = async (key: any, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

/**
 * Name: getStorageItem
 * Desc: Get storage method of Async storage
 */
export const getStorageItem = async (key: any) => {
  const res = await AsyncStorage.getItem(key);
  return res;
};

/**
 * clearStorage
 * Desc: Function to clear storage
 */
export const clearStorage = async () => {
  const removeKeys = [ASYNC_CONST.LoggedInUserInfo, ASYNC_CONST.accessToken];
  await AsyncStorage.multiRemove(removeKeys);
};

/**
 * Name: showServerError
 * Desc: Handle error response according to error code.
 * @param error - The error object.
 * @param navigation - The navigation object.
 */
export const showServerError = async (error, navigation) => {
  const {sessionExpire, sessionExpireMessage, ok} = strings;
  const isShowSessionExpireAlert =
    store.getState().user.isShowSessionExpireAlert;
  if (!error) {
    return;
  }
  if (error.status === 401) {
    if (!isShowSessionExpireAlert) {
      store.dispatch(setShowSessionExpireAlert(true));
      Alert.alert(sessionExpire, sessionExpireMessage, [
        {
          text: ok,
          onPress: () => {
            store.dispatch(setShowSessionExpireAlert(false));
            clearStorage();
            navigation?.navigate(NAV_LOGIN);
          },
        },
      ]);
    }
    //unauthorize token
  }
  if (error.status === 404) {
    showAlert('', error.data.message, ok);
    //url not found
  } else if (error.status === 500) {
    showAlert('', error.data.message, ok);
    //server error
  } else if (error.status === 405) {
    showAlert('', error.data.message, ok);
  } else if (error.status === SERVER_ERROR.fetchError) {
    // No internet error
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      showAlert('', strings.noInternet, strings.ok);
    }
  } else if (error.status === false) {
    showAlert('', error.message, strings.ok);
  }

  return true;
};

/**
 * Name: showAlert
 * @param {string} title - The alert title.
 * @param {string} message - The alert message.
 * @param {string} btnText - The alert button text.
 */
export const showAlert = (title: string, message: any, btnText: string) => {
  Alert.alert(title, message, [{text: btnText}]);
};

/**
 * Name: getApiHeader
 * Desc: Function to get common header params.
 * @param headers - The header params.
 * @returns - The updated header params.
 */
export const getApiHeader = async headers => {
  const token = await getAccessToken();
  headers.set(HEADER_KEYS.Authorization, `${HEADER_KEYS.Bearer} ${token}`);
  headers.set(HEADER_KEYS.ContentType, HEADER_KEYS.ApplicationJson);
  headers.set(HEADER_KEYS.Accept, HEADER_KEYS.ApplicationJson);
  return headers;
};

/**
 * Name: getAccessToken
 * Desc: Function to get access token from local storage.
 * @returns - The access token.
 */
export const getAccessToken = async () => {
  const accessToken = await getStorageItem(ASYNC_CONST.accessToken);
  if (accessToken) {
    return JSON.parse(accessToken || '');
  }
  return null;
};

/**
 * Name: formattedStringDate
 * Desc: Function to get formatted string date.
 */
export const formattedStringDate = (date, format?: string) => {
  if (!date) {
    return '';
  }
  return moment(date).format(format ? format : DATE_FORMAT.YYYY_MM_DD);
};

/**
 * Name: showToastMessage
 * Desc: Function to show messages in toast
 * @param {String} title - title of message
 * @param {String} description - description of message
 * @param {String} toastType - type of toast
 * @param {ToastPosition} toastPosition - position of toast
 */
export const showToastMessage = (
  title = '',
  description = '',
  toastType = TOAST_MESSAGE_TYPE.error,
  toastPosition: ToastPosition = 'bottom',
) => {
  const {noInternet, pleaseCheckInternetSettings} = strings;
  if (!isToastVisible) {
    isToastVisible = true;
    Toast.show({
      type: toastType,
      position: toastPosition,
      visibilityTime: 5000,
      text1: title || noInternet,
      text2: description || pleaseCheckInternetSettings,
      autoHide: true,
      onHide: () => {
        isToastVisible = false;
      },
    });
  }
};

/**
 * Name: loginWithFacebook
 * Desc: Function to login with Facebook
 */
export const loginWithFacebook = async () => {
  let accessToken: string | undefined;
  let userData: IFbUserDataType;
  let errorData: unknown;
  Settings.setAppID(FACEBOOK_APP_ID.dev);
  Settings.initializeSDK();
  if (Platform.OS === 'android') {
    LoginManager?.setLoginBehavior('web_only');
  }
  return LoginManager?.logInWithPermissions(['email', 'public_profile'])
    ?.then(
      (login: {isCancelled: boolean}) => {
        if (login.isCancelled) {
          return false;
        } else {
          return new Promise((resolve, reject) => {
            AccessToken.getCurrentAccessToken()
              .then(data => {
                accessToken = data?.accessToken.toString();
                if (accessToken) {
                  const PROFILE_REQUEST_PARAMS = {
                    fields: {
                      string:
                        'id,name,first_name,last_name,email,picture,middle_name',
                    },
                  };
                  const profileRequest = new GraphRequest(
                    '/me',
                    {accessToken, parameters: PROFILE_REQUEST_PARAMS},
                    (error: any, user: any) => {
                      if (error) {
                        errorData = error;
                      } else {
                        userData = user;
                        const fbData = {
                          accessToken,
                          userData,
                          errorData,
                        };
                        resolve(fbData);
                      }
                    },
                  );
                  new GraphRequestManager().addRequest(profileRequest).start();
                }
              })
              .catch((error: any) => {
                showToastMessage(
                  strings.lyfePlum,
                  error,
                  TOAST_MESSAGE_TYPE.error,
                );
                reject(error);
              });
          });
        }
      },
      (error: any) => {
        showToastMessage(strings.lyfePlum, error, TOAST_MESSAGE_TYPE.error);
      },
    )
    .catch(error => {
      showToastMessage(strings.lyfePlum, error, TOAST_MESSAGE_TYPE.error);
    });
};

/**
 * Name: loginWithGoogle
 * Desc: Function to login with Google
 */
export const loginWithGoogle = async () => {
  GoogleSignin.configure({
    webClientId: '',
    iosClientId: GOOGLE_CONFIG.dev.iosClientId,
    offlineAccess: false,
    forceCodeForRefreshToken: true,
  });
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const accessToken = await GoogleSignin.signInSilently();
    return accessToken;
  } catch (error: any) {
    if (error.code === statusCodes.IN_PROGRESS) {
      showToastMessage(
        strings.lyfePlum,
        strings.alreadyInProgress,
        TOAST_MESSAGE_TYPE.info,
      );
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      showToastMessage(
        strings.lyfePlum,
        strings.googlePlayService,
        TOAST_MESSAGE_TYPE.info,
      );
    }
    return error;
  }
};

/**
 * Name: loginWithApple
 * Desc: Function to login with Apple
 */
export const loginWithApple = async () => {
  const appleSupported = appleAuth.isSupported;
  if (appleSupported) {
    return new Promise((resolve, reject) => {
      appleAuth
        .performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        })
        .then(data => {
          if (data) {
            resolve(data);
          }
        })
        .catch((error: any) => {
          if (error.code === '1000' || error.code === '1002') {
            showToastMessage(
              strings.lyfePlum,
              strings.somethingWentWrong,
              TOAST_MESSAGE_TYPE.error,
            );
          } else {
            reject(error);
          }
        });
    });
  }
  return false;
};

/**
 * Name: openDeviceCamera
 * Desc: Function for getting image from camera
 * @param {any} mediaData - Media data
 * @param {any} selectedMediaType - to define media type
 */
export const openDeviceCamera = async (
  mediaData: any,
  selectedMediaType: any,
  isFromMedia?: boolean,
) => {
  return new Promise((resolve, reject) => {
    const options = {
      isVertical: true,
      mediaType: selectedMediaType,
      includeBase64: true,
      selectionLimit: 1,
    };
    return launchCamera(options, async (response: any) => {
      if (response.didCancel === true) {
        reject('User cancelled the selection');
      } else if (
        response?.assets[0]?.type.includes(MEDIA_FILE_TYPE.image) &&
        response?.assets[0]?.fileSize >= MEDIA_LIMITATIONS.image_size
      ) {
        showToastMessage(
          strings.lyfePlum,
          strings.imageError,
          TOAST_MESSAGE_TYPE.error,
        );
        return;
      } else if (
        response?.assets[0]?.type.includes(MEDIA_FILE_TYPE.video) &&
        response?.assets[0]?.fileSize >= MEDIA_LIMITATIONS.video_size
      ) {
        showToastMessage(
          strings.lyfePlum,
          strings.videoError,
          TOAST_MESSAGE_TYPE.error,
        );
        return;
      } else if (
        response?.assets[0]?.type.includes(MEDIA_FILE_TYPE.video) &&
        !isFromMedia
      ) {
        const compressedData = await Video.compress(response?.assets[0].uri, {
          compressionMethod: 'auto',
        });
        const uri = isIOS()
          ? compressedData
          : compressedData.replace(/^file:\/\/([^/])/, 'file:///$1');
        const compressedVideoUri = await RNFS.readFile(uri, 'base64');
        const fileData = {
          fileName: response.assets[0].fileName,
          type: response.assets[0].type,
          fileSize: response.assets[0].fileSize,
          uri: response.assets[0].uri,
          fileBase64Path: compressedVideoUri,
        };
        mediaData.push(fileData);
        resolve(mediaData);
      } else {
        const fileData = {
          fileName: response.assets[0].fileName,
          type: response.assets[0].type,
          fileSize: response.assets[0].fileSize,
          uri: response.assets[0].uri,
          fileBase64Path: response?.assets[0].base64,
        };
        mediaData.push(fileData);
        resolve(mediaData);
      }
    });
  });
};

/**
 * Name: onImageLibraryPress
 * Desc: Function for open gallery
 * @param {any} selectedMediaType - to define media type
 * @param {any} allowedSelectionLimit - Limit of file to be selected
 * @param {any} mediaData - media data list
 */
export const onImageLibraryPress = async (
  selectedMediaType: any,
  allowedSelectionLimit: number,
  mediaData: any,
  isFromMedia?: boolean,
) => {
  return new Promise((resolve, reject) => {
    const options = {
      selectionLimit: allowedSelectionLimit || 1,
      mediaType: selectedMediaType,
      includeBase64: true,
    };
    return launchImageLibrary(options, async (response: any) => {
      if (response?.didCancel) {
        reject('User cancelled the selection');
      } else {
        for (const asset of response?.assets) {
          if (
            asset.type.includes(MEDIA_FILE_TYPE.video) &&
            asset.fileSize >= MEDIA_LIMITATIONS.video_size
          ) {
            showToastMessage(
              strings.lyfePlum,
              strings.videoError,
              TOAST_MESSAGE_TYPE.error,
            );
            reject(strings.videoError);
          } else if (
            asset.type.includes(MEDIA_FILE_TYPE.image) &&
            asset.fileSize >= MEDIA_LIMITATIONS.image_size
          ) {
            showToastMessage(
              strings.lyfePlum,
              strings.imageError,
              TOAST_MESSAGE_TYPE.error,
            );
            reject(strings.imageError);
          } else if (
            asset.type.includes(MEDIA_FILE_TYPE.video) &&
            !isFromMedia
          ) {
            const compressedData = await Video.compress(asset.uri, {
              compressionMethod: 'auto',
            });
            const uri = isIOS()
              ? compressedData
              : compressedData.replace(/^file:\/\/([^/])/, 'file:///$1');
            const compressedVideoUri = await RNFS.readFile(uri, 'base64');
            const fileData = {
              fileName: asset.fileName,
              type: asset.type,
              fileSize: asset.fileSize,
              uri: asset.uri,
              fileBase64Path: compressedVideoUri,
            };
            mediaData.push(fileData);
          } else {
            const fileData = {
              fileName: asset.fileName,
              type: asset.type,
              fileSize: asset.fileSize,
              uri: asset.uri,
              fileBase64Path: asset.base64,
            };
            mediaData.push(fileData);
          }
        }
        resolve(mediaData);
      }
    });
  });
};

/**
 * Name: pickDocument
 * Desc: Function to pick document from device
 * @param {any} selectedDocument - array of documents
 * @param {boolean} isMultipleSelectionAllowed - boolean to check multiple files selection allowed or not
 */
export const pickDocument = async (
  selectedDocument: any,
  isMultipleSelectionAllowed: boolean,
) => {
  try {
    let result: any = [];
    if (isMultipleSelectionAllowed === true) {
      result = await DocumentPicker.pickMultiple({
        allowMultiSelection: true,
      });
    } else {
      result = await DocumentPicker.pick({
        allowMultiSelection: false,
      });
    }
    for (let i = 0; i < result.length; ) {
      let realPath = result[i].fileCopyUri;
      if (isIOS()) {
        const split = result[i].fileCopyUri.split('/');
        const name = split.pop();
        const inbox = split.pop();
        realPath = `file://${RNFS.TemporaryDirectoryPath}/${inbox}/${decodeURI(
          name,
        )}`;
      }
      await RNFS.readFile(realPath, 'base64')
        .then(content => {
          const fileData = {
            fileName: result[i].name,
            type: result[i].type,
            fileSize: result[i].size,
            uri: result[i].uri,
            fileBase64Path: content,
          };
          selectedDocument.push(fileData);
        })
        .catch(error => {
          if (error.code === 'ENOENT') {
            showToastMessage(
              strings.lyfePlum,
              strings.somethingWentWrong,
              TOAST_MESSAGE_TYPE.error,
            );
          } else {
            showToastMessage(
              strings.lyfePlum,
              error.message,
              TOAST_MESSAGE_TYPE.error,
            );
          }
        });
      i += 1;
    }
    return selectedDocument;
  } catch (err: any) {
    const canceled = 'canceled';
    if (DocumentPicker.isCancel(err)) {
      throw canceled;
    } else {
      throw err;
    }
  }
};

/**
 * Name: attachmentDownload
 * Desc: Function to download file.
 * @param FilePath - The file path.
 * @param FileName - The file name.
 * @param callback - Download success callback.
 * @param progressCallBack - Download Progress callback.
 * @param errorCallBack - Download error callback.
 */
export const attachmentDownload = (
  FilePath: string,
  FileName: string,
  callback?: any,
  progressCallBack?: any,
  errorCallBack?: any,
) => {
  try {
    if (isIOS()) {
      try {
        downloadAttachment(
          FilePath,
          FileName,
          (res: any) => {
            callback(res);
          },
          (percent: number) => {
            progressCallBack(percent);
          },
          () => {
            errorCallBack();
          },
        );
      } catch (err) {
        errorCallBack();
      }
    } else {
      downloadAttachment(
        FilePath,
        FileName,
        (res: any) => {
          callback(res);
        },
        (percent: number) => {
          progressCallBack(percent);
        },
      );
    }
  } catch (err) {
    errorCallBack();
  }
};

/**
 * Name: downloadAttachment
 * Desc: Function to download file.
 * @param FilePath - The file path.
 * @param FileName - The file name.
 * @param callback - Download success callback.
 * @param progressCallBack - Download Progress callback.
 */
const downloadAttachment = (
  FilePath: string,
  FileName: string,
  callback?: any,
  progressCallBack?: any,
  errorCallBack?: any,
) => {
  const {fs} = RNFetchBlob;
  const DownloadDir = fs.dirs.DownloadDir;
  const options = {
    fileCache: true,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path: `${DownloadDir}/Attachment_${FileName}`,
      description: 'Download',
    },
  };
  try {
    RNFetchBlob.config(options)
      .fetch('GET', FilePath)
      .progress((received, total) => {
        progressCallBack(received / total);
      })
      .then(() => {
        showToastMessage(
          strings.success,
          `${strings.downloadedMessage}`,
          strings.success,
        );
        callback();
      })
      .catch(error => {
        console.warn(
          'src/utils/index.tsx - downloadAttachment -> error: ',
          error,
        );
        errorCallBack();
      });
  } catch (err) {
    console.warn('src/utils/index.tsx - downloadAttachment -> error: ', err);
    errorCallBack();
  }
};

/**
 * Name: isValidName
 * Desc: Function to validate the names
 * @param {String} name
 * @returns {Boolean}
 */
export function isValidName(name: string): boolean {
  const regex = VALID_REGEX.name;
  return !regex.test(String(name));
}

/**
 * Name: isValidAge
 * Desc: Function to validate the age
 * @param {String} age
 * @returns {Boolean}
 */
export function isValidAge(age: string): boolean {
  const regex = VALID_REGEX.age;
  return !regex.test(String(age));
}

/**
 * Name: isValidPhoneNumber
 * Desc: Function to validate phone number
 * @param {String} phoneNumber
 * @returns {Boolean}
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const regex = VALID_REGEX.phone;
  return !regex.test(String(phoneNumber));
};

/**
 * Name: getFinalWishBadge
 * Desc: Function to get final wish badge
 * @param {number} points
 * @returns image path
 */
export const getFinalWishBadge = points => {
  if (points >= FINAL_WISH_SLAB.slab_50 && points < FINAL_WISH_SLAB.slab_75) {
    return images.finalWish50;
  } else if (
    points >= FINAL_WISH_SLAB.slab_75 &&
    points < FINAL_WISH_SLAB.slab_100
  ) {
    return images.finalWish75;
  } else if (points >= FINAL_WISH_SLAB.slab_100) {
    return images.finalWish100;
  }
};

/**
 * Name: getLifeCelebrationBadge
 * Desc: Function to get life celebration badge
 * @param {number} points
 * @returns image path
 */
export const getLifeCelebrationBadge = points => {
  if (
    points >= LIFE_CELEBRATION_SLAB.slab_50 &&
    points < LIFE_CELEBRATION_SLAB.slab_75
  ) {
    return images.lifeCelebration50;
  } else if (
    points >= LIFE_CELEBRATION_SLAB.slab_75 &&
    points < LIFE_CELEBRATION_SLAB.slab_100
  ) {
    return images.lifeCelebration75;
  } else if (points >= LIFE_CELEBRATION_SLAB.slab_100) {
    return images.lifeCelebration100;
  }
};

/**
 * Name: imagePickerWithCrop
 * Desc: Function to pick image from gallery with crop functionality
 * @param {any} mediaType - to define media type
 * @returns image data
 */
export const imagePickerWithCrop = mediaType => {
  return new Promise((resolve, reject) => {
    const options = {
      width: screenWidth,
      height: 200,
      cropping: true,
      includeBase64: true,
      mediaType: mediaType,
    };
    return ImagePicker.openPicker(options)
      .then(response => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

/**
 * Name: imageCaptureFromCameraWithCrop
 * Desc: Function to capture image from camera with crop functionality
 * @param {any} mediaType - to define media type
 * @returns image data
 */
export const imageCaptureFromCameraWithCrop = mediaType => {
  return new Promise((resolve, reject) => {
    const options = {
      width: screenWidth,
      height: 200,
      cropping: true,
      includeBase64: true,
      mediaType: mediaType,
    };
    return ImagePicker.openCamera(options)
      .then(response => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

/**
 * Name: subscriptionAlert
 * Desc: Function to trigger alert for subscription message
 * @param navigation - The navigation object.
 */
export const subscriptionAlert = navigation => {
  Alert.alert(strings.subscriptionTitle, strings.subscriptionDesc, [
    {
      text: strings.ok,
      onPress: () => {
        navigation?.navigate(NAV_SUBSCRIPTION_DRAWER, {fromSideMenu: true});
      },
    },
  ]);
};

/**
 * Name: contentContainerStyle
 * Desc: Constant for content container style
 */
export const contentContainerStyle = {paddingBottom: 40};

/**
 * Name: isSubscriptionActive
 * Desc: Function to check the subscription status
 * @returns status of subscription
 */
export const isSubscriptionActive = async () => {
  if (Platform.OS === 'ios') {
    const availablePurchases = await getAvailablePurchases();
    const sortedAvailablePurchases = availablePurchases.sort(
      (a, b) => b.transactionDate - a.transactionDate,
    );
    const latestAvailableReceipt =
      sortedAvailablePurchases[0].transactionReceipt;

    const isTestEnvironment = __DEV__;
    const decodedReceipt = await validateReceiptIos({
      receiptBody: {
        'receipt-data': latestAvailableReceipt,
        password: 'ITUNES_CONNECT_SHARED_SECRET',
      },
      isTest: isTestEnvironment,
    });
    const {latest_receipt_info: latestReceiptInfo} = decodedReceipt;

    const isSubValid = !!latestReceiptInfo.find(receipt => {
      const expirationInMilliseconds = Number(receipt.expires_date_ms);
      const nowInMilliseconds = Date.now();
      return expirationInMilliseconds > nowInMilliseconds;
    });
    return isSubValid;
  }

  if (Platform.OS === 'android') {
    // When an active subscription expires, it does not show up in
    // available purchases anymore, therefore we can use the length
    // of the availablePurchases array to determine whether or not
    // they have an active subscription.
    const availablePurchases = await getAvailablePurchases();
    const planIds = Platform.select({
      ios: subscriptionSKU.ios || [],
      android: subscriptionSKU.android || [],
    }) as [];
    for (let i = 0; i < availablePurchases.length; i++) {
      const index = planIds.findIndex(
        item => item === availablePurchases[i].productId,
      );
      if (index !== -1) {
        return true;
      }
    }
    return false;
  }
};

/**
 * Name: uploadToS3
 * Desc: Function to upload image/document to aws s3
 * @param {string} uploadUrl - aws presigned url
 * @param {any} fileData - file data
 * @returns response status
 */
export const uploadToS3 = async (uploadUrl, fileData) => {
  try {
    const arrayBuffer = decode(fileData.fileBase64Path);
    const response = await fetch(uploadUrl, {
      method: REQUEST_METHODS.PUT,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/octet-stream', // Set to binary content type
      },
      body: arrayBuffer,
    });
    return response.status;
  } catch (error) {
    return false;
  }
};

/**
 * Name: manageIntentData
 * Desc: Function to manage the intent data
 * @param {IShareFile[]} intentData - Received intent data
 * @param {INavigation} navigation - Navigation property
 */
export const manageIntentData = (
  intentData: IShareFile[],
  navigation: INavigation,
) => {
  if (intentData && intentData.length > 0) {
    navigation.navigate(NAV_FB_FEEDS, {
      intentData,
    });
  } else {
    showToastMessage(
      strings.lyfePlum,
      strings.somethingWentWrong,
      TOAST_MESSAGE_TYPE.error,
    );
  }
};

/**
 * Name: intentDataLoginError
 * Desc: Function to manage the intent login state
 * @param {INavigation} navigation - Navigation property
 */
export const intentDataLoginError = (navigation: INavigation) => {
  showToastMessage(
    strings.lyfePlum,
    strings.sharedError,
    TOAST_MESSAGE_TYPE.error,
  );
  // TODO: Use this if navigation is needed
  // navigation.navigate(NAV_LOGIN);
};
