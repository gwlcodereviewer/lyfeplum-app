/**
 * Name: API_END_POINTS
 * Desc: The API end points
 */
export const API_END_POINTS = {
  login: '/api/login',
  registerUser: '/api/register',
  forgotPassword: '/api/forgot-password',
  socialLogin: '/api/login-using-social',
  resendEmail: '/api/resend-email',
  logout: '/api/logout',
  userProfile: '/api/user',
  profileImage: '/api/v3/change-profile-pic',
  coverImage: '/api/v3/change-cover',
  editProfile: '/api/edit-user-profile',
  designatedContacts: '/api/all-designated-contacts',
  addDesignatedContacts: '/api/add-designated-contact',
  updateDesignatedContacts: '/api/update-designated-contact',
  deleteDesignatedContacts: '/api/delete-designated-contact/',
  changePassword: '/api/change-password',
  deleteAccount: '/api/delete-account',
  chaptersList: '/api/chapters-list',
  traitsList: '/api/all-traits',
  addTraits: '/api/add-traits',
  getFinalWishes: '/api/get-final-wishes-info',
  updateFinalWishes: '/api/update-final-wishes-info',
  finalWishCheckList: '/api/get-checklists',
  getCheckList: '/api/v2/get-selected-checklists',
  questionDetails: '/api/v2/show-final-wishes-questions/',
  saveWishes: '/api/save-answers',
  removeUploadedImage: '/api/remove-image',
  updateWishCheckList: '/api/update-checklists',
  getTemplates: '/api/templates',
  addChapter: '/api/add-new-chapter',
  saveChapterQuestions: '/api/save-chapters-questions',
  saveFeaturedImage: '/api/v3/save-featured-image',
  updateStory: '/api/update-story',
  deleteStory: '/api/delete-story/',
  previewChapter: '/api/preview-chapter/',
  justInCase: '/api/just-in-case',
  mediaList: '/api/get-all-media',
  addNewMedia: '/api/v3/add-new-media',
  selectTemplate: '/api/select-template',
  lifeCelebrationList: '/api/life-celebration-list',
  updateLifeCelebration: '/api/update-life-celebration-answer',
  editChapter: '/api/edit-chapter/',
  deleteAttachment: '/api/delete-attachments/',
  updateStoryStatus: '/api/set-chapter-status',
  loadMoreMedia: '/api/load-more-media',
  updateChapter: '/api/save-chapter',
  addStoryAttachment: '/api/v3/add-story-attachment',
  deleteChapter: '/api/delete-chapter/',
  subscriptionListing: '/api/subscription-plan-list',
  addFamilyUser: '/api/invite-user',
  getFamilyUsers: '/api/invited-user-list',
  updateInvitationMessage: '/api/update-invited-message-notification',
  createSubscription: '/api/v3/create-subscription',
  updateSubscription: '/api/v3/update-android-in-app-subscription',
  fbFeedList: '/api/v3/facebook-feeds',
  fbConnect: '/api/connect-facebook',
  storeFinalWishesInfo: '/api/v2/store-final-wishes-info',
  saveFinalWishDetails: '/api/v3/save-answers',
  removeDocuments: '/api/v2/remove-documents',
  getSignedUrl: '/api/v2/create-signed-url',
  fbPostShare: '/api/v3/fb-post-share',
  fbPostRemove: '/api/v3/delete-fb-post/',
  updateIOSSubscription: '/api/v3/update-ios-subscription',
};

/**
 * Name: HEADER_KEYS
 * Desc: The headers key params.
 */
export const HEADER_KEYS = {
  Authorization: 'Authorization',
  ContentType: 'Content-Type',
  ApplicationJson: 'application/json',
  Bearer: 'Bearer',
  Accept: 'Accept',
};

/**
 * Name: REDUCER_PATHS
 * Desc: The reducer paths.
 */
export const REDUCER_PATHS = {
  ProfileAPI: 'profileApi',
  AuthApi: 'authApi',
  LogoutApi: 'logoutApi',
  DesignatedContactsAPI: 'designatedContactsApi',
  ChangePasswordAPI: 'changePasswordApi',
  ChapterApi: 'chapterApi',
  TraitsApi: 'traitsApi',
  FinalWishes: 'finalWishesApi',
  JustInCaseApi: 'justInCaseApi',
  MediaListAPI: 'mediaListApi',
  lifeCelebrationApi: 'lifeCelebrationApi',
  subscriptionApi: 'subscriptionApi',
  fbFeedListApi: 'fbFeedListApi',
  awsApi: 'awsApi',
};

/**
 * Name: STATUS_CODES
 * Desc: The api status codes
 */
export const STATUS_CODES = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unAuthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
};
