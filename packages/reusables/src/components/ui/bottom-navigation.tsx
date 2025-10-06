import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from '../../lib/useColorScheme';
import { cn } from '../../lib/utils';
import { Text } from './text';

export interface TabItem {
  key: string;
  title: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
}

export interface BottomNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  className?: string;
}

export function BottomNavigation({
  tabs,
  activeTab,
  onTabPress,
  className,
}: BottomNavigationProps) {
  const insets = useSafeAreaInsets();
  const { isDarkColorScheme } = useColorScheme();
  
  return (
    <View
      className={cn(
        'flex-row bg-[color:var(--sys-surface-card)] border-t border-border',
        className
      )}
      style={{
        paddingBottom: insets.bottom,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        const IconComponent = tab.icon;
        
        const inactiveColor = isDarkColorScheme ? '#ffffff' : '#0f0f0f';
        
        return (
          <Pressable
            key={tab.key}
            className="flex-1 items-center justify-center py-2 px-1"
            onPress={() => onTabPress(tab.key)}
            android_ripple={{ color: 'hsl(var(--sys-surface-secondary-4) / 0.1)', borderless: false }}
          >
            <View className="items-center gap-1 min-h-[48px] justify-center">
              <IconComponent
                className="h-6 w-6"
                color={isActive ? '#5b4cff' : inactiveColor}
              />
              <Text
                className="text-xs text-center"
                style={{
                  color: isActive ? '#5b4cff' : inactiveColor
                }}
              >
                {tab.title}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export { BottomNavigation as BottomNav };