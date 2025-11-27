/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {useSelector} from 'react-redux';
import colors from '../../../styles/colors';
import {rpx, screenWidth} from '../../../styles/styleUtils';
import {strings} from '../../localization';
import {RootState} from '../../redux/store';
import PrimaryButton from '../button';

/**
 * Name: Props
 * Desc: Interface type for props
 */
interface Props {
  visible: boolean;
  onClose: () => void;
}

/**
 * Name: MessageModal
 * Desc: Component to render message modal UI
 * @param {any} navigation - navigation data
 */
const MessageModal: React.FC<Props> = (props: Props) => {
  const {visible, onClose} = props;
  const uploadData = useSelector((state: RootState) => state.upload.uploadData);
  const uploadingStart = useSelector(
    (state: RootState) => state.upload.uploadingStart,
  );
  const uploadingComplete = useSelector(
    (state: RootState) => state.upload.uploadingComplete,
  );
  const uploadingProgress = useSelector(
    (state: RootState) => state.upload.uploadingProgress,
  );
  const [slideAnim] = useState(new Animated.Value(-400));
  const [uploadingRecord, setUploadingRecord] = useState<any>();
  const [inQueueRecord, setInQueueRecord] = useState<any[]>();
  const [uploadingStateProgress, setUploadingStateProgress] =
    useState<number>(0);

  /**
   * Name: useEffect
   * Desc: useEffect to animate the modal
   */
  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -400,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  /**
   * Name: handleClose
   * Desc: Function to animate the modal on close
   */
  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -400,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  /**
   * Name: useEffect
   * Desc: useEffect to handle uploading start and complete
   */
  useEffect(() => {
    setUploadingStateProgress(uploadingProgress);
  }, [uploadingProgress]);

  /**
   * Name: useEffect
   * Desc: useEffect to handle uploading records
   */
  useEffect(() => {
    var foundData = uploadData.filter(obj => obj.isInProgress === true);
    setUploadingRecord(foundData[0]);
    var foundInQueueData = uploadData.filter(obj => obj.isInProgress === false);
    setInQueueRecord(foundInQueueData);
  }, [uploadData]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={() => handleClose()}>
      <View>
        <View style={styles.centeredView}>
          <Animated.View
            style={[
              styles.modalView,
              {
                transform: [{translateY: slideAnim}],
                minHeight: rpx(350),
              },
            ]}>
            <View style={styles.pointer} />
            <Text style={styles.headerText}>{strings.uploadingInProgress}</Text>
            <ScrollView style={styles.parentContainer}>
              <View>
                {uploadingRecord && (
                  <View style={styles.progressContainer}>
                    <Text style={styles.uploadText}>
                      {uploadingRecord.fileName || uploadingRecord.name}
                    </Text>
                    <Progress.Bar
                      progress={uploadingStateProgress * 0.01}
                      width={screenWidth - 100}
                      height={5}
                      color={colors.primaryButton}
                      style={styles.progress}
                    />
                  </View>
                )}
                {inQueueRecord && inQueueRecord.length > 0 && (
                  <Text style={styles.headerText}>
                    {strings.uploadingInQueue} - {inQueueRecord.length}
                  </Text>
                )}
                {inQueueRecord &&
                  inQueueRecord.map(item => {
                    return (
                      <View style={styles.progressContainer}>
                        <Text style={styles.uploadText}>
                          {item.fileName || item.name}
                        </Text>
                        <Progress.Bar
                          indeterminate={true}
                          indeterminateAnimationDuration={2000}
                          width={screenWidth - 100}
                          height={5}
                          color={colors.primaryButton}
                          style={styles.progress}
                        />
                      </View>
                    );
                  })}
              </View>
            </ScrollView>
            <View style={styles.closeButtonView}>
              <PrimaryButton
                title={strings.close}
                buttonStyle={{
                  height: rpx(32),
                  width: rpx(80),
                  backgroundColor: colors.stormGrey,
                  borderColor: colors.stormGrey,
                }}
                onPress={() => handleClose()}
              />
            </View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'flex-start',
    marginTop: rpx(130),
    paddingHorizontal: rpx(30),
  },
  modalView: {
    backgroundColor: colors.lightGreenColor,
    padding: rpx(20),
    elevation: 5,
    width: '100%',
    borderBottomLeftRadius: rpx(20),
    borderBottomRightRadius: rpx(20),
    borderTopLeftRadius: rpx(20),
  },
  pointer: {
    width: rpx(0),
    height: rpx(0),
    borderLeftWidth: rpx(10),
    borderRightWidth: rpx(10),
    borderBottomWidth: rpx(15),
    borderStyle: 'solid',
    backgroundColor: colors.transparent,
    borderLeftColor: colors.transparent,
    borderRightColor: colors.transparent,
    borderBottomColor: colors.lightGreenColor,
    position: 'absolute',
    top: rpx(-15),
    alignSelf: 'flex-end',
  },
  headerText: {
    fontSize: rpx(18),
    fontWeight: '500',
  },
  uploadText: {
    fontSize: rpx(16),
  },
  progressContainer: {
    marginTop: rpx(5),
    borderTopWidth: rpx(2),
    borderTopColor: colors.borderColor,
    paddingTop: rpx(10),
    paddingBottom: rpx(20),
  },
  closeButtonView: {
    alignItems: 'center',
    paddingTop: rpx(10),
  },
  progress: {
    marginVertical: rpx(10),
    borderColor: colors.borderColor,
    borderWidth: rpx(2),
  },
  parentContainer: {height: rpx(300)},
});

export default MessageModal;
