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
import { TextClassContext } from '../ui/text';
import { Button } from './button';
import { InfoIcon } from 'lucide-react-native';

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
});

const Card = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'rounded-xl border border-sys-border-4 bg-sys-surface-neutral-0 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] w-full',
      className
    )}
    {...props}
  />
));
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
      <View className='p-6 pb-2'>{props.children}</View>
    </View>
  )
);
CardHeader.displayName = 'CardHeader';

const CardOverline = React.forwardRef<ViewRef, ViewProps & { text: string; icon?: React.ReactNode }>(
  ({ className, text, icon, ...props }, ref) => (
    <View 
      ref={ref} 
      className={cn('flex-row items-center gap-xs mb-2', className)} 
      {...props}
    >
      {icon || <InfoIcon size={16} color="#6366F1" />}
      <Text 
        className="text-[#6366F1] text-sm font-medium tracking-wide"
        style={styles.Inter}
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
    className={cn('text-xl text-sys-text-body leading-none tracking-tighter mb-1', className)}
    style={[styles.Inter, style]}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<TextRef, TextProps>(
  ({ className, style, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('text-base text-sys-text-neutral-3 mb-0 font-medium', className)}
      style={[styles.Inter, style]}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value='text-sys-text-neutral-4'>
    <View ref={ref} className={cn('px-6 pt-1', className)} {...props} />
  </TextClassContext.Provider>
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  ViewRef,
  ViewProps & { buttonText?: string; onButtonPress?: () => void }
>(({ className, buttonText, onButtonPress, ...props }, ref) => (
  <View ref={ref} className={cn('flex flex-col p-6 pt-4', className)} {...props}>
    {props.children}
    {buttonText && (
      <Button onPress={onButtonPress} className='w-full' textSize='lg'>
        {buttonText}
      </Button>
    )}
  </View>
));
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CardOverline };