import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BottomNavigation, TabItem } from './bottom-navigation';

const Tab = createBottomTabNavigator();

export interface BottomTabNavigatorProps {
  tabs: TabItem[];
  children: React.ReactNode;
  className?: string;
}

function CustomTabBar({ state, descriptors, navigation, ...props }: BottomTabBarProps & { tabs: TabItem[] }) {
  const tabs = (props as any).tabs;
  
  return (
    <BottomNavigation
      tabs={tabs}
      activeTab={state.routes[state.index].name}
      onTabPress={(tabKey) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: tabKey,
          canPreventDefault: true,
        });

        if (!event.defaultPrevented) {
          navigation.navigate(tabKey);
        }
      }}
    />
  );
}

export function BottomTabNavigator({
  tabs,
  children,
  className,
}: BottomTabNavigatorProps) {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} tabs={tabs} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {children}
    </Tab.Navigator>
  );
}

export { Tab as BottomTab };