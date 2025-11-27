import configs from '../../configs';
import {strings} from '../../localization';

/**
 * Name: ASYNC_CONST
 * Desc: The async constant key values
 */
export const ASYNC_CONST = {
  LoggedInUserInfo: 'LoggedInUserInfo',
  accessToken: 'accessToken',
  showTourModal: 'showTourModal',
  setUserDietary: 'setUserDietary',
  encryptedKeys: 'encryptedKeys',
  filterIngredients: 'filterIngredients',
  filterTags: 'filterTags',
  userProfileInfo: 'userProfileInfo',
  searchHistory: 'searchHistory',
};

/**
 * Name: GOOGLE_CONFIG
 * Desc: The config data for google
 */
export const GOOGLE_CONFIG = {
  dev: {
    webClientId:
      '69754800934-ck5c4olovcd52dnk8hl5ppdp1ojssk8q.apps.googleusercontent.com',
    iosClientId:
      '69754800934-ck5c4olovcd52dnk8hl5ppdp1ojssk8q.apps.googleusercontent.com',
  },
  prod: {
    webClientId: '',
    iosClientId: '',
  },
};

/**
 * Name: FACEBOOK_APP_ID
 * Desc: The app id for facebook
 */
export const FACEBOOK_APP_ID = {
  dev: '587931955849720',
  prod: '',
};

/**
 * Name: DATE_FORMAT
 * Desc: The different date formats.
 */
export const DATE_FORMAT = {
  YYYY_MM_DD: 'YYYY-MM-DD',
  MM_DD_YYYY: 'MM-DD-YYYY',
  MM: 'MM',
  DD: 'DD',
  YYYY: 'YYYY',
  DD_MMM_YYYY: 'DD MMM, YYYY',
};

/**
 * Name: LOGIN_TYPES
 * Desc: The login types
 */
export const LOGIN_TYPES = {
  fb: 'fb',
  gmail: 'gmail',
  apple: 'apple',
  email: 'email',
  google: 'google',
  facebook: 'facebook',
};

/**
 * Name: IMAGE_PICKER_OPTIONS
 * Desc: The image picker options
 */
export const IMAGE_PICKER_OPTIONS = [
  strings.camera,
  strings.gallery,
  strings.cancel,
];

/**
 * Name: TOAST_MESSAGE_TYPE
 * Desc: Toast message types
 */
export const TOAST_MESSAGE_TYPE = {
  success: 'success',
  error: 'error',
  info: 'info',
};

/**
 * Name: SUPPORTED_ORIENTATIONS
 * Desc: Supported orientations
 */
export const SUPPORTED_ORIENTATIONS: (
  | 'portrait'
  | 'landscape'
  | 'landscape-left'
  | 'landscape-right'
)[] = ['portrait', 'landscape', 'landscape-left', 'landscape-right'];

/**
 * Name: UPLOAD_PARAMS
 * Desc: upload params for image
 */
export const UPLOAD_PARAMS = {
  data: 'data:',
  base64: ';base64,',
};

/**
 * Name: CHECKBOX_TYPE
 * Desc: checkbox type
 */
export const CHECKBOX_TYPE = {
  square: 'square',
  circle: 'circle',
};

/**
 * Name: CHAPTER_TYPE
 * Desc: type of chapter
 */
export const CHAPTER_TYPE = {
  add: 0,
  published: 1,
  draft: 2,
};

/**
 * Name: UPLOAD_PICKER_OPTIONS
 * Desc: The upload picker options
 */
export const UPLOAD_PICKER_OPTIONS = [
  strings.camera,
  strings.gallery,
  strings.document,
  strings.cancel,
];

/**
 * Name: IMAGE_EXTENSIONS
 * Desc: The image extensions
 */
