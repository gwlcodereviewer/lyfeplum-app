import React from 'react';

import images from '../../assets/images';
import LogoIcon from '../../assets/images/svgImages/logoIcon';
import {
  BackButton,
  BackIcon,
  Container,
  HeaderBody,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
  MenuIcon,
  ToggleTouchable,
  View,
} from './styled';

const imageName =
  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png';

interface Props {
  title: string;
  showLeftIcon?: boolean;
  onPressLeft?: () => void;
  navigation?: any;
  showMenuIcon?: boolean;
  onPressRight?: () => void;
  rightIcon?: string;
  rightIconColor?: string;
}
const Header: React.FC<Props> = (props: Props) => {
  const {
    onPressLeft,
    navigation,
    showMenuIcon,
    onPressRight,
    showLeftIcon = true,
  } = props;

  const toggleDrawer = () => {
    // Props to open/close the drawer
    navigation.toggleDrawer();
  };

  return (
    <Container>
      <HeaderBody>
        <HeaderLeft>
          {onPressLeft ? (
            <BackButton onPress={() => onPressLeft()} testID="left_icon">
              {showLeftIcon ? <BackIcon source={images.backIcon} /> : null}
            </BackButton>
          ) : null}
          {showMenuIcon && (
            <View>
              <ToggleTouchable onPress={toggleDrawer}>
                <MenuIcon source={{uri: imageName}} />
              </ToggleTouchable>
            </View>
          )}
        </HeaderLeft>
        <HeaderCenter>
          <LogoIcon />
        </HeaderCenter>
        <HeaderRight>
          {onPressRight ? (
            <BackButton onPress={() => onPressRight()} testID="right_icon">
              <BackIcon source={images.backIcon} />
            </BackButton>
          ) : null}
        </HeaderRight>
      </HeaderBody>
    </Container>
  );
};

export default Header;
