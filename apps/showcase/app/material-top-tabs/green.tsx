"use client"

import React, { useState, useCallback } from "react"
import { View } from "react-native"
import { Text } from "~/components/ui/text"
import { Muted } from "~/components/ui/typography"
import { StyleSheet, ScrollView, SafeAreaView, Platform, RefreshControl } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Card, CardContent, CardOverline, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Button } from "~/components/ui/button"
import { useFonts } from "expo-font"
import { Tv, Heart } from "lucide-react-native"
import { Badge } from "~/components/ui/badge"

const styles = StyleSheet.create({
  Inter: {
    fontFamily: "Inter",
  },
  InterSemiBold: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "500",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  label: {
    fontFamily: "Inter",
    paddingBottom: 4,
    paddingLeft: 2,
  },
  input: {
    fontFamily: "Inter",
  },
})

export default function BlueScreen() {
  const [showPassword, setShowPassword] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const triggerRef = React.useRef<React.ElementRef<typeof SelectTrigger>>(null)
  const insets = useSafeAreaInsets()
  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/fonts/Inter-Medium.ttf"),
  })

  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 12,
    right: 12,
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    // Simulate a data fetch or any other asynchronous operation
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="items-center justify-center gap-5">
          <View className="items-center gap-1 w-full max-w-md">
          {/* Entertainment Card */}
          <Card accessible={true} accessibilityRole='article' accessibilityLabel='Information card'>
            <CardHeader
              imageSource={require('../../assets/eric.png')}
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
            <Muted className="py-4">Swipe to see other tabs</Muted>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
