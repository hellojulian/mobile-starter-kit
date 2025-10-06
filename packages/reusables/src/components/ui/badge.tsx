import * as Slot from '@rn-primitives/slot';
import type { SlottableViewProps } from '@rn-primitives/types';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cn } from '../../lib/utils';
import { TextSemiBold } from '../ui/text';

const badgeVariants = cva(
  'web:inline-flex items-center rounded-sm border border-border py-xxs web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2',
  {
    variants: {
      variant: {
        brand: 'border-transparent bg-sys-surface-secondary-2',
        default: 'border-sys-border-6 bg-transparent',
        error: 'border-transparent bg-sys-fn-error',
        success: 'border-transparent bg-sys-fn-success',
        secondary: 'border-transparent bg-sys-surface-secondary-4',
        warning: 'border-transparent bg-sys-fn-warning',
        information: 'border-transparent bg-sys-fn-information',
      },
      size: {
        sm: 'px-xs',   // SM: 8px horizontal (matches Figma)
        xl: 'px-sm',   // XL: 12px horizontal (matches Figma)
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

const badgeTextVariants = cva('web:whitespace-nowrap', {
  variants: {
    variant: {
      brand: 'text-sys-text-black',
      default: 'text-sys-text-secondary',
      error: 'text-sys-fn-error-text',
      success: 'text-sys-fn-success-text',
      secondary: 'text-sys-text-white',
      warning: 'text-sys-fn-warning-text',
      information: 'text-sys-fn-information-text',
    },
    size: {
      sm: 'text-body-xs',  // SM: 12px text (matches Figma)
      xl: 'text-body-sm',  // XL: 14px text (matches Figma)
    },
  },
  compoundVariants: [
    // Ensure color classes take precedence over size classes
    { variant: 'brand', class: 'text-sys-text-black' },
    { variant: 'default', class: 'text-sys-text-secondary' },
    { variant: 'error', class: 'text-sys-fn-error-text' },
    { variant: 'success', class: 'text-sys-fn-success-text' },
    { variant: 'secondary', class: 'text-sys-text-white' },
    { variant: 'warning', class: 'text-sys-fn-warning-text' },
    { variant: 'information', class: 'text-sys-fn-information-text' },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});

type BadgeProps = SlottableViewProps &
  VariantProps<typeof badgeVariants> & {
    children: React.ReactNode;
    accessibilityLabel?: string;
    accessibilityHint?: string;
  };

const Badge = React.forwardRef<React.ElementRef<typeof View>, BadgeProps>(
  ({ className, variant, size, asChild, children, accessibilityLabel, accessibilityHint, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    const styles = StyleSheet.create({
      text: {
        fontFamily: 'Inter-Medium',
      },
    });

    return (
      <Component 
        className={cn(badgeVariants({ variant, size }), className)} 
        ref={ref} 
        accessibilityRole="text"
        accessibilityLabel={accessibilityLabel || `${variant || 'default'} badge: ${children}`}
        accessibilityHint={accessibilityHint}
        {...props}
      >
        <TextSemiBold 
          style={styles.text} 
          className={cn(badgeTextVariants({ variant, size }))}
          importantForAccessibility="no-hide-descendants"
          accessibilityElementsHidden={true}
        >
          {children}
        </TextSemiBold>
      </Component>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
