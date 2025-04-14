import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import * as React from 'react';
import { Platform, StyleSheet, View, type ViewProps, findNodeHandle } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { cn } from '../../lib/utils';
import { Button } from './button';

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

// Create a context to manage focus
const AlertDialogFocusContext = React.createContext({
  triggerRef: { current: null },
  setTriggerRef: (_ref) => {},
  cancelRef: { current: null },
  setCancelRef: (_ref) => {},
});

const AlertDialog = ({ children, ...props }) => {
  const triggerRefState = React.useState({ current: null });
  const cancelRefState = React.useState({ current: null });
  
  return (
    <AlertDialogFocusContext.Provider value={{ 
      triggerRef: triggerRefState[0], 
      setTriggerRef: (ref) => { triggerRefState[0].current = ref; },
      cancelRef: cancelRefState[0],
      setCancelRef: (ref) => { cancelRefState[0].current = ref; }
    }}>
      <AlertDialogPrimitive.Root {...props}>
        {children}
      </AlertDialogPrimitive.Root>
    </AlertDialogFocusContext.Provider>
  );
};

const AlertDialogTrigger = React.forwardRef(({ asChild, ...props }, forwardedRef) => {
  const { setTriggerRef } = React.useContext(AlertDialogFocusContext);
  const ref = React.useRef(null);
  
  // Combine refs
  React.useImperativeHandle(forwardedRef, () => ref.current);
  
  // Store the trigger ref for focus management
  React.useEffect(() => {
    if (ref.current) {
      setTriggerRef(ref.current);
    }
  }, [ref.current]);
  
  return (
    <AlertDialogPrimitive.Trigger 
      ref={ref}
      asChild={asChild}
      accessibilityRole="button"
      {...props}
    />
  );
});

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlayWeb = React.forwardRef<
  AlertDialogPrimitive.OverlayRef,
  AlertDialogPrimitive.OverlayProps
>(({ className, ...props }, ref) => {
  const { open } = AlertDialogPrimitive.useRootContext();
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'z-50 bg-black/90 flex justify-center items-center p-2 absolute top-0 right-0 bottom-0 left-0',
        open ? 'web:animate-in web:fade-in-0' : 'web:animate-out web:fade-out-0',
        className
      )}
      {...props}
      ref={ref}
    />
  );
});

AlertDialogOverlayWeb.displayName = 'AlertDialogOverlayWeb';

const AlertDialogOverlayNative = React.forwardRef<
  AlertDialogPrimitive.OverlayRef,
  AlertDialogPrimitive.OverlayProps
>(({ className, children, ...props }, ref) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  React.useEffect(() => {
    opacity.value = withSpring(1, { damping: 15, stiffness: 300, mass: 0.8 });
    scale.value = withSpring(1, { damping: 15, stiffness: 300, mass: 0.8 });

    return () => {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.95, { duration: 150 });
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <AlertDialogPrimitive.Overlay
      style={StyleSheet.absoluteFill}
      className={cn('z-50 flex justify-center items-center p-2', className)}
      {...props}
      ref={ref}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(150)}
        style={StyleSheet.absoluteFill}
      >
        <BlurView intensity={20} tint='dark' style={styles.blurView} />
        <View style={styles.overlay} />
      </Animated.View>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </AlertDialogPrimitive.Overlay>
  );
});

AlertDialogOverlayNative.displayName = 'AlertDialogOverlayNative';

const AlertDialogOverlay = Platform.select({
  web: AlertDialogOverlayWeb,
  default: AlertDialogOverlayNative,
});

const AlertDialogContent = React.forwardRef<
  AlertDialogPrimitive.ContentRef,
  AlertDialogPrimitive.ContentProps & { portalHost?: string }
