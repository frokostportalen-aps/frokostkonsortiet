import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React, { useEffect, useState } from 'react'

import { getDialect } from '@/themes/dialect'
import { getTenantFont } from '@/themes/fonts'

/**
 * The design tokens, read back from the live document rather than listed from
 * `tenantThemes.ts`.
 *
 * That distinction matters: a value printed here is the one the browser has
 * actually resolved for the selected site and mode, so a token that never
 * reaches the page — a typo, a variable that only exists in light mode, a
 * fallback quietly kicking in — shows up as a blank rather than looking right.
 */

/** Reads a CSS custom property off the document, after the theme has applied. */
const useTokens = (names: string[], deps: unknown[]) => {
  const [values, setValues] = useState<Record<string, string>>({})
  useEffect(() => {
    // A frame after the decorator's <style> lands, so we read applied values.
    const id = requestAnimationFrame(() => {
      const s = getComputedStyle(document.documentElement)
      setValues(Object.fromEntries(names.map((n) => [n, s.getPropertyValue(n).trim()])))
    })
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return values
}

const GROUPS: { title: string; note: string; tokens: [string, string][] }[] = [
  {
    title: 'Brand',
    note: 'Holder i både lys og mørk tilstand — brandet skifter ikke farve efter mørkets frembrud.',
    tokens: [
      ['--primary', 'Knapper, links, det bærende brandtræk'],
      ['--primary-foreground', 'Tekst oven på primærfarven'],
      ['--accent', 'Varm flade til fremhævelser'],
      ['--accent-foreground', 'Tekst på accentfladen'],
      ['--eco', 'Klima- og øko-signaler: CO2e-tal, økomærker'],
      ['--eco-foreground', 'Tekst på klimafladen'],
    ],
  },
  {
    title: 'Flader',
    note: 'De omgivende flader toner kun lys tilstand, så mørk tilstand er en rolig, fælles neutral på tværs af familien.',
    tokens: [
      ['--background', 'Sidens bund'],
      ['--foreground', 'Brødtekst'],
      ['--card', 'Kort og løftede flader'],
      ['--card-foreground', 'Tekst på kort'],
      ['--secondary', 'Dæmpet båndflade'],
      ['--secondary-foreground', 'Tekst på den dæmpede flade'],
      ['--muted', 'Endnu svagere flade'],
      ['--muted-foreground', 'Sekundær tekst, billedtekster'],
      ['--border', 'Streger og afgrænsninger'],
    ],
  },
  {
    title: 'Wordmark-hero',
    note: 'Panelet er en fast brandflade, ikke en omgivende — derfor holder både den og dens tekstfarver i begge tilstande. Bruges kun af sites med wordmark-hero.',
    tokens: [
      ['--hero-panel', 'Panelets fyld'],
      ['--hero-wordmark', 'Bomærket på panelet'],
      ['--hero-panel-foreground', 'Underrubrikken på panelet'],
    ],
  },
]

/** A colour chip: the swatch is painted by the variable itself. */
const Swatch: React.FC<{ name: string; role: string; value: string }> = ({ name, role, value }) => (
  <div className="flex gap-3 items-start">
    <div
      className="w-12 h-12 rounded shrink-0 border"
      style={{ background: `var(${name})`, borderColor: 'var(--border)' }}
    />
    <div className="min-w-0">
      <code className="text-xs font-mono">{name}</code>
      <div className="text-xs opacity-70">{role}</div>
      <div className="text-xs font-mono opacity-50 break-all">{value || '— ikke sat'}</div>
    </div>
  </div>
)

const Section: React.FC<{ title: string; note?: string; children: React.ReactNode }> = ({
  title,
  note,
  children,
}) => (
  <section className="mb-12">
    <h2 className="text-xl mb-1">{title}</h2>
    {note && <p className="text-sm opacity-70 mb-5 max-w-2xl">{note}</p>}
    {children}
  </section>
)

const Tokens: React.FC<{ tenant: string }> = ({ tenant }) => {
  const names = GROUPS.flatMap((g) => g.tokens.map(([n]) => n))
  const values = useTokens([...names, '--radius', '--display-scale', '--text-inset'], [tenant])
  const dialect = getDialect(tenant)
  const font = getTenantFont(tenant)

  return (
    <div className="container py-12" style={{ color: 'var(--foreground)' }}>
      <h1 className="text-3xl mb-2">Designtokens</h1>
      <p className="text-sm opacity-70 mb-10 max-w-2xl">
        Værdierne herunder er læst ud af siden, som den ser ud lige nu — de følger både site- og
        lys/mørk-valget i værktøjslinjen. Står der “ikke sat”, falder sitet tilbage på familiens
        standard.
      </p>

      {GROUPS.map((g) => (
        <Section key={g.title} title={g.title} note={g.note}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {g.tokens.map(([name, role]) => (
              <Swatch key={name} name={name} role={role} value={values[name]} />
            ))}
          </div>
        </Section>
      ))}

      <Section
        title="Typografi"
        note="Skriften kommer fra next/font og sættes på et wrapper-element, præcis som sitets eget layout gør det."
      >
        <dl className="text-sm grid gap-x-6 gap-y-2 mb-6" style={{ gridTemplateColumns: 'auto 1fr' }}>
          <dt className="opacity-70">Brødtekst</dt>
          <dd><code className="font-mono text-xs">{font?.sansVar ?? '— familiens standard'}</code></dd>
          <dt className="opacity-70">Overskrifter</dt>
          <dd>
            <code className="font-mono text-xs">{font?.headingVar ?? 'samme som brødtekst'}</code>
          </dd>
          <dt className="opacity-70">Display-skala</dt>
          <dd><code className="font-mono text-xs">{values['--display-scale'] || '1 (standard)'}</code></dd>
        </dl>
        <div className="space-y-3">
          <p style={{ fontFamily: 'var(--font-heading, var(--font-sans))', fontSize: '2.5rem', lineHeight: 1.1 }}>
            Frokost, der samler os
          </p>
          <p style={{ fontFamily: 'var(--font-heading, var(--font-sans))', fontSize: '1.5rem' }}>
            En mellemrubrik i sitets overskriftsskrift
          </p>
          <p className="max-w-2xl">
            Brødtekst i sitets egen skrift. Æ, ø og å skal se rigtige ud — 0123456789.
          </p>
        </div>
      </Section>

      <Section title="Form" note="Hjørneradius gælder i begge tilstande: et sites hjørner er dets hjørner, også efter mørke.">
        <div className="flex gap-4 items-center">
          <div
            className="w-24 h-16 border"
            style={{ borderRadius: 'var(--radius)', background: 'var(--secondary)', borderColor: 'var(--border)' }}
          />
          <div className="text-sm">
            <code className="font-mono text-xs">--radius</code>
            <div className="opacity-50 font-mono text-xs">{values['--radius'] || '— ikke sat'}</div>
          </div>
        </div>
      </Section>

      <Section
        title="Dialekt"
        note="Personlighedsakserne. De injiceres ikke som CSS, men læses i JSX af de komponenter, der udtrykker dem — derfor står de her som værdier, ikke som farveprøver."
      >
        <dl className="text-sm grid gap-x-6 gap-y-2" style={{ gridTemplateColumns: 'auto 1fr' }}>
          {[
            ['heroVariant', dialect.heroVariant, 'Hvilken opbygning forsideheroen har'],
            ['eyebrow', dialect.eyebrow, 'Hvordan den lille linje over overskriften sættes'],
            ['signature', dialect.signature, 'Sitets gentagne grafiske markør'],
            ['chrome', dialect.chrome, 'Hvordan header og footer er klædt'],
            ['tagline', dialect.tagline ?? '—', 'Brandlinjen, bl.a. som fallback i wordmark-heroen'],
          ].map(([k, v, note]) => (
            <React.Fragment key={k}>
              <dt className="opacity-70 font-mono text-xs pt-0.5">{k}</dt>
              <dd>
                <strong>{v}</strong>
                <span className="opacity-60"> — {note}</span>
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </Section>
    </div>
  )
}

const meta = {
  title: 'Designtokens',
  parameters: {
    docs: {
      description: {
        component:
          'Farver, skrifter, form og personlighed for det valgte site. Alle værdier er læst ud af den levende side, så de altid svarer til det, komponenterne faktisk får.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Oversigt: Story = {
  render: (_args, { globals }) => <Tokens tenant={(globals.tenant as string) || 'frokost-konsortiet'} />,
}
