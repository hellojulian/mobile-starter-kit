import { Stack } from 'expo-router';

export default function SliderLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Reusable' }} />
      <Stack.Screen name='slider-primitive' options={{ title: 'Primitive' }} />
    </Stack>
  );
}
