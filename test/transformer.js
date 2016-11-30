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
      A1: { x: 1, y: 1 },
      A2: { x: 2, y: 2 },
    };
    $out = [
      { id: 'A1', x: 1, y: 1 },
      { id: 'A2', x: 2, y: 2 },
    ];
    expect(transformer.c2a($in, 'id')).to.deep.equal($out);
  });


  it('a2a', () => {
    let $in = [
      { id: 'A1', x: 1, y: 1 },
      { id: 'A2', x: 2, y: 2 },
    ];
    let $out = [
      { undefined: { id: 'A1', x: 1, y: 1 } },
      { undefined: { id: 'A2', x: 2, y: 2 } },
    ];
    expect(transformer.a2a($in, null)).to.deep.equal($out);

    $in = [
      { id: 'A1', x: 1, y: 1 },
      { id: 'A2', x: 2, y: 2 },
    ];
    $out = [
      { A1: { x: 1, y: 1 } },
      { A2: { x: 2, y: 2 } },
    ];
    expect(transformer.a2a($in, 'id')).to.deep.equal($out);
  });


  it('a2o', () => {
    let $in = [
      { id: 'A1', x: 1, y: 1 },
      { id: 'A2', x: 2, y: 2 },
    ];
    let $out = {
      undefined: { id: 'A2', x: 2, y: 2 },
    };
    expect(transformer.a2o($in, null)).to.deep.equal($out);

    $in = [
      { id: 'A1', x: 1, y: 1 },
      { id: 'A2', x: 2, y: 2 },
    ];
    $out = {
      A1: { x: 1, y: 1 },
      A2: { x: 2, y: 2 },
    };
    expect(transformer.a2o($in, 'id')).to.deep.equal($out);
  });


  it('intersect', () => {
    let $out = [];
    expect(transformer.intersect()).to.deep.equal($out);

    $out = [];
    expect(transformer.intersect([])).to.deep.equal($out);

    $out = [];
    expect(transformer.intersect([], [])).to.deep.equal($out);

    $out = [];
    expect(transformer.intersect([1], [2])).to.deep.equal($out);

    $out = [1];
    expect(transformer.intersect([1], [1])).to.deep.equal($out);

    $out = [2];
    expect(transformer.intersect([1, 2, 3], [2, 4])).to.deep.equal($out);

    $out = [2, 4];
    expect(transformer.intersect([2, 4, 6, 8, 10], [1, 2, 3, 4, 5, 6], [2, 4, 8, 16, 32])).to.deep.equal($out);

    $out = [true, '2'];
    expect(transformer.intersect([true, '1', '2'], [false, true, '2'], ['2', true])).to.deep.equal($out);

    $out = ['2', true];
    expect(transformer.intersect([true, '1', '2'], [false, true, '2'], ['2', true]).sort()).to.deep.equal($out);
  });


  it('template', () => {
    let $out = '1 < 2';
    expect(transformer.template('${x} < ${y}', { x: 1, y: 2 })).to.deep.equal($out);

    $out = '1 < 2 < ${z}';
    expect(transformer.template('${x} < ${y} < ${z}', { x: 1, y: 2 })).to.deep.equal($out);
  });
});
