/**
 * Name: IRules
 * Desc: The interface type for rules
 */
export interface IRules {
  email?: boolean;
  password?: boolean;
  required?: boolean | false;
  title: string;
  confirmPwd?: boolean;
}

/**
 * Name: IValidationRules
 * Desc: The interface type for validation rules
 */
export interface IValidationRules {
  email: IRules;
  password?: IRules;
  npassword?: IRules;
  cpassword?: IRules;
  regEmail?: IRules;
  regPwd?: IRules;
  regConfirmPwd?: IRules;
  name?: IRules;
}

/**
 * Name: IInputState
 * Desc: The interface type for input state
 */
export interface IInputState {
  npassword?: string;
  npasswordError?: string;
  cpassword?: string;
  cpasswordError?: string;
  password?: string;
  passwordError?: string;
  email?: string;
  emailError?: string;
  regEmail?: string;
  regPwd?: string;
  regConfirmPwd?: string;
  regEmailError?: string;
  regPwdError?: string;
  regConfirmPwdError?: string;
  name?: string;
}

/**
 * Name: IFbUserDataType
 * Desc: The interface type for fb data
 */
export interface IFbUserDataType {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  name: string;
  picture: IPicture;
}

/**
 * Name: IPicture
 * Desc: The interface type for picture
 */
export interface IPicture {
  data: IData;
}

/**
 * Name: IData
 * Desc: The interface type for data
 */
export interface IData {
  ProfessionalModel: any[];
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}

/**
 * Name: INavigation
 * Desc: The interface type for navigation
 */
export interface INavigation {
  [x: string]: any;
  reset: (arg0: {
    index: number;
    routes: {name: string; params?: any}[];
  }) => void;
  getParam: (param1: any, param2: any) => any;
  goBack: () => void;
  dispatch: (param: any) => void;
  push: (param1: any, param2?: any) => void;
  addListener: (a: string, b: () => void) => any;
  navigate: (param1: string, param2?: any) => void;
  setOptions: (param: any) => void;
  route: (key: string, name: string, params: any) => void;
  state: any;
}
/**
 * Name: IFilterType
 * Desc: The interface type for filterText style
 */
export interface IFilterType {
  isSelected: boolean;
  title: string;
}

/**
 * Name: IApiResponse
 * Desc: The interface type for api response
 */
export interface IApiResponse {
  status: string;
  message: string;
}

/**
 * Name: IRegisterApiResponse
 * Desc: The interface type for social api response
 */
export interface IRegisterApiResponse {
  status: string;
  message: string;
  token: string;
  planStatus: string;
  subscription: ISubscriptionDetail;
  isFamilyPlanAdmin: boolean;
  familyPlanStatus: string;
}

/**
 * Name: IUserApiResponse
 * Desc: The interface type for user profile api response
 */
export interface IUserApiResponse {
  status: string;
  message: string;
  authenticated_user: IUserDetailResponse;
}

/**
 * Name: IUserDetailResponse
 * Desc: The interface type for user profile detail response
 */
export interface IUserDetailResponse {
  email: string;
  first_name: string;
  last_name: string;
  zip_code: string;
  date_of_birth: string;
  profile_photo_url: string;
  cover_image: string;
  social_type: string;
  final_wish_points: number;
  life_celebration_points: number;
  id: number;
}

/**
 * Name: ITraitsApiResponse
 * Desc: The interface type for traits api response
 */
export interface ITraitsApiResponse {
  status: string;
  message: string;
  all_traits: any;
}

/**
 * Name: IMediaApiResponse
 * Desc: The interface type for media api response
 */
export interface IMediaApiResponse {
  status: string;
  message: string;
  show_btn: boolean;
  media: any;
}

/**
 * Name: ILoginApiResponse
 * Desc: The interface type for login api response
 */
