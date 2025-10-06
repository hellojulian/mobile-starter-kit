import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { cn } from '../../lib/utils';

type AvatarSize = '32px' | '52px' | '80px' | '120px';
type AvatarVariant = 'Female 1' | 'Female 2' | 'Male 1' | 'Male 2';

const sizeMap: Record<AvatarSize, number> = {
  '32px': 32,
  '52px': 52,
  '80px': 80,
  '120px': 120,
};


interface AvatarProps extends AvatarPrimitive.RootProps {
  size?: AvatarSize;
  variant?: AvatarVariant;
}

const Avatar = React.forwardRef<AvatarPrimitive.RootRef, AvatarProps>(
  ({ className, size = '32px', variant = 'Male 1', style, children, ...props }, ref) => {
    const dimensionStyle: ViewStyle = {
      width: sizeMap[size],
      height: sizeMap[size],
    };

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn('relative flex shrink-0 overflow-hidden rounded-full', className)}
        style={[dimensionStyle, style]}
        {...props}
      >
        {children}
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface AvatarImageProps extends AvatarPrimitive.ImageProps {
  size?: AvatarSize;
  variant?: AvatarVariant;
  source?: any;
}

const AvatarImage = React.forwardRef<AvatarPrimitive.ImageRef, AvatarImageProps>(
  ({ className, size = '32px', variant = 'Male 1', style, source, ...props }, ref) => {
    // Use design system border width tokens
    const borderWidthClass = size === '32px' ? 'border-sm' : 'border-md';
    
    return (
      <AvatarPrimitive.Image
        ref={ref}
        source={source}
        className={cn('aspect-square h-full w-full border-sys-border-5', borderWidthClass, className)}
        style={[
          {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderStyle: 'solid',
          },
          style
        ]}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

interface AvatarFallbackProps extends AvatarPrimitive.FallbackProps {
  size?: AvatarSize;
}

const AvatarFallback = React.forwardRef<AvatarPrimitive.FallbackRef, AvatarFallbackProps>(
  ({ className, size = '32px', style, ...props }, ref) => {
    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-sys-surface-neutral-2',
          className
        )}
        style={style}
        {...props}
      />
    );
  }
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };