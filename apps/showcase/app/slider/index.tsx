import { DeprecatedUi } from '@rnr/reusables';
import * as React from 'react';
import { Text, View } from 'react-native';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Code } from '~/lib/icons/Code';

const { Slider } = DeprecatedUi;

export default function SliderScreen() {
  const [value, setValue] = React.useState(0.5);
  return (
    <>
      <View className='w-full p-6'>
        <Alert icon={Code} className='max-w-xl'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>This reusable does not use "rn-primitives"</AlertDescription>
        </Alert>
      </View>
      <View className='justify-center flex-1 gap-5 p-6'>
        <Text nativeID='sliderLabel' className='text-3xl text-center text-sys-secondary'>
          {Math.round(value * 100)}
        </Text>
        <Slider value={value} onValueChange={setValue} aria-labelledby='sliderLabel' />
      </View>
    </>
  );
}
