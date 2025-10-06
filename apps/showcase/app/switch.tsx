import * as React from 'react';
import { View } from 'react-native';
import { Label } from '~/components/ui/label';
import { Switch } from '~/components/ui/switch';

export default function SwitchScreen() {
  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <View className='flex-1 justify-center items-center p-lg gap-xxs2'>
        <View className='flex-row items-center gap-xs'>
          <Switch checked={checked} onCheckedChange={setChecked} nativeID='airplane-mode' />
          <Label
            nativeID='airplane-mode'
            onPress={() => {
              setChecked((prev) => !prev);
            }}
          >
            Airplane Mode
          </Label>
        </View>
      </View>
    </>
  );
}
