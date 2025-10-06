import * as React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Text } from '~/components/ui/text';
import { Illustration } from '~/components/ui/illustration';
import { useFonts } from 'expo-font';

export default function IllustrationScreen() {
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const featuredIllustrations = [
    'Apple_Vision',
    'Apple_Watch', 
    'Brain_Pink',
    'Coffee',
    'Heart',
    'Mac',
    'Phone',
    'Smiley',
    'Headphones',
    'Settings',
    'Flower',
    'Cloud'
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1, 
          padding: 24,
          paddingBottom: 40 
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-xl">
          {/* Header */}
          <View className="gap-xs">
            <Text 
              className="text-2xl font-bold text-sys-text-body"
              style={{ fontFamily: 'Inter' }}
            >
              Illustrations
            </Text>
            <Text 
              className="text-base text-sys-text-neutral-3"
              style={{ fontFamily: 'Inter' }}
            >
              A collection of beautiful illustrations for your designs
            </Text>
          </View>

          {/* Size Examples */}
          <View className="gap-md">
            <Text 
              className="text-lg font-semibold text-sys-text-body"
              style={{ fontFamily: 'Inter' }}
            >
              Sizes
            </Text>
            <View className="gap-md bg-sys-surface-neutral-0 p-lg rounded-lg">
              <View className="items-center gap-xs">
                <Illustration name="Heart" size="small" />
                <Text 
                  className="text-sm text-sys-text-neutral-3"
                  style={{ fontFamily: 'Inter' }}
                >
                  Small (80px)
                </Text>
              </View>
              <View className="items-center gap-xs">
                <Illustration name="Heart" size="medium" />
                <Text 
                  className="text-sm text-sys-text-neutral-3"
                  style={{ fontFamily: 'Inter' }}
                >
                  Medium (120px)
                </Text>
              </View>
              <View className="items-center gap-xs">
                <Illustration name="Heart" size="large" />
                <Text 
                  className="text-sm text-sys-text-neutral-3"
                  style={{ fontFamily: 'Inter' }}
                >
                  Large (160px)
                </Text>
              </View>
            </View>
          </View>

          {/* Gallery */}
          <View className="gap-md">
            <Text 
              className="text-lg font-semibold text-sys-text-body"
              style={{ fontFamily: 'Inter' }}
            >
              Gallery
            </Text>
            <View className="gap-md">
              {Array.from({ length: Math.ceil(featuredIllustrations.length / 2) }).map((_, rowIndex) => (
                <View key={rowIndex} className="flex-row justify-between">
                  {featuredIllustrations
                    .slice(rowIndex * 2, (rowIndex + 1) * 2)
                    .map((name) => (
                      <View key={name} className="items-center gap-xs flex-1">
                        <View className="bg-sys-surface-neutral-0 rounded-lg p-md items-center justify-center">
                          <Illustration 
                            name={name} 
                            size="medium"
                            accessibilityLabel={`${name.replace(/[-_]/g, ' ')} illustration`}
                          />
                        </View>
                        <Text 
                          className="text-xs text-sys-text-neutral-3 text-center"
                          style={{ fontFamily: 'Inter' }}
                          numberOfLines={2}
                        >
                          {name.replace(/[-_]/g, ' ')}
                        </Text>
                      </View>
                    ))}
                  {/* Fill empty slots in the last row */}
                  {rowIndex === Math.ceil(featuredIllustrations.length / 2) - 1 &&
                    featuredIllustrations.length % 2 === 1 && (
                      <View className="flex-1" />
                    )}
                </View>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}