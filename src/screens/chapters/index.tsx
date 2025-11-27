/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  AppState,
  Easing,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {Purchase, getAvailablePurchases} from 'react-native-iap';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import ShareFile from 'react-native-share';
import {FlatGrid} from 'react-native-super-grid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';
import {defaultTheme} from '../../../styles/theme';
import DeleteIcon from '../../assets/images/svgImages/deleteIcon';
import EditIcon from '../../assets/images/svgImages/editIcon';
import FinalWishIcon from '../../assets/images/svgImages/finalWishIcon';
import GridViewIcon from '../../assets/images/svgImages/gridViewIcon';
import LifeCelebrationIcon from '../../assets/images/svgImages/lifeCelebration';
import ListViewIcon from '../../assets/images/svgImages/listViewIcon';
import PrimaryButton from '../../components/button';
import ModalBox from '../../components/modalBox';
import CustomLoader from '../../components/screenLoader';
import {
  CHAPTER_TYPE,
  MATERIAL_COMMUNITY_ICONS,
  PLAN_STATUS,
  TOAST_MESSAGE_TYPE,
} from '../../constants/utils';
import {strings} from '../../localization';
import {
  NAV_ADD_CHAPTERS,
  NAV_ADD_CHAPTERS_TEMPLATE,
  NAV_CHAPTER_PREVIEW,
} from '../../navigation/constants';
import {
  useChapterListMutation,
  useDeleteChapterMutation,
} from '../../redux/api/chapterApi';
import {useUserProfileMutation} from '../../redux/api/profileApi';
import {
  useGetSubscriptionListingMutation,
  useUpdateInvitationMessageMutation,
  useUpdateSubscriptionMutation,
  useUpdateIOSSubscriptionMutation,
} from '../../redux/api/subscriptionApi';
import {
  setFamilyAdminStatus,
  setFamilyPlanStatus,
  setIsUpdateSubscription,
  setMaxUsers,
  setSubscriptionStatus,
} from '../../redux/api/subscriptionState';
import {setUserData} from '../../redux/api/userState';
import {RootState} from '../../redux/store';
import {INavigation} from '../../types/utils';
import {
  isIOS,
  showServerError,
  showToastMessage,
  subscriptionAlert,
} from '../../utils';
import {
  AddButtonWrapper,
  AddName,
  ButtonTouchable,
  ButtonWrapper,
  CategoryContainer,
  CategoryText,
  ChapterName,
  ContentName,
  DescriptionContainer,
  DetailView,
  EmptyContainer,
  GridButtonWrapper,
  GridContainer,
  HeaderCard,
  HeaderContainer,
  HeaderText,
  IconTouchable,
  ImageTouchable,
  ListButtonWrapper,
  ListContainer,
  ListDescriptionContainer,
  ListImageTouchable,
  MainContainer,
  MainWrapper,
  SubTitleText,
  TextTouchable,
  TitleText,
} from './styled';

const myGlobal: any = global;

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface ChapterProps {
  navigation?: INavigation;
}

