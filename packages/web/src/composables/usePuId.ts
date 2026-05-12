import { computed, getCurrentInstance, toValue, type ComputedRef } from 'vue'
import type { PuMaybeRefOrGetter } from './types'

let globalIdSeed = 0

function normalizeIdPrefix(prefix: string | undefined): string {
  const value = prefix?.trim()
  return value && value.length > 0 ? value : 'pu'
}

export function usePuId(
  prefix?: string,
  explicitId?: PuMaybeRefOrGetter<string | undefined>
): ComputedRef<string> {
  const instance = getCurrentInstance()
  const uid = instance?.uid ?? 'global'
  const generatedId = `${normalizeIdPrefix(prefix)}-${uid}-${++globalIdSeed}`

  return computed(() => {
    const resolvedId = explicitId === undefined ? undefined : toValue(explicitId)
    return resolvedId && resolvedId.length > 0 ? resolvedId : generatedId
  })
}

