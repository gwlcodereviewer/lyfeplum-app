import React, {useEffect} from 'react';
import {Modal} from 'react-native';
import {SUPPORTED_ORIENTATIONS} from '../../constants/utils';
import {
  BackgroundView,
  BtnText,
  CancelBtn,
  ConfirmBtn,
  DoubleBtnView,
  PopUpText,
  PopUpView,
  SimpleView,
} from './styled';
import {strings} from '../../localization';

const modalInfoGlobal: any = global;

/**
 * Name: Props
 * Desc: Props type declaration
 */
interface Props {
  title?: string;
  message?: string;
  positiveBtnText?: string;
  negativeBtnText?: string;
  onPressPositiveBtn?: () => void;
  showDoubleBtnView?: boolean;
  onPressNegativeBtn?: () => void;
  visible?: boolean;
  testID?: string;
}

/**
 * Name: ModalBox
 * Desc: Component that render pop-up with two types of view.
 * 1. With only positive button view.
 * 2. With positive and negative both buttons.
 * @param {string} title - The title text of the pop-up.
 * @param {string} message - The message text of the pop-up.
 * @param {string} positiveBtnText - The positiveBtnText text of the pop-up.
 * @param {string} negativeBtnText - The negativeBtnText text of the pop-up.
 * @param {boolean} showDoubleBtnView - If true, then both buttons will be visible.
 * @param {boolean} visible - If true, then pop-up will be visible.
 * @param {func} onPressPositiveBtn - Function that triggered on positive button click.
 * @param {func} onPressNegativeBtn - Function that triggered on negative button click.
 */
const ModalBox: React.FC<Props> = (props: Props) => {
  const {yes, no} = strings;
  const {
    message = '',
    positiveBtnText = yes,
    negativeBtnText = no,
    showDoubleBtnView = true,
    onPressPositiveBtn,
    onPressNegativeBtn,
    visible,
  } = props;

  /**
   * Name: useEffect
   * Desc: useEffect to Manage Modal Open/Close status
   */
  useEffect(() => {
    modalInfoGlobal.isModalOpen = visible;
  }, [visible]);

  /**
   * Name: SingleButtonView
   * Desc: To render a pop-up with single button.
   * @returns JSX.Element.
   */
  const SingleButtonView = () => {
    return (
      <SimpleView>
        <PopUpView>
          <PopUpText>{message}</PopUpText>
          <ConfirmBtn onPress={onPressPositiveBtn}>
            <BtnText>{positiveBtnText}</BtnText>
          </ConfirmBtn>
        </PopUpView>
      </SimpleView>
    );
  };

  /**
   * Name: DoubleButtonView
   * Desc: To render a pop-up with both buttons.
   * @returns JSX.Element.
   */
  const DoubleButtonView = () => {
    return (
      <PopUpView>
        <PopUpText>{message}</PopUpText>
        <DoubleBtnView>
          <CancelBtn onPress={onPressNegativeBtn}>
            <BtnText>{negativeBtnText}</BtnText>
          </CancelBtn>
          <ConfirmBtn onPress={onPressPositiveBtn}>
            <BtnText>{positiveBtnText}</BtnText>
          </ConfirmBtn>
        </DoubleBtnView>
      </PopUpView>
    );
  };

  /**
   * Name: renderMiddleView
   * Desc: Check conditions then render view accordingly.
   * @returns JSX.Element.
   */
  const renderMiddleView = () => {
    return showDoubleBtnView ? <DoubleButtonView /> : <SingleButtonView />;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      supportedOrientations={SUPPORTED_ORIENTATIONS}>
      <BackgroundView>{renderMiddleView()}</BackgroundView>
    </Modal>
  );
};

export default ModalBox;
