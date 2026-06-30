'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/utilities/ui'

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

const SheetOverlay: React.FC<React.ComponentProps<typeof SheetPrimitive.Overlay>> = ({
  className,
  ...props
}) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
)

const sheetSides = {
  top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
  bottom:
    'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
  left: 'inset-y-0 left-0 h-full w-72 max-w-[80vw] border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
  right:
    'inset-y-0 right-0 h-full w-72 max-w-[80vw] border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
} as const

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: keyof typeof sheetSides
}

const SheetContent: React.FC<SheetContentProps> = ({
  side = 'right',
  className,
  children,
  ...props
}) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      className={cn(
        'fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-300',
        sheetSides[side],
        className,
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring">
        <XIcon className="size-5" />
        <span className="sr-only">Luk</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
)

const SheetHeader: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />
)

const SheetTitle: React.FC<React.ComponentProps<typeof SheetPrimitive.Title>> = ({
  className,
  ...props
}) => (
  <SheetPrimitive.Title
    className={cn('text-sm font-semibold text-foreground', className)}
    {...props}
  />
)

export { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger }
