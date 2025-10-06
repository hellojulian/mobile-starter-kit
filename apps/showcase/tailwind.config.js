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
        // Legacy Tailwind tokens (for backward compatibility)
        xs: ['12px', { lineHeight: '16px' }],   // body-xs: 12px
        sm: ['14px', { lineHeight: '20px' }],   // body-sm: 14px  
        base: ['15px', { lineHeight: '20px' }], // body-base: 15px
        md: ['16px', { lineHeight: '23px' }],   // body-md: 16px (keeping current)
        lg: ['22px', { lineHeight: '28px' }],   // body-lg: 22px
        xl: ['26px', { lineHeight: '28px' }],   // body-xl: 26px
        '2xl': ['15px', { lineHeight: '15px' }], // heading-2xl: 15px
        '3xl': ['17px', { lineHeight: '36px' }], // heading-3xl: 17px
        '4xl': ['20px', { lineHeight: '45px' }], // heading-4xl: 20px
        '5xl': ['24px', { lineHeight: '45px' }], // heading-5xl: 24px
        '6xl': ['32px', { lineHeight: '45px' }], // heading-6xl: 32px
        '7xl': ['36px', { lineHeight: '45px' }], // heading-7xl: 36px
        '8xl': ['40px', { lineHeight: '45px' }], // heading-8xl: 40px
        
        // Semantic body text tokens
        'body-xs': ['12px', { lineHeight: '16px' }],   // 12px - Small annotations, captions
        'body-sm': ['14px', { lineHeight: '20px' }],   // 14px - Secondary text, metadata
        'body-base': ['15px', { lineHeight: '20px' }], // 15px - Default body text
        'body-md': ['16px', { lineHeight: '23px' }],   // 16px - Primary content text
        'body-lg': ['22px', { lineHeight: '28px' }],   // 22px - Large body text, emphasis
        'body-xl': ['26px', { lineHeight: '28px' }],   // 26px - Extra large body text
        
        // Semantic heading tokens
        'heading-2xl': ['15px', { lineHeight: '15px' }], // 15px - Small section headings
        'heading-3xl': ['17px', { lineHeight: '36px' }], // 17px - Subsection headings
        'heading-4xl': ['20px', { lineHeight: '45px' }], // 20px - Section headings
        'heading-5xl': ['24px', { lineHeight: '45px' }], // 24px - Page headings
        'heading-6xl': ['32px', { lineHeight: '45px' }], // 32px - Large headings
        'heading-7xl': ['36px', { lineHeight: '45px' }], // 36px - Display headings
        'heading-8xl': ['40px', { lineHeight: '45px' }], // 40px - Hero headings
      },
      spacing: {
        // Numeric tokens matching Figma t-shirt sizing
        0: '0px',      // NONE - 0
        1: '4px',      // XXS - 4
        2: '8px',      // XS - 8
        3: '12px',     // SM - 12
        4: '16px',     // MD - 16
        6: '24px',     // LG - 24
        8: '32px',     // XL - 32
        10: '40px',    // XXL - 40
        12: '48px',    // XXXL - 48
        16: '64px',    // XXXXL - 64
        
        // Semantic tokens (t-shirt sizing)
        'none': '0px',     // NONE - 0
        'xxs': '4px',      // XXS - 4
        'xs': '8px',       // XS - 8
        'sm': '12px',      // SM - 12
        'md': '16px',      // MD - 16
        'lg': '24px',      // LG - 24
        'xl': '32px',      // XL - 32
        'xxl': '40px',     // XXL - 40
        'xxxl': '48px',    // XXXL - 48
        'xxxxl': '64px',   // XXXXL - 64
      },
      borderRadius: {
        none: '0px',       // NONE - 0
        xs: '4px',         // XS - 4  
        sm: '8px',         // SM - 8
        DEFAULT: '8px',    // Default to SM
        md: '12px',        // MD - 12
        lg: '24px',        // LG - 24
        xl: '32px',        // XL - 32
        xxl: '40px',       // XXL - 40
        xxxl: '64px',      // XXXL - 64
        full: '999px',     // FULL - 999
      },
      borderWidth: {
        hairline: hairlineWidth(),
        none: '0px',     // NONE - 0
        sm: '1px',       // SM - 1
        md: '2px',       // MD - 2 
        lg: '3px',       // LG - 3
        DEFAULT: '1px',  // Default to SM
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
        'xs': 'calc(var(--DropShadow-Blur-XS---4, 4px) / 2)',
        'sm': 'calc(var(--DropShadow-Blur-SM---8, 8px) / 2)',
        'md': 'calc(var(--DropShadow-Blur-MD---16, 16px) / 2)',
        'xl': 'calc(var(--DropShadow-Blur-XL---48, 48px) / 2)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
      
  ],
};