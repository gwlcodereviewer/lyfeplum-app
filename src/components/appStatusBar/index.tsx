import React from 'react';
import {StatusBar} from 'react-native';
import colors from '../../../styles/colors';
import {StatusView} from './styled';

/**
 * Desc: App Status Bar
 * @param props {color} string
 * @returns React component
 */
const AppStatusBar: React.FC = () => {
  return (
    <StatusView>
      <StatusBar backgroundColor={colors.black} barStyle="default" />
    </StatusView>
  );
};

export default AppStatusBar;
