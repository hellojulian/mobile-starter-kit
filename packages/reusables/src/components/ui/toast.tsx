import * as React from "react"
import { View, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Toast, { type ToastConfig } from "react-native-toast-message"
import { Text } from "../../components/ui/text"
import { cn } from "../../lib/utils"
import { Globe, AlertCircle, Check, AlertTriangle, Info } from "lucide-react-native"
import { useColorScheme } from "react-native"

// Toast variant definitions with their respective colors
const TOAST_VARIANTS = {
  generic: {
    background: "bg-sys-fn-generic",
    text: "text-sys-text-body",
    icon: {
      component: Globe,
      color: {
        light: "#000000",
        dark: "#FFFFFF",
      },
    },
    label: {
      background: "bg-black dark:bg-white",
      text: "text-white dark:text-black",
    },
    border: "border-sys-border-5",
  },
  info: {
    background: "bg-sys-fn-information",
    text: "text-sys-fn-information-text",
    icon: {
      component: Info,
      color: {
        light: "#1D4ED8", // blue-700
        dark: "#93C5FD", // blue-300
      },
    },
    label: {
      background: "bg-sys-fn-information-text",
      text: "text-sys-text-body-inverse",
    },
    border: "border-sys-border-information",
  },
  success: {
    background: "bg-sys-fn-success",
    text: "text-sys-fn-success-text",
    icon: {
      component: Check,
      color: {
        light: "#15803D", // green-700
        dark: "#86EFAC", // green-300
      },
    },
    label: {
      background: "bg-sys-fn-success-text",
      text: "text-sys-text-body-inverse",
    },
    border: "border-sys-border-success",
  },
  warning: {
    background: "bg-sys-fn-warning",
    text: "text-sys-fn-warning-text",
    icon: {
      component: AlertTriangle,
      color: {
        light: "#B45309", // amber-700
        dark: "#FCD34D", // amber-300
      },
    },
    label: {
      background: "bg-sys-fn-warning-text",
      text: "text-sys-text-body-inverse",
    },
    border: "border-sys-border-warning",
  },
  error: {
    background: "bg-sys-fn-error",
    text: "text-sys-fn-error-text",
    icon: {
      component: AlertCircle,
      color: {
        light: "#B91C1C", // red-700
        dark: "#FCA5A5", // red-300
      },
    },
    label: {
      background: "bg-sys-fn-error-text",
      text: "text-sys-text-body-inverse",
    },
    border: "border-sys-border-error",
  },
}

// Toast style types
type ToastVariant = keyof typeof TOAST_VARIANTS
type ToastStyleProps = {
  variant?: ToastVariant
  customStyles?: {
    background?: string
    text?: string
    label?: {
      background?: string
      text?: string
    }
    border?: string
  }
}

// Toast title component
const ToastTitle = ({
  children,
  variant = "generic",
  customStyles,
}: {
  children: string
  variant?: ToastVariant
  customStyles?: string
}) => {
  const variantStyles = TOAST_VARIANTS[variant].text

  return (
    <Text weight="semibold" className={cn("text-[15px] font-semibold mb-1", variantStyles, customStyles)}>
      {children}
    </Text>
  )
}

// Toast description component
const ToastDescription = ({
  children,
  variant = "generic",
  customStyles,
}: {
  children: string
  variant?: ToastVariant
  customStyles?: string
}) => {
  const variantStyles = TOAST_VARIANTS[variant].text

  return <Text className={cn("text-[13px]", variantStyles, customStyles)}>{children}</Text>
}

// Toast label component
const ToastLabel = ({
  children,
  variant = "generic",
  customStyles,
}: {
  children: string
  variant?: ToastVariant
  customStyles?: { background?: string; text?: string }
}) => {
  const variantLabelBg = TOAST_VARIANTS[variant].label.background
  const variantLabelText = TOAST_VARIANTS[variant].label.text

  return (
    <View className={cn("px-4 py-2 rounded-xl ml-3", variantLabelBg, customStyles?.background)}>
      <Text className={cn("text-[14px] font-medium", variantLabelText, customStyles?.text)}>{children}</Text>
    </View>
  )
}

// Define our custom toast props interface
interface CustomToastProps {
  title: string // Renamed from text1
  description: string // Renamed from text2
  type: string
  props?: any
  onPress?: () => void
}

// Main toast component with renamed parameters
const CustomToast = ({ title, description, type, props, onPress }: CustomToastProps) => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  // Map toast type to variant
  const variant = ((): ToastVariant => {
    switch (type) {
      case "success":
        return "success"
      case "error":
        return "error"
      case "warning":
        return "warning"
      case "info":
        return "info"
      default:
        return "generic"
    }
  })()

  // Get variant styles
  const variantStyles = TOAST_VARIANTS[variant]

  // Get custom styles from props
  const customStyles = props?.customStyles as ToastStyleProps["customStyles"]

  // Get label text from props or use default based on type
  const labelText = props?.label || variant.charAt(0).toUpperCase() + variant.slice(1)

  // Get icon component and color
  const IconComponent = variantStyles.icon.component
  const iconColor = isDark ? variantStyles.icon.color.dark : variantStyles.icon.color.light

  return (
    <Pressable onPress={onPress} className="w-full max-w-xl px-4" style={{ zIndex: 9999 }}>
      <View
        className={cn(
          "w-full p-4 rounded-lg flex-row items-start border",
          variantStyles.background,
          variantStyles.border,
          customStyles?.background,
          customStyles?.border,
        )}
        style={{ elevation: 9999 }}
      >
        {/* Icon */}
        <IconComponent size={24} color={iconColor} />

        {/* Content */}
        <View className="flex-1 ml-3">
          <ToastTitle variant={variant} customStyles={customStyles?.text}>
            {title}
          </ToastTitle>
          <ToastDescription variant={variant} customStyles={customStyles?.text}>
            {description}
          </ToastDescription>
        </View>

        {/* Label */}
        {labelText && (
          <ToastLabel variant={variant} customStyles={customStyles?.label}>
            {labelText}
          </ToastLabel>
        )}
      </View>
    </Pressable>
  )
}

