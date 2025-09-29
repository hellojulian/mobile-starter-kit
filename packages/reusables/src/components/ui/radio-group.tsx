import * as RadioGroupPrimitive from "@rn-primitives/radio-group"
import * as React from "react"
import { View, Text, useColorScheme } from "react-native"
import { cn } from "../../lib/utils"
import { Globe } from "lucide-react-native"

const RadioGroup = React.forwardRef<RadioGroupPrimitive.RootRef, RadioGroupPrimitive.RootProps & {
  accessibilityLabel?: string;
}>(
  ({ className, accessibilityLabel, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Root 
        className={cn("web:grid gap-2", className)} 
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        {...props} 
        ref={ref} 
      />
    )
  },
)
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<RadioGroupPrimitive.ItemRef, RadioGroupPrimitive.ItemProps & {
  accessibilityLabel?: string;
}>(
  ({ className, accessibilityLabel, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "aspect-square h-5 w-5 native:h-6 native:w-6 rounded-full justify-center items-center border-2 border-indigo-500 text-sys-body-text web:ring-offset-background web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
          props.disabled && "web:cursor-not-allowed opacity-50",
          className,
        )}
        accessibilityRole="radio"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ selected: props.checked, disabled: props.disabled }}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <View className="aspect-square h-[10px] w-[10px] native:h-[12px] native:w-[12px] bg-indigo-500 rounded-full" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    )
  },
)
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

type RadioTileProps = RadioGroupPrimitive.ItemProps & {
  title: string
  description?: string
  icon?: React.ReactNode
  accessibilityLabel?: string
  accessibilityHint?: string
}

const RadioTile = React.forwardRef<RadioGroupPrimitive.ItemRef, RadioTileProps>(
  ({ className, title, description, icon, accessibilityLabel, accessibilityHint, ...props }, ref) => {
    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    // Theme-aware icon color
    const iconColor = isDark ? "#E5E7EB" : "#1F2937" // text-sys-text-body in dark/light mode

    // Check if this tile is selected - use the checked prop directly
    const isSelected = props.checked === true

    // Generate comprehensive accessibility label
    const fullAccessibilityLabel = accessibilityLabel || 
      `${title}${description ? `. ${description}` : ''}`;

    return (
      <View
        className={cn(
          "w-full p-4 rounded-md border",
          isSelected
            ? "bg-sys-surface-secondary-pressed border-sys-border-6"
            : "bg-sys-surface-neutral-0 border-sys-border-4",
          props.disabled && "opacity-50",
        )}
        accessibilityRole="radio"
        accessibilityLabel={fullAccessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ selected: isSelected, disabled: props.disabled }}
      >
        {/* Top section: Icon, Title, and Radio */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            {/* Use theme-aware icon color */}
            {icon ? (
              React.isValidElement(icon) ? (
                React.cloneElement(icon, { color: icon.props.color || iconColor })
              ) : (
                icon
              )
            ) : (
              <Globe size={24} color={iconColor} />
            )}
            <Text className="text-md font-medium text-sys-text-body">{title}</Text>
          </View>

          <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
              "aspect-square h-5 w-5 native:h-6 native:w-6 rounded-full justify-center items-center border-2 border-indigo-500 text-sys-body-text web:ring-offset-background web:focus:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
              props.disabled && "web:cursor-not-allowed opacity-50",
              className,
            )}
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden={true}
            {...props}
          >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
              <View className="aspect-square h-[10px] w-[10px] native:h-[12px] native:w-[12px] bg-indigo-500 rounded-full" />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
        </View>

        {/* Bottom section: Description text */}
        {description && (
          <View className="pl-0">
            <Text className="text-base text-sys-text-body">{description}</Text>
          </View>
        )}
      </View>
    )
  },
)

RadioTile.displayName = "RadioTile"

export { RadioGroup, RadioGroupItem, RadioTile }
