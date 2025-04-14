import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { AlertTriangle } from '~/lib/icons/AlertTriangle';
import { OctagonAlert } from '~/lib/icons/OctagonAlert';
import { CircleCheck } from '~/lib/icons/CircleCheck';
import { Info } from '~/lib/icons/Info';
import { Sun } from '~/lib/icons/Sun';
import { useFonts } from 'expo-font';

export default function AlertScreen() {
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='items-center justify-start flex-1 gap-3 p-4'>
          <Alert
            icon={OctagonAlert}
            variant='error'
            className='max-w-xl'
            role='alert'
            aria-label='Error alert'
          >
            <AlertDescription style={{ fontFamily: 'Inter' }}>
              This is some body copy
            </AlertDescription>
          </Alert>

          <Alert
            icon={AlertTriangle}
            variant='warning'
            className='max-w-xl'
            role='alert'
            aria-label='Warning alert'
          >
            <AlertDescription style={{ fontFamily: 'Inter' }}>
              This is some body copy
            </AlertDescription>
          </Alert>

          <Alert
            icon={CircleCheck}
            variant='success'
            className='max-w-xl'
            role='status'
            aria-live='polite'
            aria-label='Success alert'
          >
            <AlertDescription style={{ fontFamily: 'Inter' }}>
              This is some body copy
            </AlertDescription>
          </Alert>

          <Alert
            icon={Info}
            variant='info'
            className='max-w-xl'
            role='status'
            aria-live='polite'
            aria-label='Information alert'
          >
            <AlertDescription style={{ fontFamily: 'Inter' }}>
              This is some body copy
            </AlertDescription>
          </Alert>

          <Alert
            icon={Sun}
            variant='default'
            className='max-w-xl'
            role='status'
            aria-label='Default alert'
          >
            <AlertDescription style={{ fontFamily: 'Inter' }}>
              This is some body copy
            </AlertDescription>
          </Alert>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
