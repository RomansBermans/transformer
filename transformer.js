/* */


const $ = {
  co2ar: (c, id) => Object.keys(c).map(k => { c[k][id] = k; return c[k]; }),

  ar2ar: (a, id) => a.map(e => ({ [e[id]]: (() => { delete e[id]; return e; })() })),

  ar2ob: (a, id) => a.map(e => ({ [e[id]]: (() => { delete e[id]; return e; })() }))
    .reduce((p, c) => {
      const k = Object.keys(c)[0];
      p[k] = c[k];
      return p;
    }, {}),

  intersect: (...a) => a.reduce((p, c, i) => (i === 0 ? c : p.filter(e => c.includes(e))), []),

  flatten: (c, d = '.') => {
    const r = {};
    (function f(o, p) {
      o && Object.keys(o).forEach(k => (o[k] && /Array|Object/.test(o[k].constructor.name) ? f(o[k], p ? `${p}${d}${k}` : k) : r[p ? `${p}${d}${k}` : k] = o[k]));
    }(c));
    return r;
  },

  unflatten: (o, d = '.') => {
    const r = {};
    o && Object.keys(o).forEach(k => k.split(d).reduce((p, c, i, a) => (i === a.length - 1 ? p[c] = o[k] : p[c] = p[c] ? p[c] : {}), r));
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
    let r = c;
    cs.forEach(cc => {
      (function a(o, oo, op, opk) {
        Object.keys(o).forEach(k => {
          if (o[k] && typeof o[k] === 'object') {
            return a(o[k], oo ? oo[k] : oo, o, k);
          }

          if (typeof oo === 'object' && k in oo) {
            o[k] = oo[k];
          } else if (oo !== undefined && typeof oo !== 'object') {
            op[opk] = oo;
          } else if (oo !== undefined) {
            Object.keys(oo).forEach(kk => {
              if (!(kk in o)) {
                o[kk] = oo[kk];
              }
            });
          }

          return o[k];
        });
      }(r, cc));

      if (Array.isArray(r) && Array.isArray(cc) && r.length < cc.length) {
        r = r.concat(cc.slice(r.length));
      } else if (typeof r === 'object' && !Object.keys(r).length) {
        r = cc;
      }
    });
    return r;
  },
};


module.exports = $;
