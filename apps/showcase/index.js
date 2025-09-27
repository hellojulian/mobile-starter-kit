import './react-devtools.config.js';
import './global.css';
import { AppRegistry } from 'react-native';
import { ExpoRoot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Must be exported or Fast Refresh won't update the context
function App() {
  const ctx = require.context('./app');
  return (
    <SafeAreaProvider>
      <ExpoRoot context={ctx} />
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent('main', () => App);
