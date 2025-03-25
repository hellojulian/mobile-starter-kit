import * as React from 'react';
import { View } from 'react-native';
import { LocaleConfig, Calendar as RNCalendar } from 'react-native-calendars';
import { NAV_THEME } from '../../lib/constants';
import { useColorScheme } from '../../lib/useColorScheme';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

function Calendar({ theme, ...props }: React.ComponentProps<typeof RNCalendar>) {
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const id = React.useId();

  return (
    <RNCalendar
      key={`${id}-${colorScheme}`}
      hideArrows={false}
      renderArrow={(direction) => (
        <View style={{ padding: 8 }}>
          {direction === 'left' ? (
            <ChevronLeft size={32} color={isDarkColorScheme ? SECONDARY_50 : SECONDARY_20} />
          ) : (
            <ChevronRight size={32} color={isDarkColorScheme ? SECONDARY_50 : SECONDARY_20} />
          )}
        </View>
      )}
      theme={getTheme(isDarkColorScheme, theme)}
      {...props}
    />
  );
}

const SECONDARY_50 = '#5B4CFF';
const SECONDARY_20 = '#5B4CFF';

function getTheme(
  isThemeDark: boolean,
  customTheme?: React.ComponentProps<typeof RNCalendar>['theme']
): React.ComponentProps<typeof RNCalendar>['theme'] {
  if (isThemeDark) {
    return {
      backgroundColor: NAV_THEME.dark.background,
      calendarBackground: NAV_THEME.dark.card,
      textSectionTitleColor: NAV_THEME.dark.text,
      selectedDayBackgroundColor: SECONDARY_50,
      selectedDayTextColor: '#000000',
      todayTextColor: SECONDARY_50,
      dayTextColor: NAV_THEME.dark.text,
      textDisabledColor: '#ffffff30',
      monthTextColor: NAV_THEME.dark.text,
      textMonthFontWeight: '500',
      textMonthFontSize: 20,
      arrowColor: SECONDARY_50,
      'stylesheet.calendar.main': {
        dayContainer: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        selected: {
          alignItems: 'center',
          justifyContent: 'center',
          height: 32,
          width: 32,
          borderRadius: 16,
        },
      },
      'stylesheet.day.basic': {
        base: {
          width: 32,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
        },
        selected: {
          backgroundColor: SECONDARY_50,
          borderRadius: 16,
          width: 32,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
        },
        selectedText: {
          color: '#000000',
          fontWeight: 'bold',
          textAlign: 'center',
          includeFontPadding: false,
        },
      },
      ...customTheme,
    };
  }
  return {
    backgroundColor: NAV_THEME.light.background,
    calendarBackground: NAV_THEME.light.card,
    textSectionTitleColor: NAV_THEME.light.text,
    selectedDayBackgroundColor: SECONDARY_20,
    selectedDayTextColor: '#ffffff',
    todayTextColor: SECONDARY_20,
    dayTextColor: '#2d4150',
    monthTextColor: NAV_THEME.light.text,
    textMonthFontWeight: '500',
    textMonthFontSize: 20,
    arrowColor: SECONDARY_20,
    'stylesheet.calendar.main': {
      dayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      selected: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        width: 32,
        borderRadius: 16,
      },
    },
    'stylesheet.day.basic': {
      base: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
      },
      selected: {
        backgroundColor: SECONDARY_20,
        borderRadius: 16,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
      },
      selectedText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        includeFontPadding: false,
      },
    },
    ...customTheme,
  };
}

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};

LocaleConfig.defaultLocale = 'en';

export { Calendar, LocaleConfig };
