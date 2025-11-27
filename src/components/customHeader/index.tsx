import React, {useEffect, useRef, useState} from 'react';

import {Animated, Easing, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import MenuImage from '../../assets/images/pngImages/hamburger.png';
import LogoIcon from '../../assets/images/svgImages/logoIcon';
import {RootState} from '../../redux/store';
import MessageModal from '../MessageModal';
import {
  Container,
  HeaderBody,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
  MenuIcon,
  ToggleTouchable,
  UploadButton,
} from './styled';

/**
 * Name: Props
 * Desc: Interface type for props
 */
interface Props {
  navigation?: any;
}

/**
 * Name: CustomHeader
 * Desc: Component to render custom header
 * @param {any} navigation - navigation data
 */
const CustomHeader: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const translateYValue = useRef(new Animated.Value(0)).current;
  const uploadData = useSelector((state: RootState) => state.upload.uploadData);

  /**
   * Name: useEffect
   * Desc: useEffect to animate the upload icon
   */
  useEffect(() => {
    const translateYAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateYValue, {
          toValue: -10,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateYValue, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );
    translateYAnimation.start();
    return () => {
      translateYAnimation.stop();
    };
  }, [translateYValue]);

  /**
   * Name: toggleDrawer
   * Desc: Function to open side drawer
   */
  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Container>
      <SafeAreaView>
        <HeaderBody>
          <HeaderLeft>
            <ToggleTouchable onPress={toggleDrawer}>
              <MenuIcon source={MenuImage} />
            </ToggleTouchable>
          </HeaderLeft>
          <HeaderCenter>
            <LogoIcon width={200} />
          </HeaderCenter>
          <HeaderRight>
            {uploadData && uploadData.length > 0 && (
              <UploadButton onPress={() => setShowUploadModal(true)}>
                <Animated.View
                  style={{
                    transform: [{translateY: translateYValue}],
                  }}>
                  <MaterialCommunityIcons
                    name="arrow-up-thick"
                    size={25}
                    color={colors.primaryButton}
                  />
                </Animated.View>
              </UploadButton>
            )}
          </HeaderRight>
        </HeaderBody>
      </SafeAreaView>
      <MessageModal
        visible={showUploadModal && uploadData && uploadData.length > 0}
        onClose={() => setShowUploadModal(false)}
      />
    </Container>
  );
};

export default CustomHeader;
