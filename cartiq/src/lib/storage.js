const STORAGE_VERSION = 'cartiq:v2'

const getKey = (key) => `${STORAGE_VERSION}:${key}`

const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(getKey(key))
      if (item === null) return defaultValue
      return JSON.parse(item)
    } catch {
      return defaultValue
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(getKey(key), JSON.stringify(value))
    } catch {
      // ignore storage errors
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key.startsWith('cartiq:') ? key : getKey(key))
    } catch {
      // ignore storage errors
    }
  },
  migrateOldKeys: () => {
    try {
      const keysToRemove = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('cartiq:') && !key.startsWith(STORAGE_VERSION)) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k))
    } catch {
      // ignore
    }
  },
}

storage.migrateOldKeys()

export default storage
