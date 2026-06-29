'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  // Dropdown items carry their own `label`; plain links keep it on the link.
  const text = data?.data?.label || data?.data?.link?.label
  const label = text
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${text}`
    : 'Row'

  return <div>{label}</div>
}
