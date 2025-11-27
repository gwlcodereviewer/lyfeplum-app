import {default as React} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import ShareFile from 'react-native-share';
import BookImage from '../../assets/images/svgImages/bookImage';
import PointerImage from '../../assets/images/svgImages/pointerImage';
import TapImage from '../../assets/images/svgImages/tapImage';
import PrimaryButton from '../../components/button';
import {strings} from '../../localization';
import {INavigation} from '../../types/utils';
import {
  ComponentText,
  ComponentView,
  ImageContainer,
  ImageView,
  TitleContainer,
  TitleText,
  Wrapper,
} from './styled';

import {ScreenWrapper} from '../../../styles/style';
import AppStatusBar from '../../components/appStatusBar';
import {URL_PATHS} from '../../constants/utils';
import {NAV_HOME, NAV_MEDIA} from '../../navigation/constants';
import {isIOS} from '../../utils';

/**
 * Name: ShareProps
 * Desc: Props type declaration
 */
interface ShareProps {
  navigation?: INavigation;
}

const myGlobal: any = global;

/**
 * Name: Share Screen
 * desc: Screen to render Share screen UI.
 * @param navigation - property
 */
const Share: React.FC<ShareProps> = (props: ShareProps) => {
  const {navigation} = props;
  const options = {
    title: strings.lyfePlum,
    message: strings.shareText,
    url: isIOS() ? URL_PATHS.iosAppUrl : URL_PATHS.androidAppUrl,
  };
  /**
   * Name: onShare
   * Desc: Function to call on click on share app button
   */
  const onShare = async (myOptions = options) => {
    try {
      await ShareFile.open(myOptions);
    } catch (error: any) {
      console.warn(
        'src/screens/share/index.tsx - onShare -> error: ',
        error?.message,
      );
    }
  };

  return (
    <ScreenWrapper>
      <AppStatusBar />
      <Wrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleContainer>
            <TitleText>{strings.shareMyLife}</TitleText>
          </TitleContainer>
          <ComponentView>
            <ImageContainer>
              <ImageView>
                <BookImage />
              </ImageView>
            </ImageContainer>
            <ComponentText>{strings.createMemoryBook}</ComponentText>
            <PrimaryButton
              title={strings.startBook}
              onPress={() => {
                myGlobal.tab = strings.chapters;
                navigation?.reset({
                  index: 0,
                  routes: [
                    {
                      name: NAV_HOME,
                    },
                  ],
                });
              }}
            />
          </ComponentView>
          <ComponentView>
            <ImageContainer>
              <ImageView>
                <PointerImage />
              </ImageView>
            </ImageContainer>
            <ComponentText>{strings.createVisualPresentation}</ComponentText>
            <PrimaryButton
              title={strings.startPresentation}
              onPress={() => {
                navigation?.navigate(NAV_MEDIA);
              }}
            />
          </ComponentView>
          <ComponentView>
            <ImageContainer>
              <ImageView>
                <TapImage />
              </ImageView>
            </ImageContainer>
            <ComponentText>{strings.shareOnSocialMedia}</ComponentText>
            <PrimaryButton
              title={strings.shareNow}
              onPress={async () => {
                await onShare();
              }}
            />
          </ComponentView>
        </ScrollView>
      </Wrapper>
    </ScreenWrapper>
  );
};

export default Share;
