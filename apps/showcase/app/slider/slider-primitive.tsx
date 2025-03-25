import * as React from 'react';
import { Pressable, View, Text, Platform } from 'react-native';
import * as Slider from '@rn-primitives/slider';
import { cn } from '~/lib/utils';

export default function SliderScreen() {
  const [value, setValue] = React.useState(50);

  return (
    <>
      <View className='items-center justify-center flex-1 gap-12 p-6'>
        <Pressable
          onPress={() => {
            setValue(Math.floor(Math.random() * 100));
          }}
        >
          <Text className='text-4xl text-center text-sys-secondary'>{Math.round(value)}</Text>
        </Pressable>
        <Slider.Root
          value={value}
          onValueChange={(vals) => {
            const nextValue = vals[0];
            if (typeof nextValue !== 'number') return;
            setValue(nextValue);
          }}
          className='justify-center w-full'
        >
          <Slider.Track className='h-2 border rounded-full bg-sys-divider-decorative border-border'>
            <Slider.Range
              style={{ width: `${value}%` }}
              className='h-full rounded-full bg-sys-secondary'
            />
            <Slider.Thumb
              style={{ left: `${value}%` }}
              className={cn(
                'h-7 w-7 bg-white absolute -translate-y-2 -translate-x-1/2  rounded-full'
              )}
            />
          </Slider.Track>
        </Slider.Root>

        {Platform.OS !== 'web' && (
          <View>
            <Text className='pb-2 text-xl text-center text-foreground'>
              You will have to implement the gesture handling
            </Text>
            <Text className='text-sm text-center text-foreground'>
              Press the number to change the slider's value
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
