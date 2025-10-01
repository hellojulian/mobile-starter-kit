"use client"

import React, { useState, useCallback } from "react"
import { View } from "react-native"
import { Text } from "~/components/ui/text"
import { Muted } from "~/components/ui/typography"
import { StyleSheet, ScrollView, SafeAreaView, Platform, RefreshControl } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Button } from "~/components/ui/button"
import { useFonts } from "expo-font"

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
          <View className="items-center gap-xxs w-full max-w-md">
            {/* Select Card*/}
            <Card accessible={true} accessibilityRole="form" accessibilityLabel="Select your details">
              <CardHeader
                imageSource={require("../../assets/bjork.png")}
                accessibilityLabel="Bjork image"
                accessibilityRole="image"
              >
                <CardTitle style={styles.InterSemiBold} accessibilityRole="heading">
                  Select music genre
                </CardTitle>
                <CardDescription style={styles.Inter} accessibilityRole="text">
                  Customise your experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  defaultValue=""
                  accessibilityLabel="Select music genre"
                  accessibilityHint="Opens a list of genre options"
                >
                  <SelectTrigger ref={triggerRef} className="w-full tracking-tighter">
                    <SelectValue
                      className="text-md text-foreground native:text-md"
                      placeholder="Select music genre"
                      style={styles.Inter}
                    />
                  </SelectTrigger>
                  <SelectContent insets={contentInsets} className="w-full mt-2">
                    <SelectGroup accessibilityRole="radiogroup">
                      {[
                        { label: "Jazz", value: "jazz" },
                        { label: "Electronica", value: "electronica" },
                        { label: "Dub / Experimental", value: "dub experimental" },
                        { label: "Rock", value: "rock" },
                      ].map((item) => (
                        <SelectItem
                          key={item.value}
                          label={item.label}
                          value={item.value}
                          style={styles.Inter}
                          accessibilityRole="radio"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Text style={styles.Inter} className="mt-4" accessibilityRole="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </Text>
              </CardContent>
              <CardFooter className="flex-row justify-between mt-2">
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Button
                    variant="secondary"
                    textSize="md"
                    className="w-full tracking-tighter"
                    accessibilityRole="button"
                    accessibilityLabel="Cancel selection"
                    accessibilityHint="Cancels the genre selection process"
                  >
                    Cancel
                  </Button>
                </View>
                <View style={{ flex: 1 }}>
                  <Button
                    variant="default"
                    textSize="md"
                    className="w-full tracking-tighter"
                    accessibilityRole="button"
                    accessibilityLabel="Continue with selection"
                    accessibilityHint="Confirms your genre selection and continues"
                  >
                    Continue
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
