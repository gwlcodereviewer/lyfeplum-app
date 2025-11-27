/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {ScreenWrapper, ScrollViewContainer} from '../../../../styles/style';
import {rpx} from '../../../../styles/styleUtils';
import PrimaryButton from '../../../components/button';
import CheckBoxView from '../../../components/checkBoxView';
import CustomLoader from '../../../components/screenLoader';
import {FINAL_WISH_SLAB} from '../../../constants/utils';
import {strings} from '../../../localization';
import {NAV_STEP_THREE} from '../../../navigation/constants';
import {
  useFinalWishCheckListMutation,
  useGetFinalWishesMutation,
  useStoreFinalWishesInfoMutation,
  useUpdateWishCheckListMutation,
} from '../../../redux/api/finalWishesApi';
import {INavigation} from '../../../types/utils';
import {getFinalWishBadge, showServerError} from '../../../utils';
import {
  BadgeContainer,
  BadgeImage,
  ButtonWrapper,
  CheckboxContainer,
  ContentContainer,
  ContentText,
  EncouragingTxt,
  HeaderContainer,
  HeaderText,
  InputContainer,
  LetsGetIdeaTxt,
  PointsContainer,
  PointsText,
  SelectAnythingTxt,
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
}

/**
 * Name: Final Wishes Two screen
 * Desc: Screen to render final wishes step two UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const FinalWishesTwo: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const {getAnIdea, finalWishes, selectAnything, sections, saveContinue} =
    strings;

  const [wishesCheckList, setWishesCheckList] = useState([]);
  const [wishId, setWishId] = useState(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [
    storeFinalWishesInfo,
    {
      isLoading: isStoreFinalWishesLoading,
      error: storeFinalWishesError,
      isSuccess: isStoreFinalWishesSuccess,
      data: storeFinalWishesData,
    },
  ] = useStoreFinalWishesInfoMutation();
  const [
    finalWishCheckList,
    {
      isLoading: finalCheckListLoading,
      isError: isFinalCheckListError,
      error: finalCheckListError,
      isSuccess: finalCheckListSuccess,
      data: finalCheckListData,
    },
  ] = useFinalWishCheckListMutation();

  const [
    updateWishCheckList,
    {
      isLoading: updateWishCheckListLoading,
      isError: isUpdateWishCheckListError,
      error: updateWishCheckListError,
      isSuccess: updateWishCheckListSuccess,
      data: updateWishCheckListData,
    },
  ] = useUpdateWishCheckListMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to handle final wishes store info api.
   */
  useEffect(() => {
    if (isStoreFinalWishesSuccess && storeFinalWishesData?.status) {
      setRefreshing(true);
      finalWishCheckList('');
    }
  }, [isStoreFinalWishesLoading]);

  const [
    getFinalWishes,
    {
      isLoading: getFinalWishesLoading,
      isError: isFinalWishesError,
      error: finalWishesError,
      isSuccess: finalWishesSuccess,
      data: finalFishesData,
    },
  ] = useGetFinalWishesMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to call  api on navigation
   */
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      getFinalWishes('');
    });
    return unsubscribe;
  }, [navigation]);

  /**
   * Name: useEffect
   * Desc: useEffect for get final wishes API response.
   */
  useEffect(() => {
    if (finalWishesSuccess) {
      if (finalFishesData?.status) {
        myGlobal.wishesPoints = finalFishesData?.final_wish_points;
      }
    }
    if (isFinalWishesError) {
      showServerError(finalWishesError, navigation);
    }
  }, [getFinalWishesLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to call wishes check list api.
   */
  useEffect(() => {
    setRefreshing(true);
    finalWishCheckList('');
  }, []);

  /**
   * Name: checkButtonStatus
   * Desc: Function to update the button status
   */
  const checkButtonStatus = (checklists: any) => {
    let isChecked = false;
    checklists.filter((element: any) => {
      if (element?.is_user_checklist === 1) {
        isChecked = true;
      }
    });
    if (isChecked) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  /**
   * Name: useEffect
   * Desc: useEffect for get final wishes API response.
   */
  useEffect(() => {
    if (finalCheckListSuccess) {
      setRefreshing(false);
      if (finalCheckListData?.status) {
        setWishesCheckList(finalCheckListData?.checklists);
        checkButtonStatus(finalCheckListData?.checklists);
        setWishId(finalCheckListData?.final_wish_id);
      }
    }
    if (isFinalCheckListError) {
      if (finalCheckListError && !finalCheckListError?.data?.status) {
        setRefreshing(true);
        storeFinalWishesInfo('');
      } else {
        showServerError(finalCheckListError, navigation);
      }
    }
  }, [finalCheckListLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for update final wishes API response.
   */
  useEffect(() => {
    if (updateWishCheckListSuccess) {
      if (updateWishCheckListData?.status) {
        navigation?.navigate(NAV_STEP_THREE);
      }
    }
    if (isUpdateWishCheckListError) {
      showServerError(updateWishCheckListError, navigation);
    }
  }, [updateWishCheckListLoading]);

  /**
   * Name: updateCheckList
   * Desc: Function to update check list.
   * @param item - The wish data.
   * @param index - The selected index.
   */
  const updateCheckList = (item: any, index: number) => {
    let checkList: any = [...wishesCheckList];
    let data: any = checkList[index];
    data = {...data, is_user_checklist: item.is_user_checklist === 0 ? 1 : 0};
    checkList[index] = data;
    setWishesCheckList(checkList);
    checkButtonStatus(checkList);
  };

  /**
   * Name: renderContent
   * Desc: Function to render content
   */
  const renderContent = () => {
    return wishesCheckList.map((item: any, index) => {
      return (
        <ContentContainer key={`wish_${index}`}>
          <TouchableContainer onPress={() => updateCheckList(item, index)}>
            <CheckboxContainer>
              <CheckBoxView
                isSelected={item?.is_user_checklist}
                onPress={() => updateCheckList(item, index)}
              />
            </CheckboxContainer>
            <TextContainer>
              <ContentText>{item?.title}</ContentText>
            </TextContainer>
          </TouchableContainer>
        </ContentContainer>
      );
    });
  };

  /**
   * Name: saveAndContinue
   * Desc: Function to save wishes and continue to another step.
   */
  const saveAndContinue = () => {
    const selectedCheckList: any = [];
    wishesCheckList.map((item: any) => {
      if (item.is_user_checklist === 1) {
        selectedCheckList.push(item.id);
      }
    });

    const requestData = {
      final_wish_id: wishId,
      document_checklists: selectedCheckList,
    };

    updateWishCheckList(requestData);
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
            <ScrollViewContainer bounces={false}>
              <LetsGetIdeaTxt>{getAnIdea}</LetsGetIdeaTxt>
              <SelectAnythingTxt>{selectAnything}</SelectAnythingTxt>
              {renderContent()}
              <EncouragingTxt>
                {finalCheckListData?.custom_message
                  ? finalCheckListData?.custom_message
                  : ''}
              </EncouragingTxt>
            </ScrollViewContainer>
          </KeyboardAvoidingView>
          <InputContainer>
            <ButtonWrapper>
              <PrimaryButton
                title={saveContinue}
                onPress={saveAndContinue}
                buttonStyle={{
                  paddingHorizontal: rpx(30),
                  height: rpx(45),
                  width: rpx(250),
                }}
                disableBtnStyle={{
                  paddingHorizontal: rpx(30),
                  height: rpx(45),
                }}
                showLoader={updateWishCheckListLoading}
                isDisable={isButtonDisabled}
              />
            </ButtonWrapper>
          </InputContainer>
        </React.Fragment>
      )}
    </ScreenWrapper>
  );
};

export default FinalWishesTwo;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
});
