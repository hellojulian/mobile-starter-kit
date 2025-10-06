import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable, StyleSheet, View, Platform } from 'react-native';
import { Text } from './text';
import { useColorScheme } from '../../lib/useColorScheme';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-full web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-sys-surface-secondary-4 web:hover:opacity-90 active:bg-sys-surface-secondary-5',
        secondary:
          'bg-transparent border-2 border-sys-border-6 web:hover:opacity-90 active:bg-sys-surface-secondary-pressed',
        black:
          'border border-input bg-sys-surface-black web:hover:bg-accent web:hover:text-accent-foreground active:bg-ref-neutral-800',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline active:bg-sys-surface-secondary-pressed',
        disabled:
        'border-0 bg-sys-surface-disabled text-sys-text-disabled',
      },
      size: {
        sm: 'py-xxs px-sm rounded-full',     // SM: 4px vertical, 12px horizontal (32px total height)
        md: 'py-xs px-sm rounded-full',      // MD: 8px vertical, 12px horizontal (40px total height)
        default: 'py-md px-lg rounded-full', // XL: 16px vertical, 24px horizontal (56px total height) - DEFAULT
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Define text size variants explicitly
const buttonTextVariants = cva('web:whitespace-nowrap web:transition-colors', {
  variants: {
    variant: {
      default: '!text-sys-text-white font-medium',
      secondary: '!text-sys-text-body font-medium',
      black: '!text-sys-text-white font-medium',
      link: '!text-sys-text-body font-medium',
      disabled: '!text-sys-text-disabled font-medium',
    },
    textSize: {
      sm: 'text-body-sm',
      md: 'text-body-md',
      lg: 'text-body-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    textSize: 'sm',
  },
});

// Define color mapping for different button variants in light and dark mode
const variantColorMap = {
  light: {
    default: '#FFFFFF', // white
    secondary: '#1F2937', // sys-text-body in light mode
    outline: '#1F2937', // sys-text-body in light mode
    black: '#FFFFFF', // white
    link: '#1F2937', // sys-text-body in light mode
  },
  dark: {
    default: '#FFFFFF', // white
    secondary: '#E5E7EB', // sys-text-body in dark mode
    outline: '#E5E7EB', // sys-text-body in dark mode
    black: '#FFFFFF', // white
    link: '#E5E7EB', // sys-text-body in dark mode
  }
};

// Create a component that renders text with a specific variant and exposes its color
const TextColorProvider = React.forwardRef<
  React.ElementRef<typeof Text>,
  {
    variant: string;
    onColor: (color: string) => void;
  }
>(({ variant, onColor }, ref) => {
  const { isDarkColorScheme } = useColorScheme();
  const isDark = isDarkColorScheme;

  React.useEffect(() => {
    // Get the appropriate color based on the variant and color scheme
    const colorSet = isDark ? variantColorMap.dark : variantColorMap.light;
    const color = colorSet[variant] || (isDark ? '#E5E7EB' : '#1F2937'); // Default to text-sys-text-body
    
    onColor(color);
  }, [variant, isDark, onColor]);

  return (
    <Text
      ref={ref}
      className={cn(buttonTextVariants({ variant }))}
      style={{ position: 'absolute', opacity: 0, height: 0 }}
    >
      Color Provider
    </Text>
  );
});

TextColorProvider.displayName = 'TextColorProvider';

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    textSize?: 'sm' | 'md' | 'lg';
    accessibilityLabel?: string;
    accessibilityHint?: string;
  };

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    children, 
    icon, 
    iconPosition = 'left',
    textSize = 'md',
    accessibilityLabel,
    accessibilityHint,
    ...props 
  }, ref) => {
    // State to store the text color
    const [textColor, setTextColor] = React.useState<string | null>(null);
    
    const styles = StyleSheet.create({
      text: {
        fontFamily: 'Inter',
        // Fixed font size mapping
        fontSize: textSize === 'sm' ? 14 : textSize === 'lg' ? 18 : 16,
        lineHeight: textSize === 'sm' ? 20 : textSize === 'lg' ? 28 : 23,
      },
      container: {
        flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconSpacing: {
        width: 8, // xs token (8px) - Space between icon and text
      }
    });

    // Get icon size based on text size
    const getIconSize = () => {
      return textSize === 'sm' ? 16 : textSize === 'lg' ? 20 : 18;
    };

    // Determine if this is an icon-only button
    const isIconOnly = icon && !children;
    
    // Generate appropriate accessibility label
    const finalAccessibilityLabel = accessibilityLabel || 
      (isIconOnly ? 'Button' : undefined);

    // Cross-platform accessibility props
    const accessibilityProps = Platform.select({
      web: {
        'aria-label': finalAccessibilityLabel,
        'aria-describedby': accessibilityHint,
      },
      default: {
        accessibilityLabel: finalAccessibilityLabel,
        accessibilityHint,
        accessibilityState: { disabled: !!props.disabled },
      }
    });

    return (
      <>
        {/* Component to extract the text color based on the variant and color scheme */}
        <TextColorProvider variant={variant} onColor={setTextColor} />
        
        <Pressable
          className={cn(
            props.disabled && 'opacity-50 web:pointer-events-none',
            buttonVariants({ variant, size, className })
          )}
          ref={ref}
          role='button'
          {...accessibilityProps}
          {...props}
        >
          <View style={styles.container}>
            {icon && textColor && (
              <>
                {React.isValidElement(icon) ? 
                  React.cloneElement(icon, { 
                    size: icon.props.size || getIconSize(),
                    color: icon.props.color || textColor, // Use the extracted text color
                    importantForAccessibility: 'no-hide-descendants',
                    accessibilityElementsHidden: true,
                  }) : 
                  icon
                }
                {!isIconOnly && <View style={styles.iconSpacing} />}
              </>
            )}
            {!isIconOnly && (
              <Text
                className={cn(
                  buttonTextVariants({ variant, textSize })
                )}
                numberOfLines={1}
                adjustsFontSizeToFit={false} // Disable auto-adjusting
                minimumFontScale={0.9} // Increase minimum scale if needed
                importantForAccessibility="no-hide-descendants"
                accessibilityElementsHidden={true}
              >
                {children}
              </Text>
            )}
          </View>
        </Pressable>
      </>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };