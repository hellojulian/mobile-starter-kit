import * as Slot from '@rn-primitives/slot';
import { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { cn } from '../../lib/utils';

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter-Medium',
  },
  InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: 'bold',
  }, 
  InterBold: {
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
  }, 
});

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-base  web:select-text', textClass, className)}
        style={[styles.Inter, style]}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

const TextSemiBold = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-base  web:select-text font-bold', textClass, className)}
        style={[styles.InterSemiBold, style]}
        ref={ref}
        {...props}
      />
    );
  }
);
TextSemiBold.displayName = 'TextSemiBold';

const TextBold = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-base  web:select-text font-bold', textClass, className)}
        style={[styles.InterBold, style]}
        ref={ref}
        {...props}
      />
    );
  }
);
TextBold.displayName = 'TextBold';

export { Text, TextSemiBold, TextBold, TextClassContext };