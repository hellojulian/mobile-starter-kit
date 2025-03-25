import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Code } from '~/lib/icons/Code';
import { Terminal } from '~/lib/icons/Terminal';

export default function ToastScreen() {
  const insets = useSafeAreaInsets();
  function showSuccessToast() {
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: 'This is a success toast example for the starer kit.',
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  }
  function showErrorToast() {
    Toast.show({
      type: 'error',
      text1: 'Danger!',
      text2: 'This is a danger toast example for the starer kit.',
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  }
  function showWarningToast() {
    Toast.show({
      type: 'warning',
      text1: 'Warning!',
      text2: 'This is a warning toast example for the starer kit.',
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  }
  function showInfoToast() {
    Toast.show({
      type: 'info',
      text1: 'Information',
      text2: 'This is a information toast example for the starer kit.',
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  }
  function showGenericToast() {
    Toast.show({
      type: 'generic',
      text1: 'Heads up!',
      text2: 'This is a generic toast example for the starer kit.',
      props: {
        icon: Terminal,
      },
      topOffset: insets.top === 0 ? 12 : insets.top,
    });
  }
  return (
    <>
      <View className='flex-1 justify-center items-center gap-4'>
        <Button variant='secondary' onPress={showSuccessToast}>
          <Text>Show success toast</Text>
        </Button>
        <Button variant='secondary' onPress={showErrorToast}>
          <Text>Show error toast</Text>
        </Button>
        <Button variant='secondary' onPress={showInfoToast}>
          <Text>Show info toast</Text>
        </Button>
        <Button variant='secondary' onPress={showWarningToast}>
          <Text>Show warning toast</Text>
        </Button>
        <Button variant='secondary' onPress={showGenericToast}>
          <Text>Show base toast</Text>
        </Button>
      </View>
      <View className='p-6 w-full'>
        <Alert icon={Code} className='max-w-xl mx-auto'>
          <AlertTitle>FYI</AlertTitle>
          <AlertDescription>This reusable does not use "rn-primitives"</AlertDescription>
        </Alert>
      </View>
    </>
  );
}
