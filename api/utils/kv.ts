import { put, get, del } from '@vercel/blob'
import { prepareEthAddress } from './eth.js'

const namespace = process.env.KV_NAMESPACE || 'default'

function createBlobKey(prefix: string, key: string) {
  return `${prefix}_${namespace}_${key}.json`
}

export async function kvPutMainToDelegated(key: string, value: string): Promise<void> {
  await put(createBlobKey('mtd', key), JSON.stringify({ value }), { access: 'private' })
}

export async function kvGetMainToDelegated(key: string): Promise<string | null> {
  try {
    const response = await get(createBlobKey('mtd', key))
    const json = await response.json()
    return json?.value || null
  } catch {
    return null
  }
}

export async function kvDeleteMainToDelegated(key: string): Promise<void> {
  await del(createBlobKey('mtd', key))
}

// Repeat for dpk
export async function kvPutDelegatedToPk(key: string, value: string): Promise<void> {
  await put(createBlobKey('dpk', key), JSON.stringify({ value }), { access: 'private' })
}

export async function kvGetDelegatedToPk(key: string): Promise<string | null> {
  try {
    const response = await get(createBlobKey('dpk', key))
    const json = await response.json()
    return json?.value || null
  } catch {
    return null
  }
}

export async function kvDeleteDelegatedToPk(key: string): Promise<void> {
  await del(createBlobKey('dpk', key))
}
