import React from 'react';
import {CheckBoxContainer} from './styled';
import TickIcon from '../../assets/images/svgImages/tickIcon';

/**
 * Props type declaration
 */
interface Props {
  onPress?: () => void;
  isSelected?: any;
}

/**
 * Name: CheckBox
 * Desc: Component to render check box.
 * @param {func} onPress - The callback function for check box click.
 * @param {boolean} isSelected - If true, then check box is in active state.
 */
const CheckBoxView = (props: Props) => {
  const {onPress, isSelected = 0} = props;
  const isCheckBoxSelected =
    isSelected === 0 || isSelected === '0' ? false : true;

  return (
    <CheckBoxContainer onPress={onPress}>
      {isCheckBoxSelected && <TickIcon />}
    </CheckBoxContainer>
  );
};

export default CheckBoxView;
