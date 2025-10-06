import React from 'react';
import { View } from 'react-native';
import { BottomTabNavigator, BottomTab } from './bottom-tab-navigator';
import { TabItem } from './bottom-navigation';
import { House, MessageSquare, UserRound, Settings } from '../../lib/icons';
import { Text } from './text';

// Example screens
function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl">Home Screen</Text>
    </View>
  );
}

function SupportScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl">Support Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl">Profile Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl">Settings Screen</Text>
    </View>
  );
}

// Tab configuration matching the Figma design
const tabs: TabItem[] = [
  {
    key: 'Home',
    title: 'Home',
    icon: House,
  },
  {
    key: 'Support',
    title: 'Support', 
    icon: MessageSquare,
  },
  {
    key: 'Profile',
    title: 'Profile',
    icon: UserRound,
  },
  {
    key: 'Settings',
    title: 'Settings',
    icon: Settings,
  },
];

export function BottomNavigationExample() {
  return (
    <BottomTabNavigator tabs={tabs}>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Support" component={SupportScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
      <BottomTab.Screen name="Settings" component={SettingsScreen} />
    </BottomTabNavigator>
  );
}