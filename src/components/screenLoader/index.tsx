import React from 'react';
import {LoaderContainer} from './styled';
import colors from '../../../styles/colors';
import {ActivityIndicator} from 'react-native';

/**
 * Name: Props
 * Desc: Props type declaration
 */
interface Props {
  bgColor?: string;
  indicatorColor?: string;
}

/**
 * Name: CustomLoader
 * Desc: Component that render loader on screen.
 * @param bgColor - The background color.
 * @param indicatorColor - The loader color.
 * */
const CustomLoader: React.FC<Props> = (props: Props) => {
  const {bgColor, indicatorColor} = props;
  return (
    <LoaderContainer color={bgColor}>
      <ActivityIndicator color={indicatorColor || colors.primaryButton} />
    </LoaderContainer>
  );
};

export default CustomLoader;
