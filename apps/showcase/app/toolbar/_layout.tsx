import { Stack } from 'expo-router';

export default function ToolbarLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Reusable' }} />
      <Stack.Screen name='toolbar-primitive' options={{ title: 'Primitive' }} />
    </Stack>
  );
}
