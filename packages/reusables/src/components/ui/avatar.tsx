import * as AvatarPrimitive from '@rn-primitives/avatar';
import * as React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { cn } from '../../lib/utils';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

const sizeMap: Record<Exclude<AvatarSize, number>, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

interface AvatarProps extends AvatarPrimitive.RootProps {
  size?: AvatarSize;
}

const Avatar = React.forwardRef<AvatarPrimitive.RootRef, AvatarProps>(
  ({ className, size = 'md', style, ...props }, ref) => {
    const dimensionStyle: ViewStyle = {
      width: typeof size === 'number' ? size : sizeMap[size],
      height: typeof size === 'number' ? size : sizeMap[size],
    };

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn('relative flex shrink-0 overflow-hidden rounded-full', className)}
        style={[dimensionStyle, style]}
        {...props}
      />
    );
  }
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface AvatarImageProps extends AvatarPrimitive.ImageProps {
  size?: AvatarSize;
}

const AvatarImage = React.forwardRef<AvatarPrimitive.ImageRef, AvatarImageProps>(
  ({ className, size = 'md', style, ...props }, ref) => {
    return (
      <AvatarPrimitive.Image
        ref={ref}
        className={cn('aspect-square h-full w-full', className)}
        style={[
          {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
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
  ({ className, size = 'md', style, ...props }, ref) => {
    const dimensionStyle: ViewStyle = {
      width: typeof size === 'number' ? size : sizeMap[size],
      height: typeof size === 'number' ? size : sizeMap[size],
    };

    const fontSize: TextStyle = {
      fontSize: typeof size === 'number' ? size / 2.5 : sizeMap[size] / 2.5,
    };

    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-muted',
          className
        )}
        style={[dimensionStyle, fontSize, style]}
        {...props}
      />
    );
  }
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };