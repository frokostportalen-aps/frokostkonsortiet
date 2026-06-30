'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/utilities/ui'

const Accordion = AccordionPrimitive.Root

const AccordionItem: React.FC<React.ComponentProps<typeof AccordionPrimitive.Item>> = ({
  className,
  ...props
}) => (
  <AccordionPrimitive.Item className={cn('border-b border-border last:border-b-0', className)} {...props} />
)

const AccordionTrigger: React.FC<React.ComponentProps<typeof AccordionPrimitive.Trigger>> = ({
  className,
  children,
  ...props
}) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        'flex flex-1 cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-medium outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-5 shrink-0 text-foreground/50 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)

const AccordionContent: React.FC<React.ComponentProps<typeof AccordionPrimitive.Content>> = ({
  className,
  children,
  ...props
}) => (
  <AccordionPrimitive.Content
    className="overflow-hidden text-base data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0 text-foreground/80', className)}>{children}</div>
  </AccordionPrimitive.Content>
)

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
