// SPDX-License-Identifier: EPL-2.0

import type { PersonId } from '@hcengineering/core'

export interface SocialIdentityReference {
  _id: PersonId
}

export function getUnresolvedPersonIds (
  personIds: Iterable<PersonId | null | undefined>,
  socialIdentities: Iterable<SocialIdentityReference | null | undefined>,
  search: string = ''
): PersonId[] {
  const socialIdentityIds = new Set<PersonId>()
  for (const socialIdentity of socialIdentities) {
    if (socialIdentity != null) {
      socialIdentityIds.add(socialIdentity._id)
    }
  }

  const unresolvedPersonIds = new Set<PersonId>()
  const normalizedSearch = search.trim().toLocaleLowerCase()
  for (const personId of personIds) {
    if (
      personId != null &&
      !socialIdentityIds.has(personId) &&
      (normalizedSearch === '' || personId.toLocaleLowerCase().includes(normalizedSearch))
    ) {
      unresolvedPersonIds.add(personId)
    }
  }

  return Array.from(unresolvedPersonIds)
}
