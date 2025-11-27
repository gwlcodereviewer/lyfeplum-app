/* eslint-disable react-hooks/exhaustive-deps */
import {default as React, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {ScreenWrapper} from '../../../styles/style';
import {rpx} from '../../../styles/styleUtils';
import images from '../../assets/images';
import AppStatusBar from '../../components/appStatusBar';
import PrimaryButton from '../../components/button';
import CustomLoader from '../../components/screenLoader';
import {TOAST_MESSAGE_TYPE, USER_STATUS} from '../../constants/utils';
import {strings} from '../../localization';
import {
  useAddFamilyUserMutation,
  useGetFamilyUsersMutation,
} from '../../redux/api/subscriptionApi';
import {RootState} from '../../redux/store';
import {INavigation} from '../../types/utils';
import {showServerError, showToastMessage} from '../../utils';
import AddUser from './addUser';
import {
  BadgeLayout,
  BadgeText,
  DetailContainer,
  DetailView,
  DivContainer,
  Divider,
  HeaderCard,
  LogoContainer,
  LogoImage,
  ProfileImage,
  SingleUserView,
  SubTitleText,
  TitleText,
  TitleView,
  UserCard,
  UserDetailView,
  UserEmail,
  UserName,
  UsersContainer,
  Wrapper,
} from './styled';

/**
 * Name: UserProps
 * Desc: Props type declaration
 */
interface UserProps {
  navigation?: INavigation;
}

/**
 * Name: ManageUsersScreen
 * desc: Screen to render manage users screen UI.
 * @param {INavigation} navigation - navigation data
 */
const ManageUsersScreen: React.FC<UserProps> = (props: UserProps) => {
  const {navigation} = props;
  const maxUsers = useSelector(
    (state: RootState) => state.subscription.maxUsersAllowed,
  );
  const {addUsers, addUpto, users, addedUsers} = strings;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAddDisabled, setIsAddDisabled] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<any>([]);

  const [
    getFamilyUsers,
    {
      isLoading: isFamilyUsersLoading,
      isError: isFamilyUsersError,
      error: familyUsersError,
      isSuccess: isFamilyUsersSuccess,
      data: familyUsersData,
    },
  ] = useGetFamilyUsersMutation();

  const [
    addFamilyUser,
    {
      isLoading: isAddUserLoading,
      isError: isAddUserError,
      error: addUserError,
      isSuccess: isAddUserSuccess,
      data: addUserData,
    },
  ] = useAddFamilyUserMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to call listing api on navigation
   */
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      setRefreshing(true);
      setIsAddDisabled(false);
      getFamilyUsers('');
    });
    return unsubscribe;
  }, [navigation]);

  /**
   * Name: useEffect
   * Desc: useEffect for get family users API response.
   */
  useEffect(() => {
    if (isFamilyUsersSuccess) {
      if (familyUsersData?.status) {
        if (familyUsersData.invited_users.length === maxUsers) {
          setIsAddDisabled(true);
        }
        setUsersList(familyUsersData.invited_users);
        setRefreshing(false);
      }
    }
    if (isFamilyUsersError) {
      setRefreshing(false);
      showServerError(familyUsersError, navigation);
    }
  }, [isFamilyUsersLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect for add family user API response.
   */
  useEffect(() => {
    if (isAddUserSuccess) {
      if (addUserData?.status) {
        setIsModalVisible(false);
        setRefreshing(true);
        getFamilyUsers('');
        showToastMessage(
          strings.lyfePlum,
          addUserData?.message,
          TOAST_MESSAGE_TYPE.success,
        );
      } else {
        setIsModalVisible(false);
        showToastMessage(
          strings.lyfePlum,
          addUserData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isAddUserError) {
      showServerError(addUserError, navigation);
    }
  }, [isAddUserLoading]);

  /**
   * Name: addFamilyUserInPlan
   * desc: Function to add family user
   * @param {string} email - email of user
   */
  const addFamilyUserInPlan = (email: string) => {
    const requestData = {
      email,
    };
    addFamilyUser(requestData);
  };

  /**
   * Name: renderUsersList
   * desc: Function to render users list
   * @returns JSX element
   */
  const renderUsersList = () => {
    return usersList.map((item, index) => {
      return (
        <UserCard style={styles.shadowProp} key={`users_${index}`}>
          <SingleUserView>
            <ProfileImage
              source={
                item?.profileUri
                  ? {
                      uri: item?.profileUri,
                    }
                  : images.defaultAvatar
              }
            />
            <UserDetailView>
              <UserName>{item?.name ? item?.name : strings.naText}</UserName>
              <UserEmail>{item?.email}</UserEmail>
            </UserDetailView>
            <BadgeLayout
              borderColor={
                item?.status === USER_STATUS.active
                  ? colors.primaryButton
                  : colors.amaranth
              }>
              <BadgeText
                color={
                  item?.status === USER_STATUS.active
                    ? colors.primaryButton
                    : colors.amaranth
                }>
                {item?.status === USER_STATUS.active
                  ? strings.active
                  : strings.pending}
              </BadgeText>
            </BadgeLayout>
          </SingleUserView>
        </UserCard>
      );
    });
  };

  return (
    <ScreenWrapper>
      <AppStatusBar />
      <ScrollView>
        <Wrapper>
          <HeaderCard style={styles.shadowProp}>
            <DetailView>
              <TitleText>{addUsers}</TitleText>
              <SubTitleText>{`${addUpto} ${maxUsers} ${users}`}</SubTitleText>
            </DetailView>
            <PrimaryButton
              title={strings.add}
              onPress={() => setIsModalVisible(true)}
              buttonStyle={{
                width: rpx(100),
                height: rpx(40),
              }}
              disableBtnStyle={{
                width: rpx(100),
                height: rpx(40),
              }}
              isDisable={isAddDisabled}
            />
          </HeaderCard>
          <DivContainer>
            <Divider />
            <LogoContainer>
              <LogoImage source={images.logo} />
            </LogoContainer>
          </DivContainer>
          <DetailContainer>
            <TitleView>
              <TitleText>{`${addedUsers} (${usersList.length}/${maxUsers})`}</TitleText>
            </TitleView>
            {refreshing ? (
              <CustomLoader />
            ) : (
              <React.Fragment>
                {usersList.length > 0 && (
                  <UsersContainer>{renderUsersList()}</UsersContainer>
                )}
              </React.Fragment>
            )}
          </DetailContainer>
        </Wrapper>
      </ScrollView>
      <AddUser
        visible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
        onSubmit={addFamilyUserInPlan}
        isLoading={isAddUserLoading}
      />
    </ScreenWrapper>
  );
};

export default ManageUsersScreen;

const styles = StyleSheet.create({
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