export interface ILoginApiResponse {
  status: string;
  message: string;
  token: string;
  isUserVerified: boolean;
  planStatus: string;
  subscription: ISubscriptionDetail;
  isFamilyPlanAdmin: boolean;
  familyPlanStatus: string;
}

/**
 * Name: ILifeCelebrationApiResponse
 * Desc: The interface type for life celebration api response
 */
export interface ILifeCelebrationApiResponse {
  status: string;
  message: string;
  life_celebration: any;
}

/**
 * Name: IJustInCaseApiResponse
 * Desc: The interface type for just in case api response
 */
export interface IJustInCaseApiResponse {
  status: string;
  message: string;
  just_in_case: any;
}

/**
 * Name: IContactsApiResponse
 * Desc: The interface type for designated contacts api response
 */
export interface IContactsApiResponse {
  status: string;
  message: string;
  designated_contacts: any;
}

/**
 * Name: IAddContactApiResponse
 * Desc: The interface type for add contact api response
 */
export interface IAddContactApiResponse {
  status: string;
  message: string;
  errors: any;
}

/**
 * Name: ITemplateListApiResponse
 * Desc: The interface type for template list api response
 */
export interface ITemplateListApiResponse {
  status: string;
  message: string;
  templates: any;
}

/**
 * Name: ISelectTemplateApiResponse
 * Desc: The interface type for select template api response
 */
export interface ISelectTemplateApiResponse {
  status: string;
  message: string;
  chapter_hashid: string;
}

/**
 * Name: IAddChapterApiResponse
 * Desc: The interface type for add chapter api response
 */
export interface IAddChapterApiResponse {
  status: string;
  message: string;
  errors: any;
  chapter_id: string;
  chapter_name: string;
}

/**
 * Name: IEditChapterApiResponse
 * Desc: The interface type for edit chapter api response
 */
export interface IEditChapterApiResponse {
  status: string;
  message: string;
  errors: any;
  questions: any;
  chapter: any;
}

/**
 * Name: IChapterApiResponse
 * Desc: The interface type for chapter api response
 */
export interface IChapterApiResponse {
  status: string;
  message: string;
  chapters: string;
}

/**
 * Name: IChapterPreviewApiResponse
 * Desc: The interface type for chapter preview api response
 */
export interface IChapterPreviewApiResponse {
  status: string;
  message: string;
  chapter: any;
  questions: any;
}

/**
 * Name: IStoryApiResponse
 * Desc: The interface type for story api response
 */
export interface IStoryApiResponse {
  status: string;
  message: string;
  errors: any;
}

/**
 * Name: IFinalWishApiResponse
 * Desc: The interface type for final wish api response
 */
export interface IFinalWishApiResponse {
  status: string;
  message: string;
  final_wishes: any;
  final_wish_points: string;
  custom_message: string;
}

/**
 * Name: IUpdateFinalWishApiResponse
 * Desc: The interface type for update final wish api response
 */
export interface IUpdateFinalWishApiResponse {
  status: string;
  message: string;
  final_wishes: any;
}

/**
 * Name: ICheckListApiResponse
 * Desc: The interface type for check list api response
 */
export interface ICheckListApiResponse {
  status: string;
  message: string;
  selected_checklists: any;
}

/**
 * Name: IFinalCheckListApiResponse
 * Desc: The interface type for final check list api response
 */
export interface IFinalCheckListApiResponse {
  status: string;
  message: string;
  checklists: any;
  final_wish_id: any;
  custom_message: any;
  data: any;
}

/**
 * Name: IQuestionDetailsApiResponse
 * Desc: The interface type for question details api response
 */
export interface IQuestionDetailsApiResponse {
  status: string;
  message: string;
  location_answer: any;
  files: any;
  extra_forms: any;
  who_to_contact_extra_forms: any;
  is_file_allowed: boolean;
  is_multiple_file_allowed: any;
  documents: any;
}

/**
 * Name: ISaveWishApiResponse
 * Desc: The interface type for save wish api response
 */
