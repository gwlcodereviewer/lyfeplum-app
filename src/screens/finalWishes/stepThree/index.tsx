/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, RefreshControl, StyleSheet} from 'react-native';
import colors from '../../../../styles/colors';
import {ScreenWrapper, ScrollViewContainer} from '../../../../styles/style';
import {rpx} from '../../../../styles/styleUtils';
import EditIcon from '../../../assets/images/svgImages/editIcon';
import PrimaryButton from '../../../components/button';
import CustomLoader from '../../../components/screenLoader';
import {FINAL_WISH_SLAB} from '../../../constants/utils';
import {strings} from '../../../localization';
import {
  NAV_FINAL_WISHES_TWO,
  NAV_WISHES_DETAILS,
} from '../../../navigation/constants';
import {useGetCheckListMutation} from '../../../redux/api/finalWishesApi';
import {INavigation} from '../../../types/utils';
import {getFinalWishBadge, showServerError} from '../../../utils';
import {
  BadgeContainer,
  BadgeImage,
  ButtonWrapper,
  CheckboxContainer,
  ContentContainer,
  ContentText,
  HeaderContainer,
  HeaderText,
  InputContainer,
  LetsStartTxt,
  PointsContainer,
  PointsText,
  TextContainer,
  TouchableContainer,
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
 * Name: StepThree
 * Desc: Screen to render Step three UI
 * @param {any} navigation - navigation data
 * @param {any} route - route data
 * @returns JSX element
 */
const StepThree: React.FC<Props> = (props: Props) => {
  const {stepThreeTitle, finalWishes, previous, sections} = strings;
  const {navigation, route} = props;
  const [checkList, setCheckList] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [
    getCheckList,
    {
      isLoading: isCheckListLoading,
      isError: isCheckListError,
      error: checkListError,
      isSuccess: isCheckListSuccess,
      data: checkListData,
    },
  ] = useGetCheckListMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to call check list api on navigation
   */
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      if (myGlobal.item) {
        setRefreshing(true);
        getCheckList('');
        myGlobal.item = '';
      }
    });
    return unsubscribe;
  }, [route]);

  /**
   * Name: useEffect
   * Desc: useEffect to call check list api
   */
  useEffect(() => {
    setRefreshing(true);
    getCheckList('');
  }, []);

  /**
   * Name: useEffect
   * Desc: useEffect for get final wishes API response.
   */
  useEffect(() => {
    if (isCheckListSuccess) {
      if (checkListData?.status) {
        setCheckList(checkListData?.selected_checklists);
        setRefreshing(false);
      }
    }
    if (isCheckListError) {
      setRefreshing(false);
      showServerError(checkListError, navigation);
    }
  }, [isCheckListLoading]);

  /**
   * Name: onPreviousClick
   * Desc: Function to go to previous step
   */
  const onPreviousClick = () => {
    navigation?.navigate(NAV_FINAL_WISHES_TWO);
  };

  /**
   * Name: renderContent
   * Desc: Function to render content
   */
  const RenderContent = () => {
    return (
      <>
        {checkList.map((item: any, index) => {
          return (
            <ContentContainer key={'list_' + index}>
              <TouchableContainer
                onPress={() => {
                  myGlobal.item = item;
                  navigation?.navigate(NAV_WISHES_DETAILS);
                }}>
                <CheckboxContainer>
                  <EditIcon width={rpx(20)} height={rpx(20)} />
                </CheckboxContainer>
                <TextContainer>
                  <ContentText>{item?.title}</ContentText>
                </TextContainer>
              </TouchableContainer>
            </ContentContainer>
          );
        })}
      </>
    );
  };

  return (
    <ScreenWrapper>
      <HeaderContainer>
        <HeaderText>{finalWishes}</HeaderText>
      </HeaderContainer>
      {refreshing ? (
        <CustomLoader />
      ) : (
        <React.Fragment>
          <PointsContainer>
            <PointsText>{`${
              myGlobal.wishesPoints ? myGlobal.wishesPoints : 0
            } | ${sections}`}</PointsText>
            {myGlobal.wishesPoints >= FINAL_WISH_SLAB.slab_50 && (
              <BadgeContainer>
                <BadgeImage source={getFinalWishBadge(myGlobal.wishesPoints)} />
              </BadgeContainer>
            )}
          </PointsContainer>
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior="padding"
            enabled
            keyboardVerticalOffset={100}>
            <ScrollViewContainer
              refreshControl={
                <RefreshControl
                  refreshing={isCheckListLoading}
                  onRefresh={() => {
                    getCheckList('');
                    myGlobal.item = '';
                  }}
                />
              }>
              <LetsStartTxt>{stepThreeTitle}</LetsStartTxt>
              <RenderContent />
            </ScrollViewContainer>
          </KeyboardAvoidingView>
          <InputContainer>
            <ButtonWrapper>
              <PrimaryButton
                title={previous}
                onPress={onPreviousClick}
                buttonStyle={{
                  height: rpx(45),
                  paddingHorizontal: rpx(30),
                  backgroundColor: colors.greenTxt,
                }}
              />
            </ButtonWrapper>
          </InputContainer>
        </React.Fragment>
      )}
    </ScreenWrapper>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
});
