import { Stack } from 'expo-router';

export default function LabelLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Reusable' }} />
      <Stack.Screen name='label-primitive' options={{ title: 'Primitive' }} />
    </Stack>
  );
}
