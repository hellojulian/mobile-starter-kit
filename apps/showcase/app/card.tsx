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

const CardMarketing = React.forwardRef<View>((props, ref) => {
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      ref={ref}
      className='flex flex-col justify-start items-start w-full h-[300px] bg-black border border-sys-border-4 rounded-xl'
      accessible={true}
      accessibilityRole='region'
      accessibilityLabel='Cyberdyne systems marketing card'
    >
      <View
        className='relative flex flex-col items-start justify-start w-full h-full rounded-xl border-sys-border-4'
        accessible={true}
        accessibilityRole='none'
      >
        <Image
          className='absolute w-full h-full rounded-xl'
          source={require('../assets/ai.png')} // Replace with your local image path
          accessible={true}
          accessibilityRole='image'
          accessibilityLabel='Cyberdyne systems AI'
          accessibilityIgnoresInvertColors={true}
        />

        {/* Badge at the top - using proper Badge component */}
        <View className='absolute top-4 left-4' accessible={true} accessibilityRole='none'>
          <Badge variant='information'>
            <Text>Cyberdyne systems</Text>
          </Badge>
        </View>

        {/* Main heading in the middle */}
        <View
          className='absolute w-full px-6'
          style={{ top: '40%' }}
          accessible={true}
          accessibilityRole='none'
        >
          <Text
            style={{ fontFamily: 'Inter' }}
            className='text-white text-6xl font-semibold leading-tight'
            accessible={true}
            accessibilityRole='header'
          >
            Will Skynet rule the world?
          </Text>
        </View>

        {/* Buttons at the bottom - using CardFooter pattern */}
        <CardFooter className='absolute bottom-0 w-full flex-row justify-between mt-0'>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button
              variant='default'
              textSize='lg'
              className='w-full bg-[#5c5cff] rounded-full'
              accessibilityRole='button'
              accessibilityLabel='Learn more about Skynet'
            >
              Learn more
            </Button>
          </View>
        </CardFooter>
      </View>
    </View>
  );
});

