import * as React from 'react';
import { Text, View, Modal, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar as CalendarIcon } from '~/lib/icons/Calendar';
import { cn } from '~/lib/utils';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DeprecatedUi } from '@rnr/reusables';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { Button, buttonTextVariants } = DeprecatedUi;

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fallback for platforms where BlurView doesn't work
  },
});

export default function DatePickerScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date | null>(null);

  const showDatepicker = () => {
    setTempDate(selectedDate || new Date());
    setIsModalVisible(true);
  };

  const hideDatepicker = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    if (tempDate) {
      setSelectedDate(tempDate);
    }
    hideDatepicker();
  };

  const handleCancel = () => {
    setTempDate(null);
    hideDatepicker();
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
      if (Platform.OS === 'android') {
        handleConfirm();
      }
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <View className='items-center justify-center flex-1'>
      <Button variant='outline' className='gap-3' onPress={showDatepicker}>
        {({ pressed }) => (
          <>
            <CalendarIcon
              className={buttonTextVariants({
                variant: 'outline',
                className: pressed ? 'opacity-70' : '',
              })}
              size={21}
            />
            <Text
              style={styles.Inter}
              className={buttonTextVariants({
                variant: 'outline',
                className: pressed ? 'opacity-70' : '',
              })}
            >
              {selectedDate ? formatDate(selectedDate) : 'Pick a date'}
            </Text>
          </>
        )}
      </Button>

      <Modal transparent={true} visible={isModalVisible} onRequestClose={hideDatepicker}>
        <View className='justify-end flex-1'>
          <Animated.View
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(150)}
            style={StyleSheet.absoluteFill}
          >
            <BlurView intensity={20} tint='dark' style={styles.blurView} />
            <View style={styles.overlay} />
          </Animated.View>
          <Animated.View
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown.springify().damping(15)}
            className='bg-sys-surface-neutral-0 rounded-t-xl'
            style={{ paddingBottom: insets.bottom }}
          >
            <View className='px-4 pt-4'>
              <View style={{ height: Platform.OS === 'ios' ? 216 : 'auto' }}>
                <DateTimePicker
                  testID='dateTimePicker'
                  value={tempDate || new Date()}
                  mode='date'
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onChange}
                  locale='en-US'
                />
              </View>
              {Platform.OS === 'ios' && (
                <View className='flex-row justify-between mt-4 mb-2'>
                  <TouchableOpacity onPress={handleCancel} className='px-4 py-2'>
                    <Text style={styles.Inter} className='text-lg text-sys-text-secondary'>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleConfirm} className='px-4 py-2'>
                    <Text style={styles.Inter} className='text-lg text-sys-text-secondary'>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
