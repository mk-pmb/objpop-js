/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, df,
  obAss = Object.assign, objHop = Object.prototype.hasOwnProperty;
function ocn() { return Object.create(null); }

EX = function objpop(dict, opt) { return EX.d(obAss(ocn(), dict), opt); };

EX.defaults = df = {
  leftoversMsg: 'Unsupported leftover keys',
};

EX.d = function directMode(dict, opt) {
  // directMode works on whatever, so beware of inherited properties!
  if (!dict) { dict = false; }
  if (!opt) { opt = false; }
  var mem = opt.memory, po;
  if (mem === true) { mem = ocn(); }

  po = function popper(key, dflt) {
    // ref up to v0.1.4: popAttr <- xmlattrdict@0.1.13/xmlattrdict
    var val;
    if (objHop.call(dict, key)) {
      val = dict[key];
      delete dict[key];
      return val;
    }
    if (mem && objHop.call(mem, key)) { return mem[key]; }
    return dflt;
  };
  po.dict = dict;

  po.isEmpty = function () { return !(Object.keys(dict).length); };

  po.ifHas = po;  // Default since v0.2.0

  po.ifDef = function (k, d) {
    var v = po(k);
    return (v === undefined ? d : v);
  };

  po.ifVal = function (k, d) {
    var v = po(k);
    return (po.isEmpty(v) ? d : v);
  };

  po.done = po.expectEmpty = function expectEmpty(errMsg) {
    // ref: rejectLeftoverAttrs <- render-ssi-like-file-pmb@0.1.9
    if (po.isEmpty()) { return true; }
    var err = new Error((errMsg || opt.leftoversMsg || df.leftoversMsg)
      + ': ' + Object.keys(dict).join(', '));
    err.name = (opt.errName || 'LeftoverKeys');
    throw err;
  };

  po.willConsumeAll = function (doit) {
    var done = doit(po);
    function checkEmpty(x) { return po.expectEmpty() && x; }
    if (done.then) { return done.then(checkEmpty); }
    return checkEmpty(done);
  };

  (function (m, f, dPre, dSuf) {
    m = opt.mustBe;
    if (!m) { return; }
    dPre = (opt.mustBeDescrPrefix || '');
    dSuf = (opt.mustBeDescrSuffix || '');
    f = function poppedPropMustBe(crit, prop, dflt) {
      return m(crit, dPre + prop + dSuf)(po.ifHas(prop, dflt));
    };
    f.done = f.expectEmpty = po.expectEmpty;
    po.mustBe = f;
  }());





  return po;
};

module.exports = EX;
