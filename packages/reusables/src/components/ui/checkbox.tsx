import * as CheckboxPrimitive from "@rn-primitives/checkbox"
import * as React from "react"
import { Platform, Pressable, View, useColorScheme } from "react-native"
import { Check } from "../../lib/icons/Check"
import { cn } from "../../lib/utils"
import { Text } from "react-native"
import { Globe } from "lucide-react-native"

// Original Checkbox component
const Checkbox = React.forwardRef<CheckboxPrimitive.RootRef, CheckboxPrimitive.RootProps & { 
  label?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}>(
  ({ className, label, accessibilityLabel, accessibilityHint, ...props }, ref) => {
    // Cross-platform accessibility props
    const accessibilityProps = Platform.select({
      web: {
        'aria-label': accessibilityLabel || label,
        'aria-describedby': accessibilityHint,
        'aria-checked': !!props.checked,
      },
      default: {
        accessibilityRole: 'checkbox',
        accessibilityLabel: accessibilityLabel || label,
        accessibilityHint,
        accessibilityState: { 
          checked: !!props.checked,
          disabled: !!props.disabled,
        },
      }
    });

    return (
      <Pressable
        onPress={() => props.onCheckedChange?.(!props.checked)}
        className={cn("flex-row items-center gap-xs", props.disabled && "opacity-50")}
        {...accessibilityProps}
      >
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            "h-5 w-5 native:h-6 native:w-6 shrink-0 rounded-xs native:rounded-xs border-2 border-sys-surface-secondary-5 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed",
            props.checked && "bg-sys-surface-secondary-pressed",
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator className={cn("items-center justify-center h-full w-full")}>
            <Check 
              size={16} 
              strokeWidth={Platform.OS === "web" ? 2.5 : 3.5} 
              className="text-sys-text-secondary"
              importantForAccessibility="no-hide-descendants"
              accessibilityElementsHidden={true}
            />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <CheckboxPrimitive.Label 
            className="text-body-sm"
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden={true}
          >
            {label}
          </CheckboxPrimitive.Label>
        )}
      </Pressable>
    )
  },
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName

type CheckboxTileProps = CheckboxPrimitive.RootProps & {
  title: string
  description?: string
  icon?: React.ReactNode
  accessibilityLabel?: string
  accessibilityHint?: string
}

const CheckboxTile = React.forwardRef<CheckboxPrimitive.RootRef, CheckboxTileProps>(
  ({ className, title, description, icon, accessibilityLabel, accessibilityHint, ...props }, ref) => {
    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    // Theme-aware icon color
    const iconColor = isDark ? "#E5E7EB" : "#1F2937" // text-sys-text-body in dark/light mode

    // Generate comprehensive accessibility label
    const fullAccessibilityLabel = accessibilityLabel || 
      `${title}${description ? `. ${description}` : ''}`;

    // Cross-platform accessibility props
    const accessibilityProps = Platform.select({
      web: {
        'aria-label': fullAccessibilityLabel,
        'aria-describedby': accessibilityHint,
        'aria-checked': !!props.checked,
        role: 'checkbox',
      },
      default: {
        accessibilityRole: 'checkbox',
        accessibilityLabel: fullAccessibilityLabel,
        accessibilityHint,
        accessibilityState: { 
          checked: !!props.checked,
          disabled: !!props.disabled,
        },
      }
    });

    return (
      <Pressable
        onPress={() => props.onCheckedChange?.(!props.checked)}
        className={cn(
          "w-full p-md rounded-md border",
          props.checked
            ? "bg-sys-surface-secondary-pressed border-sys-border-6"
            : "bg-sys-surface-neutral-0 border-sys-border-4",
          props.disabled && "opacity-50",
        )}
        {...accessibilityProps}
      >
        {/* Top section: Icon, Title, and Checkbox */}
        <View className="flex-row items-center justify-between mb-sm">
          <View className="flex-row items-center gap-xs">
            {/* Use theme-aware icon color */}
            {icon ? (
              React.isValidElement(icon) ? (
                React.cloneElement(icon, { 
                  color: icon.props.color || iconColor,
                  importantForAccessibility: 'no-hide-descendants',
                  accessibilityElementsHidden: true,
                })
              ) : (
                icon
              )
            ) : (
              <Globe 
                size={24} 
                color={iconColor}
                importantForAccessibility="no-hide-descendants"
                accessibilityElementsHidden={true}
              />
            )}
            <Text 
              className="text-body-md font-medium text-sys-text-body"
              importantForAccessibility="no-hide-descendants"
              accessibilityElementsHidden={true}
            >
              {title}
            </Text>
          </View>

          <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
              "h-6 w-6 shrink-0 rounded-xs border-2 border-indigo-500 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed",
              props.checked && "bg-sys-surface-secondary-pressed",
              className,
            )}
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden={true}
            {...props}
          >
            <CheckboxPrimitive.Indicator className={cn("items-center justify-center h-full w-full")}>
              <Check 
                size={16} 
                strokeWidth={Platform.OS === "web" ? 2.5 : 3.5} 
                className="text-sys-text-secondary"
                importantForAccessibility="no-hide-descendants"
                accessibilityElementsHidden={true}
              />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
        </View>

        {/* Bottom section: Description text */}
        {description && (
          <View className="pl-0">
            <Text 
              className="text-body-base text-sys-text-body"
              importantForAccessibility="no-hide-descendants"
              accessibilityElementsHidden={true}
            >
              {description}
            </Text>
          </View>
        )}
      </Pressable>
    )
  },
)

CheckboxTile.displayName = "CheckboxTile"

export { Checkbox, CheckboxTile }

