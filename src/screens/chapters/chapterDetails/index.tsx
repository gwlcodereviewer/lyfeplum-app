/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, useWindowDimensions} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';
import RenderHtml from 'react-native-render-html';
import {FlatGrid} from 'react-native-super-grid';
import VideoPlayer from 'react-native-video-controls';
import colors from '../../../../styles/colors';
import {rh, rpx, rw} from '../../../../styles/styleUtils';
import images from '../../../assets/images';
import Header from '../../../components/header';
import PreviewImage from '../../../components/previewImage';
import {VideoModel} from '../../../components/videoPlayer';
import {ATTACHMENT_TYPE, TOAST_MESSAGE_TYPE} from '../../../constants/utils';
import {strings} from '../../../localization';
import {useChapterPreviewMutation} from '../../../redux/api/chapterApi';
import {INavigation} from '../../../types/utils';
import {showServerError, showToastMessage} from '../../../utils';
import {Wrapper} from '../styled';
import {
  ChapterText,
  DivContainer,
  Divider,
  ImgContainer,
  ListItemView,
  LogoContainer,
  LogoImage,
  MainContainer,
  PlayIconContainer,
  PlayIconWrapper,
  PlayImage,
  QuestionText,
  TopContainer,
  VideoContainer,
  ViewContainer,
  WebViewContainer,
} from './styled';

const myGlobal: any = global;

/**
 * Name: Props
 * Desc: Interface declaration for Props
 */
interface ChapterProps {
  navigation?: INavigation;
}

/**
 * Name: ChapterPreview
 * Desc: Screen to render chapters preview UI
 * @param {any} navigation - navigation data
 * @returns JSX element
 */
