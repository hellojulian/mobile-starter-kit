import { View } from 'react-native';
import { Separator } from '~/components/ui/separator';
import { H4, P, Small } from '~/components/ui/typography';

export default function SeparatorScreen() {
  return (
    <View className='flex-1 justify-center items-center p-lg gap-xxs2'>
      <View className='w-full max-w-xs '>
        <View className='gap-xxs'>
          <H4 className='text-sm native:text-base font-medium leading-none'>Radix Primitives</H4>
          <P className='text-sm native:text-base text-sys-text-body'>
            An open-source UI component library.
          </P>
        </View>
        <Separator className='my-md' />
        <View className='flex flex-row h-5 items-center gap-md '>
          <Small className='font-normal'>Blog</Small>
          <Separator orientation='vertical' />
          <Small className='font-normal'>Docs</Small>
          <Separator orientation='vertical' />
          <Small className='font-normal'>Source</Small>
        </View>
      </View>
    </View>
  );
}