/**
 * Name: Chapters
 * Desc: Screen to render chapters UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const Chapters: React.FC<ChapterProps> = props => {
  const {navigation} = props;
  const subscriptionStatus = useSelector(
    (state: RootState) => state.subscription.subscriptionStatus,
  );
  const appState = useRef(AppState.currentState);

  const isSubscriptionExpired =
    subscriptionStatus === PLAN_STATUS.expired ||
    subscriptionStatus === PLAN_STATUS.notPurchased
      ? true
      : false;
  const dispatch = useDispatch();
  const {
    chapters,
    published,
    drafts,
    photos,
    videos,
    blankChapter,
    addNewChapter,
    fromTemplate,
    all,
    finalWishes,
    lifeCelebration,
  } = strings;
  const {primaryBackgroundColor} = defaultTheme;

  const [gridView, setGridView] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [tabIndex, SetTabIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertModal, setAlertModal] = useState(false);
  const [isSubscriptionMessage, setIsSubscriptionMessage] = useState(true);
  const [isShare, setIsShare] = useState(false);
  const position = useRef(new Animated.Value(0)).current;
  let slideAnim: Animated.CompositeAnimation;

  const slideOutStyle = {
    transform: [{translateX: position}],
  };
  const [
    userProfile,
    {
      isLoading: isUserProfileLoading,
      isError: isUserProfileError,
      error: userProfileError,
      isSuccess: isUserProfileSuccess,
      data: userProfileData,
    },
  ] = useUserProfileMutation();

  const [
    getSubscriptionListing,
    {
      isLoading: isListingLoading,
      isError: isListingError,
      error: listingError,
      isSuccess: isListingSuccess,
      data: listingData,
    },
  ] = useGetSubscriptionListingMutation();
  const [
    updateSubscription,
    {
      isLoading: isUpdateIapLoading,
      isError: isUpdateIapError,
      error: updateIapError,
      isSuccess: isUpdateIapSuccess,
      data: updateIapData,
    },
  ] = useUpdateSubscriptionMutation();
  const [updateInvitationMessage, {}] = useUpdateInvitationMessageMutation();
  const [
    updateIOSSubscription,
    {
      isLoading: isIOSUpdateIapLoading,
      isError: isIOSUpdateIapError,
      error: updateIOSIapError,
      isSuccess: isUpdateIOSIapSuccess,
      data: updateIOSIapData,
    },
  ] = useUpdateIOSSubscriptionMutation();
  /**
   * Name: useEffect
   * Desc: useEffect to call create subscription api
   */
  useEffect(() => {
    if (isUpdateIapSuccess || isUpdateIOSIapSuccess) {
      getSubscriptionListing('');
    }
    if (isUpdateIapError || isIOSUpdateIapError) {
      getSubscriptionListing('');
    }
  }, [isUpdateIapLoading, isIOSUpdateIapLoading]);
  /**
   * Name: updateInAppSubscription
   * Desc: updateInAppSubscription for subscription updating current subscription.
   */
  const updateInAppSubscription = async () => {
    try {
      let purchases: Purchase[] = [];
      purchases = await getAvailablePurchases();
      if (purchases?.length > 0) {
        if (isIOS()) {
          purchases = await getLatestSubscription(purchases);
          const paymentParams = {
            platform: 'ios',
            data: purchases,
          };
          console.log('purchases', purchases);
          updateIOSSubscription(paymentParams);
        } else {
          purchases = await getAvailablePurchases();
          const receipt = purchases[0];
          const paymentParams = {
            platform: 'android',
            purchaseToken: receipt.purchaseToken,
          };
          updateSubscription(paymentParams);
        }
      } else {
        const paymentParams = {
          platform: isIOS() ? 'ios' : 'android',
          purchaseToken: '',
        };
        if (isIOS()) {
          updateIOSSubscription(paymentParams);
        } else {
          updateSubscription(paymentParams);
        }
      }
    } catch (error) {
      console.warn(
        'src/screens/chapters/index.tsx - updateInAppSubscription -> error: ',
        error,
      );
    }
  };
  const getLatestSubscription = async (purchases: Purchase[]) => {
    // Fetch the current active subscriptions for iOS

    // Filter out only subscription purchases
    const subscriptionPurchases = purchases.filter(
      purchase =>
        purchase.transactionReceipt && purchase.transactionReceipt.length > 0,
    );

    // Sort the subscription purchases by their purchase date in descending order
    subscriptionPurchases.sort((a, b) => b.transactionDate - a.transactionDate);

    // The first item in the sorted array will be the latest subscription purchase
    const latestSubscription = subscriptionPurchases[0];
    return [latestSubscription];
  };

  /**
   * Name: useEffect
   * Desc: useEffect to call  api on navigation
   */
  useEffect(() => {
    setLoading(true);
    updateInAppSubscription();
    userProfile('');
    navigation?.addListener('focus', () => {
      if (!isShare) {
        setLoading(true);
        chapterList('');
      } else {
        setIsShare(false);
      }
    });
    const subscription = AppState.addEventListener(
      'change',
      function (nextAppState) {
        if (
          appState.current.match(/active|background/) &&
          nextAppState === 'active' &&
          !loading
        ) {
          if (!isShare) {
            setLoading(true);
            chapterList('');
            updateInAppSubscription();
          } else {
            setIsShare(false);
          }
        }
      },
    );
    return () => {
      subscription.remove();
    };
  }, [navigation]);

  /**
   * Name: useEffect
   * Desc: useEffect for user Profile API response.
   */
  useEffect(() => {
    if (isUserProfileSuccess) {
      if (userProfileData?.authenticated_user) {
        const userDetails = {
          id: userProfileData?.authenticated_user.id || 0,
          profile_photo_url:
            userProfileData?.authenticated_user.profile_photo_url || '',
          cover_image: userProfileData?.authenticated_user.cover_image || '',
          social_type: userProfileData?.authenticated_user.social_type || '',
        };
        dispatch(setUserData(userDetails));
      }
    }
    if (isUserProfileError) {
      showServerError(userProfileError, navigation);
    }
  }, [isUserProfileLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for subscription listing API response.
   */
  useEffect(() => {
    if (isListingSuccess) {
      if (listingData) {
        const isFamilyAdmin = listingData?.userInfo?.isFamilyPlanAdmin
          ? listingData?.userInfo?.isFamilyPlanAdmin
          : false;
        dispatch(setFamilyAdminStatus(isFamilyAdmin));
        const subscriptionStat = listingData?.userInfo?.planStatus
          ? listingData?.userInfo?.planStatus
          : '';
        dispatch(setSubscriptionStatus(subscriptionStat));
        const familyPlanStatus = listingData?.userInfo?.familyPlanStatus
          ? listingData?.userInfo?.familyPlanStatus
          : '';
        dispatch(setFamilyPlanStatus(familyPlanStatus));
        dispatch(setMaxUsers(listingData?.userInfo?.max_user_allowed));
      }
    }
    if (isListingError) {
      showServerError(listingError, navigation);
    }
  }, [isListingLoading]);
  /**
   * Name: useEffect
   * Desc: useEffect to call api
   */
  useEffect(() => {
    myGlobal.hashId = '';
    chapterList('');
  }, []);

  /**
   * Name: useEffect
   * Desc: useEffect to handle category change
   */
  useEffect(() => {
    if (chapterListData) {
      setFilteredData([]);
      setLoading(true);
      callFilterData(chapterListData?.chapters);
    }
  }, [tabIndex]);

  /**
   * Name: callFilterData
   * Desc: Function to filter data
   */
  const callFilterData = data => {
    const addData = {
      type: 0,
    };
    if (tabIndex === 0) {
      const newData = data.slice(0);
      newData.unshift(addData);
      setFilteredData(newData);
      setFilteredData(newData);
    } else if (tabIndex === 1) {
      const filteredValue = data.filter(item => {
        if (item?.is_published) {
          return item;
        }
      });
      filteredValue.unshift(addData);
      setFilteredData(filteredValue);
    } else if (tabIndex === 2) {
      const filteredValue = data.filter(item => {
        if (item?.is_draft) {
          return item;
        }
      });
      filteredValue.unshift(addData);
      setFilteredData(filteredValue);
    }
    setRefreshing(false);
    setLoading(false);
  };

  const [
    chapterList,
    {
      isLoading: isChapterListLoading,
      isError: isChapterListError,
      error: chapterListError,
      isSuccess: isChapterListSuccess,
      data: chapterListData,
    },
  ] = useChapterListMutation();

  const [
    deleteChapter,
    {
      isLoading: isDeleteChapterLoading,
      isError: isDeleteChapterError,
      error: deleteChapterError,
      isSuccess: isDeleteChapterSuccess,
      data: deleteChapterData,
    },
  ] = useDeleteChapterMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to manage chapter api response
   */
  useEffect(() => {
    if (isChapterListSuccess) {
      if (chapterListData && chapterListData?.status) {
        callFilterData(chapterListData?.chapters);
      } else {
        setRefreshing(false);
        setLoading(false);
        showToastMessage(
          strings.lyfePlum,
          chapterListData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isChapterListError) {
      setRefreshing(false);
      setLoading(false);
      showServerError(chapterListError, navigation);
    }
  }, [isChapterListLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to manage chapter delete api response
   */
  useEffect(() => {
    if (isDeleteChapterSuccess) {
      if (deleteChapterData && deleteChapterData?.status) {
        myGlobal.hashId = '';
        chapterList('');
        showToastMessage(
          strings.lyfePlum,
          deleteChapterData?.message,
          TOAST_MESSAGE_TYPE.success,
        );
      } else {
        showToastMessage(
          strings.lyfePlum,
          deleteChapterData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isDeleteChapterError) {
      showServerError(deleteChapterError, navigation);
    }
  }, [isDeleteChapterLoading]);

  /**
   * Name: onShare
   * Desc: Function to call on click on share memory button
   */
  const onShare = async item => {
    const options = {
      title: strings.lyfePlum,
      message: strings.shareMemoryText,
      url: item?.preview_url,
    };
    try {
      setIsShare(true);
      ShareFile.open(options)
        .then((response: any) => {
          setIsShare(false);
        })
        .catch(() => {
          setIsShare(false);
        });
    } catch (error: any) {
      setIsShare(false);
    }
  };

  /**
   * Name: renderListView
   * Desc: Function to render list view
   * @returns JSX element
   */
  const renderListView = data => {
    if (!gridView && (data?.item?.is_draft || data?.item?.is_published)) {
      return (
        <ListContainer>
          <ListImageTouchable onPress={() => goToChapterPreview(data?.item)}>
            <Image
              source={{uri: data?.item?.featured_image}}
              indicator={ProgressPie}
              indicatorProps={{
                color: colors.primaryButton,
              }}
              style={styles.listImageView}
            />
          </ListImageTouchable>
          <ListDescriptionContainer>
            <ChapterName numberOfLines={1}>{data?.item.title}</ChapterName>
            <ContentName>{`${data?.item.images} ${photos} | ${data?.item.videos} ${videos}`}</ContentName>
            <ListButtonWrapper>
              <ButtonTouchable
                onPress={() => {
                  if (isSubscriptionExpired) {
                    subscriptionAlert(navigation);
                  } else {
                    myGlobal.hashId = data?.item?.hashid;
                    navigation?.navigate(NAV_ADD_CHAPTERS, {
                      isFromTemplate: true,
                    });
                  }
                }}
                isLeftBorder={false}
                isRightBorder={true}>
                <EditIcon width={rpx(28)} height={rpx(28)} />
              </ButtonTouchable>
              <ButtonTouchable
                onPress={() => {
                  if (isSubscriptionExpired) {
                    subscriptionAlert(navigation);
                  } else {
                    myGlobal.hashId = data?.item?.hashid;
                    callDeleteAction();
                  }
                }}
                isLeftBorder={false}
                isRightBorder={true}>
                {data?.item?.hashid === myGlobal.hashId &&
                isDeleteChapterLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <DeleteIcon />
                )}
              </ButtonTouchable>
              <ButtonTouchable
                onPress={async () => {
                  if (isSubscriptionExpired) {
                    subscriptionAlert(navigation);
                  } else {
                    await onShare(data?.item);
                  }
                }}
                isLeftBorder={false}
                isRightBorder={false}
                disabled={data?.item?.is_published ? false : true}>
                <MaterialCommunityIcons
                  name={MATERIAL_COMMUNITY_ICONS.shareVariant}
                  size={22}
                  color={
                    data?.item?.is_published ? colors.white : colors.darkGray
                  }
                />
              </ButtonTouchable>
            </ListButtonWrapper>
          </ListDescriptionContainer>
        </ListContainer>
      );
    } else if (data?.item?.type !== CHAPTER_TYPE.add) {
      return (
        <GridContainer>
          <ImageTouchable onPress={() => goToChapterPreview(data?.item)}>
            <Image
              source={{uri: data?.item?.featured_image}}
              indicator={ProgressPie}
              indicatorProps={{
                color: colors.primaryButton,
              }}
              style={styles.imageView}
            />
          </ImageTouchable>
          <DescriptionContainer>
            <ChapterName numberOfLines={1}>{data?.item.title}</ChapterName>
            <ContentName>{`${data?.item.images} ${photos} | ${data?.item.videos} ${videos}`}</ContentName>
          </DescriptionContainer>
          {gridView ? (
            <GridButtonWrapper>
              <ButtonTouchable
                onPress={() => {
                  if (isSubscriptionExpired) {
                    subscriptionAlert(navigation);
                  } else {
                    myGlobal.hashId = data?.item?.hashid;
                    navigation?.navigate(NAV_ADD_CHAPTERS, {
                      isFromTemplate: true,
                    });
                  }
                }}
                isLeftBorder={false}
                isRightBorder={true}>
                <EditIcon width={rpx(28)} height={rpx(28)} />
              </ButtonTouchable>
              <ButtonTouchable
                onPress={() => {
                  if (isSubscriptionExpired) {
                    subscriptionAlert(navigation);
                  } else {
                    myGlobal.hashId = data?.item?.hashid;
                    callDeleteAction();
                  }
                }}
                isLeftBorder={false}
                isRightBorder={true}>
                {data?.item?.hashid === myGlobal.hashId &&
                isDeleteChapterLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <DeleteIcon />
                )}
              </ButtonTouchable>
              <ButtonTouchable
                onPress={async () => {
                  if (isSubscriptionExpired) {
                    subscriptionAlert(navigation);
                  } else {
                    await onShare(data?.item);
                  }
                }}
                isLeftBorder={false}
                isRightBorder={false}
                disabled={data?.item?.is_published ? false : true}>
                <MaterialCommunityIcons
                  name={MATERIAL_COMMUNITY_ICONS.shareVariant}
                  size={22}
                  color={
                    data?.item?.is_published ? colors.white : colors.darkGray
                  }
                />
              </ButtonTouchable>
            </GridButtonWrapper>
          ) : (
            <ButtonWrapper>
              <ButtonTouchable
                onPress={() => {
                  if (isSubscriptionExpired) {
                    subscriptionAlert(navigation);
                  } else {
                    myGlobal.hashId = data?.item?.hashid;
                    navigation?.navigate(NAV_ADD_CHAPTERS, {
                      isFromTemplate: true,
                    });
                  }
                }}
                isLeftBorder={false}
                isRightBorder={true}>
                <EditIcon width={rpx(28)} height={rpx(28)} />
              </ButtonTouchable>
              <ButtonTouchable
                onPress={() => {
                  if (isSubscriptionExpired) {
                    subscriptionAlert(navigation);
                  } else {
                    myGlobal.hashId = data?.item?.hashid;
                    callDeleteAction();
                  }
                }}
                isLeftBorder={false}
                isRightBorder={true}>
                {data?.item?.hashid === myGlobal.hashId &&
                isDeleteChapterLoading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <DeleteIcon />
                )}
              </ButtonTouchable>
              <ButtonTouchable
                onPress={async () => {
                  if (isSubscriptionExpired) {
                    subscriptionAlert(navigation);
                  } else {
                    await onShare(data?.item);
                  }
                }}
                isLeftBorder={false}
                isRightBorder={false}
                disabled={data?.item?.is_published ? false : true}>
                <MaterialCommunityIcons
                  name={MATERIAL_COMMUNITY_ICONS.shareVariant}
                  size={22}
                  color={
                    data?.item?.is_published ? colors.white : colors.darkGray
                  }
                />
              </ButtonTouchable>
            </ButtonWrapper>
          )}
        </GridContainer>
      );
    }
    return (
      <EmptyContainer isSelected={!gridView}>
        <AddName>{addNewChapter}</AddName>
        <AddButtonWrapper>
          <PrimaryButton
            title={blankChapter}
            buttonStyle={{height: rpx(32), paddingHorizontal: rpx(10)}}
            onPress={() => {
              if (isSubscriptionExpired) {
                subscriptionAlert(navigation);
              } else {
                navigation?.navigate(NAV_ADD_CHAPTERS);
              }
            }}
          />
        </AddButtonWrapper>
        <AddButtonWrapper>
          <PrimaryButton
            title={fromTemplate}
            buttonStyle={{
              height: rpx(32),
              backgroundColor: colors.white,
              paddingHorizontal: rpx(10),
            }}
            textStyle={{color: colors.black}}
            onPress={() => {
              if (isSubscriptionExpired) {
                subscriptionAlert(navigation);
              } else {
                navigation?.navigate(NAV_ADD_CHAPTERS_TEMPLATE);
              }
            }}
          />
        </AddButtonWrapper>
      </EmptyContainer>
    );
  };

  /**
   * Name: goToChapterPreview
   * Desc: Function to navigate to chapter preview
   */
  const goToChapterPreview = data => {
    myGlobal.hashId = data?.hashid;
    navigation?.navigate(NAV_CHAPTER_PREVIEW);
  };

  /**
   * Name: onRefresh
   * Desc: Function to refresh page
   */
  const onRefresh = () => {
    setRefreshing(true);
    chapterList('');
  };

  /**
   * Name: callDeleteAction
   * Desc: Function to delete chapter
   */
  const callDeleteAction = () => {
    setAlertModal(true);
  };

  /**
   * Name: callDeleteChapter
   * Desc: Function to call delete chapter api
   */
  const callDeleteChapter = async () => {
    setAlertModal(false);
    deleteChapter(myGlobal.hashId);
  };

  /**
   * Name: hideSubscriptionMessage
   * Desc: Function to hide subscription message
   */
  const hideSubscriptionMessage = () => {
    const requestData = {
      status: 0,
    };
    updateInvitationMessage(requestData);
    slideAnim = Animated.timing(position, {
      toValue: 500,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    slideAnim?.start(() => {
      slideAnim?.reset();
      position?.setValue(0);
      setIsSubscriptionMessage(false);
    });
  };

  return (
    <MainWrapper>
      {loading ? (
        <MainContainer>
          <CustomLoader
            bgColor={colors.darkGray}
            indicatorColor={primaryBackgroundColor}
          />
        </MainContainer>
      ) : (
        <MainContainer>
          {myGlobal.tab === strings.home && (
            <React.Fragment>
              {isSubscriptionMessage && (
                <Animated.View style={[slideOutStyle]}>
                  {listingData?.userInfo?.invitationMessageStatus === 1 &&
                    listingData?.userInfo?.familyOwnerName !== '' && (
                      <HeaderCard style={styles.shadowProp}>
                        <DetailView>
                          <TitleText>
                            {listingData?.userInfo?.familyOwnerName}
                            <SubTitleText>
                              {strings.dashboardMessage}
                            </SubTitleText>
                          </TitleText>
                        </DetailView>
                        <PrimaryButton
                          title={strings.gotIt}
                          onPress={() => hideSubscriptionMessage()}
                          buttonStyle={{
                            width: rpx(100),
                            height: rpx(40),
                          }}
                        />
                      </HeaderCard>
                    )}
                </Animated.View>
              )}
              <HeaderContainer>
                <PrimaryButton
                  title={finalWishes}
                  buttonStyle={{
                    height: rpx(80),
                    width: rpx(180),
                    marginVertical: rpx(5),
                    justifyContent: 'space-evenly',
                  }}
                  isIconAdded={true}
                  iconContent={<FinalWishIcon color={colors.white} />}
                  onPress={() => navigation?.jumpTo(finalWishes)}
                />
                <PrimaryButton
                  title={lifeCelebration}
                  buttonStyle={{
                    height: rpx(80),
                    width: rpx(180),
                    marginVertical: rpx(5),
                    justifyContent: 'space-evenly',
                  }}
                  isIconAdded={true}
                  iconContent={<LifeCelebrationIcon color={colors.white} />}
                  onPress={() => navigation?.jumpTo(lifeCelebration)}
                />
              </HeaderContainer>
            </React.Fragment>
          )}
          <HeaderContainer>
            <HeaderText>{chapters}</HeaderText>
            <IconTouchable onPress={() => setGridView(true)}>
              <GridViewIcon />
            </IconTouchable>
            <IconTouchable onPress={() => setGridView(false)}>
              <ListViewIcon />
            </IconTouchable>
          </HeaderContainer>
          <CategoryContainer>
            <TextTouchable onPress={() => SetTabIndex(0)}>
              <CategoryText isSelected={tabIndex === 0}>{all}</CategoryText>
            </TextTouchable>
            <TextTouchable onPress={() => SetTabIndex(1)}>
              <CategoryText isSelected={tabIndex === 1}>
                {published}
              </CategoryText>
            </TextTouchable>
            <TextTouchable onPress={() => SetTabIndex(2)}>
              <CategoryText isSelected={tabIndex === 2}>{drafts}</CategoryText>
            </TextTouchable>
          </CategoryContainer>
          <FlatGrid
            itemDimension={gridView ? 130 : 270}
            maxItemsPerRow={2}
            data={filteredData}
            renderItem={item => renderListView(item)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        </MainContainer>
      )}
      <ModalBox
        visible={alertModal}
        message={strings.deleteMessage}
        onPressPositiveBtn={callDeleteChapter}
        onPressNegativeBtn={() => setAlertModal(false)}
      />
    </MainWrapper>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  imageView: {
    width: '100%',
    height: rpx(120),
  },
  listImageView: {
    width: '100%',
    height: rpx(150),
  },
  shadowProp: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
