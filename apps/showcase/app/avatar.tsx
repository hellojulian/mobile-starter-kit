import React from 'react';
import { View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Text } from '~/components/ui/text';

// For Expo, both of these approaches work:
// Option 1: Using require (recommended for dynamic image selection)
const LOCAL_AVATAR = require('../assets/avatar-placeholder.png');

// Option 2: Using import (works well for static images)
// import LOCAL_AVATAR from '../../assets/images/avatar-placeholder.png';

export default function AvatarScreen() {
  return (
    <View className="flex-1 justify-center items-center p-6 ">
      <View className="flex-row flex-wrap justify-center items-center gap-4">
        <AvatarWithLabel size="xs" label="XS"  />
        <AvatarWithLabel size="sm" label="SM" />
        <AvatarWithLabel size="md" label="MD" />
        <AvatarWithLabel size="lg" label="LG" />
        <AvatarWithLabel size="xl" label="XL" />
        <AvatarWithLabel size={80} label="Custom" />
      </View>
    </View>
  );
}

function AvatarWithLabel({ size, label }: { size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number; label: string }) {
  return (
    <View className="items-center">
      <Avatar size={size} alt={`${label} Avatar`}>
        {/* In Expo, you can pass the imported/required image directly to source */}
        <AvatarImage source={LOCAL_AVATAR} />
        <AvatarFallback>
          <Text className="text-sys-text-body" style={{ fontSize: typeof size === 'number' ? size / 2.5 : undefined }}>ZN</Text>
        </AvatarFallback>
      </Avatar>
      <Text className="mt-2 text-sys-text-body">{label}</Text>
    </View>
  );
}