import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Text } from '~/components/ui/text';

export default function PopoverScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof PopoverTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <View className='items-center justify-center flex-1 p-6'>
      <Pressable
        className='absolute top-0 right-0 w-16 h-16 active:bg-primary/5'
        onPress={() => {
          // open programmatically
          triggerRef.current?.open();
        }}
      />
      <Popover>
        <PopoverTrigger ref={triggerRef} asChild>
          <Button variant='secondary'>
            <Text>Open popover</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side={Platform.OS === 'web' ? 'bottom' : 'top'}
          insets={contentInsets}
          className='w-80'
        >
          <View className='gap-4 web:grid'>
            <View className='space-y-2'>
              <Text className='font-medium leading-none native:text-xl'>Dimensions</Text>
              <Text className='text-sm text-muted-foreground'>
                Set the dimensions for the layer.
              </Text>
            </View>
            <View className='gap-2 web:grid'>
              <LabelledInput autoFocus id='width' label='Width' />
              <LabelledInput id='maxWidth' label='Max. Width' />
              <LabelledInput id='height' label='Height' />
              <LabelledInput id='maxHeight' label='Max. Height' />
            </View>
          </View>
        </PopoverContent>
      </Popover>
    </View>
  );
}

function LabelledInput({
  id,
  label,
  autoFocus = false,
}: {
  id: string;
  label: string;
  autoFocus?: boolean;
}) {
  const inputRef = React.useRef<React.ElementRef<typeof Input>>(null);

  function onPress() {
    inputRef.current?.focus();
  }

  return (
    <View className='flex-row items-center gap-4 web:grid web:grid-cols-3'>
      <Label nativeID={id} onPress={onPress} className='w-24'>
        {label}
      </Label>
      <Input
        ref={inputRef}
        autoFocus={autoFocus}
        aria-labelledby={id}
        defaultValue='25px'
        className='flex-1 h-8 web:col-span-2'
      />
    </View>
  );
}
