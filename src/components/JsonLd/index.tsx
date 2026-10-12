import React from 'react'

/**
 * Renders structured data as a JSON-LD script. `<` is escaped so a CMS value
 * containing "</script>" can't close the tag early and inject markup.
 */
export const JsonLd: React.FC<{ data: object }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
)
