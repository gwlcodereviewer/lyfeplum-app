import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rpx} from '../../../styles/styleUtils';
const screenWidth = Dimensions.get('screen').width;

/**
 * WebViewContainer
 * Desc: View container for webview component
 */
export const WebViewContainer = styled.View`
  flex: 1;
  width: ${screenWidth}px;
`;

/**
 * HeaderText
 * Desc: Text for the heading
 */
export const HeaderText = styled.Text`
  color: ${colors.greenColor};
  font-size: ${rpx(40)}px;
  letter-spacing: ${rpx(3)}px;
  padding-left: ${rpx(12)}px;
`;
