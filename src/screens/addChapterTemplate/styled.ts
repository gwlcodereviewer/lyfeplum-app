import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import {rpx, rw} from '../../../styles/styleUtils';

/**
 * Name: HeaderContainer
 * Desc: The container for header
 */
export const HeaderContainer = styled.View`
  background-color: ${colors.primaryButton};
  padding-vertical: ${rpx(15)}px;
`;

/**
 * Name: HeaderText
 * Desc: The text for header
 */
export const HeaderText = styled.Text`
  margin-left: ${rw(20)}px;
  font-size: ${rpx(24)}px;
  line-height: ${rpx(26)}px;
  text-transform: uppercase;
  color: ${colors.white};
  text-align: center;
`;

/**
 * Name: ScreenWrapper
 * Desc: The screen wrapper view
 */
export const ScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.pantone};
`;

/**
 * Name: FlatListContainer
 * Desc: The flat list container.
 */
export const FlatListContainer = styled.View`
  flex: 1;
  margin-horizontal: ${rpx(20)}px;
`;

/**
 * ChapterTemplateContainer
 * Desc: The chapter template container.
 */
export const ChapterTemplateContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.white};
  border-radius: ${rpx(21)}px;
  margin-vertical: ${rpx(15)}px;
  overflow: hidden;
`;

/**
 * Name: TemplateName
 * Desc: The template name text view.
 */
export const TemplateName = styled.Text`
  font-size: ${rpx(22)}px;
  line-height: ${rpx(22)}px;
  color: ${colors.greenTxt};
  text-align: center;
  font-weight: 600;
  margin-vertical: ${rpx(15)}px;
`;

/**
 * Name: LoaderContainer
 * Desc: The view for loader container
 */
export const LoaderContainer = styled.View`
  background-color: ${colors.white};
  justify-content: center;
  flex: 1;
`;
