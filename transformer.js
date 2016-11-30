/* */

const $ = {
  c2a: (o, id) => Object.keys(o).map(k => Object.assign(o[k], { [id]: k })),

  a2a: (a, id) => a.map(e => ({ [e[id]]: (() => { delete e[id]; return e; })() })),

  a2o: (a, id) => a.map(e => ({ [e[id]]: (() => { delete e[id]; return e; })() }))
                   .reduce((p, c) => {
                     const k = Object.keys(c)[0];
                     p[k] = c[k];
                     return p;
                   }, {}),

  intersect: (...a) => a.reduce((p, c, i) => (i === 0 ? c : p.filter(e => c.includes(e))), []),

  template: (s, o) => {
    let r = s;
    Object.keys(o).forEach(k => {
      const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
      r = r.replace(regex, o[k]);
    });
    return r;
  },
};


module.exports = $;
