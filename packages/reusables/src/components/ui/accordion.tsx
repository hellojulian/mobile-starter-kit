import * as AccordionPrimitive from '@rn-primitives/accordion';
import * as React from 'react';
import { Platform, Pressable, View, StyleSheet, Text } from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { cn } from '../../lib/utils';
import { TextClassContext } from './text';

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
  Inter: {
    fontFamily: 'Inter',
  },
});

const Accordion = React.forwardRef<AccordionPrimitive.RootRef, AccordionPrimitive.RootProps>(
  ({ children, ...props }, ref) => {
    return (
      <LayoutAnimationConfig skipEntering>
        <AccordionPrimitive.Root ref={ref} {...props} asChild={Platform.OS !== 'web'}>
          <Animated.View layout={LinearTransition.duration(200)}>{children}</Animated.View>
        </AccordionPrimitive.Root>
      </LayoutAnimationConfig>
    );
  }
);

Accordion.displayName = AccordionPrimitive.Root.displayName;

const AccordionItem = React.forwardRef<AccordionPrimitive.ItemRef, AccordionPrimitive.ItemProps & { disabled?: boolean }>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    return (
      <Animated.View className={'overflow-hidden mb-1.5'} layout={LinearTransition.duration(200)}>
        <AccordionPrimitive.Item
          ref={ref}
          value={value}
          disabled={disabled}
          {...props}
        >
          <AccordionItemInner className={className} disabled={disabled}>
            {children}
          </AccordionItemInner>
        </AccordionPrimitive.Item>
      </Animated.View>
    );
  }
);

function AccordionItemInner({ className, disabled, children }: { className?: string; disabled?: boolean; children?: React.ReactNode }) {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  
  return (
    <View
      className={cn(
        // Base styling matching Figma exactly
        'border rounded-md',
        // Dynamic background and border based on expanded state
        isExpanded && !disabled ? 'bg-sys-surface-secondary-pressed border-sys-text-secondary' : 'bg-sys-surface-neutral-0 border-sys-border-4',
        // For disabled state
        disabled && 'bg-sys-surface-disabled border-sys-text-disabled pointer-events-none',
        className
      )}
    >
      {children}
    </View>
  );
}
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const Trigger = Platform.OS === 'web' ? View : Pressable;

const AccordionTrigger = React.forwardRef<
  AccordionPrimitive.TriggerRef,
  AccordionPrimitive.TriggerProps & { disabled?: boolean }
>(({ className, children, disabled = false, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    isExpanded ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
  }));

  const textColor = disabled ? 'text-sys-text-disabled' : 'text-sys-text-body';
  const iconColor = disabled ? 'text-sys-text-disabled' : 'text-sys-text-body';

  return (
    <TextClassContext.Provider value={`text-body-base ${textColor} font-medium tracking-[-0.075px]`}>
      <AccordionPrimitive.Header className='flex'>
        <AccordionPrimitive.Trigger 
          ref={ref} 
          {...props} 
          asChild
        >
          <Trigger
            className={cn(
              'flex flex-row web:flex-1 items-center justify-between p-sm web:transition-all group web:focus-visible:outline-none web:focus-visible:ring-1 web:focus-visible:ring-ring',
              className
            )}
          >
            <Text style={styles.Inter} className={`flex-1 text-left text-body-base ${textColor}`}>
              {children}
            </Text>
            <Animated.View style={chevronStyle} className="ml-xs">
              <ChevronDown size={24} className={`${iconColor} shrink-0`} />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    </TextClassContext.Provider>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  AccordionPrimitive.ContentRef,
  AccordionPrimitive.ContentProps & { disabled?: boolean }
>(({ className, children, disabled = false, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  
  const textColor = disabled ? 'text-sys-text-disabled' : 'text-sys-text-body';
  
  return (
    <TextClassContext.Provider value={`text-body-sm ${textColor} font-medium tracking-[-0.07px]`}>
      <AccordionPrimitive.Content
        className={cn(
          'overflow-hidden web:transition-all',
          isExpanded ? 'web:animate-accordion-down' : 'web:animate-accordion-up'
        )}
        ref={ref}
        {...props}
      >
        <InnerContent className={cn('px-sm pb-md', className)}>
          <Text style={styles.Inter} className={`text-body-sm ${textColor}`}>{children}</Text>
        </InnerContent>
      </AccordionPrimitive.Content>
    </TextClassContext.Provider>
  );
});

function InnerContent({ children, className }: { children: React.ReactNode; className?: string }) {
  if (Platform.OS === 'web') {
    return <View className={className}>{children}</View>;
  }
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutUp.duration(200)}
      className={className}
    >
      {children}
    </Animated.View>
  );
}

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };