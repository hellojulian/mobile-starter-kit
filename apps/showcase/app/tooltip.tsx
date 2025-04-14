"use client"

import { useState } from "react"
import { ScrollView, View, StyleSheet } from "react-native"
import { Tooltip } from "~/components/ui/tooltip"
import { Button } from "~/components/ui/button"
import { Text } from "~/components/ui/text"
import { Label } from "~/components/ui/label"

export default function TooltipScreen() {
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  // Make sure the path to the image is correct
  const localImage = require("../assets/bjork.png")

  // State to track which tooltips are visible
  const [visibleTooltips, setVisibleTooltips] = useState({
    textBottom: false,
    textLeft: false,
    textTop: false,
    textRight: false,
    mediaBottom: false,
    mediaLeft: false,
    mediaTop: false,
    mediaRight: false,
  })

  // Toggle function for each tooltip
  const toggleTooltip = (tooltipKey) => {
    setVisibleTooltips((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), // Close all tooltips
      [tooltipKey]: !prev[tooltipKey], // Toggle the selected tooltip
    }))
  }

  const CustomButton = (
    <Button variant="default">
      <Text className="text-white mr-1">Find out more</Text>
    </Button>
  )

  return (
    <ScrollView>
  <View className="p-4">
    <Label 
      className="text-lg font-medium mb-6" 
      accessibilityRole="header" 
      accessibilityLevel={2}
      nativeID="default-tooltip-section"
    >
      Default Tooltip
    </Label>
    <View className="items-center">
      <View style={styles.tooltipContainer}>
        <Button 
          onPress={() => toggleTooltip("textBottom")} 
          size="sm" 
          variant="secondary"
          accessibilityLabel="Show text tooltip at bottom"
          accessibilityHint="Activates a tooltip that appears below the button"
          accessibilityState={{ expanded: visibleTooltips.textBottom }}
          aria-controls="tooltip-textBottom"
        >
          <Text>Text Bottom</Text>
        </Button>
        {visibleTooltips.textBottom && (
          <Tooltip 
            variant="text" 
            text={text} 
            position="bottom" 
            nativeID="tooltip-textBottom"
            accessibilityRole="tooltip"
            accessibilityLabel={`Tooltip: ${text}`}
            accessibilityLiveRegion="polite"
          />
        )}
      </View>

      <View style={styles.tooltipContainer}>
        <Button 
          onPress={() => toggleTooltip("textLeft")} 
          size="sm" 
          variant="secondary"
          accessibilityLabel="Show text tooltip at left"
          accessibilityHint="Activates a tooltip that appears to the left of the button"
          accessibilityState={{ expanded: visibleTooltips.textLeft }}
          aria-controls="tooltip-textLeft"
        >
          <Text>Text Left</Text>
        </Button>
        {visibleTooltips.textLeft && (
          <Tooltip 
            variant="text" 
            text={text} 
            position="left" 
            nativeID="tooltip-textLeft"
            accessibilityRole="tooltip"
            accessibilityLabel={`Tooltip: ${text}`}
            accessibilityLiveRegion="polite"
          />
        )}
      </View>

      <View style={styles.tooltipContainer}>
        <Button 
          onPress={() => toggleTooltip("textTop")} 
          size="sm" 
          variant="secondary"
          accessibilityLabel="Show text tooltip at top"
          accessibilityHint="Activates a tooltip that appears above the button"
          accessibilityState={{ expanded: visibleTooltips.textTop }}
          aria-controls="tooltip-textTop"
        >
          <Text>Text Top</Text>
        </Button>
        {visibleTooltips.textTop && (
          <Tooltip 
            variant="text" 
            text={text} 
            position="top" 
            nativeID="tooltip-textTop"
            accessibilityRole="tooltip"
            accessibilityLabel={`Tooltip: ${text}`}
            accessibilityLiveRegion="polite"
          />
        )}
      </View>

      <View style={styles.tooltipContainer}>
        <Button 
          onPress={() => toggleTooltip("textRight")} 
          size="sm" 
          variant="secondary"
          accessibilityLabel="Show text tooltip at right"
          accessibilityHint="Activates a tooltip that appears to the right of the button"
          accessibilityState={{ expanded: visibleTooltips.textRight }}
          aria-controls="tooltip-textRight"
        >
          <Text>Text Right</Text>
        </Button>
        {visibleTooltips.textRight && (
          <Tooltip 
            variant="text" 
            text={text} 
            position="right" 
            nativeID="tooltip-textRight"
            accessibilityRole="tooltip"
            accessibilityLabel={`Tooltip: ${text}`}
            accessibilityLiveRegion="polite"
          />
        )}
      </View>
    </View>

    <Label 
      className="text-lg font-medium mb-6" 
      accessibilityRole="header" 
      accessibilityLevel={2}
      nativeID="media-tooltip-section"
    >
      Tooltip with image
    </Label>

    <View className="items-center">
      <View style={styles.tooltipContainer}>
        <Button 
          onPress={() => toggleTooltip("mediaBottom")} 
          size="sm" 
          variant="secondary"
          accessibilityLabel="Show media tooltip at bottom"
          accessibilityHint="Activates a tooltip with image that appears below the button"
          accessibilityState={{ expanded: visibleTooltips.mediaBottom }}
          aria-controls="tooltip-mediaBottom"
        >
          <Text>Media Bottom</Text>
        </Button>
        {visibleTooltips.mediaBottom && (
          <Tooltip
            variant="media"
            title="Tooltip Title"
            text={text}
            imageSrc={localImage}
            renderButton={CustomButton}
            position="bottom"
            nativeID="tooltip-mediaBottom"
            accessibilityRole="tooltip"
            accessibilityLabel={`Tooltip: Tooltip Title - ${text}`}
            accessibilityLiveRegion="polite"
          />
        )}
      </View>

      <View style={styles.tooltipContainer}>
        <Button 
          onPress={() => toggleTooltip("mediaLeft")} 
          size="sm" 
          variant="secondary"
          accessibilityLabel="Show media tooltip at left"
          accessibilityHint="Activates a tooltip with image that appears to the left of the button"
          accessibilityState={{ expanded: visibleTooltips.mediaLeft }}
          aria-controls="tooltip-mediaLeft"
        >
          <Text>Media Left</Text>
        </Button>
        {visibleTooltips.mediaLeft && (
          <Tooltip
            variant="media"
            title="Tooltip Title"
            text={text}
            imageSrc={localImage}
            renderButton={CustomButton}
            position="left"
            nativeID="tooltip-mediaLeft"
            accessibilityRole="tooltip"
            accessibilityLabel={`Tooltip: Tooltip Title - ${text}`}
            accessibilityLiveRegion="polite"
          />
        )}
      </View>

      <View style={styles.tooltipContainer}>
        <Button 
          onPress={() => toggleTooltip("mediaTop")} 
          size="sm" 
          variant="secondary"
          accessibilityLabel="Show media tooltip at top"
          accessibilityHint="Activates a tooltip with image that appears above the button"
          accessibilityState={{ expanded: visibleTooltips.mediaTop }}
          aria-controls="tooltip-mediaTop"
        >
          <Text>Media Top</Text>
        </Button>
        {visibleTooltips.mediaTop && (
          <Tooltip
            variant="media"
            title="Tooltip Title"
            text={text}
            imageSrc={localImage}
            renderButton={CustomButton}
            position="top"
            nativeID="tooltip-mediaTop"
            accessibilityRole="tooltip"
            accessibilityLabel={`Tooltip: Tooltip Title - ${text}`}
            accessibilityLiveRegion="polite"
          />
        )}
      </View>

      <View style={styles.tooltipContainer}>
        <Button 
          onPress={() => toggleTooltip("mediaRight")} 
          size="sm" 
          variant="secondary"
          accessibilityLabel="Show media tooltip at right"
          accessibilityHint="Activates a tooltip with image that appears to the right of the button"
          accessibilityState={{ expanded: visibleTooltips.mediaRight }}
          aria-controls="tooltip-mediaRight"
        >
          <Text>Media Right</Text>
        </Button>
        {visibleTooltips.mediaRight && (
          <Tooltip
            variant="media"
            title="Tooltip Title"
            text={text}
            imageSrc={localImage}
            renderButton={CustomButton}
            position="right"
            nativeID="tooltip-mediaRight"
            accessibilityRole="tooltip"
            accessibilityLabel={`Tooltip: Tooltip Title - ${text}`}
            accessibilityLiveRegion="polite"
          />
        )}
      </View>
    </View>
  </View>
</ScrollView>
  )
}

const styles = StyleSheet.create({
  tooltipContainer: {
    marginBottom: 32,
    position: "relative",
    alignItems: "center",
    minHeight: 40,
    justifyContent: "center",
  },
})
