/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {LOGIN_TYPES} from '../../constants/utils';
import {strings} from '../../localization';
import {useConnectFacebookMutation} from '../../redux/api/fbFeedList';
import {setUserData} from '../../redux/api/userState';
import {RootState} from '../../redux/store';
import {loginWithFacebook} from '../../utils';
import {FacebookConnectButton, FbLoginText} from './styled';

/**
 * Props type declaration
 */
interface ButtonProps {
  loginSuccess: () => void;
}

const FbConnectButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();

  /**
   * Name: connectFacebook
   * Desc: Social Login Mutation call
   */
  const [
    connectFacebook,
    {isLoading: isSocialLoading, isSuccess: socialSuccess},
  ] = useConnectFacebookMutation();
  /**
   * Name: useEffect
   * Desc: to handle fb connect response
   */
  useEffect(() => {
    if (socialSuccess) {
      const userDetails = {
        id: userData?.id || 0,
        profile_photo_url: userData?.profile_photo_url || '',
        cover_image: userData?.cover_image || '',
        social_type: 'facebook',
      };
      dispatch(setUserData(userDetails));
      if (props.loginSuccess) {
        props.loginSuccess();
      }
    }
  }, [isSocialLoading]);
  /**
   * Name: onFacebookConnect
   * Desc: Function to login with Facebook
   */
  const onFacebookConnect = () => {
    loginWithFacebook().then((res: any) => {
      if (res && !res.errorData) {
        const reqParams = {
          first_name: res?.userData?.first_name,
          last_name: res?.userData?.last_name,
          email: res.userData.email || '',
          unique_key: res.userData.id,
          token: res.accessToken,
          // profile_photo: res.userData.picture.data.url,
          type: LOGIN_TYPES.fb,
        };
        connectFacebook(reqParams);
      }
    });
  };
  return (
    <FacebookConnectButton onPress={() => onFacebookConnect()}>
      {isSocialLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <>
          <Icon name="facebook" color={colors.white} size={25} />
          <FbLoginText>{strings.facebookConnect}</FbLoginText>
        </>
      )}
    </FacebookConnectButton>
  );
};

export default FbConnectButton;
