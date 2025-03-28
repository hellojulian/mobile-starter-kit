import * as Slot from '@rn-primitives/slot';
import { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Platform, Text as RNText, StyleSheet } from 'react-native';
import { cn } from '../../lib/utils';

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
  baseText: {
    flexShrink: 1, // Allow text to shrink
    flexWrap: 'wrap', // Enable text wrapping
  },
});

const H1 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role='heading'
        aria-level='1'
        className={cn(
          'web:scroll-m-20 text-4xl text-foreground tracking-tighter lg:text-4xl web:select-text',
          className
        )}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);

H1.displayName = 'H1';

const H2 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role='heading'
        aria-level='2'
        className={cn(
          'web:scroll-m-20 border-b border-border pb-2 text-3xl text-foreground tracking-tighter first:mt-0 web:select-text',
          className
        )}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);

H2.displayName = 'H2';

const H3 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role='heading'
        aria-level='3'
        className={cn(
          'web:scroll-m-20 text-2xl text-foreground tracking-tight web:select-text',
          className
        )}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);

H3.displayName = 'H3';

const H4 = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role='heading'
        aria-level='4'
        className={cn(
          'web:scroll-m-20 text-xl text-foreground tracking-tight web:select-text',
          className
        )}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);

H4.displayName = 'H4';

const P = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-base text-foreground web:select-text', className)}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);
P.displayName = 'P';

const BlockQuote = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role={Platform.OS === 'web' ? 'blockquote' : undefined}
        className={cn(
          'mt-6 native:mt-4 border-l-2 border-border pl-6 native:pl-3 text-base text-foreground italic web:select-text',
          className
        )}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);

BlockQuote.displayName = 'BlockQuote';

const Code = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        role={Platform.OS === 'web' ? 'code' : undefined}
        className={cn(
          'relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] text-sm text-foreground web:select-text',
          className
        )}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);

Code.displayName = 'Code';

const Lead = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-xl text-muted-foreground web:select-text', className)}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);

Lead.displayName = 'Lead';

const Large = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-xl text-foreground web:select-text', className)}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);

Large.displayName = 'Large';

const Small = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-sm text-foreground leading-none web:select-text', className)}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);

Small.displayName = 'Small';

const Muted = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-sm text-muted-foreground web:select-text', className)}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    );
  }
);

Muted.displayName = 'Muted';

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };