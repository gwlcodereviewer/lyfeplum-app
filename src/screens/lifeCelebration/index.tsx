/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, RefreshControl} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {ScreenWrapper} from '../../../styles/style';
import {rpx} from '../../../styles/styleUtils';
import PrimaryButton from '../../components/button';
import InputBox from '../../components/inputBox';
import CustomLoader from '../../components/screenLoader';
import {PLAN_STATUS, TOAST_MESSAGE_TYPE} from '../../constants/utils';
import {strings} from '../../localization';
import {
  useLifeCelebrationListApiMutation,
  useUpdateLifeCelebrationApiMutation,
} from '../../redux/api/lifeCelebrationApi';
import {RootState} from '../../redux/store';
import {INavigation} from '../../types/utils';
import {
  showServerError,
  showToastMessage,
  subscriptionAlert,
} from '../../utils';
import {
  ActionContainer,
  CountText,
  ItemListContainer,
  ItemListView,
  QuestionText,
  SaveButtonWrapper,
} from './styled';

let loadingID = 0;

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: INavigation;
}

/**
 * Name: Life Celebration screen
 * Desc: Screen to render life celebration UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const LifeCelebration: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const subscriptionStatus = useSelector(
    (state: RootState) => state.subscription.subscriptionStatus,
  );
  const isSubscriptionExpired =
    subscriptionStatus === PLAN_STATUS.expired ||
    subscriptionStatus === PLAN_STATUS.notPurchased
      ? true
      : false;
  const {white} = colors;
  const {previous, saveText, answerValidation, lyfePlum, next} = strings;
  const [lifeList, setLifeList] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const position = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  let slideAnim: Animated.CompositeAnimation;
  let fadeAnim: Animated.CompositeAnimation;

  const slideOutStyle = {
    transform: [{translateX: position}],
  };

  const [
    lifeCelebrationListApi,
    {
      isLoading: lifeCelebrationListLoading,
      isError: isLifeCelebrationListError,
      error: lifeCelebrationListError,
      isSuccess: lifeCelebrationListSuccess,
      data: lifeCelebrationListData,
    },
  ] = useLifeCelebrationListApiMutation();

  const [
    updateLifeCelebrationApi,
    {
      isLoading: updateLifeCelebrationListLoading,
      isError: isUpdateLifeCelebrationListError,
      error: updateLifeCelebrationListError,
      isSuccess: updateLifeCelebrationListSuccess,
      data: updateLifeCelebrationListData,
    },
  ] = useUpdateLifeCelebrationApiMutation();

  /**
   * Name: useEffect
   * Desc: use effect to call life celebration api.
   */
  useEffect(() => {
    setRefreshing(true);
    setActiveIndex(0);
    lifeCelebrationListApi('');
  }, []);

  /**
   * Name: useEffect
   * Desc: useEffect to call  api on navigation
   */
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      setRefreshing(true);
      setActiveIndex(0);
      lifeCelebrationListApi('');
    });
    return unsubscribe;
  }, [navigation]);

  /**
   * Name: useEffect
   * Desc: use effect to manage life celebration api response.
   */
  useEffect(() => {
    if (lifeCelebrationListSuccess) {
      setLifeList(lifeCelebrationListData?.life_celebration);
      setRefreshing(false);
    }
    if (isLifeCelebrationListError) {
      setRefreshing(false);
      showServerError(lifeCelebrationListError, navigation);
    }
  }, [lifeCelebrationListLoading]);

  /**
   * Name: useEffect
   * Desc: use effect to manage save life celebration answer response.
   */
  useEffect(() => {
    if (updateLifeCelebrationListSuccess) {
      if (updateLifeCelebrationListData?.status) {
        loadingID = -1;
        showToastMessage(
          lyfePlum,
          updateLifeCelebrationListData?.message,
          TOAST_MESSAGE_TYPE.success,
        );
        if (activeIndex !== lifeList.length - 1) {
          callNextAction();
        }
      } else {
        loadingID = -1;
        showToastMessage(
          lyfePlum,
          updateLifeCelebrationListData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }

    if (isUpdateLifeCelebrationListError) {
      loadingID = -1;
      showServerError(updateLifeCelebrationListError, navigation);
    }
  }, [updateLifeCelebrationListLoading]);

  /**
   * Name: updateLife
   * Desc: Function to update life celebration.
   */
  const updateLife = (text, index) => {
    const data = [...lifeList];
    let updateData = data[index];
    updateData = {...updateData, answer: text};
    data[index] = updateData;
    setLifeList(data);
  };

  /**
   * Name: callNextAction
   * Desc: Function to render next life celebration questions.
   */
  const callNextAction = () => {
    slideAnim = Animated.timing(position, {
      toValue: -500,
      duration: 700,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    slideAnim?.start(() => {
      fadeAnim?.reset();
      fadeIn?.setValue(0);
      setActiveIndex(activeIndex + 1);
      slideAnim?.reset();
      position?.setValue(0);
    });
  };

  /**
   * Name: useEffect
   * Desc: useEffect to start fade in animation
   */
  useEffect(() => {
    fadeAnim = Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
    fadeAnim?.start(() => {});
  }, [activeIndex]);

  /**
   * Name: callPreviousAction
   * Desc: Function to render previous life celebration questions.
   */
  const callPreviousAction = () => {
    slideAnim = Animated.timing(position, {
      toValue: 500,
      duration: 700,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    slideAnim.start(() => {
      fadeAnim?.reset();
      fadeIn?.setValue(0);
      setActiveIndex(activeIndex - 1);
      slideAnim?.reset();
      position?.setValue(0);
    });
  };

  /**
   * Name: generateQuestionView
   * Desc: Function to render life celebration questions.
   */
  const generateQuestionView = () => {
    if (lifeList.length) {
      return (
        <React.Fragment>
          <ActionContainer>
            <PrimaryButton
              title={previous}
              onPress={() => callPreviousAction()}
              buttonStyle={{
                height: rpx(35),
                width: rpx(120),
                backgroundColor: colors.greenTxt,
              }}
              disableBtnStyle={{height: rpx(35), width: rpx(120)}}
              isDisable={activeIndex === 0}
            />
            <CountText>{`${activeIndex + 1} / ${lifeList.length}`}</CountText>
            <PrimaryButton
              title={next}
              onPress={() => callNextAction()}
              buttonStyle={{height: rpx(35), width: rpx(120)}}
              disableBtnStyle={{height: rpx(35), width: rpx(120)}}
              isDisable={activeIndex === lifeList.length - 1}
            />
          </ActionContainer>
          <Animated.View style={[slideOutStyle, {opacity: fadeIn}]}>
            <ItemListContainer>
              <ItemListView>
                <QuestionText>{lifeList[activeIndex].question}</QuestionText>
                <InputBox
                  value={lifeList[activeIndex].answer}
                  onChangeText={(text: string) => updateLife(text, activeIndex)}
                  placeholder={answerValidation}
                  backgroundColor={white}
                  labelMargin={rpx(5)}
                  labelTextSize={rpx(14)}
                />
                <SaveButtonWrapper>
                  <PrimaryButton
                    title={saveText}
                    onPress={() => {
                      if (isSubscriptionExpired) {
                        subscriptionAlert(navigation);
                      } else {
                        if (lifeList[activeIndex]?.answer !== '') {
                          loadingID = lifeList[activeIndex]?.id;
                          const requestData = {
                            question_id: lifeList[activeIndex]?.id,
                            answer: lifeList[activeIndex]?.answer,
                          };
                          updateLifeCelebrationApi(requestData);
                        } else {
                          showToastMessage(
                            lyfePlum,
                            strings.enterAnswer,
                            TOAST_MESSAGE_TYPE.error,
                          );
                        }
                      }
                    }}
                    buttonStyle={{height: rpx(35), width: rpx(100)}}
                    showLoader={
                      loadingID === lifeList[activeIndex]?.id
                        ? updateLifeCelebrationListLoading
                        : false
                    }
                  />
                </SaveButtonWrapper>
              </ItemListView>
            </ItemListContainer>
          </Animated.View>
        </React.Fragment>
      );
    }
    return <React.Fragment />;
  };

  return (
    <ScreenWrapper>
      {refreshing ? (
        <CustomLoader />
      ) : (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraHeight={30}
          refreshControl={
            <RefreshControl
              refreshing={lifeCelebrationListLoading}
              onRefresh={() => {
                lifeCelebrationListApi('');
              }}
            />
          }>
          {generateQuestionView()}
        </KeyboardAwareScrollView>
      )}
    </ScreenWrapper>
  );
};

export default LifeCelebration;
