"use client"

import React, { useState, useCallback } from "react"
import { View } from "react-native"
import { Muted } from "~/components/ui/typography"
import { StyleSheet, ScrollView, SafeAreaView, Platform, RefreshControl } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { CardFooter, CardMarketing } from "~/components/ui/card"
import type { SelectTrigger } from "~/components/ui/select"
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
  marketingCard: {
    width: "100%",
    alignSelf: "center",
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
        <View className="items-center justify-center gap-5 px-4">
          <View className="items-center gap-1 w-full max-w-md">
            {/* Marketing Card */}
            <CardMarketing
              style={styles.marketingCard}
              className="w-full"
              imageSource={require("../../assets/ai.png")}
              badgeText="Cyberdyne Systems"
              headingText="Will Skynet Rule The World?"
              accessible={true}
              accessibilityRole="region"
              accessibilityLabel="Cyberdyne Systems marketing card about Skynet"
            >
              <CardFooter
                className="absolute bottom-0 w-full flex-row justify-center mt-0 px-4 pb-4"
                accessible={true}
                accessibilityRole="none"
              >
                <View accessible={true} accessibilityRole="none" style={{ width: "100%" }}>
                  <Button
                    variant="default"
                    textSize="md"
                    className="w-full rounded-full"
                    accessibilityRole="button"
                    accessibilityLabel="Learn more about Skynet"
                    accessibilityHint="Opens more information about Skynet technology"
                    importantForAccessibility="yes"
                  >
                    Learn More
                  </Button>
                </View>
              </CardFooter>
            </CardMarketing>
            <Muted className="py-4">Swipe to see other tabs</Muted>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
