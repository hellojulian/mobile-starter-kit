import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  useTheme,
  type ParamListBase,
  type TabNavigationState,
} from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function MaterialTopTabsLayout() {
  const { colors } = useTheme();
  return (
    <MaterialTopTabs
      initialRouteName='index'
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.text,
        },
      }}
    >
      <MaterialTopTabs.Screen
        name='index'
        options={{
          title: 'Select',
        }}
      />
      <MaterialTopTabs.Screen
        name='red'
        options={{
          title: 'Commerce',
        }}
      />
      <MaterialTopTabs.Screen
        name='green'
        options={{
          title: 'Entertainment',
        }}
      />
      <MaterialTopTabs.Screen
        name='purple'
        options={{
          title: 'Marketing',
        }}
      />
    </MaterialTopTabs>
  );
}
