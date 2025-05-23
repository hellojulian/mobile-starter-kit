import * as SelectPrimitive from '@rn-primitives/select';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeInUp, FadeOut, Easing } from 'react-native-reanimated';
import { Check } from '../../lib/icons/Check';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { ChevronUp } from '../../lib/icons/ChevronUp';
import { cn } from '../../lib/utils';

type Option = SelectPrimitive.Option;

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
  Inter: {
    fontFamily: 'Inter',
  },
});

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = React.forwardRef<SelectPrimitive.ValueRef, SelectPrimitive.ValueProps>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Value
      ref={ref}
      className={cn(className)}
      style={[styles.Inter, props.style]}
      {...props}
    />
  )
);
SelectValue.displayName = SelectPrimitive.Value.displayName;

const SelectTrigger = React.forwardRef<SelectPrimitive.TriggerRef, SelectPrimitive.TriggerProps>(
  ({ className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const { open } = SelectPrimitive.useRootContext();

    useEffect(() => {
      setIsOpen(open);
    }, [open]);

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex flex-row w-full h-10 native:h-12 items-center text-sm justify-between rounded-md border border-sys-border-4 bg-sys-surface-0 px-3 py-2 web:ring-offset-background text-muted-foreground web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 [&>span]:line-clamp-1',
          isOpen && 'border-sys-border-6 border-2 bg-sys-surface-secondary-pressed',
          props.disabled && 'web:cursor-not-allowed opacity-50',
          className
        )}
        style={styles.Inter}
        {...props}
      >
        <>{children}</>
        <ChevronDown size={16} aria-hidden={true} className=' text-sys-text-body' />
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = ({ className, ...props }: SelectPrimitive.ScrollUpButtonProps) => {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn('flex web:cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronUp size={14} className='text-foreground' />
    </SelectPrimitive.ScrollUpButton>
  );
};

const SelectScrollDownButton = ({ className, ...props }: SelectPrimitive.ScrollDownButtonProps) => {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn('flex web:cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronDown size={14} className='text-foreground' />
    </SelectPrimitive.ScrollDownButton>
  );
};

const SelectContent = React.forwardRef<
  SelectPrimitive.ContentRef,
  SelectPrimitive.ContentProps & { portalHost?: string }
>(({ className, children, position = 'popper', portalHost, ...props }, ref) => {
  const { open } = SelectPrimitive.useRootContext();

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
        <Animated.View
          entering={FadeInUp.duration(100).easing(Easing.inOut(Easing.poly(1)))}
          exiting={FadeOut.duration(300).easing(Easing.inOut(Easing.quad))}
        >
          <SelectPrimitive.Content
            ref={ref}
            className={cn(
              'relative z-50 max-h-96 rounded-md border border-sys-border-4 bg-sys-surface-neutral-0 py-1 px-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              position === 'popper' &&
                'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
              open
                ? 'web:zoom-in-95 web:animate-in web:fade-in-down-0'
                : 'web:zoom-out-95 web:animate-out web:fade-out-up-0',
              className
            )}
            style={[
              props.style,
              {
                width: 275,
              },
              Platform.OS === 'ios' && {
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,
              },
            ]}
            position={position}
            {...props}
          >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              className={cn(
                'p-1',
                position === 'popper' &&
                  'h-[var(--radix-select-trigger-height)] w-80 min-w-[var(--radix-select-trigger-width)]'
              )}
            >
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </SelectPrimitive.Content>
        </Animated.View>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<SelectPrimitive.LabelRef, SelectPrimitive.LabelProps>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        'py-1.5 native:pb-2 pl-8 native:pl-10 pr-2 text-sys-text-secondary text-md native:text-md font-semibold',
        className
      )}
      style={[styles.Inter, props.style]}
      {...props}
    />
  )
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<SelectPrimitive.ItemRef, SelectPrimitive.ItemProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative web:group flex flex-row w-full web:cursor-default web:select-none items-center rounded-sm py-1.5 native:py-2 pl-8 native:pl-10 pr-2 web:hover:bg-accent/50 active:bg-accent web:outline-none web:focus:bg-accent',
        props.disabled && 'web:pointer-events-none opacity-50',
        className
      )}
      {...props}
    >
      <View className='absolute left-2 native:left-3.5 flex h-3.5 native:pt-px w-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <Check size={16} strokeWidth={3} className='text-sys-text-secondary' />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText
        className='text-sm native:text-lg text-sys-text-body native:text-md web:group-focus:text-accent-foreground'
        style={styles.Inter}
      >
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  SelectPrimitive.SeparatorRef,
  SelectPrimitive.SeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
