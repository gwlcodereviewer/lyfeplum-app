/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  AppState,
  Linking,
  Platform,
  ScrollView,
  Switch,
} from 'react-native';
import {
  ProductPurchase,
  Purchase,
  PurchaseError,
  SubscriptionPurchase,
  finishTransaction,
  getAvailablePurchases,
  getSubscriptions,
  initConnection,
  purchaseUpdatedListener,
  requestSubscription,
} from 'react-native-iap';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {RowCenterView, ScreenWrapper} from '../../../styles/style';
import Header from '../../components/header';
import CustomLoader from '../../components/screenLoader';
import {
  ANDROID_IN_APP_SUBSCRIPTION_URL,
  APPLE_IN_APP_SUBSCRIPTION_URL,
  PLAN_STATUS,
  SUBSCRIBED_FROM,
  TOAST_MESSAGE_TYPE,
  subscriptionSKU,
} from '../../constants/utils';
import {strings} from '../../localization';
import {NAV_HOME, NAV_LOGIN} from '../../navigation/constants';
import {
  useCreateSubscriptionMutation,
  useGetSubscriptionListingMutation,
  useUpdateIOSSubscriptionMutation,
  useUpdateSubscriptionMutation,
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
import {INavigation, IPlanDetail, IUserInfoResponse} from '../../types/utils';
import {
  clearStorage,
  isIOS,
  showAlert,
  showServerError,
  showToastMessage,
} from '../../utils';
import {ListContainer, SwitchText, UpperText} from './styled';
import SubscribedView from './subscribedView';
import SubscriptionRow from './subscriptionRow';

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: INavigation;
  route?: INavigation;
}

