/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';
import AppStatusBar from '../../components/appStatusBar';
import Header from '../../components/header';
import CustomLoader from '../../components/screenLoader';
import {strings} from '../../localization';
import {NAV_ADD_CHAPTERS} from '../../navigation/constants';
import {
  useSelectTemplateMutation,
  useTemplateListMutation,
} from '../../redux/api/chapterApi';
import {INavigation} from '../../types/utils';
import {showServerError} from '../../utils';
import {
  ChapterTemplateContainer,
  FlatListContainer,
  HeaderContainer,
  HeaderText,
  ScreenWrapper,
  TemplateName,
} from './styled';

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface Props {
  navigation?: INavigation;
}

/**
 * Name: Add Chapter Template screen
 * Desc: Screen to render add chapter with template UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const AddChapterTemplate: React.FC<Props> = (props: Props) => {
  const {navigation} = props;
  const {selectTemplateTxt} = strings;

  const [templates, setTemplates] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const myGlobal: any = global;

  /**
   * Name: useEffect
   * Desc: useEffect to call  api on navigation
   */
  useEffect(() => {
    const unsubscribe = navigation?.addListener('focus', () => {
      setRefreshing(true);
      templateList('');
    });
    return unsubscribe;
  }, [navigation]);

  const [
    templateList,
    {
      isLoading: templateListLoading,
      isError: isTemplateListError,
      error: templateListError,
      isSuccess: templateListSuccess,
      data: templateListData,
    },
  ] = useTemplateListMutation();

  const [
    selectTemplate,
    {
      isLoading: selectTemplateLoading,
      isError: isSelectTemplateError,
      error: selectTemplateError,
      isSuccess: selectTemplateSuccess,
      data: selectTemplateData,
    },
  ] = useSelectTemplateMutation();

  /**
   * Name: useEffect
   * Desc: useEffect for get chapter templates API response.
   */
  useEffect(() => {
    if (templateListSuccess) {
      if (templateListData?.status) {
        setTemplates(templateListData?.templates);
        setRefreshing(false);
      }
    }
    if (isTemplateListError) {
      showServerError(templateListError, navigation);
    }
  }, [templateListLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to manage select template API response.
   */
  useEffect(() => {
    if (selectTemplateSuccess) {
      if (selectTemplateData?.status) {
        myGlobal.hashId = selectTemplateData?.chapter_hashid;
        navigation?.navigate(NAV_ADD_CHAPTERS, {isFromTemplate: true});
        setRefreshing(false);
      }
    }
    if (isSelectTemplateError) {
      showServerError(selectTemplateError, navigation);
    }
  }, [selectTemplateLoading]);

  /**
   * Name: renderTemplates
   * Desc: Function to render chapter template.
   */
  const renderTemplates = ({item, index}) => {
    return (
      <ChapterTemplateContainer
        key={`temp_${index}`}
        onPress={() => {
          setRefreshing(true);
          selectTemplate({template_id: item.hashid});
        }}>
        <Image
          source={{uri: item.featured_image}}
          indicator={ProgressPie}
          indicatorProps={{
            color: colors.primaryButton,
          }}
          style={styles.imageView}
        />
        <TemplateName>{item.title}</TemplateName>
      </ChapterTemplateContainer>
    );
  };

  return (
    <ScreenWrapper>
      <AppStatusBar />
      <Header
        title={selectTemplateTxt}
        onPressLeft={() => {
          navigation?.goBack();
        }}
      />
      <HeaderContainer>
        <HeaderText>{selectTemplateTxt}</HeaderText>
      </HeaderContainer>
      {refreshing ? (
        <CustomLoader />
      ) : (
        <FlatListContainer>
          <FlatList
            data={templates}
            renderItem={renderTemplates}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={templateListLoading}
                onRefresh={() => templateList('')}
              />
            }
          />
        </FlatListContainer>
      )}
    </ScreenWrapper>
  );
};

export default AddChapterTemplate;

const styles = StyleSheet.create({
  imageView: {
    height: rpx(200),
    width: '100%',
  },
});
