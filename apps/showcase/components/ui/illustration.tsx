import * as React from 'react';
import { View, Image, ViewStyle, ImageStyle } from 'react-native';
import { cn } from '@rnr/reusables/lib/utils';

type IllustrationSize = 'small' | 'medium' | 'large';

interface IllustrationProps {
  name: string;
  size?: IllustrationSize;
  alt?: string;
  decorative?: boolean;
  className?: string;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

// Size mappings for React Native
const sizeMap: Record<IllustrationSize, { width: number; height: number }> = {
  small: { width: 80, height: 80 },
  medium: { width: 120, height: 120 },
  large: { width: 160, height: 160 },
};

// Map of illustration names to their require statements
const illustrationMap: Record<string, any> = {
  'Apple_Vision': require('../../assets/illustrations/Apple_Vision.png'),
  'Apple_Watch': require('../../assets/illustrations/Apple_Watch.png'),
  'Asteriks': require('../../assets/illustrations/Asteriks.png'),
  'Backpack': require('../../assets/illustrations/Backpack.png'),
  'Beanbag': require('../../assets/illustrations/Beanbag.png'),
  'Book': require('../../assets/illustrations/Book.png'),
  'Bottle': require('../../assets/illustrations/Bottle.png'),
  'Brain_Black': require('../../assets/illustrations/Brain_Black.png'),
  'Brain_Pink': require('../../assets/illustrations/Brain_Pink.png'),
  'Cactus': require('../../assets/illustrations/Cactus.png'),
  'Canister': require('../../assets/illustrations/Canister.png'),
  'Cap': require('../../assets/illustrations/Cap.png'),
  'Chair': require('../../assets/illustrations/Chair.png'),
  'Chains': require('../../assets/illustrations/Chains.png'),
  'Clock': require('../../assets/illustrations/Clock.png'),
  'Cloud': require('../../assets/illustrations/Cloud.png'),
  'Cluster': require('../../assets/illustrations/Cluster.png'),
  'Coffee': require('../../assets/illustrations/Coffee.png'),
  'Computer': require('../../assets/illustrations/Computer.png'),
  'Connected': require('../../assets/illustrations/Connected.png'),
  'Cursor': require('../../assets/illustrations/Cursor.png'),
  'Diary': require('../../assets/illustrations/Diary.png'),
  'Enter': require('../../assets/illustrations/Enter.png'),
  'Eyes': require('../../assets/illustrations/Eyes.png'),
  'Fat_Cursor': require('../../assets/illustrations/Fat_Cursor.png'),
  'Figma_Shirt': require('../../assets/illustrations/Figma_Shirt.png'),
  'Flower': require('../../assets/illustrations/Flower.png'),
  'Flower_Painting': require('../../assets/illustrations/Flower_Painting.png'),
  'Folder': require('../../assets/illustrations/Folder.png'),
  'Fuzzy': require('../../assets/illustrations/Fuzzy.png'),
  'Glasses': require('../../assets/illustrations/Glasses.png'),
  'Glisten': require('../../assets/illustrations/Glisten.png'),
  'Goo': require('../../assets/illustrations/Goo.png'),
  'Gradient': require('../../assets/illustrations/Gradient.png'),
  'Hash': require('../../assets/illustrations/Hash.png'),
  'Headphones': require('../../assets/illustrations/Headphones.png'),
  'Heart': require('../../assets/illustrations/Heart.png'),
  'Hoodie': require('../../assets/illustrations/Hoodie.png'),
  'Ink': require('../../assets/illustrations/Ink.png'),
  'iPod': require('../../assets/illustrations/iPod.png'),
  'iPods': require('../../assets/illustrations/iPods.png'),
  'Kaws': require('../../assets/illustrations/Kaws.png'),
  'Keyboard': require('../../assets/illustrations/Keyboard.png'),
  'Lego': require('../../assets/illustrations/Lego.png'),
  'Love': require('../../assets/illustrations/Love.png'),
  'Love_Gun': require('../../assets/illustrations/Love_Gun.png'),
  'Mac': require('../../assets/illustrations/Mac.png'),
  'O': require('../../assets/illustrations/O.png'),
  'Ottoman': require('../../assets/illustrations/Ottoman.png'),
  'Painting': require('../../assets/illustrations/Painting.png'),
  'Palette': require('../../assets/illustrations/Palette.png'),
  'Pen': require('../../assets/illustrations/Pen.png'),
  'Pens': require('../../assets/illustrations/Pens.png'),
  'Phone': require('../../assets/illustrations/Phone.png'),
  'Pill': require('../../assets/illustrations/Pill.png'),
  'Pink_Ball': require('../../assets/illustrations/Pink_Ball.png'),
  'Pink_Shape': require('../../assets/illustrations/Pink_Shape.png'),
  'Ring': require('../../assets/illustrations/Ring.png'),
  'Rock': require('../../assets/illustrations/Rock.png'),
  'S': require('../../assets/illustrations/S.png'),
  'Scooter': require('../../assets/illustrations/Scooter.png'),
  'Settings': require('../../assets/illustrations/Settings.png'),
  'Shoes': require('../../assets/illustrations/Shoes.png'),
  'Smiley': require('../../assets/illustrations/Smiley.png'),
  'Speaker': require('../../assets/illustrations/Speaker.png'),
  'Starfish': require('../../assets/illustrations/Starfish.png'),
  'Starfish_2': require('../../assets/illustrations/Starfish_2.png'),
  'Staute': require('../../assets/illustrations/Staute.png'),
  'Suitcase': require('../../assets/illustrations/Suitcase.png'),
  'Tag': require('../../assets/illustrations/Tag.png'),
  'Tote': require('../../assets/illustrations/Tote.png'),
  'Twizzler': require('../../assets/illustrations/Twizzler.png'),
  'Void': require('../../assets/illustrations/Void.png'),
  'Weirdo': require('../../assets/illustrations/Weirdo.png'),
  'Wifi': require('../../assets/illustrations/Wifi.png'),
  'X': require('../../assets/illustrations/X.png'),
};

const Illustration = React.forwardRef<View, IllustrationProps>(
  (
    {
      name,
      size = 'medium',
      alt,
      decorative = false,
      className,
      style,
      imageStyle,
      accessibilityLabel,
      accessibilityHint,
      ...props
    },
    ref
  ) => {
    const dimensions = sizeMap[size];
    const imageSource = illustrationMap[name];

    if (!imageSource) {
      console.warn(`Illustration not found: ${name}`);
      return null;
    }

    // Determine accessibility properties
    const getAccessibilityLabel = () => {
      if (decorative) return undefined;
      if (accessibilityLabel) return accessibilityLabel;
      if (alt) return alt;
      return `Illustration: ${name.replace(/[-_]/g, ' ')}`;
    };

    const containerStyle: ViewStyle = {
      width: dimensions.width,
      height: dimensions.height,
      ...style,
    };

    const defaultImageStyle: ImageStyle = {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    };

    return (
      <View
        ref={ref}
        className={cn('items-center justify-center', className)}
        style={containerStyle}
        accessibilityElementsHidden={decorative}
        importantForAccessibility={decorative ? 'no-hide-descendants' : 'auto'}
        {...props}
      >
        <Image
          source={imageSource}
          accessibilityLabel={getAccessibilityLabel()}
          accessibilityHint={accessibilityHint}
          accessibilityRole={decorative ? 'none' : 'image'}
          style={[defaultImageStyle, imageStyle]}
        />
      </View>
    );
  }
);

Illustration.displayName = 'Illustration';

export { Illustration };
export type { IllustrationProps };