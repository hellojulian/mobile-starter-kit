import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { DeprecatedUi } from '@rnr/reusables';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FullWindowOverlay } from 'react-native-screens';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: {
    ...NAV_THEME.light,
    notification: NAV_THEME.light.primary,
  },
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: {
    ...NAV_THEME.dark,
    notification: NAV_THEME.dark.primary,
  },
};

const WindowOverlay = Platform.OS === 'ios' ? FullWindowOverlay : React.Fragment;
const { ToastProvider } = DeprecatedUi;

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkColorScheme = colorScheme === 'dark';

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <>
          <Stack>
            <Stack.Screen
              name='(tabs)'
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='modal'
              options={{
                presentation: 'modal',
                title: 'Modal',
              }}
            />
          </Stack>
          <WindowOverlay>
            <PortalHost />
          </WindowOverlay>
          <ToastProvider />
        </>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
