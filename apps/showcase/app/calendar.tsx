"use client"

import { DeprecatedUi } from "@rnr/reusables"
import * as React from "react"
import { ScrollView, StyleSheet, Text } from "react-native"
import { useColorScheme } from "~/lib/useColorScheme"

const { Calendar, LocaleConfig } = DeprecatedUi

LocaleConfig.defaultLocale = "en"

const styles = StyleSheet.create({
  Inter: {
    fontFamily: "Inter",
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 32,
  },
  calendarTitle: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
})

export default function CalendarScreen() {
  const { isDarkColorScheme } = useColorScheme()
  const [selectedDate, setSelectedDate] = React.useState("")
  const [selectedDates, setSelectedDates] = React.useState<string[]>([])

  // Enhanced theme with better styling for selected dates
  const baseTheme = {
    textDayfontFamily: "Inter",
    textMonthfontFamily: "Inter",
    textDayHeaderfontFamily: "Inter",
    selectedDayBackgroundColor: isDarkColorScheme ? "#5B4CFF" : "#5B4CFF",
    selectedDayTextColor: "#ffffff",
    todayTextColor: isDarkColorScheme ? "#5B4CFF" : "#5B4CFF",
    dayTextColor: isDarkColorScheme ? "#e5e7eb" : "#374151",
    textDisabledColor: isDarkColorScheme ? "#4b5563" : "#d1d5db",
    dotColor: isDarkColorScheme ? "#5B4CFF" : "#5B4CFF",
    selectedDotColor: "#ffffff",
    arrowColor: isDarkColorScheme ? "#5B4CFF" : "#5B4CFF",
    monthTextColor: isDarkColorScheme ? "#f9fafb" : "#111827",
    textMonthFontWeight: "600",
    textDayFontSize: 14,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 13,
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString)
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: isDarkColorScheme ? "#5B4CFF" : "#5B4CFF",
            selectedTextColor: "#ffffff",
            // Removed dot indicator
          },
        }}
        theme={baseTheme}
      />
    </ScrollView>
  )
}

function getMarkedDates(dates: string[], isDark: boolean) {
  return dates.reduce(
    (acc, date) => {
      acc[date] = {
        selected: true,
        selectedColor: "#5B4CFF",
        selectedTextColor: "#ffffff",
        // Removed dot indicator
      }
      return acc
    },
    {} as Record<
      string,
      {
        selected: boolean
        selectedColor: string
        selectedTextColor?: string
      }
    >,
  )
}
