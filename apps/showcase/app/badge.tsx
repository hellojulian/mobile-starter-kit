import { View } from 'react-native';
import { Badge } from '~/components/ui/badge';
import { Text } from '~/components/ui/text';

export default function BadgeScreen() {
  return (
    <View className='flex-1 justify-center items-center gap-5'>
      <Badge variant={'default'} accessibilityRole='text' accessibilityLabel='Default badge'>
        <Text>Default</Text>
      </Badge>

      <Badge variant={'brand'} accessibilityRole='text' accessibilityLabel='Brand badge'>
        <Text>Brand</Text>
      </Badge>

      <Badge variant={'secondary'} accessibilityRole='text' accessibilityLabel='Secondary badge'>
        <Text>Secondary</Text>
      </Badge>

      <Badge
        variant={'error'}
        accessibilityRole='text'
        accessibilityLabel='Error status'
        accessibilityState={{ busy: false, disabled: false }}
      >
        <Text>Error</Text>
      </Badge>

      <Badge
        variant={'success'}
        accessibilityRole='text'
        accessibilityLabel='Success status'
        accessibilityState={{ busy: false, disabled: false }}
      >
        <Text>Success</Text>
      </Badge>

      <Badge
        variant={'warning'}
        accessibilityRole='text'
        accessibilityLabel='Warning status'
        accessibilityState={{ busy: false, disabled: false }}
      >
        <Text>Warning</Text>
      </Badge>

      <Badge
        variant={'information'}
        accessibilityRole='text'
        accessibilityLabel='Information status'
        accessibilityState={{ busy: false, disabled: false }}
      >
        <Text>Information</Text>
      </Badge>
    </View>
  );
}
