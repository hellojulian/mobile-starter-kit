"use client"

import type React from "react"
import { useEffect } from "react"
import { View, Text, Image } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated"
import { cn } from "../../lib/utils"

type TooltipProps = {
  variant?: "text" | "media"
  text?: string
  title?: string
  imageSrc?: any
  renderButton?: React.ReactNode
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

export const Tooltip: React.FC<TooltipProps> = ({
  variant = "text",
  text,
  title,
  imageSrc,
  renderButton,
  position = "bottom",
  className,
}) => {
  // Animation values
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(position === "top" ? -10 : position === "bottom" ? 10 : 0)
  const translateX = useSharedValue(position === "left" ? -10 : position === "right" ? 10 : 0)

  // Determine wrapper positioning classes based on position
  const wrapperPositionClasses = {
    top: "flex-col-reverse items-center",
    bottom: "flex-col items-center",
    left: "flex-row-reverse items-center",
    right: "flex-row items-center",
  }

  // Determine arrow positioning classes based on position
  const arrowPositionClasses = {
    top: "absolute bottom-[-7px] left-0 right-0 flex justify-center items-center",
    bottom: "absolute top-[-7px] left-0 right-0 flex justify-center items-center",
    left: "absolute right-[-7px] top-0 bottom-0 flex justify-center items-center",
    right: "absolute left-[-7px] top-0 bottom-0 flex justify-center items-center",
  }

  // Determine arrow border classes based on position
  const arrowBorderClasses = {
    top: "w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-sys-surface-neutral-1",
    bottom:
      "w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-sys-surface-neutral-1",
    left: "w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-sys-surface-neutral-1",
    right:
      "w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-sys-surface-neutral-1",
  }

  // Animation styles
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
    }
  })

  // Start animation when component mounts
  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 250,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })

    translateY.value = withTiming(0, {
      duration: 250,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })

    translateX.value = withTiming(0, {
      duration: 250,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    })
  }, [])

  return (
    <View className={cn("m-2", wrapperPositionClasses[position], className)}>
      <Animated.View style={animatedStyles} className="relative bg-sys-surface-neutral-1 rounded-lg p-4 max-w-[240px]">
        {variant === "text" && <Text className="text-sys-text-body text-sm my-1">{text}</Text>}

        {variant === "media" && (
          <>
            {imageSrc && (
              <View
                style={{
                  width: 200,
                  height: 120,
                  backgroundColor: "#fce7f3",
                  borderRadius: 4,
                  marginBottom: 12,
                  overflow: "hidden",
                }}
              >
                <Image source={imageSrc} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
              </View>
            )}
            {title && <Text className="text-sys-text-body text-base font-semibold mb-1.5">{title}</Text>}
            {text && <Text className="text-sys-text-body text-sm mb-3">{text}</Text>}
            {renderButton}
          </>
        )}

        {/* Arrow */}
        <View className={arrowPositionClasses[position]}>
          <View className={arrowBorderClasses[position]} />
        </View>
      </Animated.View>
    </View>
  )
}
