import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card';
import { Text } from '~/components/ui/text';
import { CalendarDays } from '~/lib/icons/CalendarDays';

export default function HoverCardScreen() {
  const triggerRef = React.useRef<React.ElementRef<typeof HoverCardTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  return (
    <>
      <View className='items-center justify-center flex-1 gap-xxs2 p-lg'>
        <Pressable
          className='absolute top-0 right-0 w-16 h-16 active:bg-sys-surface-neutral-0'
          onPress={() => {
            // open programmatically
            triggerRef.current?.open();
          }}
        />
        <HoverCard>
          <HoverCardTrigger ref={triggerRef} asChild>
            <Button variant='link' size='lg'>
              <Text>Tap this text</Text>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent insets={contentInsets} className='w-80 native:w-96'>
            <View className='flex flex-row justify-between gap-md'>
              <Avatar size="32px" variant="Male 1">
                <AvatarImage
                  source={require('../assets/male_1.png')}
                  className="border-0"
                  style={{ borderWidth: 0 }}
                />
                <AvatarFallback>
                  <Text>VA</Text>
                </AvatarFallback>
              </Avatar>
              <View className='flex-1 gap-xxs'>
                <Text className='text-sm font-semibold text-sys-text-secondary native:text-base'>@coolglasses</Text>
                <Text className='text-sm text-sys-text-body native:text-base'>
                  This mobile starter kit really rocks.
                </Text>
                <View className='flex flex-row items-center gap-xs pt-xs'>
                  <CalendarDays size={14} className='text-sys-text-body opacity-70' />
                  <Text className='text-xs native:text-sm text-sys-text-neutral-3'>
                    Joined December 2025
                  </Text>
                </View>
              </View>
            </View>
          </HoverCardContent>
        </HoverCard>
      </View>
    </>
  );
}