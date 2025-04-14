import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, useColorScheme, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { cn } from '~/lib/utils';

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fallback for platforms where BlurView doesn't work
  },
  Inter: {
    fontFamily: 'Inter',
  },
});

export default function BottomSheetScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // refs
  const bottomSheetRef = useRef<BottomSheet>(null);
  const nameInputRef = useRef<React.ComponentRef<typeof Input>>(null);
  const usernameInputRef = useRef<React.ComponentRef<typeof Input>>(null);

  // state
  const [nameError, setNameError] = useState<string | undefined>();
  const [usernameError, setUsernameError] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  // variables
  const snapPoints = useMemo(() => ['65%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    setIsOpen(index !== -1);
  }, []);

  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleOnLabelPress = useCallback(
    (ref: React.RefObject<any>) => () => {
      if (ref.current && typeof ref.current.focus === 'function') {
        ref.current.focus();
      }
    },
    []
  );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0}>
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(150)}
          style={StyleSheet.absoluteFill}
        >
          <BlurView intensity={20} tint={isDarkMode ? 'dark' : 'light'} style={styles.blurView} />
          <View style={styles.overlay} />
        </Animated.View>
      </BottomSheetBackdrop>
    ),
    [isDarkMode]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        className={cn(
          'flex-1 justify-center items-center',
          isDarkMode ? 'bg-sys-surface-neutral-0' : 'bg-sys-surface-neutral-0'
        )}
      >
        <Button onPress={handleOpenPress}>
          <Text style={styles.Inter}>Open</Text>
        </Button>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: 'transparent' }}
          handleComponent={null}
          accessibilityViewIsModal={true}
          accessibilityLabel="Edit profile modal"
        >
          <BottomSheetView 
            className='flex-1 rounded-t-2xl bg-sys-surface-neutral-0'
            accessibilityRole="dialog"
          >
            {/* Add a clearly visible drag indicator */}
            <View 
              className='w-full items-center pt-3'
              accessibilityRole="button"
              accessibilityLabel="Drag to resize or close"
              accessibilityHint="Swipe up to expand or down to close"
            >
              <View className='w-[40px] h-[4px] bg-sys-surface-neutral-2 rounded-full' />
            </View>
            
            <View className='px-6 pb-6'>
              <View className='items-center w-full mt-2'>
                <Image
                  source={require('../assets/bjork.png')} 
                  style={{ width: 120, height: 120 }}
                  resizeMode='contain'
                  className='mb-4 border rounded-full border-sys-border-4'
                  accessibilityLabel="Profile picture"
                  accessibilityRole="image"
                />
              </View>
              <Text
                style={styles.Inter}
                className={cn(
                  'text-lg tracking-tight font-semibold text-center',
                  isDarkMode ? 'text-sys-text-body' : 'text-sys-text-body'
                )}
                accessibilityRole="header"
                accessibilityTraits="header"
              >
                Edit your profile
              </Text>
              <View className='gap-5 pt-2'>
                <View className='gap-4 pb-2'>
                  <View>
                    <Label
                      nativeID='name'
                      style={styles.Inter}
                      className={cn(
                        'pb-1',
                        isDarkMode ? 'text-sys-text-body' : 'text-sys-text-body'
                      )}
                      onPress={handleOnLabelPress(nameInputRef)}
                      accessibilityRole="text"
                    >
                      Name
                    </Label>
                    <Input
                      ref={nameInputRef}
                      defaultValue='Bjork'
                      aria-labelledby='name'
                      error={nameError}
                      onChangeText={() => setNameError(undefined)}
                      accessibilityLabel="Name"
                      accessibilityHint="Enter your full name"
                      accessibilityState={{ 
                        invalid: nameError ? true : false 
                      }}
                      accessibilityLiveRegion="polite"
                    />
                    {nameError && (
                      <Text 
                        accessibilityRole="alert"
                        accessibilityLiveRegion="assertive"
                        className="text-sys-fn-error-text text-sm mt-1"
                      >
                        {nameError}
                      </Text>
                    )}
                  </View>
                  <View>
                    <Label
                      nativeID='username'
                      style={styles.Inter}
                      className={cn(
                        'pb-1',
                        isDarkMode ? 'text-sys-text-body' : 'text-sys-text-body'
                      )}
                      onPress={handleOnLabelPress(usernameInputRef)}
                      accessibilityRole="text"
                    >
                      Username
                    </Label>
                    <Input
                      ref={usernameInputRef}
                      defaultValue='@bjork'
                      aria-labelledby='username'
                      error={usernameError}
                      onChangeText={() => setUsernameError(undefined)}
                      accessibilityLabel="Username"
                      accessibilityHint="Enter your username starting with @"
                      accessibilityState={{ 
                        invalid: usernameError ? true : false 
                      }}
                      accessibilityLiveRegion="polite"
                    />
                    {usernameError && (
                      <Text 
                        accessibilityRole="alert"
                        accessibilityLiveRegion="assertive"
                        className="text-sys-fn-error-text text-sm mt-1"
                      >
                        {usernameError}
                      </Text>
                    )}
                  </View>
                </View>
                <View>
                  <Button 
                    onPress={handleClosePress}
                    accessibilityRole="button"
                    accessibilityLabel="Save Changes"
                    accessibilityHint="Save profile changes and close the form"
                  >
                    <Text style={styles.Inter}>Save Changes</Text>
                  </Button>
                </View>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}