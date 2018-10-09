import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements';
import {
  Image,
  Platform,
  StyleSheet
} from 'react-native';


import PropertyList from '../screens/PropertyList';
import PropertyDetail from '../screens/PropertyDetail';

export const PropertyListStack = StackNavigator({
  PropertyList: {
    screen: PropertyList,
    navigationOptions: {
      title: 'Property',
      headerTintColor: 'white',
      headerStyle: {
         backgroundColor: '#e91e63'
      }
    },
  },
  Details: {
    screen: PropertyDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.bhktype.toUpperCase()} ${navigation.state.params.propertytypes.toUpperCase()}`,
      headerTintColor: 'white',
      headerStyle: {
         backgroundColor: '#e91e63'
      },
    }),
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: PropertyListStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});
