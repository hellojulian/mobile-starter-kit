"use client"

import { Ui } from "@rnr/reusables"
import * as React from "react"
import { ScrollView, StyleSheet, View } from "react-native"

const { Calendar } = Ui

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 32,
  },
})

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date())

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View className="items-center">
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          className="w-full max-w-sm"
        />
      </View>
    </ScrollView>
  )
}

