import styled from 'styled-components/native';
import {ISpacerProps} from './types';

/**
 * Name: Spacer
 * Desc: To give blank space/ height with the given value.
 * @param height
 */
export const Spacer = styled.View<ISpacerProps>`
  width: ${props => (props.width ? `${props.width}px` : '100%')};
  height: ${props => (props.height ? props.height : 0)}px;
`;
