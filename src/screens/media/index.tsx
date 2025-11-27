/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import VideoPlayer from 'react-native-video-controls';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {ScreenWrapper, ScrollViewContainer} from '../../../styles/style';
import {rh, rpx, rw} from '../../../styles/styleUtils';
import Images from '../../assets/images/index';
import AppStatusBar from '../../components/appStatusBar';
import PrimaryButton from '../../components/button';
import PreviewImage from '../../components/previewImage';
import CustomLoader from '../../components/screenLoader';
import {VideoModel} from '../../components/videoPlayer';
import {
  FOLDER_NAMES,
  MEDIA_SELECTION_LIMIT,
  PLAN_STATUS,
  TOAST_MESSAGE_TYPE,
  IMAGE_PICKER_OPTIONS,
} from '../../constants/utils';
import {strings} from '../../localization';
import {useGetSignedUrlMutation} from '../../redux/api/awsApi';
import {
  useAddNewMediaMutation,
  useGetMediaListMutation,
  useLoadMoreMediaMutation,
} from '../../redux/api/mediaList';
import {setUploadData} from '../../redux/api/uploadState';
import {RootState} from '../../redux/store';
import {INavigation} from '../../types/utils';
import {
  mixedMediaType,
  onImageLibraryPress,
  openDeviceCamera,
  photoMediaType,
  showServerError,
  showToastMessage,
  subscriptionAlert,
} from '../../utils';
import {
  ButtonContainer,
  ButtonTxt,
  DateText,
  DateView,
  FilterLabelAll,
  FilterLabelImages,
  FilterLabelVideo,
  FilterLabelView,
  FilterView,
  FlatListData,
  HeadingText,
  HeadingView,
  HorizontalLine,
  ImageContainer,
  ListContainer,
  ListFooter,
  ListItemView,
  NoMediaText,
  NoMediaView,
  PlayIconContainer,
  PlayIconWrapper,
  PlayImage,
  SortText,
  VideoContainer,
  Wrapper,
} from './styled';
const myGlobal: any = global;

/**
 * Name: MediaProps
 * Desc: Interface declaration for Props
 */
interface MediaProps {
  navigation?: INavigation;
}

/**
 * Name: Media screen
 * Desc: Screen to render media UI
 * @returns JSX element
 */
