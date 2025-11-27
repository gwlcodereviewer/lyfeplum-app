import styled from 'styled-components/native';
import colors from '../../../../styles/colors';
import {rh, rpx, rw, screenWidth} from '../../../../styles/styleUtils';
import {ICustomMargin} from '../../../../styles/types';

/**
 * Name: LetsStartTxt
 * Desc: The lets start text view.
 */
export const LetsStartTxt = styled.Text`
  margin-left: ${rw(70)}px;
  margin-top: ${rh(20)}px;
  font-size: ${rpx(22)}px;
  line-height: ${rpx(26)}px;
  font-weight: 500;
  text-transform: uppercase;
`;

/**
 * Name: ButtonContainer
 * Desc: The input box container view.
 */
export const ButtonContainer = styled.View`
  width: 100%;
  padding-horizontal: ${rpx(10)}px;
  margin-bottom: ${rpx(5)}px;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;
`;

/**
 * Name: ButtonWrapper
 * Desc: The save button view container.
 */
export const ButtonWrapper = styled.View`
  margin-top: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
  margin-right: ${rpx(5)}px;
`;

/**
 * Name: HeaderContainer
 * Desc: The container for header
 */
export const HeaderContainer = styled.View`
  background-color: ${colors.primaryButton};
  padding-vertical: ${rpx(15)}px;
`;

/**
 * Name: HeaderText
 * Desc: The text for header
 */
export const HeaderText = styled.Text`
  margin-left: ${rw(20)}px;
  font-size: ${rpx(24)}px;
  line-height: ${rpx(26)}px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.white};
  text-align: center;
`;

/**
 * Name: PointsContainer
 * Desc: The container for header
 */
export const PointsContainer = styled.View`
  background-color: ${colors.labelBackground};
  padding-vertical: ${rpx(5)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

/**
 * Name: PointsText
 * Desc: The text for header
 */
export const PointsText = styled.Text`
  font-size: ${rpx(24)}px;
  line-height: ${rpx(26)}px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.greenTxt};
  padding-vertical: ${rpx(20)};
  padding-right: ${rpx(5)};
  text-align: center;
`;

/**
 * Name: ContentWrapper
 * Desc: The container for content
 */
export const ContentContainer = styled.View`
  padding-horizontal: ${rpx(20)}px;
  padding-top: ${rpx(20)}px;
`;

/**
 * Name: CheckboxContainer
 * Desc: The container for checkbox
 */
export const CheckboxContainer = styled.View`
  padding-top: ${rpx(5)}px;
  flex: 0.1;
`;

/**
 * Name: TextContainer
 * Desc: The container for Text
 */
export const TextContainer = styled.View`
  flex: 1;
`;

/**
 * Name: ContentText
 * Desc: The text for header
 */
export const ContentText = styled.Text`
  font-size: ${rpx(22)}px;
  line-height: ${rpx(26)}px;
  font-weight: 300;
  color: ${colors.black};
`;

/**
 * Name: TouchableContainer
 * Desc: The container for touchable view
 */
export const TouchableContainer = styled.TouchableOpacity`
  flex-direction: row;
`;

/**
 * Name: InputContainer
 * Desc: The input box container view.
 */
export const InputContainer = styled.View`
  width: 100%;
  padding-horizontal: ${rpx(20)}px;
`;

/**
 * Name: UploadText
 * Desc: The upload text
 */
export const UploadText = styled.Text`
  margin-left: ${rw(70)}px;
  margin-top: ${rh(20)}px;
  font-size: ${rpx(18)}px;
  line-height: ${rpx(22)}px;
  font-weight: 500;
`;

/**
 * Name: UploadContainer
 * Desc: The container view for upload
 */
export const UploadContainer = styled.View`
  width: 100%;
  flex-direction: row;
`;

/**
 * Name: UploadWrapper
 * Desc: The wrapper for upload
 */
export const UploadWrapper = styled.View`
  margin-top: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
  padding-right: ${rpx(250)}px;
  padding-left: ${rpx(20)}px;
