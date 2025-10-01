import { PortalHost } from '@rn-primitives/portal';
import * as React from 'react';
import { Platform, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FullWindowOverlay } from 'react-native-screens';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Text } from '~/components/ui/text';
import { H1, Muted } from '~/components/ui/typography';

const CUSTOM_PORTAL_HOST_NAME = 'modal-example';
const WindowOverlay = Platform.OS === 'ios' ? FullWindowOverlay : React.Fragment;

type ActiveComponent = 'input' | 'select' | null;

export default function ModalScreen() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 16,
    right: 16,
  };

  const [selectedService, setSelectedService] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [activeComponent, setActiveComponent] = React.useState<ActiveComponent>(null);
  const triggerRef = React.useRef<React.ElementRef<typeof SelectTrigger>>(null);

  const handleInputFocus = () => {
    setActiveComponent('input');
  };

  const handleSelectOpen = (open: boolean) => {
    if (open) {
      setActiveComponent('select');
    } else {
      setActiveComponent(null);
    }
  };

  return (
    <>
      <View className='items-center justify-center flex-1'>
        <View className='w-full max-w-md gap-5 p-4 native:pb-4'>
          <View className='items-center w-full'>
            <Image
              source={require('../assets/logdog.png')}
              className='w-[250px] h-[250px]'
              resizeMode='contain'
            />
          </View>
          <View className='gap-xxs'>
          <H1 className='text-5xl text-center font-semibold tracking-tighter text-sys-text-body'>Create an account</H1>
            <Muted className='text-base text-sys-text-body text-center'>
              Enter your email below to create your account
            </Muted>
          </View>
          <Input
            placeholder='name@example.com'
            value={inputValue}
            onChangeText={setInputValue}
            onFocus={handleInputFocus}
            state={activeComponent === 'input' ? 'active' : 'default'}
          />
          <Button>
            <Text>Continue</Text>
          </Button>
          <View>
            <Muted className='text-center text-sys-text-body'>
              By creating an account, you agree to our{' '}
              <Muted className='underline'>Terms of Service</Muted> and{' '}
              <Muted className='underline'>Privacy Policy</Muted>
            </Muted>
          </View>
        </View>
      </View>
      <WindowOverlay>
        <PortalHost name={CUSTOM_PORTAL_HOST_NAME} />
      </WindowOverlay>
    </>
  );
}
