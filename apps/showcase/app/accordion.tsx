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
    <View className='flex-1 justify-center items-center p-lg'>
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
            accessibilityHint='Tap to expand or collapse'
            accessibilityLabel='Is it accessible?'
            aria-controls='content-item-1'
          >
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent
            accessibilityRole='region'
            accessibilityLabel='Answer to: Is it accessible?'
            nativeID='content-item-1'
            accessibilityLiveRegion='polite'
          >
            Yes. It adheres to the WAI-ARIA design pattern and follows accessibility best practices.
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
            What are universal components?
          </AccordionTrigger>
          <AccordionContent
            accessibilityRole='region'
            accessibilityLabel='Answer to: What are universal components?'
            nativeID='content-item-2'
            accessibilityLiveRegion='polite'
          >
            In the world of React Native, universal components are components that work on both web and native platforms with consistent styling and behavior.
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
            Is this component universal?
          </AccordionTrigger>
          <AccordionContent
            accessibilityRole='region'
            accessibilityLabel='Answer to: Is this component universal?'
            nativeID='content-item-3'
            accessibilityLiveRegion='polite'
          >
            Yes. Try it out on the web, iOS, and/or Android platforms to see the consistent experience.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem 
          value='item-4' 
          disabled={true}
          accessibilityRole='region'
          nativeID='accordion-item-4'
        >
          <AccordionTrigger
            disabled={true}
            accessibilityRole='button'
            accessibilityHint='This item is disabled'
            accessibilityLabel='Disabled accordion item'
            aria-controls='content-item-4'
          >
            This item is disabled
          </AccordionTrigger>
          <AccordionContent
            disabled={true}
            accessibilityRole='region'
            accessibilityLabel='Content for disabled item'
            nativeID='content-item-4'
            accessibilityLiveRegion='polite'
          >
            This content cannot be accessed because the item is disabled.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </View>
  );
}