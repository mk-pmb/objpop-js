import 'usnam-pmb';
import assert from 'assert';

// ¦mjsUsageDemo¦+
import objPop from '../';
// ¦mjsUsageDemo¦- importPkgName

function repeat(n, x) { return Array.from({ length: n + 1 }).join(x); }

// ¦mjsUsageDemo¦+
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
// ¦mjsUsageDemo¦-








console.log('+OK usage test passed.');
