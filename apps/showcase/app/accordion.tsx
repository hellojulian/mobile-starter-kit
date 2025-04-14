import React from 'react';
import { View } from 'react-native';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Text } from '~/components/ui/text';

export default function AccordionScreen() {
  return (
    <View className='flex-1 justify-center items-center p-6'>
      <Accordion
        type='multiple'
        collapsible
        defaultValue={['item-1']}
        className='w-full max-w-sm native:max-w-md'
        accessibilityRole='group'
        accessibilityLabel='FAQ Accordion'
      >
        <AccordionItem 
          value='item-1' 
          accessibilityRole='region'
          nativeID='accordion-item-1'
        >
          <AccordionTrigger
            accessibilityRole='button'
            // Let the component handle its own state internally
            // but provide accessibility information
            accessibilityHint='Tap to expand or collapse'
            accessibilityLabel='Is it accessible?'
            aria-controls='content-item-1'
          >
            <Text>Is it accessible?</Text>
          </AccordionTrigger>
          <AccordionContent
            accessibilityRole='region'
            accessibilityLabel='Answer to: Is it accessible?'
            nativeID='content-item-1'
            accessibilityLiveRegion='polite'
          >
            <Text>Yes. It adheres to the WAI-ARIA design pattern.</Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem 
          value='item-2' 
          accessibilityRole='region'
          nativeID='accordion-item-2'
        >
          <AccordionTrigger
            accessibilityRole='button'
            accessibilityHint='Tap to expand or collapse'
            accessibilityLabel='What are universal components?'
            aria-controls='content-item-2'
          >
            <Text>What are universal components?</Text>
          </AccordionTrigger>
          <AccordionContent
            accessibilityRole='region'
            accessibilityLabel='Answer to: What are universal components?'
            nativeID='content-item-2'
            accessibilityLiveRegion='polite'
          >
            <Text>
              In the world of React Native, universal components are components that work on both
              web and native platforms.
            </Text>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem 
          value='item-3' 
          accessibilityRole='region'
          nativeID='accordion-item-3'
        >
          <AccordionTrigger
            accessibilityRole='button'
            accessibilityHint='Tap to expand or collapse'
            accessibilityLabel='Is this component universal?'
            aria-controls='content-item-3'
          >
            <Text>Is this component universal?</Text>
          </AccordionTrigger>
          <AccordionContent
            accessibilityRole='region'
            accessibilityLabel='Answer to: Is this component universal?'
            nativeID='content-item-3'
            accessibilityLiveRegion='polite'
          >
            <Text>Yes. Try it out on the web, iOS, and/or Android.</Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}