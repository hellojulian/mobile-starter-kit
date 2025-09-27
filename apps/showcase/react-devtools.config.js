// React DevTools configuration to handle React 19 compatibility issues
if (__DEV__) {
  // Temporarily suppress React 19 key prop warnings for React Navigation
  const originalError = console.error;
  
  console.error = (...args) => {
    // Skip React Navigation key prop errors
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('A props object containing a "key" prop is being spread into JSX') ||
       args[0].includes('React keys must be passed directly to JSX'))
    ) {
      return;
    }
    
    // Allow all other errors through
    originalError.apply(console, args);
  };
}