'use client'

import React, { useEffect, useId, useRef, useState } from 'react'

import type { Form, PlanPickerBlock as PlanPickerBlockProps } from '@/payload-types'

import { getDialect } from '@/themes/dialect'

import { needLabel, QUOTE_FORM_FIELDS } from './options'

import { ArrowLink } from '@/components/ArrowLink'
import { Eyebrow } from '@/components/Eyebrow'
import { NumberBadge } from '@/components/NumberBadge'
import RichText from '@/components/RichText'
import { SectionHeader } from '@/components/SectionHeader'
import { SignatureCard } from '@/components/SignatureCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { submitFormSubmission } from '@/blocks/Form/submitFormSubmission'
import { cn } from '@/utilities/ui'

type Plan = NonNullable<PlanPickerBlockProps['plans']>[number]
type Props = PlanPickerBlockProps & { tenantSlug?: string }
type FormField = NonNullable<Form['fields']>[number]

/** The slider tops out here and reads as "100+" — matching treats it as 100. */
const MAX_PEOPLE = 100

/** Form fields the wizard answers itself (steps 1–2); they are submitted from
 *  the picker state instead of being rendered as inputs in the contact step. */
const ANSWERED_FIELDS: string[] = Object.values(QUOTE_FORM_FIELDS)

const STEPS = ['Behov & antal', 'Kontakt']

const minOf = (plan: Plan) => plan.minPeople ?? 1

// Field types the contact step knows how to render as inputs. If the quote
// form ever grows a select/checkbox, that's the trigger for reusing the Form
// block's field system here instead of extending this mini-renderer.
const isInputField = (
  field: FormField,
): field is FormField & { name: string; blockType: 'text' | 'textarea' | 'email' | 'number' } =>
  'name' in field &&
  typeof field.name === 'string' &&
  ['text', 'textarea', 'email', 'number'].includes(field.blockType)

/**
 * The quote wizard: two steps (the two questions → recommendation + contact
 * details) inside one component, so nobody is sent off to a form on another
 * page. The final step submits straight to the tenant's standing Payload
 * quote form — the picker's own answers ride along as the form's structured
 * `behov`/`antalMedarbejdere` fields.
 *
 * Matching is client-side against the CMS-defined recommendations — the best
 * match is the one with the highest `minPeople` the headcount still clears;
 * if the headcount clears none, the closest plan (lowest `minPeople`) is
 * shown with an honest note instead.
 */
