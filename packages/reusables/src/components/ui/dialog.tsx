import * as DialogPrimitive from '@rn-primitives/dialog';
import * as React from 'react';
import { Platform, StyleSheet, View, type ViewProps, Pressable, findNodeHandle } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { X } from '../../lib/icons/X';
import { cn } from '../../lib/utils';

const styles = StyleSheet.create({
  Inter: {
    fontFamily: 'Inter',
  },
  InterSemiBold: {
    fontFamily: 'Inter-SemiBold',
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
const DialogFocusContext = React.createContext({
  triggerRef: { current: null },
  setTriggerRef: (_ref) => {},
});

const Dialog = ({ children, ...props }) => {
  const triggerRefState = React.useState({ current: null });
  
  return (
    <DialogFocusContext.Provider value={{ 
      triggerRef: triggerRefState[0], 
      setTriggerRef: (ref) => { triggerRefState[0].current = ref; }
    }}>
      <DialogPrimitive.Root {...props}>
        {children}
      </DialogPrimitive.Root>
    </DialogFocusContext.Provider>
  );
};

const DialogTrigger = React.forwardRef(({ asChild, ...props }, forwardedRef) => {
  const { setTriggerRef } = React.useContext(DialogFocusContext);
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
    <DialogPrimitive.Trigger 
      ref={ref}
      asChild={asChild}
      accessibilityRole="button"
      {...props}
    />
  );
});

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlayWeb = React.forwardRef<DialogPrimitive.OverlayRef, DialogPrimitive.OverlayProps>(
  ({ className, ...props }, ref) => {
    const { open } = DialogPrimitive.useRootContext();
    return (
      <DialogPrimitive.Overlay
        className={cn(
          'z-50 bg-black/90 flex justify-center items-center p-xs absolute top-0 right-0 bottom-0 left-0',
          open ? 'web:animate-in web:fade-in-0' : 'web:animate-out web:fade-out-0',
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);

DialogOverlayWeb.displayName = 'DialogOverlayWeb';

const DialogOverlayNative = React.forwardRef<
  DialogPrimitive.OverlayRef,
  DialogPrimitive.OverlayProps
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
    <DialogPrimitive.Overlay
      style={StyleSheet.absoluteFill}
      className={cn('z-50 flex justify-center items-center p-xs', className)}
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
    </DialogPrimitive.Overlay>
  );
});

DialogOverlayNative.displayName = 'DialogOverlayNative';

const DialogOverlay = Platform.select({
  web: DialogOverlayWeb,
  default: DialogOverlayNative,
});

const DialogContent = React.forwardRef<
  DialogPrimitive.ContentRef,
  DialogPrimitive.ContentProps & { portalHost?: string }
>(({ className, children, portalHost, ...props }, ref) => {
  const { open } = DialogPrimitive.useRootContext();
  const { triggerRef } = React.useContext(DialogFocusContext);
  const contentRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);
  
  // Combine refs
  React.useImperativeHandle(ref, () => contentRef.current);
  
  // Handle focus management
  React.useEffect(() => {
    if (open) {
      // Focus the dialog content when opened
      if (contentRef.current && Platform.OS === 'web') {
        // For web
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.focus();
          }
        }, 100);
      } else if (contentRef.current && Platform.OS !== 'web') {
        // For native
        const reactTag = findNodeHandle(contentRef.current);
        if (reactTag) {
          // Use AccessibilityInfo.setAccessibilityFocus if available in your RN version
          // Otherwise, you may need a native module to handle this
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
      const { onClose } = DialogPrimitive.useRootContext();
      if (onClose) {
        onClose();
      }
    }
  }, []);
  
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogPrimitive.Content
          ref={contentRef}
          className={cn(
            'z-50 max-w-lg gap-md border border-border bg-sys-surface-neutral-0 p-lg web:duration-200 rounded-lg',
            open
              ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
              : 'web:animate-out web:fade-out-0 web:zoom-out-95',
            className
          )}
          accessibilityViewIsModal={true}
          accessibilityRole="dialog"
          accessibilityLiveRegion="assertive"
          tabIndex={Platform.OS === 'web' ? 0 : undefined}
          onKeyDown={Platform.OS === 'web' ? handleKeyDown : undefined}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            ref={closeButtonRef}
            className={
              'absolute right-md top-md p-xxs web:group bg-sys-surface-neutral-2 text-sys-text-body rounded-lg opacity-70 web:ring-offset-background web:transition-opacity web:hover:opacity-100 web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 web:disabled:pointer-events-none'
            }
            accessibilityRole="button"
            accessibilityLabel="Close dialog"
            accessibilityHint="Closes the current dialog"
          >
            <X
              size={Platform.OS === 'web' ? 16 : 18}
              className={cn('text-sys-text-body', open && 'text-sys-text-body')}
            />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex flex-col gap-xs', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex flex-row justify-end gap-xs', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<DialogPrimitive.TitleRef, DialogPrimitive.TitleProps>(
  ({ className, style, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('text-4xl native:text-4xl text-sys-text-body tracking-tighter font-medium', className)}
      style={[styles.Inter, style]}
      accessibilityRole="header"
      nativeID="dialog-title"
      {...props}
    />
  )
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  DialogPrimitive.DescriptionRef,
  DialogPrimitive.DescriptionProps
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-md native:text-md text-sys-text-neutral-3', className)}
    style={[styles.Inter, style]}
    accessibilityRole="text"
    nativeID="dialog-description"
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};