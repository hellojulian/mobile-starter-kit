import * as React from 'react';
import { Platform, ScrollView, View, SafeAreaView } from 'react-native';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { PhoneInput } from '~/components/ui/phone-input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { useFonts } from 'expo-font';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function InputScreen() {
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  const insets = useSafeAreaInsets();
  
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 12,
    right: 12,
  };

  // Phone input state
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [countryCode, setCountryCode] = React.useState<string>('+61');
  const [phoneErr, setPhoneErr] = React.useState<string | null>(null);

  function handlePhoneChange(text: string) {
    if (phoneErr) {
      setPhoneErr(null);
    }
    setPhoneNumber(text);
  }

  function handleCountryCodeChange(code: string) {
    setCountryCode(code);
  }

  function validatePhone() {
    if (!phoneNumber || phoneNumber.length < 5) {
      setPhoneErr('Please enter a valid phone number');
    } else {
      setPhoneErr(null);
      console.log('Phone submitted:', countryCode + phoneNumber);
    }
  }

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
        <View style={{ width: '100%', maxWidth: 343 }}>
          {/* Phone Input Section */}
          <Label
  style={{
    fontFamily: 'Inter-SemiBold',
    paddingBottom: 8,
    paddingLeft: 2,
  }}
  nativeID='phoneLabel'
  accessibilityRole='text'
>
  Phone number
</Label>
<PhoneInput
  placeholder="Enter phone number"
  error={phoneErr || undefined}
  value={phoneNumber}
  onChangeText={handlePhoneChange}
  countryCode={countryCode}
  onChangeCountryCode={handleCountryCodeChange}
  onSubmitEditing={validatePhone}
  accessibilityLabel="Phone number input"
  accessibilityHint="Enter your phone number with country code"
  accessibilityRole="textbox"
  accessibilityLabelledBy="phoneLabel"
  accessibilityState={{
    disabled: false,
    required: true, // Assuming this field is required
    invalid: !!phoneErr
  }}
  accessibilityElementsHidden={false}
  importantForAccessibility="yes"
  aria-errormessage="phoneErrorMessage"
/>
{phoneErr && (
  <View 
    nativeID="phoneErrorMessage"
    accessibilityRole="alert"
    accessibilityLiveRegion="assertive"
    style={{ marginTop: 4 }}
  >
    <Text style={{ color: 'red', fontFamily: 'Inter' }}>{phoneErr}</Text>
  </View>
)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ErrorMessage({ msg, id = 'error' }: { msg: string; id?: string }) {
  if (Platform.OS === 'web') {
    return (
      <Text
        style={{ fontFamily: 'Inter' }}
        className='text-sys-fn-error-text text-sm native:px-1 py-1.5 web:animate-in web:zoom-in-95'
        aria-invalid='true'
        id={id}
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
      id={id}
    >
      {msg}
    </Animated.Text>
  );
}