export const PlanPickerBlock: React.FC<Props> = ({
  heading,
  intro,
  plans,
  form,
  tenantSlug,
}) => {
  const { signature, eyebrow } = getDialect(tenantSlug)
  const uid = useId()
  const needs = Array.from(new Set((plans || []).map((plan) => plan.need)))
  const [step, setStep] = useState(0)
  const [need, setNeed] = useState<string>(needs[0] ?? 'frokost')
  const [people, setPeople] = useState<number>(25)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Contact answers live in state (not just the DOM) so nothing the visitor
  // typed is lost when the contact step unmounts on "Tilbage".
  const [contact, setContact] = useState<Record<string, string>>({})

  // Move keyboard/screen-reader focus along with the step change (but not on
  // the initial render, where it would steal focus from the page).
  const stepFocusRef = useRef<HTMLElement | null>(null)
  const mountedRef = useRef(false)
  useEffect(() => {
    if (mountedRef.current) stepFocusRef.current?.focus()
    mountedRef.current = true
  }, [step])

  // Cheap derivation over a handful of CMS plans — no memo ceremony needed.
  const candidates = (plans || []).filter((plan) => plan.need === need)
  const cleared = candidates.filter((plan) => people >= minOf(plan))
  const match = cleared.length
    ? cleared.reduce((best, plan) => (minOf(plan) > minOf(best) ? plan : best))
    : candidates.length
      ? candidates.reduce((best, plan) => (minOf(plan) < minOf(best) ? plan : best))
      : null
  const belowMin = match !== null && people < minOf(match)

  const peopleLabel = people >= MAX_PEOPLE ? `${MAX_PEOPLE}+` : String(people)

  // The standing quote form (populated by the page query). The contact step
  // renders its fields, minus the ones the wizard has already answered.
  const formDoc = form && typeof form === 'object' ? form : null
  const contactFields = (formDoc?.fields || [])
    .filter(isInputField)
    .filter((field) => !ANSWERED_FIELDS.includes(field.name))

  if (!plans?.length) return null

  const submitQuote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formDoc) return
    setError(null)
    setIsSubmitting(true)

    const submissionData = [
      ...contactFields.map((field) => ({
        field: field.name,
        value: contact[field.name] ?? '',
      })),
      // The wizard's own answers, on the form's structured fields. The
      // headcount is submitted as shown ("100+" at the slider's cap), so the
      // lead never understates what the visitor actually told us.
      { field: QUOTE_FORM_FIELDS.need, value: needLabel(need) },
      { field: QUOTE_FORM_FIELDS.people, value: peopleLabel },
    ]

    const result = await submitFormSubmission(formDoc.id, submissionData)
    setIsSubmitting(false)
    if (result.ok) {
      setHasSubmitted(true)
    } else {
      setError(result.message)
    }
  }

  const setStepFocus = (el: HTMLElement | null) => {
    stepFocusRef.current = el
  }

  // Step navigation clears any submit error — a stale message must not hang
  // over a fresh attempt (or fire invisibly while the other step is shown).
  const goToStep = (index: number) => {
    setError(null)
    setStep(index)
  }

  const stepBadge = (index: number) => {
    const isDone = index < step
    const isCurrent = index === step
    return (
      <li key={STEPS[index]} className="flex items-center gap-2.5">
        <NumberBadge
          className={cn(
            'size-7 transition-colors',
            !isDone && !isCurrent && 'border border-border bg-background text-muted-foreground',
          )}
        >
          {isDone ? '✓' : index + 1}
        </NumberBadge>
        <span
          className={`text-sm font-medium ${isCurrent ? '' : 'text-muted-foreground'} max-sm:sr-only`}
        >
          {STEPS[index]}
          {isCurrent && <span className="sr-only"> (nuværende trin)</span>}
        </span>
      </li>
    )
  }

  return (
    <div className="container">
      <div className="rounded-[calc(var(--radius)*1.5)] bg-secondary/70 p-6 md:p-12">
        <SectionHeader heading={heading} intro={intro} className="mb-8" />

        {/* Progress — a connector between the two steps */}
        {!hasSubmitted && (
          <ol className="mx-auto mb-10 flex max-w-xs items-center justify-center gap-3">
            {stepBadge(0)}
            <span aria-hidden className="h-px min-w-6 flex-1 bg-border" />
            {stepBadge(1)}
          </ol>
        )}

        <div className="mx-auto max-w-[52rem]" aria-live="polite">
          {/* Step 1 — the two questions together */}
          {!hasSubmitted && step === 0 && (
            <div
              key="step-questions"
              ref={setStepFocus}
              tabIndex={-1}
              className="mx-auto max-w-xl outline-none animate-in duration-300 fade-in slide-in-from-right-2 motion-reduce:animate-none"
            >
              <fieldset>
                <legend className="mb-3 flex items-center gap-2.5 text-sm font-semibold">
                  <NumberBadge>1</NumberBadge>
                  Hvad har I brug for?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {needs.map((value) => (
                    <label
                      key={value}
                      className="cursor-pointer select-none rounded-[var(--radius)] border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ring/20"
                    >
                      <input
                        type="radio"
                        name={`${uid}-need`}
                        value={value}
                        checked={need === value}
                        onChange={() => setNeed(value)}
                        className="sr-only"
                      />
                      {needLabel(value)}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-8">
                <div className="mb-2 flex items-end justify-between gap-4">
                  <label
                    htmlFor={`${uid}-people`}
                    className="flex items-center gap-2.5 text-sm font-semibold"
                  >
                    <NumberBadge>2</NumberBadge>
                    Hvor mange er I?
                  </label>
                  <p className="whitespace-nowrap leading-none">
                    <span className="font-heading text-3xl font-semibold text-primary">
                      {peopleLabel}
                    </span>{' '}
                    <span className="text-sm text-muted-foreground">personer</span>
                  </p>
                </div>
                <input
                  id={`${uid}-people`}
                  type="range"
                  min={1}
                  max={MAX_PEOPLE}
                  value={people}
                  onChange={(event) => setPeople(Number(event.target.value))}
                  aria-valuetext={`${peopleLabel} personer`}
                  className="w-full cursor-pointer accent-primary"
                />
                <div
                  aria-hidden
                  className="mt-1 flex justify-between text-xs text-muted-foreground"
                >
                  <span>1</span>
                  <span>50</span>
                  <span>{MAX_PEOPLE}+</span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button type="button" size="lg" onClick={() => goToStep(1)}>
                  Se vores anbefaling
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 — recommendation + contact details, side by side */}
          {!hasSubmitted && step === 1 && match && (
            <div
              key="step-contact"
              className="animate-in duration-300 fade-in slide-in-from-right-2 motion-reduce:animate-none"
            >
              <div className="grid items-start gap-6 md:grid-cols-[1fr_1.2fr] md:gap-10">
                <SignatureCard signature={signature}>
                  <Eyebrow style={eyebrow}>Vores anbefaling til jer</Eyebrow>
                  <h3
                    ref={setStepFocus}
                    tabIndex={-1}
                    className="font-heading mt-3 text-2xl font-semibold tracking-tight outline-none"
                  >
                    {match.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Til {peopleLabel} personer, der skal have {needLabel(need).toLowerCase()}.
                  </p>
                  {match.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {match.description}
                    </p>
                  )}
                  {match.priceLabel && (
                    <p className="font-heading mt-5 text-xl font-semibold text-primary">
                      {match.priceLabel}
                    </p>
                  )}
                  {belowMin && (
                    <p className="mt-4 rounded-[var(--radius)] bg-secondary px-3 py-2 text-xs leading-relaxed text-secondary-foreground">
                      {match.title} er typisk fra {minOf(match)} personer – er I færre, finder vi
                      en løsning sammen.
                    </p>
                  )}
                  <div className="mt-5">
                    <ArrowLink href={match.url}>Læs mere om {match.title}</ArrowLink>
                  </div>
                </SignatureCard>

                {formDoc && contactFields.length > 0 && (
                  <form onSubmit={submitQuote} className="flex flex-col">
                    <p className="mb-4 text-sm font-medium">
                      Få et uforpligtende tilbud – vi har allerede noteret jeres behov og antal.
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {contactFields.map((field) => {
                        const isWide = field.blockType === 'textarea' || (field.width ?? 100) > 50
                        const shared = {
                          id: `${uid}-${field.name}`,
                          name: field.name,
                          required: field.required ?? false,
                          className: 'bg-background',
                          value: contact[field.name] ?? '',
                          onChange: (
                            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                          ) => setContact((c) => ({ ...c, [field.name]: event.target.value })),
                        }
                        return (
                          <div
                            key={field.name}
                            className={`flex flex-col gap-1.5 ${isWide ? 'sm:col-span-2' : ''}`}
                          >
                            <Label htmlFor={shared.id}>
                              {field.label || field.name}
                              {field.required && (
                                <span className="text-error">
                                  {' '}
                                  * <span className="sr-only">(skal udfyldes)</span>
                                </span>
                              )}
                            </Label>
                            {field.blockType === 'textarea' ? (
                              <Textarea {...shared} rows={3} />
                            ) : (
                              <Input
                                {...shared}
                                type={field.blockType === 'text' ? 'text' : field.blockType}
                              />
                            )}
                          </div>
                        )
                      })}
                    </div>
                    {error && <p className="mt-4 text-sm font-medium text-error">{error}</p>}
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <Button type="button" variant="ghost" onClick={() => goToStep(0)}>
                        Tilbage
                      </Button>
                      <Button type="submit" size="lg" disabled={isSubmitting}>
                        {isSubmitting
                          ? 'Sender…'
                          : formDoc.submitButtonLabel || 'Send forespørgsel'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Done — the form's own confirmation message */}
          {hasSubmitted && (
            <div className="mx-auto max-w-xl animate-in text-center duration-300 fade-in slide-in-from-bottom-2 motion-reduce:animate-none">
              {formDoc?.confirmationMessage ? (
                <RichText data={formDoc.confirmationMessage} enableGutter={false} />
              ) : (
                <p className="font-heading text-xl font-semibold">Tak for jeres forespørgsel!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
