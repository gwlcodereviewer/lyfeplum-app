import styled from 'styled-components/native';
import {ILabel} from '../../../styles/types';
import {defaultTheme} from '../../../styles/theme';

const {primaryBackgroundColor} = defaultTheme;

/**
 * Name: LoaderContainer
 * Desc: The view for loader container
 */
export const LoaderContainer = styled.View`
  background-color: ${(props: ILabel) => props.color || primaryBackgroundColor};
  justify-content: center;
  flex: 1;
`;