/**
 * Name: Subscription screen
 * Desc: Screen to render in app purchase screen UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const Subscription: React.FC<Props> = (props: Props) => {
  const subscriptionStatus = useSelector(
    (state: RootState) => state.subscription.subscriptionStatus,
  );
  const isSubscriptionActive =
    subscriptionStatus === PLAN_STATUS.active ||
    subscriptionStatus === PLAN_STATUS.cancelled
      ? true
      : false;
  const isSubscriptionCancelled =
    subscriptionStatus === PLAN_STATUS.cancelled ? true : false;
  const isSubscriptionExpired =
    subscriptionStatus === PLAN_STATUS.expired ? true : false;
  const isSubscriptionNotPurchased =
    subscriptionStatus === PLAN_STATUS.notPurchased ? true : false;
  const dispatch = useDispatch();
  const {navigation} = props;
  const {fromSideMenu} = props?.route?.params;
  const {
    billMonthly,
    billAnnually,
    subscriptionsText,
    selectPlan,
    activeSubscription,
  } = strings;
  const [subscriptionList, setSubscriptionList] = useState<IPlanDetail[]>([]);
  const [isMonthly, setIsMonthly] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCreateSubscriptionInProgress, setCreateSubscriptionLoading] =
    useState<boolean>(false);

  const [subscribedPlan, setSubscribedPlan] = useState<IUserInfoResponse>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [planList, setPlanList] = useState<any[]>([]);
  const appState = useRef(AppState.currentState);

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
    createSubscription,
    {
      isLoading: isCreateSubscriptionLoading,
      isError: isCreateSubscriptionError,
      isSuccess: isCreateSubscriptionSuccess,
      data: createSubscriptionData,
      error: createSubscriptionError,
    },
  ] = useCreateSubscriptionMutation();
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
  }, [isUpdateIapLoading || isIOSUpdateIapLoading]);
  /**
   * Name: useEffect
   * Desc: useEffect to call create subscription api
   */
  useEffect(() => {
    if (isCreateSubscriptionSuccess) {
      if (createSubscriptionData?.status) {
        showToastMessage(
          strings.lyfePlum,
          createSubscriptionData?.message,
          TOAST_MESSAGE_TYPE.success,
        );
        navigation?.navigate(NAV_HOME);
        setCreateSubscriptionLoading(false);
      } else {
        setCreateSubscriptionLoading(false);
        showToastMessage(
          strings.lyfePlum,
          createSubscriptionData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isCreateSubscriptionError) {
      setCreateSubscriptionLoading(false);
      showToastMessage(
        strings.lyfePlum,
        strings.somethingWentWrong,
        TOAST_MESSAGE_TYPE.error,
      );
    }
  }, [isCreateSubscriptionLoading]);
  const updateListing = () => {
    setIsMonthly(true);
    setLoading(true);
    updateInAppSubscription();
    handleGetSubscriptions();
  };
  function handleAppStateChange(nextAppState) {
    if (
      appState.current.match(/active|background/) &&
      nextAppState === 'active' &&
      !loading
    ) {
      updateListing();
    }
    appState.current = nextAppState;
  }

  /**
   * Name: useEffect
   * Desc: useEffect to call listing api
   */
  useEffect(() => {
    purchaseUpdatedListener(
      async (purchase: SubscriptionPurchase | ProductPurchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            try {
              await finishTransaction({purchase, isConsumable: false});
            } catch (ackErr) {
              console.warn('RNIap ackErr', ackErr);
            }
          } catch (ackErr) {
            console.warn('purchaseErr', ackErr);
          }
        }
      },
    );
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    const focusSubscription = navigation?.addListener('focus', () => {
      if (!loading) {
        updateListing();
      }
    });
    return () => {
      if (focusSubscription && focusSubscription.remove) {
        focusSubscription.remove();
      }
      if (subscription && subscription.remove) {
        subscription.remove();
      }
    };
  }, []);

  /**
   * Name: handleGetSubscriptions
   * Desc: Function to get the subscription package lists
   */
  const handleGetSubscriptions = async () => {
    try {
      await initConnection();
      const planIds = Platform.select({
        ios: subscriptionSKU.ios || [],
        android: subscriptionSKU.android || [],
      }) as [];
      const list = await getSubscriptions({skus: planIds});
      if (list && list.length) {
        setPlanList(list);
      }
    } catch (error) {
      console.warn({message: 'handleGetSubscriptions', error});
    }
  };

  /**
   * Name: useEffect
   * Desc: useEffect to toggle monthly and annually
   */
  useEffect(() => {
    if (listingData && listingData?.plans) {
      filterListingData();
    }
  }, [isMonthly]);

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
        filterListingData();
        setSubscribedPlan(listingData.userInfo);
        setLoading(false);
      }
    }
    if (isListingError) {
      showServerError(listingError, navigation);
      // setLoading(false);
    }
  }, [isListingLoading]);

  /**
   * Name: toggleSwitch
   * Desc: Function to update the toggle status
   */
  const toggleSwitch = () => setIsMonthly(previousState => !previousState);

  const getLatestSubscription = (purchases: Purchase[]) => {
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
   * Name: updateInAppSubscription
   * Desc: updateInAppSubscription for subscription updating current subscription.
   */
  const updateInAppSubscription = async () => {
    try {
      let purchases: any[] = [];
      purchases = await getAvailablePurchases();
      if (purchases?.length > 0) {
        if (isIOS()) {
          const lastReceipt = getLatestSubscription(purchases);
          const paymentParams = {
            platform: 'ios',
            data: lastReceipt,
          };
          setLoading(true);
          updateIOSSubscription(paymentParams);
        } else {
          const receipt = purchases[0];
          const paymentParams = {
            platform: 'android',
            purchaseToken: receipt.purchaseToken,
          };
          setLoading(true);
          updateSubscription(paymentParams);
        }
      } else {
        setLoading(true);
        getSubscriptionListing('');
      }
    } catch (error) {}
  };
  /**
   * Name: filterListingData
   * Desc: Function to filter listing data based on subscription status
   */
  const filterListingData = () => {
    if (listingData) {
      setSubscriptionList(
        isMonthly ? listingData.plans.monthly : listingData.plans.annually,
      );
    }
    if (listingData?.userInfo?.planStatus === PLAN_STATUS.notPurchased) {
      if (listingData) {
        setSubscriptionList(
          isMonthly ? listingData.plans.monthly : listingData.plans.annually,
        );
      }
    } else if (
      listingData?.userInfo?.planStatus === PLAN_STATUS.expired ||
      listingData?.userInfo?.planStatus === PLAN_STATUS.cancelled ||
      isFamilyMember()
    ) {
      if (listingData) {
        if (isMonthly) {
          const filteredList = listingData.plans.monthly?.filter(item => {
            return (
              item?.android_sku !== subscriptionSKU.android[0] &&
              item?.ios_sku !== subscriptionSKU.ios[0]
            );
          });
          setSubscriptionList(filteredList);
        } else {
          const filteredList = listingData.plans.annually?.filter(item => {
            return (
              item?.android_sku !== subscriptionSKU.android[3] &&
              item?.ios_sku !== subscriptionSKU.ios[3]
            );
          });
          setSubscriptionList(filteredList);
        }
      }
    }
  };

  /**
   * Name: clearReduxStore
   * Desc: Function to clear redux store on logout
   */
  const clearReduxStore = () => {
    const userDetails = {
      id: 0,
      profile_photo_url: '',
      cover_image: '',
      social_type: '',
    };
    dispatch(setUserData(userDetails));
    dispatch(setSubscriptionStatus(''));
    dispatch(setFamilyPlanStatus(''));
    dispatch(setFamilyAdminStatus(false));
    dispatch(setMaxUsers(0));
  };

  /**
   * Name: navigateBack
   * Desc: Function to navigate back
   */
  const navigateBack = () => {
    clearStorage();
    clearReduxStore();
    navigation?.reset({
      index: 0,
      routes: [
        {
          name: NAV_LOGIN,
        },
      ],
    });
  };
  /***
   * Name: isFamilyMember check family member
   */
  const isFamilyMember = () => {
    const isFamilyAdmin = listingData?.userInfo?.isFamilyPlanAdmin
      ? listingData?.userInfo?.isFamilyPlanAdmin
      : false;
    const familyPlanStatus = listingData?.userInfo?.familyPlanStatus
      ? listingData?.userInfo?.familyPlanStatus
      : '0';
    return !isFamilyAdmin && familyPlanStatus !== '0';
  };
  /***
   * Name: manageSubscription
   * Desc: Function to purchase the subscription
   */
  const manageBuySubscription = (itemPurchase: any) => {
    if (isFamilyMember()) {
      Alert.alert(strings.subscriptionConfirm, strings.willYouBeAFamilyMember, [
        {
          text: strings.cancel,
          onPress: () => setLoading(false),
          style: 'cancel',
        },
        {
          text: strings.ok,
          onPress: () => {
            handleBuySubscription(itemPurchase);
          },
        },
      ]);
    } else {
      handleBuySubscription(itemPurchase);
    }
  };
  /**
   * Name: handleBuySubscription
   * Desc: Function to purchase the subscription
   */
  const handleBuySubscription = async data => {
    try {
      setCreateSubscriptionLoading(true);
      const result = await initConnection();
      if (result) {
        const skuValue = isIOS() ? data?.ios_sku : data?.android_sku;
        const filteredList = planList.filter(item => {
          if (item?.productId === skuValue) {
            return item;
          }
        });
        const offerToken =
          Platform.OS === 'android'
            ? filteredList[0]?.subscriptionOfferDetails[0]?.offerToken
            : null;
        try {
          const receipt: any = await requestSubscription({
            sku: skuValue,
            ...(offerToken && {
              subscriptionOffers: [{sku: skuValue, offerToken}],
            }),
          });
          if (receipt !== null) {
            let params: any = {};
            if (Platform.OS === 'android') {
              params = {
                platform: Platform.OS,
                data: receipt[0].transactionReceipt,
                orderId: receipt[0].transactionId,
                packageName: receipt[0].packageNameAndroid,
                purchaseToken: receipt[0].purchaseToken,
                productId: receipt[0].productId,
                transactionId: receipt[0].transactionId,
              };
            } else {
              params = {
                platform: Platform.OS,
                data: receipt.transactionReceipt,
                orderId: receipt.transactionId,
                packageName: '',
                purchaseToken: '',
                productId: receipt.productId,
                transactionId: receipt.transactionId,
              };
            }
            createSubscription(params);
          }
        } catch (error) {
          setCreateSubscriptionLoading(false);
          if (error instanceof PurchaseError) {
            console.warn({message: `[${error.code}]: ${error.message}`, error});
          } else {
            console.warn({message: 'handleBuySubscription', error});
          }
        }
      }
    } catch (err) {
      setCreateSubscriptionLoading(false);
    }
  };

  /**
   * Name: cancelAppleSubscription
   * Desc: Function to cancel the subscription from apple
   */
  const cancelAppleSubscription = async () => {
    Linking.openURL(APPLE_IN_APP_SUBSCRIPTION_URL);
  };

  /**
   * Name: cancelAndroidInAppSubscription
   * Desc: Function to cancel the subscription from play store
   * @param {string} purchaseId - Purchase ID
   */
  const cancelAndroidInAppSubscription = async purchaseId => {
    Linking.openURL(ANDROID_IN_APP_SUBSCRIPTION_URL + purchaseId);
  };

  /**
   * Name: cancelSubscriptionPlan
   * Desc: Function to start cancel subscription process
   */
  const cancelSubscriptionPlan = async () => {
    const androidSku = listingData?.userInfo?.androidSku
      ? listingData?.userInfo?.androidSku
      : '';
    const iosSku = listingData?.userInfo?.iosSku
      ? listingData?.userInfo?.iosSku
      : '';
    const subscribedFrom = listingData?.userInfo?.platform
      ? listingData?.userInfo?.platform
      : '';

    if (androidSku !== '' || iosSku !== '') {
      if (isIOS() && subscribedFrom === SUBSCRIBED_FROM.appStore) {
        await cancelAppleSubscription();
      } else if (!isIOS() && subscribedFrom === SUBSCRIBED_FROM.playStore) {
        await cancelAndroidInAppSubscription(androidSku);
      } else if (
        isIOS() &&
        subscribedFrom !== SUBSCRIBED_FROM.appStore &&
        subscribedFrom !== SUBSCRIBED_FROM.web
      ) {
        showAlert('', strings.fromAndroid, strings.ok);
      } else if (
        !isIOS() &&
        subscribedFrom !== SUBSCRIBED_FROM.playStore &&
        subscribedFrom !== SUBSCRIBED_FROM.web
      ) {
        showAlert('', strings.fromApple, strings.ok);
      } else if (subscribedFrom === SUBSCRIBED_FROM.web) {
        showAlert('', strings.fromWeb, strings.ok);
      }
    }
  };

  return (
    <ScreenWrapper>
      {!fromSideMenu && (
        <Header title={subscriptionsText} onPressLeft={() => navigateBack()} />
      )}
      {isCreateSubscriptionInProgress || loading ? (
        <CustomLoader />
      ) : (
        <ScrollView>
          <React.Fragment>
            {(isSubscriptionActive || isSubscriptionCancelled) && (
              <React.Fragment>
                <UpperText>{activeSubscription}</UpperText>
                <SubscribedView
                  item={subscribedPlan}
                  showLoader={loading}
                  callCancelProcess={cancelSubscriptionPlan}
                  isCancelled={isSubscriptionCancelled}
                  isFamilyAdmin={
                    listingData?.userInfo?.isFamilyPlanAdmin || false
                  }
                  familyPlanStatus={
                    listingData?.userInfo?.familyPlanStatus || ''
                  }
                />
              </React.Fragment>
            )}
            {(isSubscriptionExpired ||
              isSubscriptionNotPurchased ||
              isSubscriptionCancelled) &&
              !isListingLoading && (
                <React.Fragment>
                  <UpperText>{selectPlan}</UpperText>
                  <RowCenterView>
                    <SwitchText>{billMonthly}</SwitchText>
                    <Switch
                      trackColor={{
                        false: colors.greenColor,
                        true: colors.greenColor,
                      }}
                      thumbColor={colors.white}
                      ios_backgroundColor={colors.greenColor}
                      onValueChange={toggleSwitch}
                      value={!isMonthly}
                    />
                    <SwitchText>{billAnnually}</SwitchText>
                  </RowCenterView>
                </React.Fragment>
              )}
            {(isSubscriptionExpired ||
              isSubscriptionNotPurchased ||
              isSubscriptionCancelled ||
              isFamilyMember()) && (
              <ListContainer>
                {subscriptionList.map((item, index) => {
                  return (
                    <SubscriptionRow
                      key={`Plans_${index}`}
                      item={item}
                      onPurchase={(itemPurchase: any) => {
                        setSelectedIndex(index);
                        manageBuySubscription(itemPurchase);
                      }}
                      showLoader={
                        loading && selectedIndex === index ? true : false
                      }
                    />
                  );
                })}
              </ListContainer>
            )}
          </React.Fragment>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};
export default Subscription;
