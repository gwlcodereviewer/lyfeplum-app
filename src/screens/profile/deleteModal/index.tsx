import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import colors from '../../../../styles/colors';
import InputBox from '../../../components/inputBox';
import {SUPPORTED_ORIENTATIONS, VALID_REGEX} from '../../../constants/utils';
import {strings} from '../../../localization';
import {
  BackgroundView,
  BtnText,
  CancelBtn,
  ConfirmBtn,
  DeleteText,
  DoubleBtnView,
  PopUpText,
  PopUpView,
  TextView,
} from './styled';

const modalInfoGlobal: any = global;

/**
 * Name: Props
 * Desc: Props type declaration
 */
interface Props {
  title?: string;
  positiveBtnText?: string;
  negativeBtnText?: string;
  onPressPositiveBtn?: () => void;
  onPressNegativeBtn?: () => void;
  visible?: boolean;
}

/**
 * Name: DeleteModalBox
 * Desc: Component that render delete modal.
 * @param {string} title - The title text of the pop-up.
 * @param {string} positiveBtnText - The positiveBtnText text of the pop-up.
 * @param {string} negativeBtnText - The negativeBtnText text of the pop-up.
 * @param {boolean} visible - If true, then pop-up will be visible.
 * @param {func} onPressPositiveBtn - Function that triggered on positive button click.
 * @param {func} onPressNegativeBtn - Function that triggered on negative button click.
 */
const DeleteModalBox: React.FC<Props> = (props: Props) => {
  const {confirm, cancel, typeText, belowBox, deleteText, invalidText} =
    strings;
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState('');
  const {
    positiveBtnText = confirm,
    negativeBtnText = cancel,
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
    setInputText('');
    setInputError('');
  }, [visible]);

  /**
   * Name: validateField
   * Desc: Form validations
   */
  const validateField = () => {
    if (inputText === '') {
      setInputError(invalidText);
    } else if (inputText.length !== 6) {
      setInputError(invalidText);
    } else {
      const isDelete = VALID_REGEX.delete.test(inputText);
      if (isDelete) {
        if (onPressPositiveBtn) {
          onPressPositiveBtn();
        }
        setInputError('');
      } else {
        setInputError(invalidText);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      supportedOrientations={SUPPORTED_ORIENTATIONS}>
      <BackgroundView>
        <PopUpView>
          <TextView>
            <PopUpText>{typeText}</PopUpText>
            <DeleteText>{deleteText}</DeleteText>
            <PopUpText>{belowBox}</PopUpText>
          </TextView>
          <InputBox
            value={inputText}
            onChangeText={text => {
              setInputError('');
              setInputText(text);
            }}
            placeholder={typeText}
            errorText={inputError}
            backgroundColor={colors.white}
          />
          <DoubleBtnView>
            <CancelBtn onPress={onPressNegativeBtn}>
              <BtnText>{negativeBtnText}</BtnText>
            </CancelBtn>
            <ConfirmBtn onPress={() => validateField()}>
              <BtnText>{positiveBtnText}</BtnText>
            </ConfirmBtn>
          </DoubleBtnView>
        </PopUpView>
      </BackgroundView>
    </Modal>
  );
};

export default DeleteModalBox;
