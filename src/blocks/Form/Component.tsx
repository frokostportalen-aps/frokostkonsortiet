'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { submitFormSubmission } from './submitFormSubmission'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  // Default values keyed by field name — the fields array itself is not a
  // valid RHF value tree (an array root breaks named-field state for
  // Controller-based fields like the select). Only read on first render.
  const defaultValues: Record<string, unknown> = {}
  formFromProps.fields?.forEach((field) => {
    if ('name' in field && field.name) {
      defaultValues[field.name] = 'defaultValue' in field ? field.defaultValue : undefined
    }
  })
  const formMethods = useForm<Record<string, unknown>>({ defaultValues })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string } | undefined>()
  const router = useRouter()

  // Next scrolls to the `#tilbud` anchor when navigating, but it measures the
  // target before late layout (images/fonts settling above) has pushed the
  // form further down — the visitor lands mid-page. Re-align while the page
  // settles: follow body resizes for a short window, and stand down the
  // moment the visitor scrolls on their own.
  const anchorRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = anchorRef.current
    if (window.location.hash !== '#tilbud' || !el) return

    const align = () => el.scrollIntoView()
    const observer = new ResizeObserver(align)
    const stop = () => {
      observer.disconnect()
      clearTimeout(timer)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
    }
    align()
    observer.observe(document.body)
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    const timer = setTimeout(stop, 2000)
    return stop
  }, [])

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        const loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        const result = await submitFormSubmission(formID, dataToSend)

        clearTimeout(loadingTimerID)
        setIsLoading(false)

        if (!result.ok) {
          setError({ message: result.message })
          return
        }

        setHasSubmitted(true)

        if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    // `#tilbud` is the site-wide anchor for the standing quote form — every
    // "Få et tilbud" CTA points here so visitors land at the form, not the
    // top of whichever page hosts it.
    <div id="tilbud" ref={anchorRef} className="container scroll-mt-24 lg:max-w-[44rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="rounded-[calc(var(--radius)*1.5)] border border-border bg-card p-6 md:p-10">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p className="text-muted-foreground">Sender…</p>}
          {error && <div className="mb-4 text-sm font-medium text-error">{error.message}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              {/* flex-wrap + flex-basis from each field's Width, so 50%-fields
                  sit two on a row and full-width fields take the whole line. */}
              <div className="mb-8 flex flex-wrap gap-x-4 gap-y-6">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <Field
                          key={index}
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} size="lg" type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
