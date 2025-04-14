'use client';

import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Checkbox, CheckboxTile } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { Globe, Mail, Bell } from 'lucide-react-native';

export default function CheckboxScreen() {
  const [checked, setChecked] = React.useState(false);
  const [tileChecked, setTileChecked] = React.useState(false);
  const [emailChecked, setEmailChecked] = React.useState(false);
  const [notificationsChecked, setNotificationsChecked] = React.useState(false);

  return (
    <ScrollView>
      <View className='p-4 gap-6'>
        {/* Original checkbox */}
        <Label
          className='text-lg font-medium'
          accessibilityRole='header'
          accessibilityLevel={2}
          nativeID='checkbox-section-header'
        >
          Checkbox
        </Label>
        <View
          className='flex-row gap-3 items-center'
          accessibilityRole='none'
          importantForAccessibility='no'
        >
          <Checkbox
            aria-labelledby='terms'
            checked={checked}
            onCheckedChange={setChecked}
            accessibilityRole='checkbox'
            accessibilityState={{
              checked: checked,
              disabled: false,
            }}
            accessibilityHint='Toggle acceptance of terms and conditions'
            accessibilityLiveRegion='polite'
          />
          <Label
            nativeID='terms'
            onPress={() => setChecked((prev) => !prev)}
            accessibilityRole='text'
            accessibilityHint='Tap to toggle checkbox'
          >
            Accept terms and conditions
          </Label>
        </View>

        {/* Checkbox tiles section */}
        <View className='gap-4'>
          <Label
            className='text-lg font-medium'
            accessibilityRole='header'
            accessibilityLevel={2}
            nativeID='checkbox-tile-section-header'
          >
            Checkbox Tile
          </Label>

          <CheckboxTile
            title='Checkbox tile'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            icon={<Globe size={24} accessibilityElementsHidden={true} />}
            checked={tileChecked}
            onCheckedChange={setTileChecked}
            accessibilityRole='checkbox'
            accessibilityLabel='Checkbox tile'
            accessibilityHint='Toggle checkbox tile selection'
            accessibilityState={{
              checked: tileChecked,
              disabled: false,
            }}
            accessibilityLiveRegion='polite'
          />

          <CheckboxTile
            title='Email notifications'
            description='Receive email notifications when someone mentions you.'
            icon={<Mail size={24} accessibilityElementsHidden={true} />}
            checked={emailChecked}
            onCheckedChange={setEmailChecked}
            accessibilityRole='checkbox'
            accessibilityLabel='Email notifications'
            accessibilityHint='Toggle email notifications'
            accessibilityState={{
              checked: emailChecked,
              disabled: false,
            }}
            accessibilityLiveRegion='polite'
          />

          <CheckboxTile
            title='Push notifications'
            description='Allow the app to send you push notifications.'
            icon={<Bell size={24} accessibilityElementsHidden={true} />}
            checked={notificationsChecked}
            onCheckedChange={setNotificationsChecked}
            accessibilityRole='checkbox'
            accessibilityLabel='Push notifications'
            accessibilityHint='Toggle push notifications'
            accessibilityState={{
              checked: notificationsChecked,
              disabled: false,
            }}
            accessibilityLiveRegion='polite'
          />
        </View>
      </View>
    </ScrollView>
  );
}
