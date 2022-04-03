import 'usnam-pmb';
import assert from 'assert';

// ¦mjsUsageDemo¦+
import objPop from '../op.js';
// ¦mjsUsageDemo¦- importPkgName

function repeat(n, x) { return Array.from({ length: n + 1 }).join(x); }

// ¦mjsUsageDemo¦+
function makeSandwich(receipe) {
  const pop = objPop(receipe);
  const sandwich = ('🍞'
    + repeat(pop('lettuce', 0), '🍀') // unicode is weak on salad.
    + repeat(pop('tomato', 0), '🍅')
    + repeat(pop('ham', 0), '🍗')  // close enough.
    + repeat(pop('pineapple', 0), '🍍')
    + repeat(pop('cheese', 0), '🧀')
    + repeat(pop('cherry', 0), '🍒')
  );
  pop.expectEmpty('unknown ingredients');
  return sandwich;
}

const hawaii = { ham: 1, pineapple: 1, cheese: 1, cherry: 1 };
assert.strictEqual(makeSandwich(hawaii), '🍞🍗🍍🧀🍒');

// Original object wasn't modified, so it works again:
assert.strictEqual(makeSandwich(hawaii), '🍞🍗🍍🧀🍒');

// Except when you use direct mode (.d):
const directPop = objPop.d(hawaii);
assert.strictEqual(directPop('cherry'), 1);
assert.strictEqual(directPop('cherry'), undefined);

const blt = { bacon: 2, lettuce: 3, tomato: 3 };
assert.throws(() => makeSandwich(blt),
  'LeftoverKeys: unknown ingredients: bacon');
// Unicode would be way better with bacon.
// ¦mjsUsageDemo¦-








console.log('+OK usage test passed.');
