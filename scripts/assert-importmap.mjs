// Build guard: fail fast if the admin import map is missing the Cloudflare R2
// (s3Storage) upload-handler component.
//
// Why: s3Storage only activates when R2_BUCKET is set, and it injects an admin
// component (S3ClientUploadHandler) that must be present in the import map. If
// the map is regenerated WITHOUT R2 (e.g. the local dev container, which has no
// R2_BUCKET), that entry gets stripped — and production (R2 on) then renders a
// blank admin. This guard runs in `prebuild`, so a stripped import map fails the
// build loudly instead of silently shipping a broken admin.
//
// Fix when it fails: regenerate with R2 active and commit:
//   pnpm generate:importmap   (the script forces R2_BUCKET so the entry is kept)

import { readFileSync } from 'fs'

const FILE = 'src/app/(payload)/admin/importMap.js'
const REQUIRED = 'S3ClientUploadHandler'

let contents = ''
try {
  contents = readFileSync(FILE, 'utf8')
} catch {
  console.error(`✗ Kunne ikke læse ${FILE}`)
  process.exit(1)
}

if (!contents.includes(REQUIRED)) {
  console.error(
    `\n✗ ${FILE} mangler "${REQUIRED}".\n` +
      `  s3Storage (R2) er aktiv i prod og kræver denne admin-komponent i import map'et,\n` +
      `  ellers bliver prod-admin blank. Den er sandsynligvis blevet strippet af en\n` +
      `  regenerering uden R2.\n\n` +
      `  Fix:  pnpm generate:importmap   (og commit ændringen)\n`,
  )
  process.exit(1)
}

console.log(`✓ import map indeholder ${REQUIRED}`)