const ChapterPreview: React.FC<ChapterProps> = props => {
  const {navigation} = props;
  const {} = strings;
  const [questionData, setQuestionData] = useState<any>([]);
  const [chapterDetail, setChapterDetail] = useState<any>({});
  const [imageModal, setImageModal] = useState(false);
  const {width} = useWindowDimensions();
  const [showModal, setShowModal] = useState({isVisible: false, data: null});

  /**
   * Name: useEffect
   * Desc: useEffect to call api
   */
  useEffect(() => {
    myGlobal.images = [];
    chapterPreview(myGlobal.hashId);
  }, [myGlobal.hashId]);

  const [
    chapterPreview,
    {
      isLoading: isChapterPreviewLoading,
      isError: isChapterPreviewError,
      error: ChapterPreviewError,
      isSuccess: isChapterPreviewSuccess,
      data: chapterPreviewData,
    },
  ] = useChapterPreviewMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to user account delete
   */
  useEffect(() => {
    if (isChapterPreviewSuccess) {
      if (chapterPreviewData && chapterPreviewData?.status) {
        setChapterDetail(chapterPreviewData?.chapter);
        setQuestionData(chapterPreviewData?.questions);
      } else {
        showToastMessage(
          strings.lyfePlum,
          chapterPreviewData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isChapterPreviewError) {
      showServerError(ChapterPreviewError, navigation);
    }
  }, [isChapterPreviewLoading]);

  /**
   * Name: renderContent
   * Desc: Function to render content
   */
  const renderContent = data => {
    const indexZero = questionData[0].question_id;
    return (
      <MainContainer key={data?.item?.question_id}>
        {indexZero !== data?.item?.question_id && (
          <DivContainer>
            <Divider />
            <LogoContainer>
              <LogoImage source={images.logo} />
            </LogoContainer>
          </DivContainer>
        )}
        <WebViewContainer>
          <QuestionText>{data?.item?.question}</QuestionText>
          {/**
            Copyright (c) 2021, Maxime Bertonnier, Jules Sam. Randolph
            All rights reserved.

            Redistribution and use in source and binary forms, with or without
            modification, are permitted provided that the following conditions are met:

            * Redistributions of source code must retain the above copyright notice, this
              list of conditions and the following disclaimer.

            * Redistributions in binary form must reproduce the above copyright notice,
              this list of conditions and the following disclaimer in the documentation
              and/or other materials provided with the distribution.

            THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
            AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
            IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
            DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
            FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
            DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
            SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
            CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
            OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
            OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
           */}
          <RenderHtml
            contentWidth={width}
            source={{html: data?.item?.answer}}
          />
        </WebViewContainer>
        {data?.item?.attachments_array &&
          data?.item?.attachments_array.length && (
            <FlatGrid
              itemDimension={130}
              data={data?.item?.attachments_array}
              renderItem={val => renderAttachments(val)}
            />
          )}
      </MainContainer>
    );
  };

  /**
   * Name: setImagesList
   * Desc: Function to set images list in array
   * @param {string} link - link of image
   */
  const setImagesList = link => {
    let imageList: any = [];
    imageList.push({uri: link});
    questionData?.map((item: any) => {
      let list = item?.attachments_array ? item?.attachments_array : [];
      if (list.length >= 1) {
        list.map(childItem => {
          if (link !== childItem?.link) {
            imageList.push({uri: childItem?.link});
          }
        });
      }
    });
    myGlobal.images = imageList;
    setImageModal(true);
  };

  /*
   * Name: toggleModal
   * Desc: open modal for video
   */
  const toggleModal = state => {
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };

  /**
   * Name: renderAttachments
   * Desc: Function to render attachments
   */
  const renderAttachments = data => {
    return (
      <ListItemView key={data?.item?.attch_id}>
        {data?.item?.attachment_type === ATTACHMENT_TYPE.image && (
          <ImgContainer
            onPress={() => {
              setImagesList(data?.item?.link);
            }}>
            <Image
              source={{uri: data?.item?.link}}
              indicator={ProgressPie}
              indicatorProps={{
                color: colors.primaryButton,
              }}
              style={styles.attachmentImage}
            />
          </ImgContainer>
        )}
        {data?.item?.attachment_type === ATTACHMENT_TYPE.video && (
          <VideoContainer
            onPress={() => {
              setShowModal({
                isVisible: true,
                data: data?.item,
              });
            }}>
            <PlayIconContainer>
              <PlayIconWrapper>
                <PlayImage source={images.playIcon} />
              </PlayIconWrapper>
            </PlayIconContainer>
            <VideoPlayer
              style={{borderRadius: rpx(15)}}
              source={{
                uri: data?.item.link,
              }}
              paused
              resizeMode="contain"
              disablePlayPause
              disableSeekbar
              disableVolume
              disableTimer
              disableBack
              disableFullscreen
            />
          </VideoContainer>
        )}
      </ListItemView>
    );
  };

  /**
   * Name: renderHeaderComponent
   * Desc: Function to render flatList header
   */
  const renderHeaderComponent = () => {
    return (
      <ViewContainer>
        <Image
          source={{uri: chapterDetail?.featured_image}}
          indicator={ProgressPie}
          indicatorProps={{
            color: colors.primaryButton,
          }}
          style={styles.imageView}
        />
        <TopContainer>
          <ChapterText>{chapterDetail?.title}</ChapterText>
        </TopContainer>
      </ViewContainer>
    );
  };

  return (
    <Wrapper>
      <Header
        title={strings.registration}
        onPressLeft={() => {
          navigation?.goBack();
        }}
      />
      <FlatList
        style={styles.flatListStyle}
        data={questionData}
        ListHeaderComponent={renderHeaderComponent}
        renderItem={renderContent}
        bounces={false}
      />
      <PreviewImage
        visible={imageModal}
        swipeDown={() => {
          myGlobal.images = [];
          setImageModal(false);
        }}
      />
      {showModal.isVisible ? (
        <VideoModel
          isVisible={showModal.isVisible}
          toggleModal={toggleModal}
          videoDetail={showModal.data}
          {...props}
        />
      ) : null}
    </Wrapper>
  );
};

export default ChapterPreview;

const styles = StyleSheet.create({
  imageView: {
    height: rpx(250),
    width: '100%',
  },
  attachmentImage: {
    width: rw(500),
    height: rh(100),
  },
  flatListStyle: {
    marginBottom: rpx(50),
  },
});
