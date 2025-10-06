import * as Slot from "@rn-primitives/slot"
import type { SlottableTextProps, TextRef } from "@rn-primitives/types"
import * as React from "react"
import { Platform, Text as RNText, StyleSheet } from "react-native"
import { cn } from "../../lib/utils"

const styles = StyleSheet.create({
  Inter: {
    fontFamily: "Inter",
  },
  baseText: {
    flexShrink: 1, // Allow text to shrink
    flexWrap: "wrap", // Enable text wrapping
  },
})

// HEADING 8XL - 40px
const H1 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="1"
      className={cn(
        "web:scroll-m-20 text-8xl text-sys-text-body lg:text-8xl web:select-text font-semibold tracking-[-1.5px]",
        className,
      )}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

H1.displayName = "H1"

// HEADING 7XL - 36px
const H2 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="2"
      className={cn(
        "web:scroll-m-20 pb-2 text-7xl text-sys-text-body font-medium tracking-[-1px] first:mt-0 web:select-text",
        className,
      )}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

H2.displayName = "H2"

// HEADING 6XL - 32px
const H3 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="3"
      className={cn(
        "web:scroll-m-20 text-6xl text-sys-text-body font-medium tracking-[-1px] web:select-text",
        className,
      )}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

H3.displayName = "H3"

// HEADING 5XL - 24px
const H4 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="4"
      className={cn(
        "web:scroll-m-20 text-5xl text-sys-text-body font-semibold tracking-[-0.5px] web:select-text",
        className,
      )}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

H4.displayName = "H4"

// HEADING 4XL - 20px
const H5 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="5"
      className={cn(
        "web:scroll-m-20 text-4xl text-sys-text-body font-semibold tracking-[-0.5px] web:select-text",
        className,
      )}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

H5.displayName = "H5"

// HEADING 3XL - 17px
const H6 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="6"
      className={cn(
        "web:scroll-m-20 text-3xl text-sys-text-body font-semibold tracking-[-0.5px] web:select-text",
        className,
      )}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

H6.displayName = "H6"

// HEADING 2XL - 15px
const H7 = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role="heading"
      aria-level="7"
      className={cn(
        "web:scroll-m-20 text-2xl text-sys-text-body font-semibold tracking-[-0.5px] web:select-text",
        className,
      )}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

H7.displayName = "H7"

// BODY XL - 26px
const BodyXL = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      className={cn("text-xl text-sys-text-body tracking-[-0.5px] web:select-text", className)}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

BodyXL.displayName = "BodyXL"

// BODY LG - 22px
const BodyLG = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      className={cn("text-lg text-sys-text-body tracking-[-0.5px] web:select-text", className)}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

BodyLG.displayName = "BodyLG"

// BODY MD - 16px
const BodyMD = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      className={cn("text-md text-sys-text-body tracking-[-0.5px] web:select-text", className)}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

BodyMD.displayName = "BodyMD"

// BODY BASE - 15px
const BodyBase = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText
    return (
      <Component
        className={cn("text-base text-sys-text-body tracking-[-0.5px] web:select-text", className)}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    )
  },
)

BodyBase.displayName = "BodyBase"

// BODY SM - 14px
const BodySM = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      className={cn("text-sm text-sys-text-body tracking-[-0.5px] web:select-text", className)}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

BodySM.displayName = "BodySM"

// BODY XS - 12px
const BodyXS = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      className={cn("text-xs text-sys-text-body tracking-[-0.5px] web:select-text", className)}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

BodyXS.displayName = "BodyXS"

// Legacy components for backward compatibility
const P = BodyBase
P.displayName = "P"

const BlockQuote = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText
    return (
      <Component
        role={Platform.OS === "web" ? "blockquote" : undefined}
        className={cn(
          "mt-6 native:mt-4 border-l-2 border-border pl-6 native:pl-3 text-base text-sys-text-body italic web:select-text",
          className,
        )}
        style={[styles.Inter, styles.baseText, style]}
        ref={ref}
        {...props}
      />
    )
  },
)

BlockQuote.displayName = "BlockQuote"

const Code = React.forwardRef<TextRef, SlottableTextProps>(({ className, asChild = false, style, ...props }, ref) => {
  const Component = asChild ? Slot.Text : RNText
  return (
    <Component
      role={Platform.OS === "web" ? "code" : undefined}
      className={cn(
        "relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] text-sm text-sys-text-body web:select-text",
        className,
      )}
      style={[styles.Inter, styles.baseText, style]}
      ref={ref}
      {...props}
    />
  )
})

Code.displayName = "Code"

const Lead = BodyXL
Lead.displayName = "Lead"

const Large = BodyLG
Large.displayName = "Large"

const Small = BodySM
Small.displayName = "Small"

const Muted = BodyXS
Muted.displayName = "Muted"

export {
  BlockQuote,
  Code,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  H7,
  BodyXL,
  BodyLG,
  BodyMD,
  BodyBase,
  BodySM,
  BodyXS,
  // Legacy exports
  Lead,
  Large,
  P,
  Small,
  Muted,
}
