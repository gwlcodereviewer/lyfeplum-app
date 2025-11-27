import React from 'react';
import {Modal} from 'react-native';
import {SUPPORTED_ORIENTATIONS} from '../../constants/utils';
import ImageView from 'react-native-image-viewing';

const myGlobal: any = global;
/**
 * Name: Props
 * Desc: Props type declaration
 */
interface Props {
  visible?: boolean;
  swipeDown?: any;
}

/**
 * Name: PreviewImage
 * Desc: Component that render pop-up with image view.
 * @param {boolean} visible - If true, then pop-up will be visible.
 * @param {func} swipeDown - Function to swipe down and close modal
 * */
const PreviewImage: React.FC<Props> = (props: Props) => {
  const {visible, swipeDown} = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      supportedOrientations={SUPPORTED_ORIENTATIONS}>
      <ImageView
        images={myGlobal.images}
        imageIndex={0}
        visible={true}
        onRequestClose={swipeDown}
      />
    </Modal>
  );
};

export default PreviewImage;
