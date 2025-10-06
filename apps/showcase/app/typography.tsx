import { ScrollView, View } from "react-native"
import {
  BlockQuote,
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
} from "~/components/ui/typography"

export default function TypographyScreen() {
  return (
    <ScrollView contentContainerClassName="p-lg" showsVerticalScrollIndicator={false}>
      <View className="max-w-lg">
        {/* Headings */}
        <H1>Heading 8XL</H1>
        <BodyXS className="text-sys-text-secondary">Size 40PX / Line Height 45px / Letter Spacing -1.5PX</BodyXS>
        <View className="p-sm" />

        <H2>Heading 7XL</H2>
        <BodyXS className="text-sys-text-secondary">Size 36PX / Line Height 45px / Letter Spacing -1PX</BodyXS>
        <View className="p-sm" />

        <H3>Heading 6XL</H3>
        <BodyXS className="text-sys-text-secondary">Size 32PX / Line Height 45px / Letter Spacing -1PX</BodyXS>
        <View className="p-sm" />

        <H4>Heading 5XL</H4>
        <BodyXS className="text-sys-text-secondary">Size 24PX / Line Height 45px / Letter Spacing -0.5PX</BodyXS>
        <View className="p-sm" />

        <H5>Heading 4XL</H5>
        <BodyXS className="text-sys-text-secondary">Size 20PX / Line Height 45px / Letter Spacing -0.5PX</BodyXS>
        <View className="p-sm" />

        <H6>Heading 3XL</H6>
        <BodyXS className="text-sys-text-secondary">Size 17PX / Line Height 36px / Letter Spacing -0.5PX</BodyXS>
        <View className="p-sm" />

        <H7>Heading 2XL</H7>
        <BodyXS className="text-sys-text-secondary">Size 15PX / Line Height 15px / Letter Spacing -0.5PX</BodyXS>
        <View className="p-md" />

        {/* Body Text */}
        <BodyXL className="font-semibold">Body XL</BodyXL>
        <BodyXS className="text-sys-text-secondary">Size 26PX / Line Height 28px / Letter Spacing -0.5PX</BodyXS>
        <View className="p-sm" />

        <BodyLG className="font-semibold">Body LG</BodyLG>
        <BodyXS className="text-sys-text-secondary">Size 22PX / Line Height 28px / Letter Spacing -0.5PX</BodyXS>
        <View className="p-sm" />

        <BodyMD className="font-semibold">Body MD</BodyMD>
        <BodyXS className="text-sys-text-secondary">Size 16PX / Line Height 23px / Letter Spacing -0.5PX</BodyXS>
        <View className="p-sm" />

        <BodyBase className="font-semibold">Body Base</BodyBase>
        <BodyXS className="text-sys-text-secondary">Size 15PX / Line Height 20px / Letter Spacing -0.5PX</BodyXS>
        <View className="p-sm" />

        <BodySM className="font-semibold">Body SM</BodySM>
        <BodyXS className="text-sys-text-secondary">Size 14PX / Line Height 20px / Letter Spacing -0.5PX</BodyXS>
        <View className="p-sm" />

        <BodyXS className="font-semibold">Body XS</BodyXS>
        <BodyXS className="text-sys-text-secondary">Size 12PX / Line Height 16px / Letter Spacing -0.5PX</BodyXS>
        <View className="p-sm" />
      </View>
    </ScrollView>
  )
}