export const IMAGE_EXTENSIONS = [
  strings.imagePng,
  strings.imageApng,
  strings.imageSvgXml,
  strings.imageWebp,
  strings.imageBmp,
  strings.imageGif,
  strings.imageJpeg,
  strings.imageJpg,
  strings.imageJpe,
  strings.imageJfif,
  strings.Jpg,
  strings.Jpeg,
  strings.Png,
  strings.Webp,
  strings.Gif,
  strings.Jpe,
  strings.Bmp,
  strings.Jfif,
  strings.Avif,
  strings.Apng,
  strings.PNG,
  strings.JPG,
  strings.WEBP,
  strings.GIF,
  strings.BMP,
  strings.JPE,
  strings.JFIF,
  strings.JPEG,
];

/**
 * Name: URL_PATHS
 * Desc: The url paths
 */
export const URL_PATHS = {
  privacyPolicy: configs.baseUrl + '/privacy-policy',
  termsAndConditions: configs.baseUrl + '/terms-conditions',
  androidAppUrl: 'https://play.google.com/store/apps/details?id=com.lyfeplum',
  iosAppUrl: 'https://apps.apple.com/us/app/lyfe-plum/id6450044050',
};

/**
 * Name: FILE_TYPE
 * Desc: The file type
 */
export const FILE_TYPE = {
  image: 'image',
  video: 'video',
  file: 'file',
  application: 'application',
};

/**
 * Name: INPUT_TYPE
 * Desc: The input type
 */
export const INPUT_TYPE = {
  input: 'input',
  email: 'email',
  select: 'select',
};

/**
 * Name: WHO_TO_CONTACT_ID
 * Desc: The contact id for final wishes
 */
export const WHO_TO_CONTACT_ID = 10;
/**
 * Name: IMPORTANT_DOCUMENT
 * Desc: The important document id for final wishes
 */
export const IMPORTANT_DOCUMENT_ID = 2;
/**
 * Name: PROFESSIONAL_ADVISOR_CONTACT_INFO
 * Desc: The professional advisor for final wishes
 */
export const PROFESSIONAL_ADVISOR_CONTACT_INFO_ID = 5;

/**
 * Name: MEDIA_LIMITATIONS
 * Desc: The max limit size for media
 */
export const MEDIA_LIMITATIONS = {
  video_size: 750000000, // 100000000 in bytes = 750 mb
  image_size: 750000000, // 100000000 in bytes = 750 mb
};

/**
 * Name: MEDIA_FILE_TYPE
 * Desc: The media file type
 */
export const MEDIA_FILE_TYPE = {
  image: 'image',
  video: 'video',
};
/**
 * Name: ATTACHMENT_TYPE
 * Desc: The attachment type
 */
export const ATTACHMENT_TYPE = {
  image: 1,
  video: 2,
};

/**
 * Name: CHILDREN_FORM_TYPE
 * Desc: The form type for children list
 */
export const CHILDREN_FORM_TYPE = {
  children_contact_no: 'children_contact_no',
  children_first_name: 'children_first_name',
  children_last_name: 'children_last_name',
};

/**
 * Name: EMOJI_VALIDATION
 * Desc: The validation for emoji
 */
export const EMOJI_VALIDATION = {
  asciiCapable: 'ascii-capable',
  visiblePassword: 'visible-password',
};

/**
 * Name: VALID_REGEX
 * Desc: The regex values for validation
 */
export const VALID_REGEX = {
  name: /^[A-Za-z]+$/,
  phone: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-s\\/0-9]*$/g,
  age: /^[0-9]+$/,
  delete: /DELETE/,
};

/**
 * Name: SERVER_ERROR
 * Desc: The server error
 */
export const SERVER_ERROR = {
  fetchError: 'FETCH_ERROR',
};

/**
 * Name: INPUT_SYMBOLS
 * Desc: The input symbols
 */
export const INPUT_SYMBOLS = {
  asterisk: '*',
};

/**
 * Name: KEYBOARD_TYPE
 * Desc: The keyboard type list
 */
export const KEYBOARD_TYPE = {
  email: 'email-address',
  numeric: 'numeric',
};

/**
 * Name: FINAL_WISH_SLAB
 * Desc: The final wish points list
 */
export const FINAL_WISH_SLAB = {
  slab_50: 50,
  slab_75: 75,
  slab_100: 100,
};

