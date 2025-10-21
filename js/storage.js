const safe = (fn, fallback = null) => {
  try { return fn(); } catch { return fallback; }
};

export const storage = {
  get(key, defaultValue = null) {
    return safe(() => {
      const raw = localStorage.getItem(key);
      return raw == null ? defaultValue : JSON.parse(raw);
    }, defaultValue);
  },

  set(key, value) {
    return safe(() => localStorage.setItem(key, JSON.stringify(value)), false);
  },

  remove(key) {
    return safe(() => localStorage.removeItem(key), false);
  },

  has(key) {
    return this.get(key) !== null;
  },

  clear() {
    return safe(() => localStorage.clear(), false);
  },
};
