import { View } from 'react-native';
import React, { useState } from 'react';
import { BottomNavigation, TabItem } from '@rnr/reusables/components/ui/bottom-navigation';
import { House, MessageSquare, UserRound, Settings } from '@rnr/reusables/lib/icons';
import { Text } from '@rnr/reusables/components/ui/text';
import { useColorScheme } from '@rnr/reusables/lib/useColorScheme';

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

export default function BottomNavigationScreen() {
  const [activeTab, setActiveTab] = useState('Home');
  const { isDarkColorScheme } = useColorScheme();
  const textColor = isDarkColorScheme ? '#ffffff' : '#0f0f0f';

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Text className="text-xl text-center" style={{ color: textColor }}>🏠 Home Screen</Text>;
      case 'Support':
        return <Text className="text-xl text-center" style={{ color: textColor }}>💬 Support Screen</Text>;
      case 'Profile':
        return <Text className="text-xl text-center" style={{ color: textColor }}>👤 Profile Screen</Text>;
      case 'Settings':
        return <Text className="text-xl text-center" style={{ color: textColor }}>⚙️ Settings Screen</Text>;
      default:
        return <Text className="text-xl text-center" style={{ color: textColor }}>Welcome</Text>;
    }
  };

  return (
    <View className="flex-1">
      {/* Main content area */}
      <View className="flex-1 items-center justify-center bg-background px-4">
        <Text className="text-2xl font-bold mb-4 text-center" style={{ color: textColor }}>Bottom Navigation</Text>
        <Text className="text-base mb-8 text-center" style={{ color: textColor }}>
          A bottom navigation component built with React Navigation and designed to match the Figma Nav Bottom component.
        </Text>
        
        <View className="bg-card p-6 rounded-lg border border-border min-h-[200px] w-full max-w-sm items-center justify-center">
          {renderContent()}
          <Text className="text-sm mt-4 text-center" style={{ color: textColor }}>
            Selected: {activeTab}
          </Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </View>
  );
}