
/* */

/* ********* * *** * ********* */

export const __flatten = (c, d = '.') => {
  if (c && /Array|Object/.test(c.constructor.name)) {
    const r = {};
    (function f (oc, or, p) {
      Object.keys(oc).forEach(k =>
        (oc[k] && /Array|Object/.test(oc[k].constructor.name)
          ? f(oc[k], or, p ? `${p}${d}${k}` : k)
          : (or[p ? `${p}${d}${k}` : k] = oc[k])
        ))
    })(c, r)
    return r
  }
  return c
}

export const __unflatten = (o, d = '.') => {
  if (o && /Object/.test(o.constructor.name)) {
    const r = {}
    Object.keys(o).forEach(k =>
      k.split(d).reduce((p, c, i, a) =>
        (i === a.length - 1
          ? (p[c] = o[k])
          : (p[c] = p[c] || (i === a.length - 2 && !isNaN(a[a.length - 1]) ? [] : {}))
        ),
      r))
    return r
  }
  return o
}

export const __replace = (c, s, v) => {
  if (c && /Array|Object/.test(c.constructor.name)) {
    const r = {};
    (function f (oc, or) {
      Object.keys(oc).forEach(k =>
        (oc[k] && /Array|Object/.test(oc[k].constructor.name)
          ? f(oc[k], (or[k] = /Array/.test(oc[k].constructor.name) ? [] : {}))
          : (or[k] = oc[k] === s ? v : oc[k])
        ))
    })(c, r)
    return r
  }
  return c
}

export const __extract = (c, s) => {
  if (c && /Array|Object/.test(c.constructor.name)) {
    const r = {};
    (function f (oc, or, p) {
      Object.keys(oc).forEach(k =>
        (oc[k] && /Array|Object/.test(oc[k].constructor.name)
          ? f(oc[k], or, p ? `${p}.${k}` : k)
          : (k === s ? or[p ? `${p}.${k}` : k] = oc[k] : 0)
        ))
    })(c, r)
    return r
  }
  return c
}

/* ********* * *** * ********* */

export const __hash = (str, seed = 0, hex) => {
  let h1 = 0xdeadbeef ^ seed
  let h2 = 0x41c6ce57 ^ seed
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909)
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909)
  return hex ? (h2 >>> 0).toString(16).padStart(8, 0) + (h1 >>> 0).toString(16).padStart(8, 0) : 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

/* ********* * *** * ********* */

export const __fetch = async ({ url, init, token, data }, success = __noop, failure = __noop) => {
  const __init = {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    cache: 'no-cache',
    credentials: 'include',
    mode: 'cors',
    ...init
  }
  token && (__init.headers.Authorization = `Bearer ${token}`)
  data && (__init.body = JSON.stringify(data))
  try {
    const data = await (await fetch(url, __init)).json()
    success(data); return data
  } catch (err) {
    failure(err); return err
  }
}

/* ********* * *** * ********* */

export const __echo = __ => __

export const __noop = () => {}

export const __run = f => (f && f.constructor.name === 'Function' ? f : __noop)()

export const __wait = (time, f) => new Promise(resolve => setTimeout(() => resolve(f?.()), time))

export const __length = o => Object.keys(o || {}).length

export const __range = (ceil, floor) => [...Array(ceil + 1).keys()].slice(floor).reverse()

export const __includes = (o, a) => { const r = Object.keys(o || {}); return a.every(e => r.includes(e)) }

/* ********* * *** * ********* */

export default { __flatten, __unflatten, __replace, __extract, __hash, __fetch, __echo, __noop, __run, __wait, __length, __range, __includes }
