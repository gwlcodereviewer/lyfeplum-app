/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Image from 'react-native-image-progress';
import ImageView from 'react-native-image-viewing';
import ProgressPie from 'react-native-progress/Pie';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {fbConnectStyle} from '../../../styles/style';
import {rpx} from '../../../styles/styleUtils';
import FbConnectButton from '../../components/fbConnectButton';
import CustomLoader from '../../components/screenLoader';
import {
  DATE_FORMAT,
  FB_FEED_ACTION_OPTIONS,
  LOGIN_TYPES,
  MATERIAL_COMMUNITY_ICONS,
  TOAST_MESSAGE_TYPE,
} from '../../constants/utils';
import {strings} from '../../localization';
import {
  useGetFeedListMutation,
  useRemoveFbPostMutation,
  useShareFbPostMutation,
} from '../../redux/api/fbFeedList';
import {RootState} from '../../redux/store';
import {INavigation, IShareFile} from '../../types/utils';
import {
  formattedStringDate,
  showServerError,
  showToastMessage,
} from '../../utils';
import CommentsModal from './commentsModal';
import {
  ActionView,
  DateText,
  FlatListWrapper,
  ListItemContainer,
  ListItemRightContainer,
  ListItemRowContainer,
  NoDataText,
  NoRecordView,
  PostDetail,
  ProfileImage,
  ProfileNameText,
  Wrapper,
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
 * Name: Change Password screen
 * Desc: Screen to render Change Password UI
 * @param {any} navigation property
 * @returns JSX element
 */
const FbFeeds: React.FC<Props> = (props: Props) => {
  const {navigation, route} = props;
  const userData = useSelector((state: RootState) => state.user.userData);
  const {noPost} = strings;
  const actionSheet = useRef<any>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);
  const [intentData, setIntentData] = useState<IShareFile[]>();

  const [fbFeedListApi, {isLoading, data}] = useGetFeedListMutation();

  const [
    shareFbPost,
    {
      isLoading: isSharePostLoading,
      isError: isSharePostError,
      error: sharePostError,
      isSuccess: isSharePostSuccess,
      data: sharePostData,
    },
  ] = useShareFbPostMutation();

  const [
    removeFbPost,
    {
      isLoading: isRemovePostLoading,
      isError: isRemovePostError,
      error: removePostError,
      isSuccess: isRemovePostSuccess,
      data: removePostData,
    },
  ] = useRemoveFbPostMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to set the intent data
   */
  useEffect(() => {
    if (intentData !== route?.params?.intentData) {
      setIntentData(route?.params?.intentData);
    }
  }, [route?.params?.intentData]);

  /**
   * Name: useEffect
   * Desc: useEffect to call the share post api
   */
  useEffect(() => {
    if (intentData && !isSharePostLoading) {
      const postUrl = intentData[0].weblink || intentData[0].text || '';
      const requestData = {
        url: postUrl,
      };
      shareFbPost(requestData);
    } else {
      fbFeedListApi('');
    }
  }, [intentData]);

  /**
   * Name: useEffect
   * Desc: useEffect to call feed list api on focus
   */
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      fbFeedListApi('');
    });
    return unsubscribe;
  }, [navigation]);

  /**
   * Name: useEffect
   * Desc: useEffect to manage share fb post API response.
   */
  useEffect(() => {
    if (isSharePostSuccess) {
      if (sharePostData?.status) {
        fbFeedListApi('');
        showToastMessage(
          strings.lyfePlum,
          sharePostData.message,
          TOAST_MESSAGE_TYPE.success,
        );
      } else {
        showToastMessage(
          strings.lyfePlum,
          sharePostData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isSharePostError) {
      showServerError(sharePostError, navigation);
    }
  }, [isSharePostLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to manage delete fb post API response.
   */
  useEffect(() => {
    if (isRemovePostSuccess) {
      if (removePostData?.status) {
        fbFeedListApi('');
        showToastMessage(
          strings.lyfePlum,
          removePostData.message,
          TOAST_MESSAGE_TYPE.success,
        );
      } else {
        showToastMessage(
          strings.lyfePlum,
          removePostData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isRemovePostError) {
      showServerError(removePostError, navigation);
    }
  }, [isRemovePostLoading]);

  /**
   * Name: openDetail
   * Desc: redirect to facebook page
   */
  const openDetail = (url: string) => {
    Linking.openURL(url);
  };

  /*
   * Name: showActionSheet
   * Desc: Function to open action sheet for fb feed options
   */
  const showActionSheet = (id: number) => {
    myGlobal.selectedPostId = id;
    actionSheet?.current?.show();
  };

  /**
   * Name: onSelectAction
   * Desc: Function to call on click on action sheet
   */
  const onSelectAction = (index: number) => {
    if (index === 0) {
      removeFbPost(myGlobal.selectedPostId);
    }
  };

  /**
   * Name: renderFeed
   * Desc: Function to render list items.
   */
  const renderFeeds = ({item}) => {
    if (item?.picture) {
      return (
        <ListItemContainer
          activeOpacity={1}
          style={fbConnectStyle.shadowProp}
          onPress={() => openDetail(item.link)}>
          <ListItemRowContainer>
            <ProfileImage
              source={{
                uri: item.picture,
              }}
            />
            <PostDetail>
              <ListItemRightContainer>
                <ProfileNameText>{item.from.name}</ProfileNameText>
                <DateText>
                  {formattedStringDate(
                    item.created_time,
                    DATE_FORMAT.DD_MMM_YYYY,
                  ).trim()}
                </DateText>
              </ListItemRightContainer>
            </PostDetail>
            <ActionView onPress={() => showActionSheet(item?.db_id)}>
              <MaterialCommunityIcons
                name={MATERIAL_COMMUNITY_ICONS.dotsVertical}
                size={22}
                color={colors.black}
              />
            </ActionView>
          </ListItemRowContainer>
          <TouchableOpacity
            onPress={() => {
              setImages([
                {
                  uri: item.picture,
                },
              ]);

              setIsImageViewVisible(true);
            }}>
            <Image
              source={{uri: item.picture}}
              indicator={ProgressPie}
              indicatorProps={{
                color: colors.primaryButton,
              }}
              resizeMode="contain"
              style={styles.listImageView}
            />
          </TouchableOpacity>
          {/* <CommentContainer onPress={() => openDetail(item.link)}>
            <CommentText>{strings.comments}</CommentText>
          </CommentContainer> */}
        </ListItemContainer>
      );
    } else {
      return <></>;
    }
  };

  /**
   * Name: renderPostData
   * Desc: Function to render the post list
   * @returns JSX elements
   */
  const renderPostData = useCallback(() => {
    return (
      <FlatListWrapper>
        <FlatList data={data?.data} renderItem={renderFeeds} />
      </FlatListWrapper>
    );
  }, [data]);

  return (
    <Wrapper>
      {userData.social_type !== LOGIN_TYPES.facebook ? (
        <FbConnectButton
          loginSuccess={() => {
            fbFeedListApi('');
          }}
        />
      ) : isLoading || isSharePostLoading || isRemovePostLoading ? (
        <CustomLoader
          bgColor={colors.fbBgColor}
          indicatorColor={colors.black}
        />
      ) : data?.data && data?.data.length > 0 ? (
        <React.Fragment>{renderPostData()}</React.Fragment>
      ) : (
        <NoRecordView>
          <NoDataText>{noPost}</NoDataText>
        </NoRecordView>
      )}
      <CommentsModal
        visible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
      />
      <ImageView
        images={images}
        imageIndex={0}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
      />
      <ActionSheet
        ref={actionSheet}
        options={FB_FEED_ACTION_OPTIONS}
        cancelButtonIndex={FB_FEED_ACTION_OPTIONS.length - 1}
        destructiveButtonIndex={1}
        onPress={(index: number) => {
          onSelectAction(index);
        }}
      />
    </Wrapper>
  );
};

export default FbFeeds;

const styles = StyleSheet.create({
  listImageView: {
    width: 'auto',
    height: 'auto',
    minHeight: rpx(200),
    maxHeight: rpx(500),
    borderRadius: rpx(10),
    marginTop: rpx(10),
    marginBottom: rpx(10),
  },
});
