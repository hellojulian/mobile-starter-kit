import * as DialogPrimitive from '@rn-primitives/dialog';
import * as React from 'react';
import { Platform, StyleSheet, View, type ViewProps } from 'react-native';
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

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlayWeb = React.forwardRef<DialogPrimitive.OverlayRef, DialogPrimitive.OverlayProps>(
  ({ className, ...props }, ref) => {
    const { open } = DialogPrimitive.useRootContext();
    return (
      <DialogPrimitive.Overlay
        className={cn(
          'z-50 bg-black/90 flex justify-center items-center p-2 absolute top-0 right-0 bottom-0 left-0',
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
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            'z-50 max-w-lg gap-4 border border-border bg-sys-surface-neutral-0 p-6 web:duration-200 rounded-lg',
            open
              ? 'web:animate-in web:fade-in-0 web:zoom-in-95'
              : 'web:animate-out web:fade-out-0 web:zoom-out-95',
            className
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            className={
              'absolute right-4 top-4 p-1 web:group bg-sys-surface-neutral-2 rounded-lg opacity-70 web:ring-offset-background web:transition-opacity web:hover:opacity-100 web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 web:disabled:pointer-events-none'
            }
          >
            <X
              size={Platform.OS === 'web' ? 16 : 18}
              className={cn('text-sys-text-body', open && 'text-accent-foreground')}
            />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex flex-col gap-2', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex flex-row justify-end gap-2', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<DialogPrimitive.TitleRef, DialogPrimitive.TitleProps>(
  ({ className, style, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('text-4xl native:text-4xl text-sys-text-body tracking-tighter font-medium', className)}
      style={[styles.Inter, style]}
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
