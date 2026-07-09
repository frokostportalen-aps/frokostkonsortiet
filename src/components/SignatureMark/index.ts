import type { Signature } from '@/themes/tenantThemes'

/**
 * Every rendering of the tenant's signature motif ("ét sprog, tre dialekter"),
 * gathered in one place so the dialect system has a single source of truth.
 * The sizes differ deliberately per context — change them here and see every
 * variant side by side instead of hunting five per-file maps.
 */
export const signatureMarkClass: Record<
  'section' | 'pageHeader' | 'footer' | 'heroEyebrow',
  Record<Signature, string>
> = {
  /** The rule under section headings (Content block). */
  section: {
    rule: 'h-px w-14 bg-primary',
    block: 'h-1 w-14 rounded-full bg-primary',
    sketch: 'h-[3px] w-12 rounded-full bg-primary/80',
  },
  /** Under the sub-page h1 (LowImpact hero). */
  pageHeader: {
    rule: 'h-px w-14 bg-primary',
    block: 'h-1.5 w-14 bg-primary',
    sketch: 'h-[3px] w-12 rounded-full bg-primary/80',
  },
  /** The footer's brand sign-off. */
  footer: {
    rule: 'h-px w-12 bg-primary',
    block: 'h-1 w-12 rounded-full bg-primary',
    sketch: 'h-[3px] w-10 rounded-full bg-primary/80',
  },
  /** Before the overlay hero's tagline (light-on-photo context). */
  heroEyebrow: {
    rule: 'h-px w-8 bg-current opacity-60',
    block: 'h-2 w-7 bg-primary',
    sketch: 'h-[3px] w-9 rounded-full bg-primary',
  },
}
