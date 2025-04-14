import * as React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { cn } from '../../lib/utils';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter',
  },
});

const Textarea = React.forwardRef<React.ElementRef<typeof TextInput>, TextInputProps>(
  (
    { className, multiline = true, numberOfLines = 4, placeholderClassName, style, ...props },
    ref
  ) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.text, style]}
        className={cn(
          'web:flex min-h-[80px] w-full rounded-md border border-sys-border-4 bg-background px-3 py-2 text-sm lg:text-sm native:text-sm native:leading-[1.25] text-foreground web:ring-offset-background placeholder:text-sys-text-neutral-3 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 focus:border-2 focus:border-sys-border-6 focus:bg-sys-surface-secondary-pressed',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className
        )}
        placeholderClassName={cn('text-sys-text-neutral-3', placeholderClassName)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical='top'
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
