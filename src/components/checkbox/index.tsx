import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import colors from '../../../styles/colors';
import {checkBoxStyles} from '../../../styles/style';
import {CHECKBOX_TYPE} from '../../constants/utils';
import {CheckBoxContainer} from './styled';

/**
 * Name: Props
 * Desc: Interface declaration for props
 */
interface Props {
  tintColors?: string;
  onTintColor?: string;
  checkColor?: string;
  onChange?: () => void;
  checkBoxValue?: any;
  boxType?: any;
}

/**
 * Name: Checkbox
 * Desc: Component to render the checkbox
 * @param {string} tintColors - tint color
 * @param {string} onTintColor - tint color
 * @param {string} checkColor - check color
 * @param {any} checkBoxValue - value of checkbox
 * @param {any} boxType - checkbox type
 * @param {func} onChange - Function to catch value of checkbox on change
 * @returns React component
 */
const Checkbox: React.FC<Props> = (props: Props) => {
  const {
    tintColors = colors.black,
    onTintColor = colors.black,
    checkColor = colors.black,
    onChange,
    checkBoxValue,
    boxType = CHECKBOX_TYPE.square,
  } = props;

  return (
    <CheckBoxContainer>
      <CheckBox
        style={checkBoxStyles.checkBox}
        tintColors={{true: tintColors}}
        lineWidth={2}
        onTintColor={onTintColor}
        onCheckColor={checkColor}
        value={checkBoxValue}
        boxType={boxType}
        onValueChange={onChange}
      />
    </CheckBoxContainer>
  );
};

export default Checkbox;
