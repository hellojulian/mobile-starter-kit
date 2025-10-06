'use client';

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardOverline,
  CardMarketing,
} from '~/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Skeleton } from '~/components/ui/skeleton';
import { Text } from '~/components/ui/text';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useFonts } from 'expo-font';
import { Eye, EyeOff, Heart, Tv, InfoIcon } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
  InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '500',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontFamily: 'Inter',
    paddingBottom: 4,
    paddingLeft: 2,
  },
  input: {
    fontFamily: 'Inter',
  },
});

export default function CardScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const triggerRef = React.useRef<React.ElementRef<typeof SelectTrigger>>(null);
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
  });
  const { isDarkColorScheme } = useColorScheme();

  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 12,
    right: 12,
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a data fetch or any other asynchronous operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className='items-center justify-center gap-lg'>
          {/* Log In Card */}
          <Card
            accessible={true}
            accessibilityRole='form'
            accessibilityLabel='Login form'
            importantForAccessibility='yes'
          >
            <CardHeader
              imageSource={require('../assets/guy.png')}
              accessibilityLabel='Login form illustration'
              accessibilityRole='image'
              accessibilityElementsHidden={true}
            >
              <CardTitle
                style={styles.InterSemiBold}
                accessibilityRole='heading'
                accessibilityLevel={1}
                nativeID='login-title'
              >
                Log in to your account
              </CardTitle>
              <CardDescription
                style={styles.Inter}
                accessibilityRole='text'
                nativeID='login-description'
              >
                Enter your details to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View style={{ marginBottom: 8 }}>
                <Label style={styles.label} nativeID='emailLabel' accessibilityRole='text'>
                  Email
                </Label>
                <Input
                  placeholder='Enter your email'
                  accessibilityLabel='Email input'
                  accessibilityHint='Enter your email address'
                  accessibilityLabelledBy='emailLabel'
                  style={[styles.input, { marginTop: 4 }]}
                  accessibilityRequired={true}
                  accessibilityState={{
                    disabled: false,
                    required: true,
                  }}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoComplete='email'
                />
              </View>
              <View>
                <Label style={styles.label} nativeID='passwordLabel' accessibilityRole='text'>
                  Password
                </Label>
                <View className='relative'>
                  <Input
                    placeholder='Enter your password'
                    secureTextEntry={!showPassword}
                    accessibilityLabel='Password input'
                    accessibilityHint='Enter your password'
                    accessibilityLabelledBy='passwordLabel'
                    style={[styles.input, { marginTop: 4 }]}
                    accessibilityRequired={true}
                    accessibilityState={{
                      disabled: false,
                      required: true,
                    }}
                    autoComplete='password'
                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    className='absolute -translate-y-1/2 right-3 top-1/2'
                    accessibilityRole='button'
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                    accessibilityHint='Double tap to toggle password visibility'
                    accessibilityState={{
                      checked: showPassword,
                    }}
                  >
                    {showPassword ? (
                      <Eye size={20} color={isDarkColorScheme ? '#ffffff' : '#000000'} accessibilityElementsHidden={true} />
                    ) : (
                      <EyeOff size={20} color={isDarkColorScheme ? '#ffffff' : '#000000'} accessibilityElementsHidden={true} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </CardContent>
            <CardFooter className='flex-row justify-between'>
              <View style={{ flex: 1, marginRight: 8 }} accessibilityElementsHidden={false}>
                <Button
                  variant='secondary'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Cancel login'
                  accessibilityHint='Cancels the login process'
                  accessibilityState={{ disabled: false }}
                >
                  Cancel
                </Button>
              </View>
              <View style={{ flex: 1 }} accessibilityElementsHidden={false}>
                <Button
                  variant='default'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Continue login'
                  accessibilityHint='Submits the login form'
                  accessibilityState={{ disabled: false }}
                >
                  Continue
                </Button>
              </View>
            </CardFooter>
          </Card>
          {/* Select Card*/}
          <Card
            accessible={true}
            accessibilityRole='form'
            accessibilityLabel='Select your details'
            importantForAccessibility='yes'
          >
            <CardHeader
              imageSource={require('../assets/bjork.png')}
              accessibilityLabel='Bjork image'
              accessibilityRole='image'
            >
              <CardTitle
                style={styles.InterSemiBold}
                accessibilityRole='heading'
                accessibilityLevel={1}
                nativeID='form-title'
              >
                Select music genre
              </CardTitle>
              <CardDescription
                style={styles.Inter}
                accessibilityRole='text'
                nativeID='form-description'
              >
                Customise your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                defaultValue=''
                accessibilityLabel='Select music genre'
                accessibilityHint='Opens a list of genre options'
                accessibilityRole='combobox'
                accessibilityState={{
                  expanded: false, // Use a static value or implement state management
                  disabled: false,
                }}
                onOpenChange={(open) => {
                  // You can implement state management here if needed
                  // Example: setIsExpanded(open);
                }}
                accessibilityLiveRegion='polite'
              >
                <SelectTrigger
                  ref={triggerRef}
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Select music genre dropdown'
                  accessibilityHint='Press to open genre options'
                >
                  <SelectValue
                    className='text-md text-foreground native:text-md'
                    placeholder='Select music genre'
                    style={styles.Inter}
                    accessibilityLabel='No genre selected'
                    importantForAccessibility='yes'
                  />
                </SelectTrigger>
                <SelectContent
                  insets={contentInsets}
                  className='w-full mt-xs'
                  accessibilityRole='menu'
                  accessibilityLabel='Genre options'
                  accessibilityViewIsModal={true}
                >
                  <SelectGroup
                    accessibilityRole='radiogroup'
                    accessibilityLabel='Music genre options'
                  >
                    {[
                      { label: 'Jazz', value: 'jazz' },
                      { label: 'Electronica', value: 'electronica' },
                      { label: 'Dub / Experimental', value: 'dub experimental' },
                      { label: 'Rock', value: 'rock' },
                    ].map((item) => (
                      <SelectItem
                        key={item.value}
                        label={item.label}
                        value={item.value}
                        style={styles.Inter}
                        accessibilityRole='radio'
                        accessibilityLabel={item.label}
                        accessibilityState={{
                          checked: false, // This should be updated based on your state management
                          disabled: false,
                        }}
                        accessibilityHint={`Select ${item.label} as your music genre`}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Text
                style={styles.Inter}
                className='mt-md'
                accessibilityRole='text'
                accessibilityLabel='Additional information'
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Text>
            </CardContent>
            <CardFooter className='flex-row justify-between mt-xs'>
              <View
                style={{ flex: 1, marginRight: 8 }}
                accessibilityElementsHidden={false}
                importantForAccessibility='no-hide-descendants'
              >
                <Button
                  variant='secondary'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Cancel selection'
                  accessibilityHint='Cancels the genre selection process'
                  accessibilityState={{ disabled: false }}
                >
                  Cancel
                </Button>
              </View>
              <View
                style={{ flex: 1 }}
                accessibilityElementsHidden={false}
                importantForAccessibility='no-hide-descendants'
              >
                <Button
                  variant='default'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Continue with selection'
                  accessibilityHint='Confirms your genre selection and continues'
                  accessibilityState={{ disabled: false }}
                >
                  Continue
                </Button>
              </View>
            </CardFooter>
          </Card>
          {/* Entertainment Card */}
          <Card
            accessible={true}
            accessibilityRole='article'
            accessibilityLabel='TV Show card for Eric Andre Show'
            importantForAccessibility='yes'
          >
            <CardHeader
              imageSource={require('../assets/eric.png')}
              accessibilityLabel='Eric Andre Show image'
              accessibilityRole='image'
            >
              <CardOverline
                text='TV SHOWS'
                icon={<Tv accessibilityElementsHidden={true} />}
                accessibilityRole='text'
                accessibilityLabel='Category: TV Shows'
              />
              <View className='flex-row items-center justify-between'>
                <CardTitle
                  style={styles.InterSemiBold}
                  accessibilityRole='heading'
                  accessibilityLevel={2}
                  nativeID='show-title'
                >
                  Eric Andre Show
                </CardTitle>
                <Badge variant='brand' accessibilityLabel='Genre: Comedy' accessibilityRole='text'>
                  <Text>Comedy</Text>
                </Badge>
              </View>
              <CardDescription
                style={styles.Inter}
                accessibilityRole='text'
                accessibilityLabel='Episode 1, Season 2'
                nativeID='show-description'
              >
                Episode 1, Season 2
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className='flex-row justify-between'>
              <View style={{ flex: 1, marginRight: 8 }} accessibilityElementsHidden={false}>
                <Button
                  variant='secondary'
                  icon={
                    <Heart accessibilityLabel='heart icon' accessibilityElementsHidden={true} />
                  }
                  iconPosition='right'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Add to favourites'
                  accessibilityHint='Adds this show to your favourites list'
                  accessibilityState={{ disabled: false }}
                >
                  Add to favourites
                </Button>
              </View>
            </CardFooter>
          </Card>
          {/* Commerce Card */}
          <Card
            accessible={true}
            accessibilityRole='article'
            accessibilityLabel='Product card for Jupiter Glasses'
            importantForAccessibility='yes'
          >
            <CardHeader
              imageSource={require('../assets/grub.png')}
              accessibilityLabel='Jupiter Glasses product image'
              accessibilityRole='image'
            >
              <View className='flex-row items-center justify-between'>
                <CardTitle
                  style={styles.InterSemiBold}
                  accessibilityRole='heading'
                  accessibilityLevel={2}
                  nativeID='product-title'
                >
                  Jupiter Glasses
                </CardTitle>
                <Badge
                  variant='warning'
                  accessibilityLabel='Inventory status: Last pair'
                  accessibilityRole='text'
                >
                  <Text>Last pair</Text>
                </Badge>
              </View>
              <CardDescription
                style={styles.Inter}
                accessibilityRole='text'
                accessibilityLabel='Price: 100 dollars'
                nativeID='product-price'
              >
                $100.00
              </CardDescription>
            </CardHeader>
            <CardFooter className='flex-row justify-between mt-0'>
              <View style={{ flex: 1, marginRight: 8 }} accessibilityElementsHidden={false}>
                <Button
                  variant='secondary'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Add to cart'
                  accessibilityHint='Adds Jupiter Glasses to your shopping cart'
                  accessibilityState={{ disabled: false }}
                >
                  Add to cart
                </Button>
              </View>
              <View style={{ flex: 1 }} accessibilityElementsHidden={false}>
                <Button
                  variant='default'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Purchase now'
                  accessibilityHint='Proceeds directly to checkout with Jupiter Glasses'
                  accessibilityState={{ disabled: false }}
                >
                  Purchase
                </Button>
              </View>
            </CardFooter>
          </Card>
          {/* Rating Card */}
          <Card
            accessible={true}
            accessibilityRole='article'
            accessibilityLabel='Product card for Nike Air Max 97'
            importantForAccessibility='yes'
          >
            <CardHeader
              imageSource={require('../assets/air.png')}
              accessibilityLabel='Nike Air Max 97 sneakers image'
              accessibilityRole='image'
            >
              <CardOverline
                text='LIMITED EDITION'
                icon={<InfoIcon accessibilityElementsHidden={true} />}
                accessibilityLabel='Limited edition product'
                accessibilityRole='text'
              />
              <View className='flex-row items-center justify-between'>
                <CardTitle
                  style={styles.InterSemiBold}
                  accessibilityRole='heading'
                  accessibilityLevel={2}
                  nativeID='product-title'
                >
                  Nike Air Max 97
                </CardTitle>
                <Badge
                  variant='success'
                  accessibilityLabel='Sale status: On sale'
                  accessibilityRole='text'
                >
                  <Text>On sale</Text>
                </Badge>
              </View>
              <CardDescription
                style={styles.Inter}
                accessibilityRole='text'
                accessibilityLabel='Price: 100 dollars'
                nativeID='product-price'
              >
                $100.00
              </CardDescription>
            </CardHeader>
            <CardFooter className='flex-row justify-between mt-0'>
              <View
                style={{ flex: 1, marginRight: 8 }}
                accessibilityElementsHidden={false}
                importantForAccessibility='no-hide-descendants'
              >
                <Button
                  variant='secondary'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Add to cart'
                  accessibilityHint='Adds Nike Air Max 97 to your shopping cart'
                  accessibilityState={{ disabled: false }}
                >
                  Add to cart
                </Button>
              </View>
              <View
                style={{ flex: 1 }}
                accessibilityElementsHidden={false}
                importantForAccessibility='no-hide-descendants'
              >
                <Button
                  variant='default'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Purchase now'
                  accessibilityHint='Proceeds directly to checkout with Nike Air Max 97'
                  accessibilityState={{ disabled: false }}
                >
                  Purchase
                </Button>
              </View>
            </CardFooter>
          </Card>
          {/* Badge Array Card */}
          <Card
            accessible={true}
            accessibilityRole='article'
            accessibilityLabel='Movie screening card for Halloween III'
            importantForAccessibility='yes'
          >
            <CardHeader
              imageSource={require('../assets/halloween.png')}
              accessibilityLabel='Halloween III movie poster'
              accessibilityRole='image'
            >
              <View className='flex-row items-center justify-between'>
                <CardTitle
                  style={styles.InterSemiBold}
                  accessibilityRole='heading'
                  accessibilityLevel={2}
                  nativeID='card-title'
                >
                  Halloween III
                </CardTitle>
                <Badge
                  variant='warning'
                  accessibilityLabel='Screening status: Last screening'
                  accessibilityRole='text'
                >
                  <Text>Last screening</Text>
                </Badge>
              </View>
              <CardDescription
                style={styles.Inter}
                accessibilityRole='text'
                accessibilityLabel='Ticket price: 12 dollars'
                nativeID='card-description'
              >
                $12.00
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View
                className='flex-row gap-xxs'
                accessibilityLabel='Available screening times'
                accessibilityRole='group'
                accessibilityHint='List of available screening times for Halloween III'
              >
                <Badge
                  variant='default'
                  accessibilityLabel='5:30 PM screening'
                  accessibilityRole='button'
                >
                  <Text className='text-xs text-sys-text-secondary'>5:30PM</Text>
                </Badge>
                <Badge
                  variant='default'
                  accessibilityLabel='6:30 PM screening'
                  accessibilityRole='button'
                >
                  <Text className='text-xs text-sys-text-secondary'>6:30PM</Text>
                </Badge>
                <Badge
                  variant='default'
                  accessibilityLabel='7:30 PM screening'
                  accessibilityRole='button'
                >
                  <Text className='text-xs text-sys-text-secondary'>7:30PM</Text>
                </Badge>
                <Badge
                  variant='default'
                  accessibilityLabel='8:30 PM screening'
                  accessibilityRole='button'
                >
                  <Text className='text-xs text-sys-text-secondary'>8:30PM</Text>
                </Badge>
              </View>
            </CardContent>
            <CardFooter className='flex-row justify-between mt-0'>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button
                  variant='default'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Continue to ticket selection'
                  accessibilityHint='Proceeds to select seats and purchase tickets for Halloween III'
                  accessibilityState={{ disabled: false }}
                >
                  Continue
                </Button>
              </View>
            </CardFooter>
          </Card>
          {/* Marketing Card */}
          <CardMarketing
            imageSource={require('../assets/ai.png')}
            badgeText='Cyberdyne Systems'
            headingText='Will Skynet Rule The World?'
            accessible={true}
            accessibilityRole='region'
            accessibilityLabel='Cyberdyne Systems marketing card about Skynet'
            className='w-full' // Ensure full width
          >
            <CardFooter
              className='absolute bottom-0 w-full px-lg pb-lg' // Added proper padding
              accessible={true}
              accessibilityRole='none'
            >
              <View style={{ flex: 1 }} accessible={true} accessibilityRole='none'>
                <Button
                  variant='default'
                  textSize='md'
                  className='w-full rounded-full'
                  accessibilityRole='button'
                  accessibilityLabel='Learn more about Skynet'
                  accessibilityHint='Opens more information about Skynet technology'
                  importantForAccessibility='yes'
                >
                  Learn More
                </Button>
              </View>
            </CardFooter>
          </CardMarketing>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
