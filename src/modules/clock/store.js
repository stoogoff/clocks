
import { CollectionStore } from 'exp'
import { local } from 'exp/utils/storage'

const STORAGE_KEY = 'clocks'

export const clockStore = new CollectionStore(local.get(STORAGE_KEY) ?? [])

