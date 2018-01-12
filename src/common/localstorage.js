let storage = window.localStorage
function isJSON(obj) {
  return typeof obj === 'object' && Object
    .prototype
    .toString
    .call(obj)
    .toLowerCase() === '[object object]' && !obj.length
}
function deserialize(value) {
  if (typeof value !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(value)
  } catch (e) {
    return value || undefined
  }
}
function set(key, val) {
  if (key && !isJSON(key)) {
    storage.setItem(key, JSON.stringify(val))
  } else if (key && isJSON(key) && !val) {
    for (var a in key) {
      this.set(a, key[a])
    }
  }
}

function has(key) {
  return {}.hasOwnProperty.call(get(), key)
}

function get(key) {
  if (!key) {
    return ''
  }
  return deserialize(storage.getItem(key))
}

function clear() {
  storage.clear()
}

function remove(key) {
  storage.removeItem(key)
}

export default {
  set,
  has,
  get,
  clear,
  remove
}