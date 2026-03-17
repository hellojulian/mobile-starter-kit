import { router } from 'expo-router';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COMPONENTS, NAV_THEME } from '~/lib/constants';
import { ThemeToggle } from '~/components/ThemeToggle';
import { useColorScheme } from '~/lib/useColorScheme';
import { ChevronRight } from '~/lib/icons/ChevronRight';

export default function HomeScreen() {
  const { isDarkColorScheme: isDark } = useColorScheme();
  const theme = isDark ? NAV_THEME.dark : NAV_THEME.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.text }]}>Components</Text>
            <Text style={[styles.subtitle, { color: theme.text }]}>Open a component demo.</Text>
          </View>
          <ThemeToggle />
        </View>

        <View
          style={[
            styles.list,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          {COMPONENTS.map((component, index) => (
            <View key={component}>
              <Pressable
                onPress={() => router.push(`/${component}` as never)}
                style={({ pressed }) => [
                  styles.item,
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <View style={styles.itemContent}>
                  <Text numberOfLines={1} style={[styles.itemText, { color: theme.text }]}>
                    {component.replace(/-/g, ' ')}
                  </Text>
                  <ChevronRight size={18} color={theme.text} />
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 56,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerText: {
    flex: 1,
    paddingRight: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
    opacity: 0.8,
  },
  list: {
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 8,
  },
  item: {
    minHeight: 88,
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  itemText: {
    flex: 1,
    paddingRight: 24,
    fontSize: 24,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});