`;

/**
 * Name: MessageWrapper
 * Desc: The wrapper for message
 */
export const MessageWrapper = styled.View`
  margin-top: ${rpx(15)}px;
`;

/**
 * Name: MessageText
 * Desc: The message text
 */
export const MessageText = styled.Text`
  margin-horizontal: ${rw(70)}px;
  margin-top: ${rh(20)}px;
  font-size: ${rpx(18)}px;
  line-height: ${rpx(22)}px;
  font-weight: 500;
  color: ${colors.greenTxt};
`;

/**
 * Name: ContentWrapper
 * Desc: The view for content
 */
export const ContentWrapper = styled.View``;

/**
 * Name: DocumentContainer
 * Desc: The view for document
 */
export const DocumentContainer = styled.View`
  flex-direction: row;
  padding-left: ${rpx(20)}px;
  flex: 1;
`;

/**
 * Name: DocumentText
 * Desc: The document text
 */
export const DocumentText = styled.Text`
  margin-top: ${rh(5)}px;
  font-size: ${rpx(18)}px;
  line-height: ${rpx(22)}px;
  font-weight: 300;
  margin-right: ${rpx(30)}px;
`;

/**
 * Name: LinkContainer
 * Desc: The touchable view for link
 */
export const LinkContainer = styled.TouchableOpacity`
  margin-left: ${rw(80)}px;
  margin-top: ${rh(15)}px;
`;

/**
 * Name: PolicyText
 * Desc: The policy text
 */
export const PolicyText = styled.Text`
  font-size: ${rpx(18)}px;
  line-height: ${rpx(22)}px;
  font-weight: 500;
  color: ${colors.greenTxt};
`;

/**
 * Name: AddMoreWrapper
 * Desc: The view container for add more button.
 */
export const AddMoreWrapper = styled.View`
  margin-top: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
  margin-right: ${rpx(5)}px;
  padding-left: ${rpx(250)}px;
  padding-right: ${rpx(10)}px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

/**
 * Name: Divider
 * Desc: The view for divider
 */
export const Divider = styled.View`
  margin-vertical: ${rh(10)}px;
  background-color: ${colors.grey};
  height: ${rh(2)}px;
  margin-horizontal: ${rpx(20)}px;
`;

/**
 * Name: RemoveWrapper
 * Desc: The wrapper for input form remove
 */
export const RemoveWrapper = styled.View`
  margin-top: ${rpx(15)}px;
  border-radius: ${rpx(10)}px;
  padding-right: ${rpx(250)}px;
  padding-bottom: ${rpx(20)}px;
`;

/**
 * Name: ImageWrapper
 * Desc: The wrapper for image upload
 */
export const ImageWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${rpx(10)}px;
`;

/**
 * Name: RemoveContainer
 * Desc: The view for remove container
 */
export const RemoveContainer = styled.View`
  padding-left: ${rpx(20)}px;
  flex-direction: row;
  align-self: center;
  flex: 1;
`;

/**
 * Name: DivContainer
 * Desc: The view for divider container
 */
export const DivContainer = styled.View<ICustomMargin>`
  margin-vertical: ${rpx(10)}px;
  margin-horizontal: ${props =>
    props.customMargin ? rpx(props.customMargin) : rpx(0)}px;
`;

/**
 * Name: LogoImage
 * Desc: The logo image view.
 */
export const LogoImage = styled.Image`
  height: ${rpx(30)}px;
  width: ${rpx(30)}px;
`;

/**
 * Name: LogoContainer
 * Desc: The view for logo container
 */
export const LogoContainer = styled.View`
  position: absolute;
  padding-horizontal: ${rpx(screenWidth / 2)}px;
`;

/**
 * Name: ImageTouchable
 * Desc: The touchable view for image
 */
export const ImageTouchable = styled.TouchableOpacity``;

/**
 * Name: BadgeContainer
 * Desc: The view for badge container
 */
export const BadgeContainer = styled.View`
  padding-left: ${rpx(5)};
`;

/**
 * Name: BadgeImage
 * Desc: The badge image view.
 */
export const BadgeImage = styled.Image`
  height: ${rpx(70)}px;
  width: ${rpx(150)}px;
