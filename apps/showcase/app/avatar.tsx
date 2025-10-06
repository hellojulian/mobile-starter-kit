import React from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Text } from '~/components/ui/text';
import { H4 } from '~/components/ui/typography';

const avatarImages = {
  'Female 1': require('../assets/female_1.png'),
  'Female 2': require('../assets/female_2.png'),
  'Male 1': require('../assets/male_1.png'),
  'Male 2': require('../assets/male_2.png'),
};

export default function AvatarScreen() {
  const sizes: Array<'32px' | '52px' | '80px' | '120px'> = ['32px', '52px', '80px', '120px'];
  const variants: Array<'Male 1' | 'Male 2' | 'Female 1' | 'Female 2'> = ['Male 1', 'Male 2', 'Female 1', 'Female 2'];

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 24 }}>
      {/* Avatar Images Section */}
      {sizes.map((size) => (
        <View key={size} className="mb-xl">
          <H4 className="mb-md">{size} - With Images</H4>
          <View className="flex-row flex-wrap gap-lg">
            {variants.map((variant) => (
              <View key={`${size}-${variant}`} className="items-center mb-md">
                <Avatar size={size} variant={variant} alt={`${size} ${variant} Avatar`}>
                  <AvatarImage source={avatarImages[variant]} />
                  <AvatarFallback>
                    <Text className="text-sys-text-body">ZN</Text>
                  </AvatarFallback>
                </Avatar>
                <Text className="mt-xs text-sm text-sys-text-body text-center">{variant}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Fallback Examples Section */}
      <View className="mb-xl">
        <H4 className="mb-md">Fallback Examples</H4>
        <View className="flex-row flex-wrap gap-6">
          <View className="items-center mb-md">
            <Avatar size="32px">
              <AvatarFallback>
                <Text className="text-xs text-sys-text-body font-medium tracking-[-0.06px]">M1</Text>
              </AvatarFallback>
            </Avatar>
            <Text className="mt-xs text-sm text-sys-text-body text-center">32px Initials</Text>
          </View>
          
          <View className="items-center mb-md">
            <Avatar size="52px">
              <AvatarFallback>
                <Text className="text-sm text-sys-text-body font-medium tracking-[-0.28px]">M2</Text>
              </AvatarFallback>
            </Avatar>
            <Text className="mt-xs text-sm text-sys-text-body text-center">52px Initials</Text>
          </View>
          
          <View className="items-center mb-md">
            <Avatar size="80px">
              <AvatarFallback>
                <Text className="text-lg text-sys-text-body font-medium tracking-[-0.22px]">F1</Text>
              </AvatarFallback>
            </Avatar>
            <Text className="mt-xs text-sm text-sys-text-body text-center">80px Initials</Text>
          </View>
          
          <View className="items-center mb-md">
            <Avatar size="120px">
              <AvatarFallback>
                <Text className="text-xl text-sys-text-body font-medium tracking-[-0.26px]">F2</Text>
              </AvatarFallback>
            </Avatar>
            <Text className="mt-xs text-sm text-sys-text-body text-center">120px Initials</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

