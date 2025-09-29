import { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import * as React from 'react';
import { toggleTextVariants, toggleVariants } from '../../components/ui/toggle';
import { TextClassContext } from './text';
import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group';
import { cn } from '../../lib/utils';

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants> | null>(null);

const ToggleGroup = React.forwardRef<
  ToggleGroupPrimitive.RootRef,
  ToggleGroupPrimitive.RootProps & VariantProps<typeof toggleVariants> & {
    accessibilityLabel?: string;
  }
>(({ className, variant, size, children, accessibilityLabel, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('flex flex-row items-center justify-center gap-1', className)}
    accessibilityRole="group"
    accessibilityLabel={accessibilityLabel || "Toggle group"}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (context === null) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const ToggleGroupItem = React.forwardRef<
  ToggleGroupPrimitive.ItemRef,
  ToggleGroupPrimitive.ItemProps & VariantProps<typeof toggleVariants> & {
    accessibilityLabel?: string;
  }
>(({ className, children, variant, size, accessibilityLabel, ...props }, ref) => {
  const context = useToggleGroupContext();
  const { value } = ToggleGroupPrimitive.useRootContext();

  return (
    <TextClassContext.Provider
      value={cn(
        toggleTextVariants({ variant, size }),
        ToggleGroupPrimitive.utils.getIsSelected(value, props.value)
          ? 'text-sys-text-secondary'
          : 'web:group-hover:text-muted-foreground'
      )}
    >
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          props.disabled && 'web:pointer-events-none opacity-50',
          ToggleGroupPrimitive.utils.getIsSelected(value, props.value) && 'bg-sys-surface-secondary-pressed',
          className
        )}
        accessibilityRole="radio"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ 
          selected: ToggleGroupPrimitive.utils.getIsSelected(value, props.value),
          disabled: !!props.disabled 
        }}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    </TextClassContext.Provider>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

function ToggleGroupIcon({
  className,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & {
  icon: LucideIcon;
}) {
  const textClass = React.useContext(TextClassContext);
  return <Icon className={cn(textClass, className)} {...props} />;
}

export { ToggleGroup, ToggleGroupIcon, ToggleGroupItem };
