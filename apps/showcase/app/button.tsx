import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { Button } from '~/components/ui/button';
import { useFonts } from 'expo-font';
import Svg, { Path, G, Circle, Rect } from 'react-native-svg';

// Google icon component - using currentColor to inherit from parent
const GoogleIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </Svg>
);

// Facebook icon component
const FacebookIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="11" fill="#1877F2" />
    <Path
      d="M16.6 15.3l.5-3.5h-3.4V9.7c0-1 .5-1.9 2-1.9h1.5V4.8c0-.1-1.3-.2-2.5-.2-2.6 0-4.3 1.6-4.3 4.5v2.7H7.2v3.5h3.2V24h4.3v-8.7h1.9z"
      fill="white"
    />
  </Svg>
);

// Microsoft icon component
const MicrosoftIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
    <Rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
    <Rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
    <Rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
  </Svg>
);

export default function ButtonScreen() {
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='items-center justify-center flex-1 gap-5 p-6'>
          <Button variant='default' textSize='lg'>
            Default
          </Button>
          <Button variant='secondary' textSize='lg'>
            Secondary
          </Button>
          <Button variant='outline' textSize='lg'>
            Outline
          </Button>
          <Button variant='ghost' textSize='lg'>
            Ghost
          </Button>
          <Button variant='link' textSize='lg'>
            Text Link
          </Button>
          
          {/* Social Login Buttons */}
          <View className='w-full'>
            <Button 
              variant='secondary' 
              textSize='md'
              className='w-full mb-4'
              icon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>
            
            <Button 
              variant='secondary' 
              textSize='md'
              className='w-full mb-4'
              icon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
            
            <Button 
              variant='secondary' 
              textSize='md'
              className='w-full'
              icon={<MicrosoftIcon />}
            >
              Sign in with Microsoft
            </Button>
</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}