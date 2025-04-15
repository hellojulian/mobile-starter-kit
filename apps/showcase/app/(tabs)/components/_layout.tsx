import * as React from 'react';
import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '@react-navigation/native';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { Stack, withLayoutContext } from 'expo-router';
import { useWindowDimensions } from 'react-native';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function MaterialTopTabsLayout() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <>
      <Stack.Screen options={{ headerShadowVisible: false }} />
      <MaterialTopTabs
        id="components-material-top-tabs"
        initialRouteName='index'
        screenOptions={{
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: 'none',
            fontWeight: 'bold',
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.text,
          },
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: width / 2 },
          tabBarStyle: { height: 0 }
        }}
      >
        <MaterialTopTabs.Screen
          name='index'
          options={{
            title: 'UI',
          }}
        />
        <MaterialTopTabs.Screen
          name='primitives'
          options={{
            title: 'Primitives',
          }}
        />
      </MaterialTopTabs>
    </>
  );
}
