import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { COMPONENTS } from '~/lib/constants';
import { cn } from '~/lib/utils';

export default function ComponentsScreen() {
  const [search, setSearch] = React.useState('');
  const ref = React.useRef(null);
  const { width } = useWindowDimensions();
  useScrollToTop(ref);

  const data = !search
    ? COMPONENTS
    : COMPONENTS.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
  return (
    <View className='flex-1 px-4'>
      <View className='py-4' />
      <FlashList
        ref={ref}
        data={data}
        estimatedItemSize={49}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Link href={item} asChild>
            <Button
              variant='secondary'
              className={cn(
                'bg-secondary/40 pl-4 pr-1.5 border-x border-t border-foreground/5 rounded-none flex-row justify-between',
                index === 0 && 'rounded-t-md',
                index === data.length - 1 && 'border-b rounded-b-md'
              )}
            >
              <Text className='text-foreground'>{toOptions(item)}</Text>
            </Button>
          </Link>
        )}
        ListFooterComponent={<View className='py-4' />}
      />
    </View>
  );
}

function toOptions(name: string) {
  const title = name
    .split('-')
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(' ');
  return title;
}
