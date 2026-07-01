'use client'

import React, { useEffect, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDownIcon, MenuIcon, SearchIcon } from 'lucide-react'

type NavItem = NonNullable<HeaderType['navItems']>[number]

// Active/idle styling shared by every menu-panel row (dropdown items, drawer rows).
const menuItemState = (active: boolean) =>
  active ? 'bg-accent text-primary' : 'text-foreground hover:bg-accent hover:text-accent-foreground'

export const HeaderNav: React.FC<{ data: HeaderType | null }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close the drawer after navigating.
  useEffect(() => setOpen(false), [pathname])

  const isActive = (url?: string | null) =>
    !!url &&
    !url.startsWith('http') &&
    (url === '/' ? pathname === '/' : pathname === url || pathname.startsWith(`${url}/`))

  // A dropdown is active when any child is the route; a link, when it is.
  const itemActive = (item: NavItem) =>
    item.type === 'dropdown'
      ? !!item.subItems?.some((s) => isActive(s.link?.url))
      : isActive(item.link?.url)

  return (
    <>
      {/* Desktop — only once the viewport is wide enough for the full set of
          (long, Danish) labels; below `lg` the cramped row collides with the
          logo, so we show the drawer instead. */}
      <nav aria-label="Hovedmenu" className="hidden items-center gap-6 lg:flex">
        {navItems.map((item, i) => (
          <DesktopItem key={i} item={item} active={itemActive(item)} isActive={isActive} />
        ))}
        <Link
          href="/search"
          aria-label="Søg"
          className="text-foreground/80 transition-colors hover:text-primary"
        >
          <SearchIcon className="w-5" />
        </Link>
      </nav>

      {/* Mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Åbn menu"
          className="-mr-2 inline-flex cursor-pointer items-center justify-center p-2 text-foreground lg:hidden"
        >
          <MenuIcon className="w-6" />
        </SheetTrigger>

        <SheetContent side="right" className="p-0">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav aria-label="Mobilmenu" className="flex flex-col gap-1 px-3 pb-4">
            {navItems.map((item, i) => (
              <MobileItem key={i} item={item} active={itemActive(item)} isActive={isActive} />
            ))}
            <SheetClose asChild>
              <Link
                href="/search"
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <SearchIcon className="w-5" />
                Søg
              </Link>
            </SheetClose>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}

// ── desktop ──────────────────────────────────────────────────────────────────

const DesktopItem: React.FC<{
  item: NavItem
  active: boolean
  isActive: (url?: string | null) => boolean
}> = ({ item, active, isActive }) => {
  const subItems = item.subItems ?? []
  const linkClass = cn(
    'whitespace-nowrap text-sm font-medium transition-colors hover:text-primary',
    active ? 'text-primary' : 'text-foreground/80',
  )

  if (item.type !== 'dropdown') {
    return <CMSLink {...item.link} appearance="inline" className={linkClass} />
  }

  // A dropdown is a disclosure button, not a link — you pick a destination from
  // the menu.
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className={cn('inline-flex cursor-pointer items-center gap-1', linkClass)}
      >
        {item.label}
        <ChevronDownIcon
          className="w-4 text-foreground/50 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
          aria-hidden="true"
        />
      </button>
      {/* Dropdown — revealed on hover or keyboard focus within the group. */}
      <div className="invisible absolute left-0 top-full z-50 min-w-52 -translate-y-1 rounded-md border border-border bg-background p-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {subItems.map(({ link: sub }, i) => (
          <CMSLink
            key={i}
            {...sub}
            appearance="inline"
            className={cn('block rounded px-3 py-2 text-sm transition-colors', menuItemState(isActive(sub?.url)))}
          />
        ))}
      </div>
    </div>
  )
}

// ── mobile ───────────────────────────────────────────────────────────────────

const MobileItem: React.FC<{
  item: NavItem
  active: boolean
  isActive: (url?: string | null) => boolean
}> = ({ item, active, isActive }) => {
  const subItems = item.subItems ?? []
  const [expanded, setExpanded] = useState(active)

  const rowClass = cn('rounded-md px-3 py-2.5 text-base font-medium transition-colors', menuItemState(active))

  if (item.type !== 'dropdown') {
    return (
      <SheetClose asChild>
        <CMSLink {...item.link} appearance="inline" className={rowClass} />
      </SheetClose>
    )
  }

  // A dropdown row toggles its submenu — you pick a destination from the
  // children.
  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className={cn('flex w-full cursor-pointer items-center justify-between', rowClass)}
      >
        <span>{item.label}</span>
        <ChevronDownIcon className={cn('w-5 transition-transform', expanded && 'rotate-180')} />
      </button>
      {expanded && (
        <div className="ml-3 flex flex-col gap-1 border-l border-border pl-2">
          {subItems.map(({ link: sub }, i) => (
            <SheetClose asChild key={i}>
              <CMSLink
                {...sub}
                appearance="inline"
                className={cn('rounded-md px-3 py-2 text-sm font-medium transition-colors', menuItemState(isActive(sub?.url)))}
              />
            </SheetClose>
          ))}
        </div>
      )}
    </div>
  )
}
