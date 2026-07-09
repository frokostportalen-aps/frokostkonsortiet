import { Post } from '@/payload-types'

/**
 * Formats an array of populatedAuthors from Posts into a prettified string.
 * @param authors - The populatedAuthors array from a Post.
 * @returns A prettified string of authors.
 * @example
 *
 * [Author1, Author2] becomes 'Author1 and Author2'
 * [Author1, Author2, Author3] bliver til 'Author1, Author2 og Author3'
 *
 */
export const formatAuthors = (
  authors: NonNullable<NonNullable<Post['populatedAuthors']>[number]>[],
) => {
  // Ensure we don't have any authors without a name
  const authorNames = authors.map((author) => author.name).filter(Boolean)

  if (authorNames.length === 0) return ''
  if (authorNames.length === 1) return authorNames[0]
  if (authorNames.length === 2) return `${authorNames[0]} og ${authorNames[1]}`

  return `${authorNames.slice(0, -1).join(', ')} og ${authorNames[authorNames.length - 1]}`
}
