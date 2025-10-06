import { TextRef, ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import {
  Text,
  type TextProps,
  View,
  type ViewProps,
  Image,
  ImageProps,
  StyleSheet,
} from 'react-native';
import { cn } from '../../lib/utils';
import { TextClassContext } from './text';
import { Button } from './button';
import { InfoIcon } from 'lucide-react-native';
import { Badge } from './badge';

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
  InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '500',
  },
});

// Define shadow styles for different variants
const shadowStyles = {
  none: {},
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

const Card = React.forwardRef<
  ViewRef, 
  ViewProps & { 
    shadowVariant?: 'none' | 'sm' | 'md' | 'lg' | 'xl' 
  }
>(({ className, style, shadowVariant = 'xl', ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(
        'rounded-xl border border-sys-border-4 bg-sys-surface-neutral-0 w-full',
        className
      )}
      style={[
        shadowStyles[shadowVariant],
        style, // Preserve any other styles passed to the component
      ]}
      {...props}
    />
  );
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef<ViewRef, ViewProps & { imageSource?: ImageProps['source'] }>(
  ({ className, imageSource, ...props }, ref) => (
    <View ref={ref} className={cn('flex flex-col', className)} {...props}>
      {imageSource && (
        <Image
          source={imageSource}
          className='object-cover w-full h-[240px] rounded-t-xl'
          resizeMode='cover'
        />
      )}
      <View className='p-lg pb-xs'>{props.children}</View>
    </View>
  )
);
CardHeader.displayName = 'CardHeader';

// Updated CardOverline component to better support custom icons
const CardOverline = React.forwardRef<
  ViewRef, 
  ViewProps & { 
    text: string; 
    icon?: React.ReactNode;
    iconColor?: string;
  }
>(
  ({ className, text, icon, iconColor = "#6366F1", ...props }, ref) => (
    <View 
      ref={ref} 
      className={cn('flex-row items-center gap-xs mb-xs', className)} 
      {...props}
    >
      {icon ? (
        // If a custom icon is provided, render it
        React.isValidElement(icon) ? 
          // If it's a React element, clone it to apply the color
          React.cloneElement(icon, { 
            color: (icon.props.color || iconColor),
            size: (icon.props.size || 16)
          }) : 
          // Otherwise just render it as is
          icon
      ) : (
        // Default to InfoIcon if no icon is provided
        <InfoIcon size={16} color={iconColor} />
      )}
      <Text 
        className="text-sm font-medium tracking-wide"
        style={[
          styles.Inter, 
          { color: iconColor }
        ]}
      >
        {text}
      </Text>
    </View>
  )
);
CardOverline.displayName = 'CardOverline';

const CardTitle = React.forwardRef<TextRef, TextProps>(({ className, style, ...props }, ref) => (
  <Text
    role='heading'
    aria-level={3}
    ref={ref}
    className={cn('text-5xl text-sys-text-body leading-none tracking-tighter mb-xxs', className)}
    style={[styles.Inter, style]}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<TextRef, TextProps>(
  ({ className, style, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('text-base text-sys-text-neutral-3 mb-none font-medium', className)}
      style={[styles.Inter, style]}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value='text-sys-text-neutral-4'>
    <View ref={ref} className={cn('px-lg pt-xxs', className)} {...props} />
  </TextClassContext.Provider>
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  ViewRef,
  ViewProps & { buttonText?: string; onButtonPress?: () => void }
>(({ className, buttonText, onButtonPress, ...props }, ref) => (
  <View ref={ref} className={cn('flex flex-col p-lg pt-md', className)} {...props}>
    {props.children}
    {buttonText && (
      <Button onPress={onButtonPress} className='w-full' textSize='lg'>
        {buttonText}
      </Button>
    )}
  </View>
));
CardFooter.displayName = 'CardFooter';

const CardMarketing = React.forwardRef<
  ViewRef,
  ViewProps & {
    imageSource: ImageProps['source'];
    badgeText?: string;
    headingText?: string;
    children?: React.ReactNode;
    badgeVariant?: string;
    shadowVariant?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  }
>(
  ({ 
    className, 
    imageSource,
    badgeText = 'Cyberdyne systems',
    headingText = 'Will Skynet rule the world?',
    children,
    badgeVariant = 'information',
    shadowVariant = 'md',
    accessible = true,
    accessibilityRole = 'region',
    accessibilityLabel,
    style,
    ...props 
  }, ref) => {
    // Generate a default accessibility label if none provided
    const defaultAccessibilityLabel = `${badgeText} marketing card about ${headingText}`;
    const finalAccessibilityLabel = accessibilityLabel || defaultAccessibilityLabel;
    
    return (
      <View
        ref={ref}
        className={cn(
          'bg-black h-[300px] rounded-xl',
          className
        )}
        style={[
          shadowStyles[shadowVariant],
          style,
        ]}
        accessible={accessible}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={finalAccessibilityLabel}
        {...props}
      >
        {/* Background image */}
        <Image
          className='absolute w-full h-full rounded-xl'
          source={imageSource}
          accessible={true}
          accessibilityRole='image'
          accessibilityLabel={`${badgeText} promotional image`}
          accessibilityIgnoresInvertColors={true}
        />
        
        {/* Badge at the top */}
        <View 
          className='absolute top-md left-md' 
          accessible={true}
          accessibilityRole='none'
          importantForAccessibility='no'
        >
          <Badge 
            variant={badgeVariant}
            accessible={true}
            accessibilityRole='text'
            accessibilityLabel={`${badgeText} badge`}
          >
            <Text>{badgeText}</Text>
          </Badge>
        </View>

        {/* Main heading in the middle */}
        <View
          className='absolute w-full px-lg'
          style={{ top: '40%' }}
          accessible={true}
          accessibilityRole='none'
          importantForAccessibility='no'
        >
          <Text
            style={{ fontFamily: 'Inter' }}
            className='text-white text-6xl font-semibold leading-tight'
            accessible={true}
            accessibilityRole='heading'
            accessibilityLevel={1}
            accessibilityLabel={headingText}
          >
            {headingText}
          </Text>
        </View>

        {/* Children (typically CardFooter with Button) */}
        {children}
      </View>
    );
  }
);
CardMarketing.displayName = 'CardMarketing';

export { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardOverline,
  CardMarketing,
  shadowStyles // Export shadow styles for reuse in other components if needed
};