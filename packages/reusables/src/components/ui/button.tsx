import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable, Text, StyleSheet, View, useColorScheme, Platform } from 'react-native';
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
      },
      size: {
        default: 'h-16 rounded-full px-6 native:h-[56px]',
        sm: 'h-9 rounded-full px-3',
        lg: 'h-17 rounded-full px-8 native:h-17',
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
const buttonTextVariants = cva('web:whitespace-nowrap text-sys-text-body web:transition-colors', {
  variants: {
    variant: {
      default: 'text-white font-medium',
      secondary: 'text-sys-text-body font-medium',
      black: 'text-sys-text-white font-medium',
      link: 'text-sys-text-secondary font-medium',
    },
    textSize: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
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
    link: '#6366F1', // sys-secondary-text in light mode
  },
  dark: {
    default: '#FFFFFF', // white
    secondary: '#E5E7EB', // sys-text-body in dark mode
    outline: '#E5E7EB', // sys-text-body in dark mode
    link: '#818CF8', // sys-secondary-text in dark mode
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
        width: 8, // Space between icon and text
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
                style={styles.text}
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