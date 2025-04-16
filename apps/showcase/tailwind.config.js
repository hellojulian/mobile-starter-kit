const { hairlineWidth } = require('nativewind/theme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  fontFamily: { fontName: 'Inter' },
  darkMode: 'class',
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./node_modules/@rnr/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        ref: {
          secondary: {
            950: 'hsl(var(--ref-secondary-950) / <alpha-value>)',
            900: 'hsl(var(--ref-secondary-900) / <alpha-value>)',
            800: 'hsl(var(--ref-secondary-800) / <alpha-value>)',
            700: 'hsl(var(--ref-secondary-700) / <alpha-value>)',
            600: 'hsl(var(--ref-secondary-600) / <alpha-value>)',
            500: 'hsl(var(--ref-secondary-500) / <alpha-value>)',
            400: 'hsl(var(--ref-secondary-400) / <alpha-value>)',
            300: 'hsl(var(--ref-secondary-300) / <alpha-value>)',
            200: 'hsl(var(--ref-secondary-200) / <alpha-value>)',
            100: 'hsl(var(--ref-secondary-100) / <alpha-value>)',
            50: 'hsl(var(--ref-secondary-50) / <alpha-value>)',
          },
          neutral: {
            950: 'hsl(var(--ref-neutral-950) / <alpha-value>)',
            900: 'hsl(var(--ref-neutral-900) / <alpha-value>)',
            800: 'hsl(var(--ref-neutral-800) / <alpha-value>)',
            700: 'hsl(var(--ref-neutral-700) / <alpha-value>)',
            600: 'hsl(var(--ref-neutral-600) / <alpha-value>)',
            500: 'hsl(var(--ref-neutral-500) / <alpha-value>)',
            400: 'hsl(var(--ref-neutral-400) / <alpha-value>)',
            300: 'hsl(var(--ref-neutral-300) / <alpha-value>)',
            200: 'hsl(var(--ref-neutral-200) / <alpha-value>)',
            100: 'hsl(var(--ref-neutral-100) / <alpha-value>)',
            50: 'hsl(var(--ref-neutral-50) / <alpha-value>)',
          },
          information: {
            950: 'hsl(var(--ref-information-950) / <alpha-value>)',
            900: 'hsl(var(--ref-information-900) / <alpha-value>)',
            800: 'hsl(var(--ref-information-800) / <alpha-value>)',
            700: 'hsl(var(--ref-information-700) / <alpha-value>)',
            600: 'hsl(var(--ref-information-600) / <alpha-value>)',
            500: 'hsl(var(--ref-information-500) / <alpha-value>)',
            400: 'hsl(var(--ref-information-400) / <alpha-value>)',
            300: 'hsl(var(--ref-information-300) / <alpha-value>)',
            200: 'hsl(var(--ref-information-200) / <alpha-value>)',
            100: 'hsl(var(--ref-information-100) / <alpha-value>)',
            50: 'hsl(var(--ref-information-50) / <alpha-value>)',
          },
          success: {
            950: 'hsl(var(--ref-success-950) / <alpha-value>)',
            900: 'hsl(var(--ref-success-900) / <alpha-value>)',
            800: 'hsl(var(--ref-success-800) / <alpha-value>)',
            700: 'hsl(var(--ref-success-700) / <alpha-value>)',
            600: 'hsl(var(--ref-success-600) / <alpha-value>)',
            500: 'hsl(var(--ref-success-500) / <alpha-value>)',
            400: 'hsl(var(--ref-success-400) / <alpha-value>)',
            300: 'hsl(var(--ref-success-300) / <alpha-value>)',
            200: 'hsl(var(--ref-success-200) / <alpha-value>)',
            100: 'hsl(var(--ref-success-100) / <alpha-value>)',
            50: 'hsl(var(--ref-success-50) / <alpha-value>)',
          },
          warning: {
            950: 'hsl(var(--ref-warning-950) / <alpha-value>)',
            900: 'hsl(var(--ref-warning-900) / <alpha-value>)',
            800: 'hsl(var(--ref-warning-800) / <alpha-value>)',
            700: 'hsl(var(--ref-warning-700) / <alpha-value>)',
            600: 'hsl(var(--ref-warning-600) / <alpha-value>)',
            500: 'hsl(var(--ref-warning-500) / <alpha-value>)',
            400: 'hsl(var(--ref-warning-400) / <alpha-value>)',
            300: 'hsl(var(--ref-warning-300) / <alpha-value>)',
            200: 'hsl(var(--ref-warning-200) / <alpha-value>)',
            100: 'hsl(var(--ref-warning-100) / <alpha-value>)',
            50: 'hsl(var(--ref-warning-50) / <alpha-value>)',
          },
          error: {
            950: 'hsl(var(--ref-error-950) / <alpha-value>)',
            900: 'hsl(var(--ref-error-900) / <alpha-value>)',
            800: 'hsl(var(--ref-error-800) / <alpha-value>)',
            700: 'hsl(var(--ref-error-700) / <alpha-value>)',
            600: 'hsl(var(--ref-error-600) / <alpha-value>)',
            500: 'hsl(var(--ref-error-500) / <alpha-value>)',
            400: 'hsl(var(--ref-error-400) / <alpha-value>)',
            300: 'hsl(var(--ref-error-300) / <alpha-value>)',
            200: 'hsl(var(--ref-error-200) / <alpha-value>)',
            100: 'hsl(var(--ref-error-100) / <alpha-value>)',
            50: 'hsl(var(--ref-error-50) / <alpha-value>)',
          },
          scrim: {
            light: 'hsl(var(--ref-scrim-light) / <alpha-value>)',
            dark: 'hsl(var(--ref-scrim-dark) / <alpha-value>)',
          },
        },
        
        sys: {
          'surface-neutral': {
            0: 'hsl(var(--sys-surface-neutral-0) / <alpha-value>)',
            1: 'hsl(var(--sys-surface-neutral-1) / <alpha-value>)',
            2: 'hsl(var(--sys-surface-neutral-2) / <alpha-value>)',
            3: 'hsl(var(--sys-surface-neutral-3) / <alpha-value>)',
            4: 'hsl(var(--sys-surface-neutral-4) / <alpha-value>)',
            5: 'hsl(var(--sys-surface-neutral-5) / <alpha-value>)',
          },
          'surface-disabled': 'hsl(var(--sys-surface-disabled) / <alpha-value>)',
          'surface-card': 'hsl(var(--sys-surface-card) / <alpha-value>)',
          'surface-black': 'hsl(var(--sys-surface-black) / <alpha-value>)',
          'surface-white': 'hsl(var(--sys-surface-white) / <alpha-value>)',
          'surface-secondary-pressed': 'hsl(var(--sys-surface-secondary-pressed) / <alpha-value>)',
          'surface-secondary': {
            1: 'hsl(var(--sys-surface-secondary-1) / <alpha-value>)',
            2: 'hsl(var(--sys-surface-secondary-2) / <alpha-value>)',
            3: 'hsl(var(--sys-surface-secondary-3) / <alpha-value>)',
            4: 'hsl(var(--sys-surface-secondary-4) / <alpha-value>)',
            5: 'hsl(var(--sys-surface-secondary-5) / <alpha-value>)',
          },
          fn: {
            generic: 'hsl(var(--sys-fn-generic) / <alpha-value>)',
            error: 'hsl(var(--sys-fn-error) / <alpha-value>)',
            'error-text': 'hsl(var(--sys-fn-error-text) / <alpha-value>)',
            success: 'hsl(var(--sys-fn-success) / <alpha-value>)',
            'success-text': 'hsl(var(--sys-fn-success-text) / <alpha-value>)',
            warning: 'hsl(var(--sys-fn-warning) / <alpha-value>)',
            'warning-text': 'hsl(var(--sys-fn-warning-text) / <alpha-value>)',
            information: 'hsl(var(--sys-fn-information) / <alpha-value>)',
            'information-text': 'hsl(var(--sys-fn-information-text) / <alpha-value>)',
          },
          text: {
            white: 'hsl(var(--sys-text-white) / <alpha-value>)',
            black: 'hsl(var(--sys-text-black) / <alpha-value>)',
            body: 'hsl(var(--sys-text-body) / <alpha-value>)',
            'body-inverse': 'hsl(var(--sys-text-body-inverse) / <alpha-value>)',
            secondary: 'hsl(var(--sys-text-secondary) / <alpha-value>)',
            neutral: {
              1: 'hsl(var(--sys-text-neutral-1) / <alpha-value>)',
              2: 'hsl(var(--sys-text-neutral-2) / <alpha-value>)',
              3: 'hsl(var(--sys-text-neutral-3) / <alpha-value>)',
              4: 'hsl(var(--sys-text-neutral-4) / <alpha-value>)',
            },
            disabled: 'hsl(var(--sys-text-disabled) / <alpha-value>)',
            alt: 'hsl(var(--sys-alt-text) / <alpha-value>)',
            subhead: 'hsl(var(--sys-subhead-text) / <alpha-value>)',
          },
          border: {
            1: 'hsl(var(--sys-border-1) / <alpha-value>)',
            2: 'hsl(var(--sys-border-2) / <alpha-value>)',
            3: 'hsl(var(--sys-border-3) / <alpha-value>)',
            4: 'hsl(var(--sys-border-4) / <alpha-value>)',
            5: 'hsl(var(--sys-border-5) / <alpha-value>)',
            6: 'hsl(var(--sys-border-6) / <alpha-value>)',
            information: 'hsl(var(--sys-border-information) / <alpha-value>)',
            success: 'hsl(var(--sys-border-success) / <alpha-value>)',
            warning: 'hsl(var(--sys-border-warning) / <alpha-value>)',
            error: 'hsl(var(--sys-border-error) / <alpha-value>)',
            default: 'hsl(var(--sys-border-default) / <alpha-value>)',
          },
          appbg: 'hsl(var(--sys-appbg) / <alpha-value>)',
          radio: 'hsl(var(--sys-radio) / <alpha-value>)',
          form: {
            default: 'hsl(var(--sys-form-default) / <alpha-value>)',
            disabled: 'hsl(var(--sys-form-disabled) / <alpha-value>)',
            error: 'hsl(var(--sys-form-error) / <alpha-value>)',
            success: 'hsl(var(--sys-form-success) / <alpha-value>)',
            active: 'hsl(var(--sys-form-active) / <alpha-value>)',
          },
          divider: {
            decorative: 'hsl(var(--sys-border-4) / <alpha-value>)',
            default: 'hsl(var(--sys-divider-default) / <alpha-value>)',
          },
          focus: 'hsl(var(--sys-focus) / <alpha-value>)',
        },
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }], // BODYXS
        sm: ['14px', { lineHeight: '20px' }], // BODYSM
        base: ['15px', { lineHeight: '20px' }], // BODYBASE
        md: ['16px', { lineHeight: '23px' }], // BODYMD
        lg: ['22px', { lineHeight: '28px' }], // BODYLG
        xl: ['26px', { lineHeight: '28px' }], // BODYXL
        '2xl': ['15px', { lineHeight: '15px' }], // HEADING2XL
        '3xl': ['17px', { lineHeight: '36px' }], // HEADING3XL
        '4xl': ['20px', { lineHeight: '45px' }], // HEADING4XL
        '5xl': ['24px', { lineHeight: '45px' }], // HEADING5XL
        '6xl': ['32px', { lineHeight: '45px' }], // HEADING6XL
        '7xl': ['36px', { lineHeight: '45px' }], // HEADING7XL
        '8xl': ['40px', { lineHeight: '45px' }], // HEADING8XL
      },
      spacing: {
        0: '0px',      // NONE - 0
        0.5: '2px',    // XXXS - 2
        1: '4px',      // XXS - 4
        2: '8px',      // XS - 8
        3: '12px',     // SM - 12
        4: '16px',     // MD - 16
        6: '24px',     // LG - 24
        8: '32px',     // XL - 32
        10: '40px',    // XXL - 40
        12: '48px',    // XXXL - 48
        16: '64px',    // XXXXL - 64
        'none': 'var(--space-none)',
        'xxxs': 'var(--space-xxxs)',
        'xxs': 'var(--space-xxs)',
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        'xxl': 'var(--space-xxl)',
        'xxxl': 'var(--space-xxxl)',
        'xxxxl': 'var(--space-xxxxl)',
      },
      borderRadius: {
        none: '0',
        xs: '4px',
        sm: '8px',
        DEFAULT: '8px',
        md: '12px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '64px',
        full: '999px',
      },
      borderWidth: {
        hairline: hairlineWidth(),
        0: 'var(--border-width-0)', // NONE - 0
        sm: 'var(--border-width-sm)', // SM - 1
        md: 'var(--border-width-md)', // MD - 2
        lg: 'var(--border-width-lg)', // LG - 3
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      blur: {
        'xs': 'calc(var(--blur-xs, 4px) / 2)',
        'sm': 'calc(var(--blur-sm, 8px) / 2)',
        'md': 'calc(var(--blur-md, 16px) / 2)',
        'lg': 'calc(var(--blur-md, 24px) / 2)',
        'xl': 'calc(var(--blur-xl, 48px) / 2)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
      
  ],
};