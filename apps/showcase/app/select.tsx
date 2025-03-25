import * as React from 'react';
import { Platform, Pressable, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Text } from '~/components/ui/text';
import { useFonts } from 'expo-font';

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
});

export default function SelectScreen() {
  const [selectedFruit, setSelectedFruit] = React.useState({ value: 'apple', label: 'Apple' });
  const [selectedScrollFruit, setSelectedScrollFruit] = React.useState({
    value: 'apple',
    label: 'Apple',
  });
  const triggerRef = React.useRef<React.ElementRef<typeof SelectTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };

  const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      className='items-center justify-between flex-1 p-6'
      style={[{ paddingBottom: insets.bottom + 24 }, styles.Inter]}
    >
      <Pressable
        className='absolute top-0 right-0 w-16 h-16 active:bg-primary/5'
        onPress={() => {
          triggerRef.current?.open();
        }}
      />
      <View className='items-center justify-center flex-1'>
        <Select value={selectedFruit} onValueChange={setSelectedFruit}>
          <SelectTrigger ref={triggerRef} className='w-[300px]' style={styles.Inter}>
            <SelectValue
              className='text-sm text-foreground native:text-md'
              placeholder='Select a fruit'
              style={styles.Inter}
            />
          </SelectTrigger>
          <SelectContent
            insets={contentInsets}
            className='w-[300px] mt-1'
            style={styles.Inter}
          >
            <SelectGroup>
              <SelectItem label='Apple' value='apple' style={styles.Inter}>
                Apple
              </SelectItem>
              <SelectItem label='Banana' value='banana' style={styles.Inter}>
                Banana
              </SelectItem>
              <SelectItem label='Blueberry' value='blueberry' style={styles.Inter}>
                Blueberry
              </SelectItem>
              <SelectItem label='Grapes' value='grapes' style={styles.Inter}>
                Grapes
              </SelectItem>
              <SelectItem label='Pineapple' value='pineapple' style={styles.Inter}>
                Pineapple
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Text style={[styles.Inter, { marginTop: 8 }]}>
          Selected: {selectedFruit.label}
        </Text>
      </View>
      <View>
        <Text className='pb-2 text-center text-muted-foreground' style={styles.Inter}>
          With scroll view
        </Text>
        <Select value={selectedScrollFruit} onValueChange={setSelectedScrollFruit}>
          <SelectTrigger className='w-[300px]' style={styles.Inter}>
            <SelectValue
              className='text-sm text-foreground native:text-md'
              placeholder='Select a fruit'
              style={styles.Inter}
            />
          </SelectTrigger>
          <SelectContent insets={contentInsets} className='w-[300px]' style={styles.Inter}>
            <ScrollView className='max-h-32'>
              <SelectGroup>
                <SelectLabel style={styles.Inter}>Fruits</SelectLabel>
                <SelectItem label='Apple' value='apple' style={styles.Inter}>
                  Apple
                </SelectItem>
                <SelectItem label='Banana' value='banana' style={styles.Inter}>
                  Banana
                </SelectItem>
                <SelectItem label='Blueberry' value='blueberry' style={styles.Inter}>
                  Blueberry
                </SelectItem>
                <SelectItem label='Grapes' value='grapes' style={styles.Inter}>
                  Grapes
                </SelectItem>
                <SelectItem label='Pineapple' value='pineapple' style={styles.Inter}>
                  Pineapple
                </SelectItem>
                <SelectItem label='Apple 2' value='apple2' style={styles.Inter}>
                  Apple 2
                </SelectItem>
                <SelectItem label='Banana 2' value='banana2' style={styles.Inter}>
                  Banana 2
                </SelectItem>
                <SelectItem label='Blueberry 2' value='blueberry2' style={styles.Inter}>
                  Blueberry 2
                </SelectItem>
                <SelectItem label='Grapes 2' value='grapes2' style={styles.Inter}>
                  Grapes 2
                </SelectItem>
                <SelectItem label='Pineapple 2' value='pineapple2' style={styles.Inter}>
                  Pineapple 2
                </SelectItem>
                <SelectItem label='Apple 3' value='apple3' style={styles.Inter}>
                  Apple 3
                </SelectItem>
                <SelectItem label='Banana 3' value='banana3' style={styles.Inter}>
                  Banana 3
                </SelectItem>
                <SelectItem label='Blueberry 3' value='blueberry3' style={styles.Inter}>
                  Blueberry 3
                </SelectItem>
                <SelectItem label='Grapes 3' value='grapes3' style={styles.Inter}>
                  Grapes 3
                </SelectItem>
                <SelectItem label='Pineapple 3' value='pineapple3' style={styles.Inter}>
                  Pineapple 3
                </SelectItem>
              </SelectGroup>
            </ScrollView>
          </SelectContent>
        </Select>
        <Text style={[styles.Inter, { marginTop: 8 }]}>
          Selected (scroll): {selectedScrollFruit.label}
        </Text>
      </View>
    </View>
  );
}
