/* eslint-disable no-unused-expressions, no-sparse-arrays, no-template-curly-in-string */

const { expect } = require('./config');

const transformer = require('../transformer');


/* ************************************************************ */


describe('transformer', () => {
  it('c2a', () => {
    let $in = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
    ];
    let $out = [
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
    let $in = [
      { id: '1', x: 1, y: 1 },
      { id: '2', x: 2, y: 2 },
    ];
    let $out = [
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
    let $in = [
      { id: '1', x: 1, y: 1 },
      { id: '2', x: 2, y: 2 },
    ];
    let $out = {
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

    let $in = { x: [] };
    let $out = [];
    expect(transformer.intersect($in.x)).to.deep.equal($out);

    $in = { x: [], y: [] };
    $out = [];
    expect(transformer.intersect($in.x, $in.y)).to.deep.equal($out);

    $in = { x: [1], y: [2] };
    $out = [];
    expect(transformer.intersect($in.x, $in.y)).to.deep.equal($out);

    $in = { x: [1], y: [1] };
    $out = [1];
    expect(transformer.intersect($in.x, $in.y)).to.deep.equal($out);

    $in = { x: [1, 2, 3], y: [2, 4] };
    $out = [2];
    expect(transformer.intersect($in.x, $in.y)).to.deep.equal($out);

    $in = { x: [2, 4, 6, 8, 10], y: [1, 2, 3, 4, 5, 6], z: [2, 4, 8, 16, 32] };
    $out = [2, 4];
    expect(transformer.intersect($in.x, $in.y, $in.z)).to.deep.equal($out);

    $in = { x: [true, '1', '2'], y: [false, true, '2'], z: ['2', true] };
    $out = [true, '2'];
    expect(transformer.intersect($in.x, $in.y, $in.z)).to.deep.equal($out);

    $in = { x: [true, '1', '2'], y: [false, true, '2'], z: ['2', true] };
    $out = ['2', true];
    expect(transformer.intersect($in.x, $in.y, $in.z).sort()).to.deep.equal($out);
  });


  it('flatten', () => {
    let $in = { a: 1, b: { c: 2, d: 2, e: { f: 3, g: 3, h: 3, j: { k: { l: true } } } } };
    let $out = { a: 1, 'b.c': 2, 'b.d': 2, 'b.e.f': 3, 'b.e.g': 3, 'b.e.h': 3, 'b.e.j.k.l': true };
    expect(transformer.flatten($in)).to.deep.equal($out);

    $in = ['a', { b: 1 }, { c: 2, d: 2 }];
    $out = { 0: 'a', '1.b': 1, '2.c': 2, '2.d': 2 };
    expect(transformer.flatten($in)).to.deep.equal($out);

    $in = { a: { b: 1, c: 1 } };
    $out = { 'a/b': 1, 'a/c': 1 };
    expect(transformer.flatten($in, '/')).to.deep.equal($out);

    $in = { x: 1, y: null, z: undefined };
    $out = { x: 1, y: null, z: undefined };
    expect(transformer.flatten($in)).to.deep.equal($out);
  });


  it('template', () => {
    let $in = { s: '${point.x} < ${point.y}', o: { point: { x: 1, y: 2 } } };
    let $out = '1 < 2';
    expect(transformer.template($in.s, $in.o)).to.deep.equal($out);

    $in = { s: '${point.x} < ${point.y} < ${point.z}', o: { point: { x: 1, y: 2 } } };
    $out = '1 < 2 < ${point.z}';
    expect(transformer.template($in.s, $in.o)).to.deep.equal($out);
  });
});
