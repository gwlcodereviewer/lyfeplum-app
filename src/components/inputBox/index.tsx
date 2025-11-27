import React, {useState} from 'react';
import {KeyboardTypeOptions, StyleProp, TextStyle} from 'react-native';
import colors from '../../../styles/colors';
import {RowView, AsteriskLabel} from '../../../styles/style';
import {AUTO_CAPITALIZE, rpx} from '../../../styles/styleUtils';
import {
  ErrorContainer,
  ErrorText,
  Input,
  InputContainer,
  Label,
  LabelContainer,
  LeftText,
  LeftViewContainer,
  RightText,
  RightViewContainer,
} from './styled';
import CloseEye from '../../assets/images/svgImages/closeEye';
import OpenEye from '../../assets/images/svgImages/openEye';
import {INPUT_SYMBOLS} from '../../constants/utils';

/**
 * Type / Interface declaration for props
 */
interface Props {
  label?: string;
  isEncrypt?: boolean;
  isRequired?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  style?: StyleProp<TextStyle>;
  maxLength?: number;
  keyBoardType?: KeyboardTypeOptions;
  multiline?: boolean;
  testID?: string;
  editable?: boolean;
  errorText?: string;
  rightText?: string;
  rightTextColor?: string;
  showCheckMark?: boolean;
  onPressRight?: () => void;
  onPressLeft?: () => void;
  leftText?: string;
  autoFocus?: boolean;
  containerHeight?: number;
  autoCapitalize?: AUTO_CAPITALIZE;
  backgroundColor?: string;
  inputKeyboardType?: string;
  labelMargin?: number;
  labelTextSize?: number;
}

/**
 * Input Component
 * @param props
 * @returns React component
 */
const InputBox: React.FC<Props> = (props: Props) => {
  const {labelBackground, ghostWhite} = colors;

  const {
    isEncrypt = false,
    label = '',
    errorText = '',
    rightText = '',
    rightTextColor,
    isRequired = false,
    showCheckMark,
    onPressRight,
    leftText = '',
    onPressLeft,
    editable = true,
    containerHeight,
    backgroundColor,
    inputKeyboardType = 'default',
    labelMargin = rpx(15),
    labelTextSize = rpx(18),
    ...rest
  } = props;

  const bgColor = editable ? labelBackground : ghostWhite;

  const [showPassword, setShowPassword] = useState<boolean>(isEncrypt);

  /**
   * Render input UI
   * @returns {JSX.Element}
   */
  const renderRightView = () => {
    if (isEncrypt) {
      return (
        <RightViewContainer onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <CloseEye /> : <OpenEye />}
        </RightViewContainer>
      );
    }
    if (rightText !== '') {
      return (
        <RightViewContainer onPress={onPressRight}>
          <RightText color={rightTextColor}>{rightText}</RightText>
        </RightViewContainer>
      );
    }
    if (showCheckMark) {
      return (
        <RightViewContainer onPress={onPressRight}>
          {/* <CheckMark /> */}
        </RightViewContainer>
      );
    }
    return <></>;
  };

  const renderLeftView = () => {
    if (leftText !== '') {
      return (
        <LeftViewContainer onPress={onPressLeft}>
          <LeftText>{leftText}</LeftText>
          {/* <ArrowOpen /> */}
        </LeftViewContainer>
      );
    }
    return <></>;
  };

  /**
   * Method to render error
   * @returns {string} error text view
   */
  const renderError = () => {
    return (
      <ErrorContainer>
        <ErrorText>{errorText}</ErrorText>
      </ErrorContainer>
    );
  };

  return (
    <>
      {label !== '' && (
        <LabelContainer marginTop={labelMargin}>
          <Label textSize={labelTextSize}>
            {label}
            {isRequired && (
              <AsteriskLabel>{INPUT_SYMBOLS.asterisk}</AsteriskLabel>
            )}
          </Label>
        </LabelContainer>
      )}
      <InputContainer
        bgColor={backgroundColor || bgColor}
        containerHeight={containerHeight}>
        <RowView>
          {renderLeftView()}
          <Input
            secureTextEntry={showPassword}
            editable={editable}
            keyboardType={inputKeyboardType}
            {...rest}
          />
          {renderRightView()}
        </RowView>
      </InputContainer>
      {errorText !== '' && renderError()}
    </>
  );
};

export default InputBox;
