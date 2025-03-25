import * as CheckboxPrimitive from "@rn-primitives/checkbox"
import * as React from "react"
import { Platform, Pressable, View, useColorScheme } from "react-native"
import { Check } from "../../lib/icons/Check"
import { cn } from "../../lib/utils"
import { Text } from "react-native"
import { Globe } from "lucide-react-native"

// Original Checkbox component
const Checkbox = React.forwardRef<CheckboxPrimitive.RootRef, CheckboxPrimitive.RootProps & { label?: string }>(
  ({ className, label, ...props }, ref) => {
    return (
      <Pressable
        onPress={() => props.onCheckedChange?.(!props.checked)}
        className={cn("flex-row items-center gap-2", props.disabled && "opacity-50")}
      >
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            "h-5 w-5 native:h-6 native:w-6 shrink-0 rounded-xs native:rounded-xs border-2 border-sys-surface-secondary-5 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed",
            props.checked && "bg-sys-secondary-pressed",
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className={cn("items-center justify-center h-full w-full")}>
            <Check size={16} strokeWidth={Platform.OS === "web" ? 2.5 : 3.5} className="text-sys-text-secondary" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && <CheckboxPrimitive.Label className="text-sm">{label}</CheckboxPrimitive.Label>}
      </Pressable>
    )
  },
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName

// Correctly structured CheckboxTile component with two distinct sections
type CheckboxTileProps = CheckboxPrimitive.RootProps & {
  title: string
  description?: string
  icon?: React.ReactNode
}

const CheckboxTile = React.forwardRef<CheckboxPrimitive.RootRef, CheckboxTileProps>(
  ({ className, title, description, icon, ...props }, ref) => {
    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    // Theme-aware icon color
    const iconColor = isDark ? "#E5E7EB" : "#1F2937" // text-sys-text-body in dark/light mode

    return (
      <Pressable
        onPress={() => props.onCheckedChange?.(!props.checked)}
        className={cn(
          "w-full p-4 rounded-md border",
          props.checked
            ? "bg-sys-secondary-pressed border-sys-border-6"
            : "bg-sys-surface-neutral-1 border-sys-border-4",
          props.disabled && "opacity-50",
        )}
      >
        {/* Top section: Icon, Title, and Checkbox */}
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

          <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
              "h-6 w-6 shrink-0 rounded-xs border-2 border-indigo-500 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed",
              props.checked && "bg-indigo-500",
              className,
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className={cn("items-center justify-center h-full w-full")}>
              <Check size={16} strokeWidth={Platform.OS === "web" ? 2.5 : 3.5} className="text-white" />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        </View>

        {/* Bottom section: Description text */}
        {description && (
          <View className="pl-0">
            <Text className="text-base text-sys-text-body">{description}</Text>
          </View>
        )}
      </Pressable>
    )
  },
)

CheckboxTile.displayName = "CheckboxTile"

export { Checkbox, CheckboxTile }

