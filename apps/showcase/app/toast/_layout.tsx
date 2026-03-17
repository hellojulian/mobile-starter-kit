import { Stack } from 'expo-router';

export default function ToastLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Reusable' }} />
      <Stack.Screen name='toast-primitive' options={{ title: 'Primitive' }} />
    </Stack>
  );
}
