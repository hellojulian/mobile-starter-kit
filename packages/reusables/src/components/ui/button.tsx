import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Pressable, Text, StyleSheet, View, useColorScheme } from 'react-native';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-full web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-sys-surface-secondary-4 web:hover:opacity-90 active:bg-sys-surface-secondary-5',
        secondary:
          'bg-transparent border-2 border-sys-border-6 web:hover:opacity-90 active:bg-sys-secondary-pressed',
        outline:
          'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        ghost: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
        link: 'web:underline-offset-4 web:hover:underline web:focus:underline',
      },
      size: {
        default: 'h-11 rounded-full px-6 native:h-14',
        sm: 'h-9 rounded-full px-3',
        lg: 'h-11 rounded-full px-8 native:h-14',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('web:whitespace-nowrap text-sys-text-body web:transition-colors', {
  variants: {
    variant: {
      default: 'text-white font-medium',
      secondary: 'text-sys-text-body font-medium',
      outline: 'group-active:text-accent-foreground font-medium',
      ghost: 'group-active:text-accent-foreground font-medium',
      link: 'text-sys-text-secondary underline font-medium',
    },
    size: {
      default: 'text-md',
      sm: 'text-sm',
      lg: 'text-md',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// Define color mapping for different button variants in light and dark mode
const variantColorMap = {
  light: {
    default: '#FFFFFF', // white
    secondary: '#1F2937', // sys-text-body in light mode
    outline: '#1F2937', // sys-text-body in light mode
    ghost: '#1F2937', // sys-text-body in light mode
    link: '#6366F1', // sys-secondary-text in light mode
  },
  dark: {
    default: '#FFFFFF', // white
    secondary: '#E5E7EB', // sys-text-body in dark mode
    outline: '#E5E7EB', // sys-text-body in dark mode
    ghost: '#E5E7EB', // sys-text-body in dark mode
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
    ...props 
  }, ref) => {
    // State to store the text color
    const [textColor, setTextColor] = React.useState<string | null>(null);
    
    // Map textSize to size for text styling
    const textSizeToButtonSize = {
      'sm': 'sm',
      'md': 'default',
      'lg': 'lg'
    };
    
    // Use the mapped size or the provided size
    const textSizeForStyling = textSize ? textSizeToButtonSize[textSize] : size;
    
    const styles = StyleSheet.create({
      text: {
        fontFamily: 'Inter-Medium',
        // Remove fontSize from here to let NativeWind handle it
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
          {...props}
        >
          <View style={styles.container}>
            {icon && textColor && (
              <>
                {React.isValidElement(icon) ? 
                  React.cloneElement(icon, { 
                    size: icon.props.size || getIconSize(),
                    color: icon.props.color || textColor, // Use the extracted text color
                  }) : 
                  icon
                }
                <View style={styles.iconSpacing} />
              </>
            )}
            <Text
              style={styles.text}
              className={cn(
                buttonTextVariants({ variant, size: textSizeForStyling })
              )}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              {children}
            </Text>
          </View>
        </Pressable>
      </>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };