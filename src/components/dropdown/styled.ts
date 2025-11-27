import styled from 'styled-components/native';
import {ILoaderContainer} from '../../../styles/types';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';

/**
 * Name: DropDownContainer
 * Desc: The drop down container view.
 */
export const DropDownContainer = styled.View<ILoaderContainer>`
  background-color: ${props => props.color || colors.white};
  padding-top: ${rpx(10)}px;
  margin-horizontal: ${(props: any) =>
    props.marginHorizontal ? props.marginHorizontal : rpx(0)}px;
`;
