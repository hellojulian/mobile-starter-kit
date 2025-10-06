import * as MenubarPrimitive from '@rn-primitives/menubar';
import * as React from 'react';
import { Platform, Text, TextProps, View } from 'react-native';
import { Check } from '../../lib/icons/Check';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { ChevronRight } from '../../lib/icons/ChevronRight';
import { ChevronUp } from '../../lib/icons/ChevronUp';
import { cn } from '../../lib/utils';
import { TextClassContext } from './text';

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<MenubarPrimitive.RootRef, MenubarPrimitive.RootProps>(
  ({ className, ...props }, ref) => (
    <MenubarPrimitive.Root
      ref={ref}
      className={cn(
        'flex flex-row h-10 native:h-12 items-center space-x-xxs rounded-md border border-border bg-sys-surface-neutral-0 p-xxs',
        className
      )}
      {...props}
    />
  )
);
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<MenubarPrimitive.TriggerRef, MenubarPrimitive.TriggerProps>(
  ({ className, ...props }, ref) => {
    const { value } = MenubarPrimitive.useRootContext();
    const { value: itemValue } = MenubarPrimitive.useMenuContext();

    return (
      <MenubarPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex flex-row web:cursor-default web:select-none items-center rounded-sm px-sm py-1.5 text-body-sm native:text-body-sm native:h-10 native:px-5 native:py-0 font-medium web:outline-none web:focus:bg-accent active:bg-accent web:focus:text-sys-text-body',
          value === itemValue && 'bg-accent text-sys-text-body',
          className
        )}
        {...props}
      />
    );
  }
);
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  MenubarPrimitive.SubTriggerRef,
  MenubarPrimitive.SubTriggerProps & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => {
  const { open } = MenubarPrimitive.useSubContext();
  const Icon = Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextClassContext.Provider
      value={cn(
        'select-none text-body-sm native:text-body-sm text-sys-text-body',
        open && 'native:text-sys-text-body'
      )}
    >
      <MenubarPrimitive.SubTrigger
        ref={ref}
        className={cn(
          'flex flex-row web:cursor-default web:select-none items-center gap-xs web:focus:bg-accent active:bg-accent web:hover:bg-accent rounded-sm px-xs py-1.5 native:py-xs web:outline-none',
          open && 'bg-sys-surface-neutral-0',
          inset && 'pl-xl',
          className
        )}
        {...props}
      >
        <>{children}</>
        <Icon size={18} className='ml-auto text-sys-text-body' />
      </MenubarPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
});
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  MenubarPrimitive.SubContentRef,
  MenubarPrimitive.SubContentProps
>(({ className, ...props }, ref) => {
  const { open } = MenubarPrimitive.useSubContext();
  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border mt-xxs border-border bg-sys-surface-neutral-0 p-xxs shadow-md shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        open
          ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
          : 'web:animate-out web:fade-out-0 web:zoom-out ',
        className
      )}
      {...props}
    />
  );
});
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  MenubarPrimitive.ContentRef,
  MenubarPrimitive.ContentProps & { portalHost?: string }
>(({ className, portalHost, ...props }, ref) => {
  const { value } = MenubarPrimitive.useRootContext();
  const { value: itemValue } = MenubarPrimitive.useMenuContext();
  return (
    <MenubarPrimitive.Portal hostName={portalHost}>
      <MenubarPrimitive.Content
        ref={ref}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-sys-surface-neutral-0 p-xxs shadow-md shadow-foreground/5 ',
          value === itemValue
            ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
            : 'web:animate-out web:fade-out-0 web:zoom-out-95',
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  );
});
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  MenubarPrimitive.ItemRef,
  MenubarPrimitive.ItemProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <TextClassContext.Provider value='select-none text-body-sm native:text-body-sm text-sys-text-body web:group-focus:text-sys-text-body'>
    <MenubarPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex flex-row web:cursor-default items-center gap-xs rounded-sm px-xs py-1.5 native:py-xs web:outline-none web:focus:bg-accent active:bg-accent web:hover:bg-accent group',
        inset && 'pl-8',
        props.disabled && 'opacity-50 web:pointer-events-none',
        className
      )}
      {...props}
    />
  </TextClassContext.Provider>
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  MenubarPrimitive.CheckboxItemRef,
  MenubarPrimitive.CheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex flex-row web:cursor-default items-center web:group rounded-sm py-1.5 native:py-xs pl-xl pr-xs web:outline-none web:focus:bg-accent active:bg-accent',
      props.disabled && 'web:pointer-events-none opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <View className='absolute left-xs flex h-3.5 w-3.5 items-center justify-center'>
      <MenubarPrimitive.ItemIndicator>
        <Check size={14} strokeWidth={3} className='text-sys-text-body' />
      </MenubarPrimitive.ItemIndicator>
    </View>
    <>{children}</>
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  MenubarPrimitive.RadioItemRef,
  MenubarPrimitive.RadioItemProps
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex flex-row web:cursor-default web:group items-center rounded-sm py-1.5 native:py-xs pl-xl pr-xs web:outline-none web:focus:bg-accent active:bg-accent',
      props.disabled && 'web:pointer-events-none opacity-50',
      className
    )}
    {...props}
  >
    <View className='absolute left-xs flex h-3.5 w-3.5 items-center justify-center'>
      <MenubarPrimitive.ItemIndicator>
        <View className='w-2 h-2 rounded-full bg-sys-surface-neutral-0' />
      </MenubarPrimitive.ItemIndicator>
    </View>
    <>{children}</>
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  MenubarPrimitive.LabelRef,
  MenubarPrimitive.LabelProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'px-xs py-1.5 text-body-sm native:text-body-sm font-semibold text-sys-text-body web:cursor-default',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  MenubarPrimitive.SeparatorRef,
  MenubarPrimitive.SeparatorProps
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('-mx-xxs my-xxs h-px bg-border', className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: TextProps) => {
  return (
    <Text
      className={cn(
        'ml-auto text-body-xs native:text-body-xs tracking-widest text-sys-text-body',
        className
      )}
      {...props}
    />
  );
};
MenubarShortcut.displayName = 'MenubarShortcut';

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