const Media: React.FC<MediaProps> = (props: MediaProps) => {
  const {navigation} = props;
  const subscriptionStatus = useSelector(
    (state: RootState) => state.subscription.subscriptionStatus,
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const isSubscriptionExpired =
    subscriptionStatus === PLAN_STATUS.expired ||
    subscriptionStatus === PLAN_STATUS.notPurchased
      ? true
      : false;
  const [tabIndex, SetTabIndex] = useState(0);
  const [listData, setListData] = useState<any>([]);
  const [filterListData, setFilterListData] = useState<any>([]);
  const actionSheet = useRef<any>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [pageNo, setPageNo] = useState(2);
  const {mediaLibrary, sort, images, video, all, addNewMedia, noMedia} =
    strings;
  const [showModal, setShowModal] = useState({isVisible: false, data: null});
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isMediaTaking, setMediaTaking] = useState<boolean>(false);

  const [awsUploadData, setAwsUploadData] = useState<any[]>([]);
  const dispatch = useDispatch();
  const uploadData = useSelector((state: RootState) => state.upload.uploadData);
  const uploadingComplete = useSelector(
    (state: RootState) => state.upload.uploadingComplete,
  );

  /**
   * Name: API call
   * Desc: Add New Media in list Mutation call
   */
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
   * Name: API call
   * Desc: Media list Mutation call
   */
  const [
    getMediaList,
    {
      isLoading: isMediaListLoading,
      isError: isMediaListError,
      error: isMediaApiError,
      isSuccess: isMediaListSuccess,
      data: mediaListData,
    },
  ] = useGetMediaListMutation();

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
   * Name: API call
   * Desc: load more media list
   */
  const [
    loadMoreMediaList,
    {
      isLoading: isLoadMoreMediaLoading,
      isError: isLoadMoreMediaError,
      error: isLoadMoreMediaApiError,
      isSuccess: isLoadMoreMediaSuccess,
      data: loadMoreMedia,
    },
  ] = useLoadMoreMediaMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to handle Image upload response
   */
  useEffect(() => {
    if (isAddNewMediaSuccess) {
      if (addNewMediaData && addNewMediaData?.status) {
        getMediaList('');
        showToastMessage(
          strings.lyfePlum,
          strings.addMediaSuccess,
          TOAST_MESSAGE_TYPE.success,
        );
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
   * Name: uploadingComplete
   * Desc: handle to upload file
   */
  useEffect(() => {
    if (uploadingComplete) {
      getMediaList('');
    }
  }, [uploadingComplete]);
  /**
   * Name: useEffect
   * Desc: useEffect to handle Image upload response
   */
  useEffect(() => {
    if (isSignedUrlSuccess) {
      setMediaTaking(false);
    }
    if (isSignedUrlError) {
      setMediaTaking(false);
      showServerError(signedUrlError, navigation);
    }
  }, [isSignedUrlLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to handle call get Media Lists
   */
  useEffect(() => {
    setRefreshing(true);
    getMediaList('');
  }, []);

  /**
   * Name: useEffect
   * Desc: useEffect to handle get filter view
   */
  useEffect(() => {
    if (listData.length > 0) {
      filterData(0);
    }
  }, [listData]);

  /**
   * Name: useEffect
   * Desc: useEffect to handle get Media Lists
   */
  useEffect(() => {
    if (isMediaListSuccess) {
      if (mediaListData && mediaListData?.status) {
        setListData(mediaListData?.media);
        setShowLoadMore(mediaListData?.show_btn);
        filterData(0);
      } else {
        setIsRefreshing(false);
        setRefreshing(false);
        showToastMessage(
          strings.lyfePlum,
          mediaListData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isMediaListError) {
      setIsRefreshing(false);
      setRefreshing(false);
      showServerError(isMediaApiError, '');
    }
  }, [isMediaListLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to handle get more media list
   */
  useEffect(() => {
    if (isLoadMoreMediaSuccess) {
      if (loadMoreMedia && loadMoreMedia?.status) {
        setShowLoadMore(loadMoreMedia?.show_btn);
        if (loadMoreMedia?.media.length > 0) {
          let index = pageNo + 1;
          setListData([...listData, ...loadMoreMedia?.media]);
          setPageNo(index);
        }
      } else {
        showToastMessage(
          strings.lyfePlum,
          loadMoreMedia?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isLoadMoreMediaError) {
      showServerError(isLoadMoreMediaApiError, navigation);
    }
  }, [isLoadMoreMediaLoading]);

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
  /**
   *
   *  addMediaInQueue
   */
  const addMediaInQueue = (data: any) => {
    // const data = awsUploadData[0];
    // data.awsUrl = signedUrlData?.url;
    // data.image_path = signedUrlData?.image_path;
    data.isInProgress = false;
    const newState = uploadData.map(obj => {
      return {...obj};
    });
    newState.push(data);
    dispatch(setUploadData(newState));
  };
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
   * Name: onSelectAction
   * Desc: Function to call on click on action sheet
   */
  const onSelectAction = (index: number) => {
    if (index === 0) {
      setMediaTaking(true);
      openDeviceCamera([], photoMediaType, true)
        .then((res: any) => {
          setMediaTaking(false);
          if (res) {
            setAwsUploadData(res);
            // generateSignedUrl(res[0]);
            addMediaInQueue(res[0]);
          } else {
            showToastMessage(
              strings.lyfePlum,
              strings.somethingWentWrong,
              TOAST_MESSAGE_TYPE.error,
            );
          }
        })
        .catch(() => {
          setMediaTaking(false);
        });
    } else if (index === 1) {
      setMediaTaking(true);
      onImageLibraryPress(mixedMediaType, MEDIA_SELECTION_LIMIT.media, [], true)
        .then((res: any) => {
          setMediaTaking(false);
          if (res) {
            setAwsUploadData(res);
            // generateSignedUrl(res[0]);
            addMediaInQueue(res[0]);
          } else {
            showToastMessage(
              strings.lyfePlum,
              strings.somethingWentWrong,
              TOAST_MESSAGE_TYPE.error,
            );
          }
        })
        .catch(() => {
          setMediaTaking(false);
        });
    }
  };

  /**
   * Name: ListItem
   * Desc: Function to call render Flatlist Item.
   */
  const ListItem = ({item}) => {
    return (
      <ListItemView>
        {item.type === 1 && (
          <ImageContainer
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
          </ImageContainer>
        )}
        {item.type === 2 && (
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
      </ListItemView>
    );
  };

  /**
   * Name: setImagesList
   * Desc: Function to set images list in array
   * @param {string} link - link of image
   */
  const setImagesList = link => {
    let imageList: any = [];
    imageList.push({uri: link});
    filterListData.map(item => {
      let listItem = item?.value;
      listItem.map(childItem => {
        if (childItem.type === 1 && childItem.link !== link) {
          imageList.push({uri: childItem?.link});
        }
      });
    });
    myGlobal.images = imageList;
    setImageModal(true);
  };
  /**
   * Name: onRefresh
   * Desc: Function to call Refreshing to list
   */
  const onRefresh = () => {
    getMediaList('');
    setIsRefreshing(true);
  };

  /**
   * Name: renderFooter
   * Desc: Footer View with Load More button
   */
  const renderFooter = () => {
    return (
      <ListFooter>
        {showLoadMore && (
          <PrimaryButton
            title={strings.loadMore}
            showLoader={isLoadMoreMediaLoading}
            onPress={() => {
              loadMoreMediaList({page: pageNo});
            }}
            buttonStyle={{width: rpx(140), height: rpx(40)}}
          />
        )}
      </ListFooter>
    );
  };

  /**
   * Name: filterData
   * Desc: filterData to handle  Media Lists according tabIndex
   * params@:tabindex
   */
  const filterData = (index: number) => {
    SetTabIndex(index);
    if (index === 0) {
      setFilterListData(listData);
    } else if (index === 1) {
      const filterImage: any = [];
      listData?.map(item => {
        const filterValue = item.value.filter(mediaItem => {
          return mediaItem.type === 1;
        });
        if (filterValue.length) {
          const imagData = {...item, value: filterValue};
          filterImage.push(imagData);
        }
      });
      setFilterListData(filterImage);
    } else if (index === 2) {
      const filterVideo: any = [];
      listData?.map(item => {
        const filterValue = item.value.filter(mediaItem => {
          return mediaItem.type === 2;
        });
        if (filterValue.length) {
          const videoData = {...item, value: filterValue};
          filterVideo.push(videoData);
        }
      });
      setFilterListData(filterVideo);
    }
    setIsRefreshing(false);
    setRefreshing(false);
  };

  return (
    <ScreenWrapper>
      <AppStatusBar />
      {refreshing ? (
        <CustomLoader />
      ) : (
        <Wrapper>
          <ScrollViewContainer
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }>
            <HeadingView>
              <HeadingText>{mediaLibrary}</HeadingText>
            </HeadingView>
            <FilterView>
              <SortText>{sort} :</SortText>
              <FilterLabelView onPress={() => filterData(0)}>
                <FilterLabelAll isSelected={tabIndex === 0}>
                  {all}
                </FilterLabelAll>
              </FilterLabelView>
              <FilterLabelView onPress={() => filterData(1)}>
                <FilterLabelImages isSelected={tabIndex === 1}>
                  {images}
                </FilterLabelImages>
              </FilterLabelView>
              <FilterLabelView onPress={() => filterData(2)}>
                <FilterLabelVideo isSelected={tabIndex === 2}>
                  {video}
                </FilterLabelVideo>
              </FilterLabelView>
            </FilterView>
            <ButtonContainer
              onPress={() => {
                if (!isMediaTaking) {
                  if (isSubscriptionExpired) {
                    subscriptionAlert(navigation);
                  } else {
                    actionSheet?.current?.show();
                  }
                }
              }}>
              {isMediaTaking ? (
                <ActivityIndicator color={colors.greenTxt} />
              ) : (
                <ButtonTxt>{addNewMedia}</ButtonTxt>
              )}
            </ButtonContainer>
            <ListContainer>
              <ScrollView>
                {filterListData.length === 0 ? (
                  <NoMediaView>
                    <NoMediaText>{noMedia}</NoMediaText>
                  </NoMediaView>
                ) : (
                  <React.Fragment>
                    {showModal.isVisible ? (
                      <VideoModel
                        isVisible={showModal.isVisible}
                        toggleModal={toggleModal}
                        videoDetail={showModal.data}
                        {...props}
                      />
                    ) : null}
                    <FlatListData
                      data={filterListData}
                      renderItem={({item}) => {
                        return (
                          <ListItemView>
                            {item?.value?.length > 0 && (
                              <DateView>
                                <DateText>{item.date}</DateText>
                                <HorizontalLine />
                              </DateView>
                            )}
                            <FlatListData
                              data={item.value}
                              numColumns={2}
                              renderItem={({item: mediaData}) => (
                                <ListItem item={mediaData} />
                              )}
                            />
                          </ListItemView>
                        );
                      }}
                      ListFooterComponent={renderFooter}
                    />
                  </React.Fragment>
                )}
              </ScrollView>
            </ListContainer>
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
          </ScrollViewContainer>
        </Wrapper>
      )}
    </ScreenWrapper>
  );
};

export default Media;

const styles = StyleSheet.create({
  imageView: {
    width: rw(500),
    height: rh(100),
  },
});
