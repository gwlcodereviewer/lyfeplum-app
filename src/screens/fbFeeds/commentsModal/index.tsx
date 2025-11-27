import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../../styles/colors';
import images from '../../../assets/images';
import {
  MATERIAL_COMMUNITY_ICONS,
  SUPPORTED_ORIENTATIONS,
} from '../../../constants/utils';
import {strings} from '../../../localization';
import {
  AddOnHeader,
  AddOnHeadingText,
  CommentContainer,
  CommentText,
  Container,
  ContentContainer,
  CrossContainer,
  DateText,
  MainContainer,
  ModalContainer,
  ProfileContainer,
  ScrollContainer,
  UserImage,
  UserNameText,
  ViewContainer,
} from './styled';

const commentJson = [
  {
    imageUrl: 'https://d1i4q6g5pyyg0q.cloudfront.net/users/1693208475.jpg',
    name: 'LyfePlum',
    date: '12d',
    comment: 'Good one!',
  },
  {
    imageUrl: 'https://d1i4q6g5pyyg0q.cloudfront.net/users/1693208475.jpg',
    name: 'Jack Jill',
    date: '5d',
    comment: 'Nice post bro',
  },
  {
    imageUrl: 'https://d1i4q6g5pyyg0q.cloudfront.net/users/1693208475.jpg',
    name: 'LyfePlum',
    date: '5d',
    comment: 'Thanks, I appreciate',
  },
  {
    imageUrl: 'https://d1i4q6g5pyyg0q.cloudfront.net/users/1693208475.jpg',
    name: 'Jack Jill',
    date: '5d',
    comment:
      'This is the comment added by user to test the comment length in the view',
  },
  {
    imageUrl: 'https://d1i4q6g5pyyg0q.cloudfront.net/users/1693208475.jpg',
    name: 'LyfePlum',
    date: '5d',
    comment: 'Thanks, I appreciate',
  },
  {
    imageUrl: 'https://d1i4q6g5pyyg0q.cloudfront.net/users/1693208475.jpg',
    name: 'LyfePlum',
    date: '5d',
    comment: 'Thanks, I appreciate',
  },
  {
    imageUrl: 'https://d1i4q6g5pyyg0q.cloudfront.net/users/1693208475.jpg',
    name: 'LyfePlum',
    date: '5d',
    comment: 'Thanks, I appreciate',
  },
  {
    imageUrl: 'https://d1i4q6g5pyyg0q.cloudfront.net/users/1693208475.jpg',
    name: 'LyfePlum',
    date: '5d',
    comment: 'Thanks, I appreciate',
  },
  {
    imageUrl: 'https://d1i4q6g5pyyg0q.cloudfront.net/users/1693208475.jpg',
    name: 'LyfePlum',
    date: '5d',
    comment: 'Thanks, I appreciate',
  },
];

/**
 * Name: Props
 * Desc: Props type declaration
 */
interface Props {
  visible: boolean;
  closeModal: () => void;
}

/**
 * Name: CommentsModal
 * Desc: Component to display fb post comments
 * @param {boolean} visible - If true, then modal will be visible.
 * @param {func} closeModal - Callback function for close modal.
 */
const CommentsModal = (props: Props) => {
  const {visible, closeModal} = props;
  const {comments} = strings;
  const [commentsData, setCommentsData] = useState<any>([]);

  /**
   * Name: useEffect
   * Desc: useEffect to call api and set data
   */
  useEffect(() => {
    setCommentsData(commentJson);
  }, [visible]);

  /**
   * Name: renderContent
   * Desc: Function to render comments view
   * @returns JSX.Element
   */
  const renderContent = () => {
    return (
      <Container>
        <ScrollContainer showsVerticalScrollIndicator={false}>
          {commentsData.map((item, index) => {
            return (
              <CommentContainer key={index}>
                <ProfileContainer>
                  <UserImage
                    source={
                      item?.imageUrl
                        ? {
                            uri: item?.imageUrl,
                          }
                        : images.defaultAvatar
                    }
                  />
                </ProfileContainer>
                <ContentContainer>
                  <UserNameText>{item?.name}</UserNameText>
                  <CommentText>{item?.comment}</CommentText>
                  <DateText>{item?.date}</DateText>
                </ContentContainer>
              </CommentContainer>
            );
          })}
        </ScrollContainer>
      </Container>
    );
  };

  /**
   * Name: renderHeader
   * Desc: Function to render header.
   * @returns JSX.Element
   */
  const renderHeader = () => {
    return (
      <AddOnHeader>
        <AddOnHeadingText>{comments}</AddOnHeadingText>
        <CrossContainer onPress={() => closeModal()}>
          <MaterialCommunityIcons
            name={MATERIAL_COMMUNITY_ICONS.close}
            size={25}
            color={colors.black}
          />
        </CrossContainer>
      </AddOnHeader>
    );
  };

  /**
   * Name: renderMainView
   * Desc: Function to render main view.
   * @returns JSX.Element
   */
  const renderMainView = () => {
    return (
      <MainContainer>
        <ViewContainer>
          {renderHeader()}
          {renderContent()}
        </ViewContainer>
      </MainContainer>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'slide'}
      supportedOrientations={SUPPORTED_ORIENTATIONS}>
      <ModalContainer>{renderMainView()}</ModalContainer>
    </Modal>
  );
};

export default CommentsModal;
