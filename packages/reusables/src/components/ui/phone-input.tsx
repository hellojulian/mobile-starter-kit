import * as React from 'react';
import { TextInput, View, Text, StyleSheet, Dimensions } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Input } from './input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Get the screen width for full-width calculations
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
  container: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
  },
  countryCodeSelect: {
    width: 80,
    justifyContent: 'center', // Center content vertically
  },
  selectValue: {
    textAlignVertical: 'center', // Center text vertically
  },
  inputField: {
    flex: 1,
    width: screenWidth - 80 - 8 - 48, // screen width - select width - gap - padding (24px on each side)
  }
});

// Country codes for the select dropdown
const countryCodes = [
  { label: '+1', value: '+1' },
  { label: '+44', value: '+44' },
  { label: '+61', value: '+61' },
  { label: '+33', value: '+33' },

];

// Match the styling of the original Input component
const selectTriggerVariants = cva(
  'web:flex h-10 native:h-12 web:w-full rounded-md border bg-background px-3 web:py-2 text-md lg:text-md native:text-md native:leading-[1.25] text-sys-text-body web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-offset-2 flex items-center justify-center',
  {
    variants: {
      state: {
        default: 'border-sys-border-4 bg-sys-surface-neutral-0 placeholder:text-sys-text-neutral-3',
        active: 'border-2 border-sys-border-6 bg-sys-secondary-pressed text-sys-text-body placeholder:text-sys-text-secondary',
        error: 'border-sys-border-error border-2 bg-sys-error-container text-sys-text-body placeholder:text-sys-error',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

const phoneInputVariants = cva(
  'w-full',
  {
    variants: {
      state: {
        default: '',
        active: '',
        error: '',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

interface PhoneInputProps extends VariantProps<typeof phoneInputVariants> {
  label?: string;
  placeholder?: string;
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  countryCode?: string;
  onChangeCountryCode?: (code: string) => void;
  className?: string;
  disabled?: boolean;
}

function PhoneInput({
  className,
  label,
  placeholder = "Enter phone number",
  error,
  value,
  onChangeText,
  countryCode = "+61",
  onChangeCountryCode,
  state = "default",
  disabled = false,
  ...props
}: PhoneInputProps) {
  // Single active state for the entire component
  const [isActive, setIsActive] = React.useState(false);
  
  // Determine the current state based on error and active state
  const currentState = error ? 'error' : isActive ? 'active' : state;
  
  const triggerRef = React.useRef<React.ElementRef<typeof SelectTrigger>>(null);

  // Custom render function for the SelectValue to only show the country code
  const renderSelectValue = () => {
    return countryCode;
  };

  // Function to handle select open state change
  const handleSelectOpenChange = (open: boolean) => {
    // When select is opened, set the active state to true
    if (open) {
      setIsActive(true);
    }
  };

  return (
    <View style={styles.container} className={cn(phoneInputVariants({ state: currentState }), className)}>
      {label && (
        <Text 
          style={styles.Inter} 
          className="mb-2 text-base text-sys-text-body"
        >
          {label}
        </Text>
      )}
      
      <View style={styles.inputRow}>
        {/* Country code selector using Select component */}
        <Select
          defaultValue={countryCode}
          onValueChange={(value) => {
            onChangeCountryCode && onChangeCountryCode(value);
            // Keep active state when selecting a value
            setIsActive(true);
          }}
          onOpenChange={handleSelectOpenChange}
          disabled={disabled}
          accessibilityLabel="Select country code"
          accessibilityHint="Opens a list of country codes"
        >
          <SelectTrigger 
            ref={triggerRef}
            style={styles.countryCodeSelect}
            className={cn(
              selectTriggerVariants({ state: currentState }),
              disabled && 'opacity-50 web:cursor-not-allowed'
            )}
          >
            <SelectValue
              className="text-md text-foreground native:text-md flex-1 text-center"
              placeholder={countryCode}
              style={[styles.Inter, styles.selectValue]}
              render={renderSelectValue} // Custom render function to only show the country code
            />
          </SelectTrigger>
          <SelectContent 
            className="mt-2"
            style={{ width: 100 }}
          >
            <SelectGroup accessibilityRole="radiogroup">
              {countryCodes.map((item) => (
                <SelectItem
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  style={styles.Inter}
                  accessibilityRole="radio"
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        
        {/* Phone number input - using calculated width to ensure full width */}
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          state={currentState} // Use the same state as the select
          error=""  // We'll handle the error display separately
          style={styles.inputField}
          keyboardType="phone-pad"
          onFocus={() => {
            setIsActive(true);
            props.onFocus && props.onFocus();
          }}
          onBlur={(e) => {
            // Only deactivate if the select isn't open
            if (!triggerRef.current?.open) {
              setIsActive(false);
            }
            props.onBlur && props.onBlur(e);
          }}
          editable={!disabled}
          {...props}
        />
      </View>
      
      {/* Error message */}
      {error && (
        <Text style={styles.Inter} className="mt-1 text-base text-sys-fn-error-text">
          {error}
        </Text>
      )}
    </View>
  );
}

export { PhoneInput };