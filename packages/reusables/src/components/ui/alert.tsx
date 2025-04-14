import { useTheme } from '@react-navigation/native';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';

const alertVariants = cva('relative w-full rounded-md border border-border py-4 px-4', {
  variants: {
    variant: {
      default: 'border-sys-border-4 bg-sys-surface-neutral-0',
      error: 'border-sys-border-error bg-sys-fn-error',
      success: 'border-sys-border-success  bg-sys-fn-success',
      warning: 'border-sys-border-warning  bg-sys-fn-warning',
      info: 'border-sys-border-information  bg-sys-fn-information',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const getVariantColor = (variant: string | undefined) => {
  switch (variant) {
    case 'error':
      return 'text-sys-fn-error-text';
    case 'success':
      return 'text-sys-fn-success-text';
    case 'warning':
      return 'text-sys-fn-warning-text';
    case 'info':
      return 'text-sys-fn-information-text';
    default:
      return 'text-sys-text-body';
  }
};

const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps &
    VariantProps<typeof alertVariants> & {
      icon: LucideIcon;
      iconSize?: number;
      iconClassName?: string;
    }
>(({ className, variant, children, icon: Icon, iconSize =18, iconClassName, ...props }, ref) => {
  const { colors } = useTheme();

  return (
    <View 
      ref={ref} 
      role='alert' 
      accessibilityLabel={`${variant || 'default'} alert`}
      className={alertVariants({ variant, className })} 
      {...props}
    >
      <View className="flex flex-row">
        <View 
          className="flex items-center justify-center"
          accessibilityElementsHidden={true}
          importantForAccessibility="no-hide-descendants"
        >
          <Icon size={iconSize} className={cn(getVariantColor(variant), iconClassName)} />
        </View>
        <View className="flex-1">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { variant } as any);
            }
            return child;
          })}
        </View>
      </View>
    </View>
  );
});
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      'pl-2 mb-1 font-medium text-md leading-none tracking-tight',
      getVariantColor(variant),
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <Text ref={ref} className={cn('pl-2 text-sm', getVariantColor(variant), className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };