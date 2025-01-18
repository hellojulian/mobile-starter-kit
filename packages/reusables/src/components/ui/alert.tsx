import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '../../lib/utils';
import { Text, TextClassContext } from './text';

const alertVariants = cva(
  'relative bg-background w-full rounded-lg border border-border px-4 py-3',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Alert = React.forwardRef<
  React.ElementRef<typeof View>,
  ViewProps &
    VariantProps<typeof alertVariants> & {
      icon: LucideIcon;
      iconSize?: number;
      iconClassName?: string;
    }
>(({ className, variant, children, icon: Icon, iconSize = 16, iconClassName, ...props }, ref) => {
  return (
    <TextClassContext.Provider
      value={variant === 'destructive' ? 'text-destructive' : 'text-foreground'}
    >
      <View ref={ref} role='alert' className={alertVariants({ variant, className })} {...props}>
        <View className='absolute left-3.5 top-4 -translate-y-0.5'>
          <Icon
            size={iconSize}
            className={cn(
              variant === 'destructive' ? 'text-destructive' : 'text-foreground',
              iconClassName
            )}
          />
        </View>
        {children}
      </View>
    </TextClassContext.Provider>
  );
});
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('pl-7 mb-1 font-medium text-base leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn('pl-7 text-sm leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