/**
 * Name: LIFE_CELEBRATION_SLAB
 * Desc: The life celebration points list
 */
export const LIFE_CELEBRATION_SLAB = {
  slab_50: 50,
  slab_75: 75,
  slab_100: 100,
};

/**
 * Name: USER_STATUS
 * Desc: The status for family user
 */
export const USER_STATUS = {
  active: 1,
  pending: 0,
};

/**
 * Name: PLAN_TYPE
 * Desc: The subscription plan type
 */
export const PLAN_TYPE = {
  freemiumPlan: 'Freemium',
  userPlan: 'User',
  familyPlan: 'FamilyPaln',
};

/**
 * Name: PLAN_STATUS
 * Desc: The subscription plan status
 */
export const PLAN_STATUS = {
  notPurchased: 'NotPurchased',
  active: 'Active',
  expired: 'Expired',
  cancelled: 'Canceled',
};

/**
 * Name: subscriptionSKU
 * Desc: Subscription SKU ids
 */
export const subscriptionSKU = {
  android: [
    'lypmfp01',
    'lypmup02',
    'lypmfp03',
    'lypyfp04',
    'lypyup05',
    'lypyfp06',
  ],
  ios: ['LYPMFP01', 'LYPMUP02', 'LYPMFP03', 'LYPYFP04', 'LYPYUP05', 'LYPYFP06'],
};

/**
 * Name: APPLE_IN_APP_SUBSCRIPTION_URL
 * Desc: Apple in app subscription url
 */
export const APPLE_IN_APP_SUBSCRIPTION_URL =
  'https://apps.apple.com/account/subscriptions';

/**
 * Name: ANDROID_IN_APP_SUBSCRIPTION_URL
 * Desc: Play store in app subscription url
 */
export const ANDROID_IN_APP_SUBSCRIPTION_URL =
  'https://play.google.com/store/account/subscriptions?package=com.lyfeplum&sku=';

/**
 * Name: SUBSCRIBED_FROM
 * Desc: Subscription from which platform
 */
export const SUBSCRIBED_FROM = {
  appStore: 'ios',
  playStore: 'android',
  web: 'web',
};

/**
 * Name: FAMILY_PLAN_STATUS
 * Desc: Status of family plan
 */
export const FAMILY_PLAN_STATUS = {
  notAFamilyMember: '0',
  familyMemberWithActivePlan: '1',
  familyMemberWithInActivePlan: '2',
};

/**
 * Name: FOLDER_NAMES
 * Desc: Folder names for signed url api request
 */
export const FOLDER_NAMES = {
  saveChaptersQuestions: 'attachments/user_id',
  addNewMedia: 'attachments/user_id',
  saveFeaturedImage: 'chapter_title_chapter_id/images/',
  addStoryAttachment: 'attachments/user_id',
  changeCover: 'user-banners',
  changeProfilePic: 'users',
};

/**
 * Name: MEDIA_SELECTION_LIMIT
 * Desc: Media selection limit for each screen
 */
export const MEDIA_SELECTION_LIMIT = {
  media: 1,
  profileImage: 1,
  coverImage: 1,
  storyAttachment: 1,
  featuredImage: 1,
  myVault: 1,
};

/**
 * Name: FB_FEED_ACTION_OPTIONS
 * Desc: The fb feed action options
 */
export const FB_FEED_ACTION_OPTIONS = [strings.deleteText, strings.cancel];

/**
 * Name: MATERIAL_COMMUNITY_ICONS
 * Desc: The constant list for material community icons
 */
export const MATERIAL_COMMUNITY_ICONS = {
  close: 'close',
  shareVariant: 'share-variant',
  plus: 'plus',
  deleteOutline: 'delete-outline',
  cloudDeleteOutline: 'cloud-download-outline',
  dotsVertical: 'dots-vertical',
};

/**
 * Name: MATERIAL_ICONS
 * Desc: The constant list for material icons
 */
export const MATERIAL_ICONS = {
  removeCircleOutline: 'remove-circle-outline',
};
