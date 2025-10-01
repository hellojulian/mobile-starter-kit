# Lucide Icons Guide

This design system uses [Lucide](https://lucide.dev/) as its icon library. Lucide provides a comprehensive set of beautiful, customizable SVG icons optimized for React Native applications.

## Current Implementation

Your codebase uses a **selective approach** with only needed icons included, rather than the entire library. This ensures optimal bundle size while maintaining design consistency.

### Architecture Overview

1. **Source Library**: `lucide-react-native`
2. **Wrapper System**: Custom icon components in `/lib/icons/`
3. **Enhancement**: `iconWithClassName()` adds NativeWind/Tailwind className support
4. **Total Icons**: 54 curated icons (out of 1000+ available)

## Available Icons

### Navigation & UI
- **Arrows**: ArrowDown, ArrowUp
- **Chevrons**: ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChevronsDownUp, ChevronsUpDown
- **Actions**: Check, X, Plus, PlusCircle, Search, Copy

### Content & Typography
- **Text Formatting**: Bold, Italic, Underline
- **Alignment**: AlignLeft, AlignCenter, AlignRight, AlignJustify
- **Layout**: LayoutPanelLeft, Table, MenuSquare

### System & Status
- **Alerts**: AlertCircle, AlertTriangle, BadgeAlert, Info
- **States**: CheckSquare, Activity
- **Theme**: Sun, MoonStar

### Communication & Social
- **Contact**: Mail, MessageSquare
- **Users**: Users, UserPlus, CircleUserRound
- **Platforms**: Github

### Objects & Tools
- **Technology**: Database, Terminal, Cloud, Code
- **Items**: Calendar, CalendarDays, Lamp, Fan, Ear, Baby
- **Media**: GalleryHorizontal, Airplay
- **Support**: LifeBuoy, Sparkles

## Usage Examples

### Basic Icon Usage
```tsx
import { Check } from '~/lib/icons/Check';

function SuccessButton() {
  return (
    <Button>
      <Check className="w-4 h-4 text-green-600" />
      Complete
    </Button>
  );
}
```

### With Different Sizes
```tsx
import { Search } from '~/lib/icons/Search';

function SearchInput() {
  return (
    <View className="relative">
      <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
      <Input className="pl-10" placeholder="Search..." />
    </View>
  );
}
```

### Conditional Icons
```tsx
import { Sun } from '~/lib/icons/Sun';
import { MoonStar } from '~/lib/icons/MoonStar';

function ThemeToggle({ isDark }: { isDark: boolean }) {
  const Icon = isDark ? Sun : MoonStar;
  
  return (
    <Button>
      <Icon className="w-4 h-4" />
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </Button>
  );
}
```

## Adding New Icons

### Method 1: Individual Icon (Recommended)
Add specific icons as needed to maintain bundle efficiency.

1. **Create wrapper file** in `/packages/reusables/src/lib/icons/`:

```tsx
// /packages/reusables/src/lib/icons/Heart.tsx
import { Heart } from 'lucide-react-native';
import { iconWithClassName } from './iconWithClassName';
iconWithClassName(Heart);
export { Heart };
```

2. **Use in components**:
```tsx
import { Heart } from '~/lib/icons/Heart';

function LikeButton() {
  return (
    <Button>
      <Heart className="w-4 h-4 text-red-500" />
      Like
    </Button>
  );
}
```

### Method 2: Batch Addition
For multiple icons, create several wrapper files following the same pattern.

### Method 3: Full Library (Not Recommended)
If you need the complete Lucide library, you can import directly:

```tsx
// Direct import (skips className wrapper)
import { IconName } from 'lucide-react-native';

// Usage without className support
<IconName size={16} color="#666" />
```

## Installation & Setup

### Current Dependencies
The project already includes:
```json
{
  "dependencies": {
    "lucide-react-native": "^latest"
  }
}
```

### Adding Additional Icons
No additional installation needed. Simply create wrapper files as shown above.

### TypeScript Support
All wrapped icons include proper TypeScript definitions:

```tsx
import type { LucideIcon } from 'lucide-react-native';

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
}

function IconButton({ icon: Icon, label }: IconButtonProps) {
  return (
    <Button>
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  );
}
```

## Icon Naming Convention

Follow Lucide's PascalCase naming:
- ✅ `ArrowDown` (correct)
- ❌ `arrow-down` (incorrect)
- ❌ `arrowDown` (incorrect)

## Styling Guidelines

### Size Classes
Use consistent sizing across your app:
```tsx
// Extra small icons
<Icon className="w-3 h-3" />

// Small icons  
<Icon className="w-4 h-4" />

// Medium icons (default)
<Icon className="w-5 h-5" />

// Large icons
<Icon className="w-6 h-6" />

// Extra large icons
<Icon className="w-8 h-8" />
```

### Color Integration
Icons automatically inherit text color or use design system tokens:
```tsx
// Inherit text color
<Icon className="w-4 h-4" />

// Design system colors
<Icon className="w-4 h-4 text-sys-text-secondary" />

// State colors
<Icon className="w-4 h-4 text-red-500" />
```

## Performance Considerations

### Bundle Optimization
- **Current approach**: Tree-shaking friendly, only includes used icons
- **Bundle impact**: ~2-3KB per icon (very minimal)
- **Loading**: No runtime performance impact

### Best Practices
1. **Only add needed icons** to maintain bundle efficiency
2. **Use wrapper system** for consistent className support
3. **Reuse existing icons** when possible
4. **Consider semantic meaning** when choosing icons

## Icon Discovery

### Finding Icons
1. **Lucide Website**: [lucide.dev](https://lucide.dev/icons)
2. **Search functionality**: Filter by category or keyword
3. **React Native compatibility**: All Lucide icons work with React Native

### Icon Categories
- **Accessibility**: 15+ icons for inclusive design
- **Arrows & Navigation**: 50+ directional indicators
- **Communication**: 30+ messaging and social icons
- **Design Tools**: 25+ creative and editing icons
- **Development**: 20+ coding and technical icons
- **Media & Files**: 40+ document and media icons
- **Shopping & Commerce**: 25+ e-commerce icons
- **Travel & Places**: 30+ location and transportation icons

## Migration Guide

### From Other Icon Libraries
If migrating from other icon libraries:

1. **Find equivalent icons** on Lucide website
2. **Create wrapper files** for each needed icon
3. **Update imports** in components
4. **Test visual consistency** across your app

### Removing Unused Icons
Periodically audit your icon usage:
```bash
# Search for icon imports
grep -r "from.*lib/icons" packages/
```

## Troubleshooting

### Common Issues

**Icon not displaying:**
- Verify wrapper file exists
- Check import path
- Ensure `iconWithClassName()` is called

**TypeScript errors:**
- Import `LucideIcon` type for props
- Use proper PascalCase naming

**Styling not working:**
- Confirm icon uses wrapper system
- Check className syntax
- Verify NativeWind configuration

### Getting Help
- **Lucide Documentation**: [lucide.dev/guide](https://lucide.dev/guide)
- **React Native Issues**: Check platform-specific considerations
- **Design System**: Refer to component documentation

## Future Considerations

### Planned Enhancements
- Icon size standardization utilities
- Automatic dark mode variants
- Animation support for interactive icons
- Icon library audit and optimization tools

### Design System Integration
Icons are fully integrated with your design system's:
- Color tokens
- Spacing system
- Accessibility requirements
- Cross-platform compatibility

This selective approach ensures your icon system remains lightweight, consistent, and maintainable while providing access to Lucide's comprehensive icon library when needed.