"use client"

import * as React from "react"
import { View, ScrollView } from "react-native"
import { Checkbox, CheckboxTile } from "~/components/ui/checkbox"
import { Label } from "~/components/ui/label"
import { Globe, Mail, Bell } from "lucide-react-native"

export default function CheckboxScreen() {
  const [checked, setChecked] = React.useState(false)
  const [tileChecked, setTileChecked] = React.useState(false)
  const [emailChecked, setEmailChecked] = React.useState(false)
  const [notificationsChecked, setNotificationsChecked] = React.useState(false)

  return (
    <ScrollView>
      <View className="p-4 gap-8">
        {/* Original checkbox */}
        <View className="flex-row gap-3 items-center">
          <Checkbox aria-labelledby="terms" checked={checked} onCheckedChange={setChecked} />
          <Label nativeID="terms" onPress={() => setChecked((prev) => !prev)}>
            Accept terms and conditions
          </Label>
        </View>

        {/* Checkbox tiles section */}
        <View className="gap-4">
          <CheckboxTile
            title="Checkbox tile"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            icon={<Globe size={24} />}
            checked={tileChecked}
            onCheckedChange={setTileChecked}
          />

          <CheckboxTile
            title="Email notifications"
            description="Receive email notifications when someone mentions you."
            icon={<Mail size={24} />}
            checked={emailChecked}
            onCheckedChange={setEmailChecked}
          />

          <CheckboxTile
            title="Push notifications"
            description="Allow the app to send you push notifications."
            icon={<Bell size={24} />}
            checked={notificationsChecked}
            onCheckedChange={setNotificationsChecked}
          />
        </View>
      </View>
    </ScrollView>
  )
}