CardMarketing.displayName = 'CardMarketing';

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
        <View className='items-center justify-center gap-5'>
          {/* Log In Card */}
          <Card accessible={true} accessibilityRole='form' accessibilityLabel='Login form'>
            <CardHeader
              imageSource={require('../assets/guy.png')}
              accessibilityLabel='Eric Andre TV Show'
              accessibilityRole='image'
            >
              <CardTitle style={styles.InterSemiBold} accessibilityRole='heading'>
                Log in to your account
              </CardTitle>
              <CardDescription style={styles.Inter} accessibilityRole='text'>
                Enter your details to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View style={{ marginBottom: 8 }}>
                <Label style={styles.label} nativeID='emailLabel'>
                  Email
                </Label>
                <Input
                  placeholder='Enter your email'
                  accessibilityLabel='Email input'
                  accessibilityHint='Enter your email address'
                  accessibilityLabelledBy='emailLabel'
                  style={[styles.input, { marginTop: 4 }]}
                />
              </View>
              <View>
                <Label style={styles.label} nativeID='passwordLabel'>
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
                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    className='absolute -translate-y-1/2 right-3 top-1/2'
                    accessibilityRole='button'
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                    accessibilityHint='Double tap to toggle password visibility'
                  >
                    {showPassword ? (
                      <Eye size={20} color='#9CA3AF' />
                    ) : (
                      <EyeOff size={20} color='#9CA3AF' />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </CardContent>
            <CardFooter className='flex-row justify-between'>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button
                  variant='secondary'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Cancel login'
                  accessibilityHint='Cancels the login process'
                >
                  Cancel
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  variant='default'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Continue login'
                  accessibilityHint='Submits the login form'
                >
                  Continue
                </Button>
              </View>
            </CardFooter>
          </Card>

          {/* Select Card*/}
          <Card accessible={true} accessibilityRole='form' accessibilityLabel='Select your details'>
            <CardHeader
              imageSource={require('../assets/bjork.png')}
              accessibilityLabel='Bjork image'
              accessibilityRole='image'
            >
              <CardTitle style={styles.InterSemiBold} accessibilityRole='heading'>
                Select music genre
              </CardTitle>
              <CardDescription style={styles.Inter} accessibilityRole='text'>
                Customise your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                defaultValue=''
                accessibilityLabel='Select music genre'
                accessibilityHint='Opens a list of genre options'
              >
                <SelectTrigger ref={triggerRef} className='w-full tracking-tighter'>
                  <SelectValue
                    className='text-md text-foreground native:text-md'
                    placeholder='Select music genre'
                    style={styles.Inter}
                  />
                </SelectTrigger>
                <SelectContent insets={contentInsets} className='w-full mt-2'>
                  <SelectGroup accessibilityRole='radiogroup'>
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
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Text style={styles.Inter} className='mt-4' accessibilityRole='text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Text>
            </CardContent>
            <CardFooter className='flex-row justify-between mt-2'>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button
                  variant='secondary'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Cancel selection'
                  accessibilityHint='Cancels the genre selection process'
                >
                  Cancel
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  variant='default'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Continue with selection'
                  accessibilityHint='Confirms your genre selection and continues'
                >
                  Continue
                </Button>
              </View>
            </CardFooter>
          </Card>

          {/* Entertainment Card */}
          <Card accessible={true} accessibilityRole='article' accessibilityLabel='Information card'>
            <CardHeader
              imageSource={require('../assets/eric.png')}
              accessibilityLabel='Eric Andre Show image'
            >
              <CardOverline text='TV SHOWS' icon={<Tv />} />
              <View className='flex-row items-center justify-between'>
                <CardTitle
                  style={styles.InterSemiBold}
                  accessibilityRole='heading'
                  accessibilityLevel={2}
                >
                  Eric Andre Show
                </CardTitle>
                <Badge variant='brand' accessibilityLabel='Comedy genre'>
                  <Text>Comedy</Text>
                </Badge>
              </View>
              <CardDescription style={styles.Inter} accessibilityRole='text'>
                Episode 1, Season 2
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className='flex-row justify-between'>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button
                  variant='secondary'
                  icon={<Heart />}
                  iconPosition='right'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Add to favourites'
                  accessibilityHint='Adds this show to your favourites list'
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
          >
            <CardHeader
              imageSource={require('../assets/grub.png')}
              accessibilityLabel='Jupiter Glasses product image'
            >
              <View className='flex-row items-center justify-between'>
                <CardTitle
                  style={styles.InterSemiBold}
                  accessibilityRole='heading'
                  accessibilityLevel={2}
                >
                  Jupiter Glasses
                </CardTitle>
                <Badge variant='warning' accessibilityLabel='Inventory status'>
                  <Text>Last pair</Text>
                </Badge>
              </View>
              <CardDescription
                style={styles.Inter}
                accessibilityRole='text'
                accessibilityLabel='Price: 100 dollars'
              >
                $100.00
              </CardDescription>
            </CardHeader>
            <CardFooter className='flex-row justify-between mt-0'>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button
                  variant='secondary'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Add to cart'
                  accessibilityHint='Adds Jupiter Glasses to your shopping cart'
                >
                  Add to cart
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  variant='default'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Purchase now'
                  accessibilityHint='Proceeds directly to checkout with Jupiter Glasses'
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
          >
            <CardHeader
              imageSource={require('../assets/air.png')}
              accessibilityLabel='Nike Air Max 97 sneakers image'
            >
              <CardOverline
                text='LIMITED EDITION'
                icon={<InfoIcon />}
                accessibilityLabel='Limited edition product'
              />
              <View className='flex-row items-center justify-between'>
                <CardTitle
                  style={styles.InterSemiBold}
                  accessibilityRole='heading'
                  accessibilityLevel={2}
                >
                  Nike Air Max 97
                </CardTitle>
                <Badge variant='success' accessibilityLabel='Sale status'>
                  <Text>On sale</Text>
                </Badge>
              </View>
              <CardDescription
                style={styles.Inter}
                accessibilityRole='text'
                accessibilityLabel='Price: 100 dollars'
              >
                $100.00
              </CardDescription>
            </CardHeader>
            <CardFooter className='flex-row justify-between mt-0'>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Button
                  variant='secondary'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Add to cart'
                  accessibilityHint='Adds Nike Air Max 97 to your shopping cart'
                >
                  Add to cart
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  variant='default'
                  textSize='md'
                  className='w-full tracking-tighter'
                  accessibilityRole='button'
                  accessibilityLabel='Purchase now'
                  accessibilityHint='Proceeds directly to checkout with Nike Air Max 97'
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
          >
            <CardHeader
              imageSource={require('../assets/halloween.png')}
              accessibilityLabel='Halloween III movie poster'
            >
              <View className='flex-row items-center justify-between'>
                <CardTitle
                  style={styles.InterSemiBold}
                  accessibilityRole='heading'
                  accessibilityLevel={2}
                >
                  Halloween III
                </CardTitle>
                <Badge variant='warning' accessibilityLabel='Screening status'>
                  <Text>Last screening</Text>
                </Badge>
              </View>
              <CardDescription
                style={styles.Inter}
                accessibilityRole='text'
                accessibilityLabel='Ticket price: 12 dollars'
              >
                $12.00
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View
                className='flex-row gap-1'
                accessibilityLabel='Available screening times'
                accessibilityRole='group'
              >
                <Badge variant='default' accessibilityLabel='5:30 PM screening'>
                  <Text className='text-xs text-sys-text-secondary'>5:30PM</Text>
                </Badge>
                <Badge variant='default' accessibilityLabel='6:30 PM screening'>
                  <Text className='text-xs text-sys-text-secondary'>6:30PM</Text>
                </Badge>
                <Badge variant='default' accessibilityLabel='7:30 PM screening'>
                  <Text className='text-xs text-sys-text-secondary'>7:30PM</Text>
                </Badge>
                <Badge variant='default' accessibilityLabel='8:30 PM screening'>
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
          >
            <CardFooter
              className='absolute bottom-0 w-full flex-row justify-between mt-0'
              accessible={true}
              accessibilityRole='none'
            >
              <View style={{ flex: 1, marginRight: 8 }} accessible={true} accessibilityRole='none'>
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
