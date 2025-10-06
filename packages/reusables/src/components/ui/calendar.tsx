import * as React from 'react';
import { View, Pressable } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { Text } from './text';
import { ChevronLeft, ChevronRight } from '../../lib/icons';
import { cn } from '../../lib/utils';
import { useColorScheme } from '../../lib/useColorScheme';

const calendarVariants = cva(
  'bg-sys-surface-neutral-0 border border-sys-border-5 rounded-md overflow-hidden',
  {
    variants: {
      size: {
        default: 'p-md gap-md',
        sm: 'p-sm gap-sm',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const dayVariants = cva(
  'flex items-center justify-center min-w-[32px] min-h-[32px] rounded-full',
  {
    variants: {
      variant: {
        default: 'text-sys-text-body',
        disabled: 'text-sys-text-neutral-3',
        selected: 'bg-sys-text-secondary text-white',
        today: 'text-sys-text-secondary font-medium',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface CalendarProps extends VariantProps<typeof calendarVariants> {
  className?: string;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  currentMonth?: Date;
  onMonthChange?: (date: Date) => void;
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function Calendar({
  className,
  selectedDate,
  onDateSelect,
  currentMonth = new Date(),
  onMonthChange,
  size,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState(currentMonth);
  const { isDarkColorScheme } = useColorScheme();
  
  // Design system colors that adapt to light/dark mode - sys-text-body
  const textBodyColor = isDarkColorScheme ? '#F8FAFC' : '#0F172A';

  const today = new Date();
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const prevMonth = new Date(year, monthIndex - 1, 1);
  const nextMonth = new Date(year, monthIndex + 1, 1);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = direction === 'prev' ? prevMonth : nextMonth;
    setMonth(newMonth);
    onMonthChange?.(newMonth);
  };

  const handleDateSelect = (date: Date) => {
    onDateSelect?.(date);
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getDaysInPrevMonth = () => {
    const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
    const days = [];
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      days.push(new Date(year, monthIndex - 1, prevMonthLastDay - i));
    }
    return days;
  };

  const getDaysInCurrentMonth = () => {
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, monthIndex, day));
    }
    return days;
  };

  const getDaysInNextMonth = () => {
    const totalCells = 42; // 6 rows × 7 days
    const currentDays = firstDayWeekday + daysInMonth;
    const remainingCells = totalCells - currentDays;
    
    const days = [];
    for (let day = 1; day <= remainingCells && days.length < 14; day++) {
      days.push(new Date(year, monthIndex + 1, day));
    }
    return days;
  };

  const allDays = [
    ...getDaysInPrevMonth(),
    ...getDaysInCurrentMonth(),
    ...getDaysInNextMonth(),
  ];

  const renderDay = (date: Date, isPreviousMonth: boolean, isNextMonth: boolean) => {
    const isSelected = isDateSelected(date);
    const isTodayDate = isToday(date);
    const isDisabled = isPreviousMonth || isNextMonth;

    let variant: 'default' | 'disabled' | 'selected' | 'today' = 'default';
    
    if (isSelected) {
      variant = 'selected';
    } else if (isDisabled) {
      variant = 'disabled';
    } else if (isTodayDate) {
      variant = 'today';
    }

    return (
      <Pressable
        key={date.toISOString()}
        onPress={() => !isDisabled && handleDateSelect(date)}
        className={cn(dayVariants({ variant }))}
        disabled={isDisabled}
      >
        <Text className={cn(
          "text-body-xs font-medium",
          isSelected ? "text-white" : 
          isDisabled ? "text-sys-text-neutral-3" : 
          "text-sys-text-body"
        )}>
          {date.getDate()}
        </Text>
      </Pressable>
    );
  };

  const weeks = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  return (
    <View className={cn(calendarVariants({ size }), className)} {...props}>
      {/* Header */}
      <View className="flex-row items-center justify-between gap-12">
        <Pressable
          onPress={() => navigateMonth('prev')}
          className="border border-sys-border-5 rounded p-1 flex items-center justify-center"
        >
          <ChevronLeft size={18} color={textBodyColor} />
        </Pressable>
        
        <Text className="text-md font-medium text-sys-text-body">
          {MONTHS[monthIndex]} {year}
        </Text>
        
        <Pressable
          onPress={() => navigateMonth('next')}
          className="border border-sys-border-5 rounded p-1 flex items-center justify-center"
        >
          <ChevronRight size={18} color={textBodyColor} />
        </Pressable>
      </View>

      {/* Calendar Grid */}
      <View className="gap-sm">
        {/* Day Headers */}
        <View className="flex-row justify-between">
          {DAYS_OF_WEEK.map((day) => (
            <View key={day} className="min-w-[32px] items-center">
              <Text className="text-body-xs font-medium text-sys-text-neutral-3">
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar Days */}
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} className="flex-row justify-between gap-xxs">
            {week.map((date) => {
              const isPreviousMonth = date.getMonth() < monthIndex;
              const isNextMonth = date.getMonth() > monthIndex;
              
              return (
                <View key={date.toISOString()} className="min-w-[32px] items-center">
                  {renderDay(date, isPreviousMonth, isNextMonth)}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

export { Calendar };