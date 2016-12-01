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

  assign: true, // TODO:

  flatten: (c, d = '.') => {
    const r = {};
    (function f(o, p) {
      Object.keys(o).forEach(k => (o[k] && typeof o[k] === 'object' ? f(o[k], p ? `${p}${d}${k}` : k) : (r[p ? `${p}${d}${k}` : k] = o[k])));
    }(c));
    return r;
  },

  unflatten: true, // TODO:

  template: (s, c) => {
    let r = s;
    const o = $.flatten(c);
    Object.keys(o).forEach(k => {
      const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
      r = r.replace(regex, o[k]);
    });
    return r;
  },
};


module.exports = $;
