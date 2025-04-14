import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Skeleton } from '~/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardOverline,
  CardMarketing,
} from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
  InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '500',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    fontFamily: 'Inter',
    paddingBottom: 4,
    paddingLeft: 2,
  },
  input: {
    fontFamily: 'Inter',
  },
});

export default function SkeletonScreen() {
  return (
    <View className='flex-1 justify-center items-center p-4'>
      <Card
        accessible={true}
        accessibilityRole='article'
        accessibilityLabel='Product card for Jupiter Glasses'
        importantForAccessibility='yes'
      >
        <CardHeader
          imageSource={require('../assets/grub.png')}
          accessibilityLabel='Jupiter Glasses product image'
          accessibilityRole='image'
        >
          <View className='flex-row items-center justify-between'>
            <Skeleton className='h-6 w-[180px]' />
            <Skeleton className='h-6 w-[70px]' />
          </View>
          <Skeleton className='h-6 w-[120px] mt-2' />
        </CardHeader>
        <CardFooter className='flex-row justify-between mt-0'>
          <View style={{ flex: 1, marginRight: 8 }} accessibilityElementsHidden={false}>
            <Skeleton className='h-12 w-full rounded-xl' />
          </View>
          <View style={{ flex: 1 }} accessibilityElementsHidden={false}>
            <Skeleton className='h-12 w-full rounded-xl' />
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}
