import React from 'react'

import type { Page } from '@/payload-types'
import type { TenantDesign } from '@/themes/tenantThemes'

import { Eyebrow } from '@/components/Eyebrow'
import { signatureMarkClass } from '@/components/SignatureMark'
import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
      design?: TenantDesign
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
      design?: TenantDesign
    })


/**
 * The standard sub-page header: tagline eyebrow, a big balanced headline and
 * the tenant's signature mark — so content pages open in the site's own voice
 * instead of a bare CMS h1.
 */
export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText, design }) => {
  return (
    <div className="container mt-14 md:mt-20">
      <div className="max-w-[52rem]">
        {design?.tagline && (
          <Eyebrow style={design.eyebrow} withRule className="mb-5">
            {design.tagline}
          </Eyebrow>
        )}
        {children ||
          (richText && (
            <RichText
              className="[&_h1]:text-balance [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:leading-[1.08] [&_h1]:tracking-[-0.02em] md:[&_h1]:text-5xl [&_p]:text-lg [&_p]:text-muted-foreground"
              data={richText}
              enableGutter={false}
            />
          ))}
        {design && (
          <span aria-hidden className={`mt-7 block ${signatureMarkClass.pageHeader[design.signature]}`} />
        )}
      </div>
    </div>
  )
}
