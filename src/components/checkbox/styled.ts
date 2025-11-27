import styled from 'styled-components/native';
import {rw} from '../../../styles/styleUtils';
import {isIOS} from '../../utils';

/**
 * Name: CheckBoxContainer
 * Desc: The container for checkbox
 */
export const CheckBoxContainer = styled.View`
  padding-right: ${isIOS() ? rw(10) : rw(0)}px;
`;
