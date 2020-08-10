import 'usnam-pmb';
import assert from 'assert';

import objPop from '..';

const eq = assert.strictEqual;

function checkNonDict(nonDict) {
  const popFromCopy = objPop(nonDict);
  eq(popFromCopy('toString'), undefined);

  const popDirectly = objPop.d(nonDict);
  eq(popDirectly('toString'), undefined);
}

checkNonDict(null);
checkNonDict(undefined);
checkNonDict(false);
checkNonDict(true);
checkNonDict(0);









console.log('+OK inheritedProps test passed.');
