import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { DeprecatedUi } from '@rnr/reusables';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, View, Text, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { useFonts } from 'expo-font';

// NOTE: This disables dynamic font scaling globally across the app.
// While this helps maintain consistent layouts, it impacts accessibility
// for users who rely on system text size adjustments.
// Consider using maxFontSizeMultiplier or designing responsive layouts
// if accessibility is a priority for your app.
(Text as any).defaultProps = {
  ...(Text as any).defaultProps,
  allowFontScaling: false,
};

// Also disable font scaling for TextInput
(TextInput as any).defaultProps = {
  ...(TextInput as any).defaultProps,
  allowFontScaling: false,
};

const { ToastProvider } = DeprecatedUi;

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  // Loading custom fonts
  const [fontsLoaded] = useFonts({
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  React.useEffect(() => {
    async function prepare() {
      try {
        const theme = await AsyncStorage.getItem('theme');
        if (Platform.OS === 'web') {
          document.documentElement.classList.add('bg-background');
        }
        if (!theme) {
          setAndroidNavigationBar(colorScheme);
          await AsyncStorage.setItem('theme', colorScheme);
        } else {
          const colorTheme = theme === 'dark' ? 'dark' : 'light';
          setAndroidNavigationBar(colorTheme);
          if (colorTheme !== colorScheme) {
            setColorScheme(colorTheme);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setIsColorSchemeLoaded(true);
      }
    }

    prepare();
  }, []);

  React.useEffect(() => {
    if (isColorSchemeLoaded && fontsLoaded) {
      // Only hide the splash screen once everything is ready
      SplashScreen.hideAsync();
    }
  }, [isColorSchemeLoaded, fontsLoaded]);

  if (!isColorSchemeLoaded || !fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack
            initialRouteName='(tabs)'
            screenOptions={{
              headerBackTitle: 'Back',
              headerBackTitleStyle: {
                fontFamily: 'Inter',
              },
              headerTitle(props) {
                return (
                  <Text
                    style={{ fontFamily: 'Inter' }}
                    className='text-md font-semibold text-sys-text-body'
                  >
                    {toOptions(props.children)}
                  </Text>
                );
              },
              headerRight: () => <ThemeToggle />,
            }}
          >
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
        </BottomSheetModalProvider>
        <PortalHost />
      </GestureHandlerRootView>
      <ToastProvider />
    </ThemeProvider>
  );
}

function toOptions(name: string) {
  const title = name
    .split('-')
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(' ');
  return title;
}
