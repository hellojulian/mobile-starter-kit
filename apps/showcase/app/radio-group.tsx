"use client"

import * as React from "react"
import { View, ScrollView } from "react-native"
import { Label } from "~/components/ui/label"
import { RadioGroup, RadioGroupItem, RadioTile } from "~/components/ui/radio-group"
import { Globe, Mail, Bell } from "lucide-react-native"

export default function RadioGroupScreen() {
  const [value, setValue] = React.useState("Comfortable")
  const [layoutValue, setLayoutValue] = React.useState("expanded") // Set to expanded to match screenshot

  function onLabelPress(label: string) {
    return () => {
      setValue(label)
    }
  }

  return (
    <ScrollView className="p-4">
      <View className="gap-8">
        {/* Standard radio group */}
        <View>
          <Label
            className="text-lg font-medium mb-6"
            accessibilityRole="header"
            accessibilityLevel={2}
            nativeID="radio-section-header"
          >
            Radio
          </Label>
          <RadioGroup
            value={value}
            onValueChange={setValue}
            className="gap-sm"
            accessibilityRole="radiogroup"
            accessibilityLabel="Display options"
            accessibilityHint="Select your preferred option"
            accessibilityLiveRegion="polite"
          >
            <RadioGroupItemWithLabel
              value="Default"
              onLabelPress={onLabelPress("Default")}
              accessibilityRole="radio"
              accessibilityLabel="Default option"
              accessibilityState={{
                checked: value === "Default",
                disabled: false,
              }}
            />
            <RadioGroupItemWithLabel
              value="Comfortable"
              onLabelPress={onLabelPress("Comfortable")}
              accessibilityRole="radio"
              accessibilityLabel="Comfortable option"
              accessibilityState={{
                checked: value === "Comfortable",
                disabled: false,
              }}
            />
            <RadioGroupItemWithLabel
              value="Compact"
              onLabelPress={onLabelPress("Compact")}
              accessibilityRole="radio"
              accessibilityLabel="Compact option"
              accessibilityState={{
                checked: value === "Compact",
                disabled: false,
              }}
            />
          </RadioGroup>
        </View>
        {/* Radio tiles section */}
        <View className="gap-4">
          <Label
            className="text-lg font-medium mb-2"
            accessibilityRole="header"
            accessibilityLevel={2}
            nativeID="radio-tile-section-header"
          >
            Radio Tile
          </Label>
          <RadioGroup
            value={layoutValue}
            onValueChange={setLayoutValue}
            accessibilityRole="radiogroup"
            accessibilityLabel="Layout options"
            accessibilityHint="Select your preferred layout style"
            accessibilityLiveRegion="polite"
          >
            <View className="gap-4">
              <RadioTile
                title="Default layout"
                description="Standard layout with balanced spacing and elements."
                icon={<Globe size={24} accessibilityRole="image" accessibilityLabel="Globe icon" />}
                value="default"
                checked={layoutValue === "default"}
                accessibilityRole="radio"
                accessibilityState={{
                  checked: layoutValue === "default",
                  disabled: false,
                }}
                accessibilityLabel="Default layout - Standard layout with balanced spacing and elements"
              />

              <RadioTile
                title="Compact layout"
                description="Reduced spacing for more content on screen."
                icon={<Mail size={24} accessibilityRole="image" accessibilityLabel="Mail icon" />}
                value="compact"
                checked={layoutValue === "compact"}
                accessibilityRole="radio"
                accessibilityState={{
                  checked: layoutValue === "compact",
                  disabled: false,
                }}
                accessibilityLabel="Compact layout - Reduced spacing for more content on screen"
              />

              <RadioTile
                title="Expanded layout"
                description="More space between elements for better readability."
                icon={<Bell size={24} accessibilityRole="image" accessibilityLabel="Bell icon" />}
                value="expanded"
                checked={layoutValue === "expanded"}
                accessibilityRole="radio"
                accessibilityState={{
                  checked: layoutValue === "expanded",
                  disabled: false,
                }}
                accessibilityLabel="Expanded layout - More space between elements for better readability"
              />
            </View>
          </RadioGroup>
        </View>
      </View>
    </ScrollView>
  )
}

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string
  onLabelPress: () => void
}) {
  return (
    <View className={"flex-row gap-xs items-center"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {value}
      </Label>
    </View>
  )
}
