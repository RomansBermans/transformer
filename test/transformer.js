/* eslint-disable no-unused-expressions, no-sparse-arrays, no-template-curly-in-string */

const { expect } = require('./config');

const transformer = require('../transformer');


/* ************************************************************ */


describe('transformer', () => {
  it('c2a', () => {
    let $in = [];
    let $out = [];
    expect(transformer.c2a($in, null)).to.deep.equal($out);

    $in = {};
    $out = [];
    expect(transformer.c2a($in, null)).to.deep.equal($out);

    $in = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    $out = [
      { null: '0', x: 1, y: 1 },
      { null: '1', x: 2, y: 2 },
    ];
    expect(transformer.c2a($in, null)).to.deep.equal($out);

    $in = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    $out = [
      { id: '0', x: 1, y: 1 },
      { id: '1', x: 2, y: 2 },
    ];
    expect(transformer.c2a($in, 'id')).to.deep.equal($out);

    $in = [,
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    $out = [
      { id: '1', x: 1, y: 1 },
      { id: '2', x: 2, y: 2 },
    ];
    expect(transformer.c2a($in, 'id')).to.deep.equal($out);

    $in = {
      1: { x: 1, y: 1 },
      2: { x: 2, y: 2 },
    };
    $out = [
      { id: '1', x: 1, y: 1 },
      { id: '2', x: 2, y: 2 },
    ];
    expect(transformer.c2a($in, 'id')).to.deep.equal($out);
  });


  it('a2a', () => {
    let $in = [];
    let $out = [];
    expect(transformer.a2a($in, null)).to.deep.equal($out);

    $in = [
      { id: '1', x: 1, y: 1 },
      { id: '2', x: 2, y: 2 },
    ];
    $out = [
      { undefined: { id: '1', x: 1, y: 1 } },
      { undefined: { id: '2', x: 2, y: 2 } },
    ];
    expect(transformer.a2a($in, null)).to.deep.equal($out);

    $in = [
      { id: '1', x: 1, y: 1 },
      { id: '2', x: 2, y: 2 },
    ];
    $out = [
      { 1: { x: 1, y: 1 } },
      { 2: { x: 2, y: 2 } },
    ];
    expect(transformer.a2a($in, 'id')).to.deep.equal($out);
  });


  it('a2o', () => {
    let $in = [];
    let $out = {};
    expect(transformer.a2o($in, null)).to.deep.equal($out);

    $in = [
      { id: '1', x: 1, y: 1 },
      { id: '2', x: 2, y: 2 },
    ];
    $out = {
      undefined: { id: '2', x: 2, y: 2 },
    };
    expect(transformer.a2o($in, null)).to.deep.equal($out);

    $in = [
      { id: '1', x: 1, y: 1 },
      { id: '2', x: 2, y: 2 },
    ];
    $out = {
      1: { x: 1, y: 1 },
      2: { x: 2, y: 2 },
    };
    expect(transformer.a2o($in, 'id')).to.deep.equal($out);
  });


  it('intersect', () => {
    expect(transformer.intersect()).to.deep.equal([]);
    expect(transformer.intersect(undefined)).to.deep.equal(undefined);
    expect(transformer.intersect(null)).to.deep.equal(null);

    let $in = [[]];
    let $out = [];
    expect(transformer.intersect($in[0])).to.deep.equal($out);

    $in = [[], []];
    $out = [];
    expect(transformer.intersect($in[0], $in[1])).to.deep.equal($out);

    $in = [[1], [2]];
    $out = [];
    expect(transformer.intersect($in[0], $in[1])).to.deep.equal($out);

    $in = [[1], [1]];
    $out = [1];
    expect(transformer.intersect($in[0], $in[1])).to.deep.equal($out);

    $in = [[1, 2, 3], [2, 4]];
    $out = [2];
    expect(transformer.intersect($in[0], $in[1])).to.deep.equal($out);

    $in = [[2, 4, 6, 8, 10], [1, 2, 3, 4, 5, 6], [2, 4, 8, 16, 32]];
    $out = [2, 4];
    expect(transformer.intersect($in[0], $in[1], $in[2])).to.deep.equal($out);

    $in = [[true, '1', '2'], [false, true, '2'], ['2', true]];
    $out = [true, '2'];
    expect(transformer.intersect($in[0], $in[1], $in[2])).to.deep.equal($out);

    $in = [[true, '1', '2'], [false, true, '2'], ['2', true]];
    $out = ['2', true];
    expect(transformer.intersect($in[0], $in[1], $in[2]).sort()).to.deep.equal($out);
  });


  it('flatten', () => {
    let $in = { x: 1, y: null, z: undefined };
    let $out = { x: 1, y: null, z: undefined };
    expect(transformer.flatten($in)).to.deep.equal($out);

    $in = { a: 1, b: { c: 2, d: 2, e: { f: 3, g: 3, h: 3, j: { k: { l: false } } } } };
    $out = { a: 1, 'b.c': 2, 'b.d': 2, 'b.e.f': 3, 'b.e.g': 3, 'b.e.h': 3, 'b.e.j.k.l': false };
    expect(transformer.flatten($in)).to.deep.equal($out);

    $in = ['a', { b: 1 }, { c: 2, d: 2 }];
    $out = { 0: 'a', '1.b': 1, '2.c': 2, '2.d': 2 };
    expect(transformer.flatten($in)).to.deep.equal($out);

    $in = { a: [1, { b: 1 }, { c: 2, d: [2, 2] }] };
    $out = { 'a.0': 1, 'a.1.b': 1, 'a.2.c': 2, 'a.2.d.0': 2, 'a.2.d.1': 2 };
    expect(transformer.flatten($in)).to.deep.equal($out);

    $in = { a: { b: 1, c: 1 } };
    $out = { 'a/b': 1, 'a/c': 1 };
    expect(transformer.flatten($in, '/')).to.deep.equal($out);

    $in = { a: { b: 1, c: 1 } };
    $out = { ab: 1, ac: 1 };
    expect(transformer.flatten($in, '')).to.deep.equal($out);

    $in = { a: { b: 1, c: 1, dd: 1 } };
    $out = { ab: 1, ac: 1, add: 1 };
    expect(transformer.flatten($in, '')).to.deep.equal($out);
  });


  it('unflatten', () => {
    let $in = { x: undefined, y: null, z: false };
    let $out = { x: undefined, y: null, z: false };
    expect(transformer.unflatten($in)).to.deep.equal($out);

    $in = { a: 1, 'b.c': 2, 'b.d': 2, 'b.e.f': 3, 'b.e.g': 3, 'b.e.h': 3, 'b.e.j.k.l': false };
    $out = { a: 1, b: { c: 2, d: 2, e: { f: 3, g: 3, h: 3, j: { k: { l: false } } } } };
    expect(transformer.unflatten($in)).to.deep.equal($out);

    $in = { 0: 'a', '1.b': 1, '2.c': 2, '2.d': 2 };
    $out = { 0: 'a', 1: { b: 1 }, 2: { c: 2, d: 2 } };
    expect(transformer.unflatten($in)).to.deep.equal($out);

    $in = { 'a.0': 1, 'a.1.b': 1, 'a.2.c': 2, 'a.2.d.0': 2, 'a.2.d.1': 2 };
    $out = { a: { 0: 1, 1: { b: 1 }, 2: { c: 2, d: { 0: 2, 1: 2 } } } };
    expect(transformer.unflatten($in)).to.deep.equal($out);

    $in = { 'a/b': 1, 'a/c': 1 };
    $out = { a: { b: 1, c: 1 } };
    expect(transformer.unflatten($in, '/')).to.deep.equal($out);

    $in = { ab: 1, ac: 1 };
    $out = { a: { b: 1, c: 1 } };
    expect(transformer.unflatten($in, '')).to.deep.equal($out);

    $in = { ab: 1, ac: 1, add: 1 };
    $out = { a: { b: 1, c: 1, d: { d: 1 } } };
    expect(transformer.unflatten($in, '')).to.deep.equal($out);
  });


  it('template', () => {
    let $in = ['${point.x} < ${point.y}', { point: { x: 1, y: 2 } }];
    let $out = '1 < 2';
    expect(transformer.template($in[0], $in[1])).to.deep.equal($out);

    $in = ['${point.x} < ${point.y} < ${point.z}', { point: { x: 1, y: 2 } }];
    $out = '1 < 2 < ${point.z}';
    expect(transformer.template($in[0], $in[1])).to.deep.equal($out);
  });


  it('assign', () => {
    let $in = [{ a: 1 }, { b: 1 }, { c: 1 }];
    let $out = { a: 1, b: 1, c: 1 };
    expect($in[0]).to.not.deep.equal($out);
    expect(transformer.assign($in[0], $in[1], $in[2])).to.deep.equal($out);

    $in = [{ a: 1, b: { c: 2, d: 2, e: { f: 3, g: 3 } } }, { b: { d: -2, e: { f: -3 } } }, { b: { d: -2, e: { h: -3 } } }];
    $out = { a: 1, b: { c: 2, d: -2, e: { f: -3, g: 3, h: -3 } } };
    expect($in[0]).to.not.deep.equal($out);
    expect(transformer.assign($in[0], $in[1], $in[2])).to.deep.equal($out);

    $in = [[1, 2, 3, 0], ['1'], [3, 2, 1]];
    $out = [3, 2, 1, 0];
    expect($in[0]).to.not.deep.equal($out);
    expect(transformer.assign($in[0], $in[1], $in[2])).to.deep.equal($out);

    $in = [[1, 2, 3], ['1'], [3, 2, 1, 0]];
    $out = [3, 2, 1, 0];
    expect($in[0]).to.not.deep.equal($out);
    expect(transformer.assign($in[0], $in[1], $in[2])).to.deep.equal($out);

    $in = [[1, 2, 3], ['1'], [undefined, null, false]];
    $out = [undefined, null, false];
    expect($in[0]).to.not.deep.equal($out);
    expect(transformer.assign($in[0], $in[1], $in[2])).to.deep.equal($out);

    $in = [[1, { a: 1 }, 3], ['1'], [1, 2]];
    $out = [1, 2, 3];
    expect($in[0]).to.not.deep.equal($out);
    expect(transformer.assign($in[0], $in[1], $in[2])).to.deep.equal($out);

    $in = [[1, { a: 1, b: { c: 2 } }, 3], ['1'], [1, { b: { c: -2 } }]];
    $out = [1, { a: 1, b: { c: -2 } }, 3];
    expect($in[0]).to.not.deep.equal($out);
    expect(transformer.assign($in[0], $in[1], $in[2])).to.deep.equal($out);
  });
});
