import * as React from 'react';
import { Platform, ScrollView, TextInput, View, SafeAreaView } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';
import { useFonts } from 'expo-font';


export default function InputScreen() {
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  const inputRef = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState<string>('');
  const [err, setErr] = React.useState<string | null>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  function handleOnLabelPress() {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.isFocused()) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }

  function onChangeText(text: string) {
    if (err) {
      setErr(null);
    }
    setValue(text);
  }

  function onSubmitEditing() {
    setErr('Incorrect email please try again');
  }

  const getInputState = () => {
    if (err) return 'error';
    if (isFocused) return 'active';
    return 'default';
  };

  const inputState = getInputState();

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <View style={{ width: '100%', maxWidth: 320 }}>
          <Label
            style={{
              fontFamily: 'Inter-SemiBold',
              paddingBottom: 8,
              paddingLeft: 2,
            }}
            nativeID='inputLabel'
            onPress={handleOnLabelPress}
          >
            Enter email
          </Label>
          <Input
            ref={inputRef}
            placeholder='Enter your email'
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-labelledby='inputLabel'
            aria-errormessage='inputError'
            style={{ fontFamily: 'Inter' }}
            className={cn(
              inputState === 'error' &&
                'border-sys-border-error border-2 bg-sys-fn-error text-sys-text-body placeholder:text-sys-error',
              inputState === 'active' &&
                'border-sys-border-6 border-2 bg-sys-secondary-pressed text-sys-text-body placeholder:text-sys-text-secondary'
            )}
          />
          {err && <ErrorMessage msg={err} />}
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ErrorMessage({ msg }: { msg: string }) {
  if (Platform.OS === 'web') {
    return (
      <Text
        style={{ fontFamily: 'Inter' }}
        className='text-sys-fn-error-text text-sm native:px-1 py-1.5 web:animate-in web:zoom-in-95'
        aria-invalid='true'
        id='inputError'
      >
        {msg}
      </Text>
    );
  }
  return (
    <Animated.Text
      entering={FadeInDown}
      exiting={FadeOut.duration(275)}
      style={{ fontFamily: 'Inter' }}
      className='text-sys-fn-error-text text-sm native:px-1 py-1.5'
      aria-invalid='true'
      id='inputError'
    >
      {msg}
    </Animated.Text>
  );
}
