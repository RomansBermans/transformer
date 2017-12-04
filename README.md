# transformer [![Build Status](https://travis-ci.org/RomansBermans/transformer.svg?branch=master)](https://travis-ci.org/RomansBermans/transformer)

A few JavaScript ES16 one-liners for rapid data transformation.
    
## Install
```
npm install
```

## Test
```
npm test
```

## Usage

### co2ar { 1: { … } } → [ { id: 1, … } ]
```
const input = { 1: { x: 1 }, 2: { x: 2 } };
const output = transformer.co2ar(input, 'id');
/* →          [ { id: 1, x: 1}, { id: 2, x: 2 } ] */
```

### ar2ar [ { id: 1, … } ] → [ { 1: { … } } ]
```
const input = [ { id: 1, x: 1 }, { id: 2, x: 2 } ];
const output = transformer.ar2ar(input, 'id');
/* →          [ { 1: { x: 1 } }, { 2: { x: 2 } } ] */
```

### ar2ob [ { id: 1, … } ] → { 1: { … } }
```
const input = [ { id: 1, x: 1 }, { id: 2, x: 2 } ];
const output = transformer.ar2ob(input, 'id');
/* →          { 1: { x: 1 }, 2: { x: 2 } } */
```

### intersect [ 1, 2, 3, 4 ] , [ 0, 2, 4, 6 ] → [ 2, 4 ]
```
const input1 = [ 1, 2, 3, 4 ];
const input2 = [ 0, 2, 4, 6 ];
const output = transformer.intersect(input1, input2);
/* →           [ 2, 4 ] */
```

### flatten { x: { y: { z: 1 } } } → { xyz: 1 }
```
const input = { x: { y: { z: 1 } } };
const output = transformer.flatten(input, '');
/* →          { xyz: 1 } */
```

### unflatten { xyz: 1 } → { x: { y: { z: 1 } } }
```
const input = { xyz: 1 };
const output = transformer.unflatten(input, '');
/* →          { x: { y: { z: 1 } } } */
```

### template ‘${x} < ${y}’ , { x: 1, y: 2 } → ‘1 < 2’
```
const input1 = '${x} < ${y}';
const input2 = { x: 1, y: 2 };
const output = transformer.template(input1, input2);
/* →           1 < 2 */
```
