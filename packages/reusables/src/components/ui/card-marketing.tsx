import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const CardMarketing = React.forwardRef<View, {}>((props, ref) => {
  const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      ref={ref}
      className='flex flex-col justify-start items-start w-full h-[275px] bg-black border border-sys-border-4 rounded-3xl'
      accessibilityRole='region'
      accessibilityLabel='Marketing card'
    >
      <View className='relative flex flex-col items-start justify-start w-full h-full myt rounded-3xl border-sys-border-4'>
        <Image
          className='absolute w-full h-full rounded-3xl'
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/j0yxlas9f6b-I0%3A400%3B183%3A1906?alt=media&token=a1609761-a08d-4588-8c23-bd01b7cb0482',
          }}
          accessibilityRole='image'
          accessibilityLabel='Marketing background image'
        />
        <View className='absolute bottom-0 w-full p-6 space-y-4'>
          <Text
            style={{ fontFamily: 'Inter' }}
            className='text-white text-xl leading-[30px] tracking-[-0.5px]'
            accessibilityRole='header'
          >
            Add a mobile or data plan
          </Text>
          <Text
            style={{ fontFamily: 'Inter' }}
            className='text-sys-secondary text-[15px] leading-[20px]'
            accessibilityRole='text'
          >
            Want another mobile number or data-only plan? Order a SIM and get going.
          </Text>
        </View>
      </View>
    </View>
  );
});

CardMarketing.displayName = 'CardMarketing';

export const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
  Inter: {
    fontFamily: 'Inter',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontFamily: 'Inter',
    paddingBottom: 4,
    paddingLeft: 2,
  },
  input: {
    fontFamily: 'Inter',
  },
});

export default CardMarketing;
