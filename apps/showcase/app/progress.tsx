import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';

export default function ProgressScreen() {
  const [progress, setProgress] = React.useState(13);

  function onPress() {
    setProgress(Math.floor(Math.random() * 100));
  }

  return (
    <View className='items-center justify-center flex-1 gap-xxs2 p-6'>
      <View className='items-center w-full gap-8'>
        <Progress value={progress} className='web:w-[60%]' />
        <Button variant='secondary' onPress={onPress}>
          <Text>Randomize</Text>
        </Button>
      </View>
    </View>
  );
}
