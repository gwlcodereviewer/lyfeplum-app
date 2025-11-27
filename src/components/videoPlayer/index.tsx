import React, {useEffect} from 'react';
import {Modal} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import VideoPlayer from 'react-native-video-controls';
import {ModalWrapper} from './styled';
/**
 * Name: VideoModel
 * Desc: Screen to render Video Player UI
 * @returns JSX element
 */
export const VideoModel = props => {
  /**
   * Name: useEffect
   * Desc: useEffect to call initially to lock orientation
   */
  useEffect(() => {
    Orientation.unlockAllOrientations();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  /**
   * Name: videoPlayerView
   * Desc: Function to render the full screen video UI
   * @returns JSX element
   */
  const videoPlayerView = () => {
    return (
      <VideoPlayer
        source={{
          uri: props.videoDetail.link,
        }}
        onBack={() => {
          props.toggleModal({
            isVisible: false,
            data: null,
          });
        }}
        resizeMode="contain"
        toggleResizeModeOnFullscreen={false}
        disableFullscreen
      />
    );
  };

  return (
    <Modal
      animationType={'fade'}
      supportedOrientations={['portrait']}
      transparent={true}
      visible={props.isVisible}>
      <ModalWrapper>{videoPlayerView()}</ModalWrapper>
    </Modal>
  );
};