>(({ className, portalHost, children, ...props }, ref) => {
  const { open } = AlertDialogPrimitive.useRootContext();
  const { triggerRef, cancelRef } = React.useContext(AlertDialogFocusContext);
  const contentRef = React.useRef(null);
  
  // Combine refs
  React.useImperativeHandle(ref, () => contentRef.current);
  
  // Handle focus management
  React.useEffect(() => {
    if (open) {
      // Focus the cancel button when opened (for destructive dialogs, cancel should get focus)
      if (cancelRef.current && Platform.OS === 'web') {
        // For web
        setTimeout(() => {
          if (cancelRef.current) {
            cancelRef.current.focus();
          }
        }, 100);
      } else if (cancelRef.current && Platform.OS !== 'web') {
        // For native
        const reactTag = findNodeHandle(cancelRef.current);
        if (reactTag) {
          // Use AccessibilityInfo.setAccessibilityFocus if available in your RN version
        }
      }
    } else {
      // Return focus to trigger when closed
      if (triggerRef.current && Platform.OS === 'web') {
        setTimeout(() => {
          if (triggerRef.current) {
            triggerRef.current.focus();
          }
        }, 100);
      } else if (triggerRef.current && Platform.OS !== 'web') {
        const reactTag = findNodeHandle(triggerRef.current);
        if (reactTag) {
          // Use AccessibilityInfo.setAccessibilityFocus if available
        }
      }
    }
  }, [open]);
  
  // Handle Escape key on web
  const handleKeyDown = React.useCallback((event) => {
    if (Platform.OS === 'web' && event.key === 'Escape') {
      // Close the dialog
      const { onClose } = AlertDialogPrimitive.useRootContext();
      if (onClose) {
        onClose();
      }
    }
  }, []);

  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <AlertDialogPrimitive.Content
          ref={contentRef}
          className={cn(
            'z-50 max-w-lg gap-4 border border-border bg-sys-surface-neutral-0 p-6 web:duration-200 rounded-lg',
            open
              ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
              : 'web:animate-out web:fade-out-0 web:zoom-out-95',
            className
          )}
          accessibilityViewIsModal={true}
          accessibilityRole="alertdialog"
          accessibilityLiveRegion="assertive"
          tabIndex={Platform.OS === 'web' ? 0 : undefined}
          onKeyDown={Platform.OS === 'web' ? handleKeyDown : undefined}
          {...props}
        >
          {children}
        </AlertDialogPrimitive.Content>
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex flex-col gap-2', className)} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex flex-row justify-end gap-2', className)} {...props} />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  AlertDialogPrimitive.TitleRef,
  AlertDialogPrimitive.TitleProps
>(({ className, style, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-4xl native:text-4xl text-sys-text-body tracking-tighter font-medium', className)}
    style={[styles.Inter, style]}
    accessibilityRole="header"
    nativeID="alert-dialog-title"
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  AlertDialogPrimitive.DescriptionRef,
  AlertDialogPrimitive.DescriptionProps
>(({ className, style, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-base native:text-base text-sys-text-neutral-3', className)}
    style={[styles.Inter, style]}
    accessibilityRole="text"
    nativeID="alert-dialog-description"
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  AlertDialogPrimitive.ActionRef,
  AlertDialogPrimitive.ActionProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action asChild>
    <Button 
      ref={ref} 
      className={cn('flex-1', className)} 
      accessibilityRole="button"
      accessibilityLabel="Confirm action"
      accessibilityHint="Confirms the action and closes the dialog"
      {...props} 
    />
  </AlertDialogPrimitive.Action>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  AlertDialogPrimitive.CancelRef,
  AlertDialogPrimitive.CancelProps
>(({ className, ...props }, forwardedRef) => {
  const { setCancelRef } = React.useContext(AlertDialogFocusContext);
  const ref = React.useRef(null);
  
  // Combine refs
  React.useImperativeHandle(forwardedRef, () => ref.current);
  
  // Store the cancel ref for focus management
  React.useEffect(() => {
    if (ref.current) {
      setCancelRef(ref.current);
    }
  }, [ref.current]);
  
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <Button 
        ref={ref} 
        variant='secondary' 
        className={cn('flex-1', className)} 
        accessibilityRole="button"
        accessibilityLabel="Cancel"
        accessibilityHint="Cancels the action and closes the dialog"
        {...props} 
      />
    </AlertDialogPrimitive.Cancel>
  );
});
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};