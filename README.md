
<!--#echo json="package.json" key="name" underline="=" -->
objpop
======
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Pop properties from objects and verify you got all of them.
<!--/#echo -->


Usage
-----

from [test/usage.mjs](test/usage.mjs):

<!--#include file="test/usage.mjs" transform="mjsUsageDemo1802" -->
<!--#verbatim lncnt="32" -->
```javascript
import objPop from 'objpop';
function makeSandwich(receipe) {
  const pop = objPop(receipe);
  const sandwich = ('🍞'
    + repeat(pop.ifHas('lettuce', 0), '🍀') // unicode is weak on salad.
    + repeat(pop.ifHas('tomato', 0), '🍅')
    + repeat(pop.ifHas('ham', 0), '🍗')  // close enough.
    + repeat(pop.ifHas('pineapple', 0), '🍍')
    + repeat(pop.ifHas('cheese', 0), '🧀')
    + repeat(pop.ifHas('cherry', 0), '🍒')
  );
  pop.expectEmpty('unknown ingredients');
  return sandwich;
}

const hawaii = { ham: 1, pineapple: 1, cheese: 1, cherry: 1 };
assert.equal(makeSandwich(hawaii), '🍞🍗🍍🧀🍒');

// Original object wasn't modified, so it works again:
assert.equal(makeSandwich(hawaii), '🍞🍗🍍🧀🍒');

// Except when you use direct mode (.d):
const directPop = objPop.d(hawaii);
assert.equal(directPop('cherry'), 1);
assert.equal(directPop('cherry'), undefined);

const blt = { bacon: 2, lettuce: 3, tomato: 3 };
assert.throws(() => makeSandwich(blt),
  'LeftoverKeys: unknown ingredients: bacon');
// Unicode would be way better with bacon.
```
<!--/include-->



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.
* Starting in v0.2.0, you can no longer pop inherited properties even in
  direct mode. The former `.ifHas` method has become the default.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
