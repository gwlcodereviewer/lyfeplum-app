import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import CustomHeader from '../components/customHeader';
import SideMenu from '../components/sideMenu';
import {strings} from '../localization';
import TabStackNavigator from './tabStackNavigator';

const Drawer = createDrawerNavigator();

/**
 * Name: DrawerNavigationStack
 * Desc: Function to display drawer navigation
 */
const DrawerNavigationStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>
      <Drawer.Screen
        name={strings.tabs}
        component={TabStackNavigator}
        options={{
          header: ({navigation}) => {
            return <CustomHeader navigation={navigation} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigationStack;
