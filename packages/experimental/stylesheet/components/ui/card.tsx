import type { TextRef, ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text, type TextProps, View, type ViewProps } from 'react-native';
import { TextStyleContext } from '~/components/ui/text';
import { createStyleSheet, useStyleSheet } from '~/styles/stylesheet';
import { cs } from '~/styles/utils/combine';
import { FONT_WEIGHT } from '~/styles/utils/font-weight';
import { SHADOW } from '~/styles/utils/shadow';

const Card = React.forwardRef<ViewRef, ViewProps>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return <View ref={ref} style={cs(styles.root, style)} {...props} />;
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef<ViewRef, ViewProps>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return <View ref={ref} style={cs(styles.header, style)} {...props} />;
});
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<TextRef, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ style, ...props }, ref) => {
    const { styles } = useStyleSheet(stylesheet);
    return (
      <Text role='heading' aria-level={3} ref={ref} style={cs(styles.title, style)} {...props} />
    );
  }
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<TextRef, TextProps>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return <Text ref={ref} style={cs(styles.description, style)} {...props} />;
});
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<ViewRef, ViewProps>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return (
    <TextStyleContext.Provider value={styles.contentText}>
      <View ref={ref} style={cs(styles.content, style)} {...props} />
    </TextStyleContext.Provider>
  );
});
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<ViewRef, ViewProps>(({ style, ...props }, ref) => {
  const { styles } = useStyleSheet(stylesheet);
  return <View ref={ref} style={cs(styles.footer, style)} {...props} />;
});
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };

const stylesheet = createStyleSheet(({ colors }, { fontSize, space, rounded, tracking }) => {
  return {
    root: {
      borderRadius: rounded['lg'],
      borderWidth: space['hairline'],
      borderColor: colors.border,
      backgroundColor: colors.card,
      ...SHADOW['sm'],
    },
    header: {
      gap: space['1.5'],
      padding: space[6],
    },
    title: {
      color: colors.cardForeground,
      fontSize: fontSize['2xl'],
      fontWeight: FONT_WEIGHT['semiBold'],
      letterSpacing: tracking['tight'],
    },
    description: {
      fontSize: fontSize['sm'],
      color: colors.mutedForeground,
    },
    content: {
      padding: space[6],
      paddingTop: 0,
    },
    contentText: {
      color: colors.cardForeground,
    },
    footer: {
      flexDirection: 'row',
      padding: space[6],
      paddingTop: 0,
    },
  };
});
