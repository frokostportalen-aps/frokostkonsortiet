import React from 'react'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'

export const FAQBlock: React.FC<FAQBlockProps> = ({ heading, items }) => {
  if (!items?.length) return null

  return (
    <div className="container max-w-3xl">
      {heading && <h2 className="mb-6 text-2xl font-semibold">{heading}</h2>}
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, i) => (
          <AccordionItem key={item.id ?? i} value={`item-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <RichText data={item.answer} enableGutter={false} enableProse={false} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
