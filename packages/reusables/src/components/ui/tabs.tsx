import * as TabsPrimitive from '@rn-primitives/tabs';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { TextClassContext } from './text';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<TabsPrimitive.ListRef, TabsPrimitive.ListProps & {
  accessibilityLabel?: string;
}>(
  ({ className, accessibilityLabel, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'web:inline-flex h-10 native:h-12 items-center justify-center rounded-md bg-muted p-1 native:px-1.5',
        className
      )}
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      {...props}
    />
  )
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<TabsPrimitive.TriggerRef, TabsPrimitive.TriggerProps & {
  accessibilityLabel?: string;
}>(
  ({ className, accessibilityLabel, ...props }, ref) => {
    const { value } = TabsPrimitive.useRootContext();
    const isSelected = value === props.value;
    return (
      <TextClassContext.Provider
        value={cn(
          'text-sm native:text-base font-medium text-muted-foreground web:transition-all',
          isSelected && 'text-foreground'
        )}
      >
        <TabsPrimitive.Trigger
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center shadow-none web:whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium web:ring-offset-background web:transition-all web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
            props.disabled && 'web:pointer-events-none opacity-50',
            isSelected && 'bg-background',
            className
          )}
          accessibilityRole="tab"
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ selected: isSelected, disabled: props.disabled }}
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<TabsPrimitive.ContentRef, TabsPrimitive.ContentProps & {
  accessibilityLabel?: string;
}>(
  ({ className, accessibilityLabel, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        'web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
        className
      )}
      accessibilityRole="tabpanel"
      accessibilityLabel={accessibilityLabel}
      {...props}
    />
  )
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