// Adapter component to bridge between react-native-toast-message and our CustomToast
const ToastAdapter = (props: any) => {
  // Extract text1 and text2 from props and rename them to title and description
  const { text1, text2, ...rest } = props
  return <CustomToast title={text1} description={text2} {...rest} />
}

/**
 * Temporary fix for warning when accessing useLayoutEffect on the server. See issue
 * https://github.com/calintamas/react-native-toast-message/issues/530
 */
if (typeof document === "undefined") {
  // @ts-ignore
  React.useLayoutEffect = React.useEffect
}

/**
 * @docs https://github.com/calintamas/react-native-toast-message/blob/main/docs/quick-start.md
 */
const TOAST_CONFIG: ToastConfig = {
  success: (props) => <ToastAdapter {...props} type="success" />,
  error: (props) => <ToastAdapter {...props} type="error" />,
  warning: (props) => <ToastAdapter {...props} type="warning" />,
  info: (props) => <ToastAdapter {...props} type="info" />,
  generic: (props) => <ToastAdapter {...props} type="generic" />,
}

/**
 *
 * If you want to use a Toast in a Modal, you will need to add another `ToastProvider` as a child of the Modal.
 */
function ToastProvider() {
  const insets = useSafeAreaInsets()
  return (
    <Toast
      config={TOAST_CONFIG}
      topOffset={insets.top}
      bottomOffset={insets.bottom}
      position="bottom"
      visibilityTime={4000}
      containerStyle={{
        zIndex: 9999,
        elevation: 9999,
      }}
    />
  )
}

// Enhanced showToast function with customization options
type ShowToastOptions = {
  type: "success" | "error" | "warning" | "info" | "generic"
  title: string
  message: string
  label?: string
  customStyles?: ToastStyleProps["customStyles"]
  onPress?: () => void
  duration?: number
}

const showToast = ({ type = "generic", title, message, label, customStyles, onPress, duration }: ShowToastOptions) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    props: {
      label,
      customStyles,
      onPress,
    },
    visibilityTime: duration,
  })
}

export { ToastProvider, showToast }

