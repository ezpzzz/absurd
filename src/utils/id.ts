import { v4 as uuidv4 } from 'uuid'

declare global {
  interface Window {
    __TEST_ID__?: string
  }
}

export const generateId = (): string => {
  if (typeof window !== 'undefined' && window.__TEST_ID__) {
    return window.__TEST_ID__
  }
  return uuidv4()
}