import * as React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, ScrollView, useColorScheme } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack, withLayoutContext } from 'expo-router';

const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

function CustomTabBar({ state, descriptors, navigation, position }) {
  const scrollViewRef = React.useRef(null);
  const [tabPositions, setTabPositions] = React.useState([]);
  const layout = useWindowDimensions();
  const colorScheme = useColorScheme();

  const colors = {
    background: colorScheme === 'dark' ? '#000000' : '#ffffff',
    text: colorScheme === 'dark' ? '#ffffff' : '#000000',
    inactiveText: colorScheme === 'dark' ? '#666666' : '#666666',
    indicator: colorScheme === 'dark' ? '#ffffff' : '#000000',
  };

  // Scroll to active tab
  React.useEffect(() => {
    if (scrollViewRef.current && tabPositions[state.index]) {
      scrollViewRef.current.scrollTo({
        x: Math.max(0, tabPositions[state.index] - layout.width / 3),
        animated: true
      });
    }
  }, [state.index, tabPositions]);

  return (
    <View style={{ height: 48, backgroundColor: colors.background }}>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLayout={(e) => {
                const layout = e.nativeEvent.layout;
                setTabPositions(prev => {
                  const newPositions = [...prev];
                  newPositions[index] = layout.x;
                  return newPositions;
                });
              }}
              style={{
                paddingHorizontal: 16,
                height: 48,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: isFocused ? colors.text : colors.inactiveText,
                  fontSize: 14,
                  fontWeight: 'medium',
                }}
              >
                {label}
              </Text>
              {isFocused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: colors.indicator,
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default function MaterialTopTabsLayout() {
  return (
    <>
      <Stack.Screen options={{ 
        headerTitle: "Material Top Tabs",
        headerShadowVisible: false 
      }} />
      <MaterialTopTabs
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarShowLabel: true,
        }}
      >
        <MaterialTopTabs.Screen
          name="index"
          options={{
            title: 'Select',
          }}
        />
        <MaterialTopTabs.Screen
          name="red"
          options={{
            title: 'Commerce',
          }}
        />
        <MaterialTopTabs.Screen
          name="green"
          options={{
            title: 'Entertainment',
          }}
        />
        <MaterialTopTabs.Screen
          name="purple"
          options={{
            title: 'Marketing',
          }}
        />
      </MaterialTopTabs>
    </>
  );
}