`;
/**
 * Name: LocationNDocumentText
 * Desc: location and document text
 */
export const LocationNDocumentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${rpx(20)};
`;
/**
 * Name: LocationNDocumentTextContainer
 * Desc: location and document text container
 */
export const LocationNDocumentTextContainer = styled.View`
  flex-direction: row;
`;
/**
 * Name: LocationNDocumentText
 * Desc: location and document text
 */
export const LocationNDocumentText = styled.Text`
  font-size: ${rpx(22)}px;
  line-height: ${rpx(26)}px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.greenTxt};
  padding-vertical: ${rpx(20)};
  text-align: center;
`;
/**
 * Name: MainDocumentContainer
 * Desc: it contains documents
 */
export const MainDocumentContainer = styled.View``;
/**
 * Name: DocumentIconContainer
 * Desc: it contains document icons
 */
export const DocumentIconContainer = styled.View`
  flex-direction: row;
`;

/**
 * Name: DocumentIconContainer
 * Desc: it contains document icons
 */
export const DocumentIconWrapper = styled.TouchableOpacity`
  margin-horizontal: ${rpx(15)}px;
`;
/**
 * Name: ImageWrapper
 * Desc: The wrapper for image upload
 */
export const UploadRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${rpx(10)}px;
`;

/**
 * Name: UploadedContainer
 * Desc: The wrapper for uploaded contents
 */
export const UploadedContainer = styled.View``;

/**
 * Name: ContentView
 * Desc: The view for uploaded single contents
 */
export const ContentView = styled.View`
  padding-horizontal: ${rpx(20)}px;
`;

/**
 * Name: RemoveDocumentsContainer
 * Desc: The view for remove document container
 */
export const RemoveDocumentsContainer = styled.View`
  border-radius: ${rpx(10)}px;
  padding-left: ${rpx(20)}px;
  flex-direction: row;
`;

/**
 * Name: DeleteWrapper
 * Desc: The view container for delete button.
 */
export const DeleteWrapper = styled.TouchableOpacity`
  width: ${rpx(40)}px;
  height: ${rpx(40)}px;
  border-radius: ${rpx(20)}px;
  background-color: ${colors.grey};
  align-items: center;
  justify-content: center;
`;

/**
 * Name: DownloadWrapper
 * Desc: The view container for download button.
 */
export const DownloadWrapper = styled.TouchableOpacity`
  width: ${rpx(40)}px;
  height: ${rpx(40)}px;
  border-radius: ${rpx(20)}px;
  background-color: ${colors.primaryButton};
  align-items: center;
  justify-content: center;
  margin-right: ${rpx(10)}px;
`;

/**
 * Name: AddMoreFormWrapper
 * Desc: The view container for add more button.
 */
export const AddMoreFormWrapper = styled.TouchableOpacity`
  align-self: flex-end;
  width: ${rpx(40)}px;
  height: ${rpx(40)}px;
  border-radius: ${rpx(25)}px;
  background-color: ${colors.primaryButton};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-align: center;
  margin-right: ${rpx(5)}px;
`;

/**
 * Name: AddMoreText
 * Desc: The upload text
 */
export const AddMoreText = styled.Text`
  margin-right: ${rw(50)}px;
  font-size: ${rpx(20)}px;
  line-height: ${rpx(23)}px;
  font-weight: 500;
  text-transform: uppercase;
`;

/**
 * Name: MoreFormWrapper
 * Desc: The view container for more form header
 */
export const MoreFormWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

/**
 * Name: FormTitle
 * Desc: The form title text
 */
export const FormTitle = styled.Text`
  margin-right: ${rw(50)}px;
  font-size: ${rpx(20)}px;
  line-height: ${rpx(23)}px;
  font-weight: 500;
  flex: 1;
`;

/**
 * Name: DocumentSubContainer
 * Desc: The view for document sub list
 */
export const DocumentSubContainer = styled.View`
  flex-direction: row;
  padding-left: ${rpx(20)}px;
  width: ${rpx(170)}px;
`;
