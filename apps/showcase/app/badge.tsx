import { View } from 'react-native';
import { Badge } from '~/components/ui/badge';
import { Text } from '~/components/ui/text';

export default function BadgeScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <Badge variant={'default'}>
        <Text>Default</Text>
      </Badge>
      <Badge variant={'brand'}>
        <Text>Brand</Text>
      </Badge>
      <Badge variant={'secondary'}>
        <Text>Secondary</Text>
      </Badge>
      <Badge variant={'error'}>
        <Text>Error</Text>
      </Badge>
      <Badge variant={'success'}>
        <Text>Success</Text>
      </Badge>
      <Badge variant={'warning'}>
        <Text>Warning</Text>
      </Badge>
      <Badge variant={'information'}>
        <Text>Information</Text>
      </Badge>
    </View>
  );
}
