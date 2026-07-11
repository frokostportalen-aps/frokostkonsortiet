import { getClientSideURL } from '@/utilities/getURL'

export type SubmissionValue = { field: string; value: unknown }

export type SubmissionResult = { ok: true } | { ok: false; message: string }

/**
 * POST a submission to Payload's form-builder endpoint. Shared by the Form
 * block and the PlanPicker wizard so the endpoint shape, error contract and
 * user-facing fallback strings live in one place.
 */
export const submitFormSubmission = async (
  formID: string | number | undefined,
  submissionData: SubmissionValue[],
): Promise<SubmissionResult> => {
  try {
    const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
      body: JSON.stringify({ form: formID, submissionData }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    if (req.status >= 400) {
      const res = await req.json()
      return {
        ok: false,
        message: res.errors?.[0]?.message || 'Noget gik galt på serveren. Prøv venligst igen.',
      }
    }

    return { ok: true }
  } catch (err) {
    console.warn(err)
    return { ok: false, message: 'Noget gik galt. Prøv venligst igen.' }
  }
}