export interface ISaveWishApiResponse {
  status: string;
  message: string;
  final_wish_points: string;
  documents?: IUploadedDocuments[];
}

/**
 * Name: IUserData
 * Desc: The interface type for user data
 */
export interface IUserData {
  id: number;
  profile_photo_url: string;
  cover_image: string;
  social_type: string;
}

/**
 * Name: IFamilyUserApiResponse
 * Desc: The interface type for family user api response
 */
export interface IFamilyUserApiResponse {
  status: string;
  message: string;
  invited_users: IFamilyUserDetailResponse[];
}

/**
 * Name: IFamilyUserDetailResponse
 * Desc: The interface type for family user detail response
 */
export interface IFamilyUserDetailResponse {
  email: string;
  name: string;
  profile_photo_url: string;
  status: string;
}

/**
 * Name: IListingApiResponse
 * Desc: The interface type for listing api response
 */
export interface IListingApiResponse {
  status: string;
  message: string;
  plans: IPlanType;
  userInfo: IUserInfoResponse;
}

/**
 * Name: IPlanType
 * Desc: The interface type for plan type
 */
export interface IPlanType {
  monthly: IPlanDetail[];
  annually: IPlanDetail[];
}

/**
 * Name: IPlanDetail
 * Desc: The interface type for plan details
 */
export interface IPlanDetail {
  access: string;
  android_sku: string;
  billing_method: string;
  id: number;
  ios_sku: string;
  plan: string;
  price: string;
  price_label: string;
}

/**
 * Name: IUserInfoResponse
 * Desc: The interface type for user info
 */
export interface IUserInfoResponse {
  androidSku: string;
  id: string;
  iosSku: string;
  nextRenewalDate: string;
  planStatus: string;
  plan_name: string;
  max_user_allowed: number;
  plan: string;
  price: string;
  platform: number;
  isFamilyPlanAdmin: boolean;
  familyPlanStatus: string;
  familyOwnerName: string;
  invitationMessageStatus: number;
}

/**
 * Name: ISubscriptionDetail
 * Desc: The interface type for subscription detail
 */
export interface ISubscriptionDetail {
  ends_at: string;
  id: number;
  plan_name: string;
  plan_type: string;
}

/**
 * Name: IFbFeedApiResponse
 * Desc: The interface type for fb feed api response
 */
export interface IFbFeedApiResponse {
  status: string;
  message: string;
  data: any[];
}

/**
 * Name: IExtraForm
 * Desc: The interface type for my vault extra form
 */
export interface IExtraForm {
  answer?: string;
  question?: string;
  Location?: string;
  type?: string;
}

/**
 * Name: IUploadedDocuments
 * Desc: The interface type for my vault uploaded documents
 */
export interface IUploadedDocuments {
  DocumentName?: string;
  Location?: string;
  id?: number;
  images?: IImageList[];
  Type?: string;
}

/**
 * Name: IImageList
 * Desc: The interface type for my vault uploaded documents list
 */
export interface IImageList {
  file_id?: number;
  file_name?: string;
  file_url?: string;
  type?: string;
}

/**
 * Name: ISignedUrlResponse
 * Desc: The interface type for signed url api response
 */
export interface ISignedUrlResponse {
  url: string;
  image_path: string;
}

/**
 * Name: IImageData
 * Desc: The interface type for image data
 */
export interface IImageData {
  contentType: string;
  fileBase64Path: string;
  fileName: string;
  fileType: string;
  name: string;
  size: number;
  type: string;
  uri: string;
}

/**
 * Name: ISignedResponse
 * Desc: The interface type for signed data response
 */
export interface ISignedResponse {
  data: {
    image_path: string;
    url: string;
  };
}

/**
 * Name: IShareFile
 * Desc: The interface type for intent share data
 */
export interface IShareFile {
  filePath?: string;
  text?: string;
  weblink?: string;
  mimeType?: string;
  contentUri?: string;
  fileName?: string;
  extension?: string;
}
