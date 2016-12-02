/* */

const $ = {
  c2a: (c, id) => Object.keys(c).map(k => Object.assign(c[k], { [id]: k })),

  a2a: (a, id) => a.map(e => ({ [e[id]]: (() => { delete e[id]; return e; })() })),

  a2o: (a, id) => a.map(e => ({ [e[id]]: (() => { delete e[id]; return e; })() }))
                   .reduce((p, c) => {
                     const k = Object.keys(c)[0];
                     p[k] = c[k];
                     return p;
                   }, {}),

  intersect: (...a) => a.reduce((p, c, i) => (i === 0 ? c : p.filter(e => c.includes(e))), []),

  flatten: (c, d = '.') => {
    const r = {};
    (function f(o, p) {
      Object.keys(o).forEach(k => (o[k] && typeof o[k] === 'object' ? f(o[k], p ? `${p}${d}${k}` : k) : (r[p ? `${p}${d}${k}` : k] = o[k])));
    }(c));
    return r;
  },

  unflatten: (o, d = '.') => {
    const r = {};
    Object.keys(o).forEach(k => k.split(d).reduce((p, c, i, a) => (i === a.length - 1 ? (p[c] = o[k]) : (p[c] = p[c] ? p[c] : {})), r));
    return r;
  },

  template: (s, c) => {
    let r = s;
    const o = $.flatten(c);
    Object.keys(o).forEach(k => {
      const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
      r = r.replace(regex, o[k]);
    });
    return r;
  },

  assign: (c, ...cs) => {
    cs.forEach(cc =>
      (function a(o, oo) {
        Object.keys(o).forEach(k => {
          if (o[k] && typeof o[k] === 'object') {
            return a(o[k], oo[k]);
          }

          // TODO: This part needs more love
          if (k in oo) {
            o[k] = oo[k];
          } else {
            Object.keys(oo).forEach(kk => {
              if (kk in o) {
                // oo[kk]
              } else {
                o[kk] = oo[kk];
              }
            });
          }

          return o[k];
        });
      }(c, cc))
    );
    return c;
  },
};


module.exports = $;
