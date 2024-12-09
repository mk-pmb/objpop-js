// eslint-disable-next-line
/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

// Weird coding style is because I double-lint with eslint and jslint,
// in order to guarantee compatibility with exotic old browsers.
/* eslint-disable no-var, one-var, one-var-declaration-per-line */

(function setup() {
  var EX, df, obAss = Object.assign, objHop = Object.prototype.hasOwnProperty;

  function ocn() { return Object.create(null); }

  EX = function objpop(dict, opt) { return EX.d(obAss(ocn(), dict), opt); };

  df = {
    leftoversMsg: 'Unsupported leftover keys',
  };
  EX.defaults = df;

  EX.d = function directMode(dict, opt) {
    // directMode works on whatever, so beware of inherited properties!
    var po, mem;
    if (!dict) { return directMode(ocn(), opt); }
    if (!opt) { return directMode(dict, true); }
    mem = opt.memory;
    if (mem === true) { mem = ocn(); }

    po = function popper(key, dflt) {
      // ref up to v0.1.4: popAttr <- xmlattrdict@0.1.13/xmlattrdict
      var val;
      if (objHop.call(dict, key)) {
        val = dict[key];
        delete dict[key]; // eslint-disable-line no-param-reassign
        return val;
      }
      if (mem && objHop.call(mem, key)) { return mem[key]; }
      return dflt;
    };

    po.getDict = function getDict() { return dict; };
    po.remainingKeys = function remainingKeys() { return Object.keys(dict); };
    po.isEmpty = function isEmpty() { return !(po.remainingKeys().length); };
    po.ifHas = po;  // Default since v0.2.0

    po.ifDef = function ifDef(k, d) {
      var v = po(k);
      return (v === undefined ? d : v);
    };

    po.ifVal = function ifVal(k, d) {
      var v = po(k);
      return (po.isEmpty(v) ? d : v);
    };

    (function tmpNS() {
      function expectEmpty(errMsg) {
        // ref: rejectLeftoverAttrs <- render-ssi-like-file-pmb@0.1.9
        var Cls = (opt.leftoversErrCls || Error), err;
        if (po.isEmpty()) { return true; }
        err = new Cls((errMsg || opt.leftoversMsg || df.leftoversMsg)
          + ': ' + po.remainingKeys().join(', '));
        err.name = (opt.errName || 'LeftoverKeys');
        throw err;
      }
      po.done = expectEmpty;
      po.expectEmpty = expectEmpty;
    }());

    po.willConsumeAll = function willConsumeAll(doit) {
      var done = doit(po);
      function checkEmpty(x) { return po.expectEmpty() && x; }
      if (done.then) { return done.then(checkEmpty); }
      return checkEmpty(done);
    };

    (function tmpNS() {
      var m = opt.mustBe, f, dPre, dSuf, i;
      if (!m) { return; }
      dPre = (opt.mustBeDescrPrefix || '');
      dSuf = (opt.mustBeDescrSuffix || '');
      f = function poppedPropMustBe(crit, prop, dflt) {
        if (!prop) { return f.bind(null, crit); }
        return m(crit, dPre + prop + dSuf)(po.ifHas(prop, dflt));
      };

      i = (m.IMPL || false).installShorthands;
      if (i && i.apply) { i(f, f); }

      f.sub = function subObjMustBe(prop, crit) {
        return EX(f(crit || 'obj | bool | undef | nul', prop), opt);
      };
      f.getDict = po.getDict;
      f.done = po.expectEmpty;
      f.expectEmpty = f.done;
      po.mustBe = f;
    }());





    return po;
  };


  (function unifiedExport(e) {
    /*global define: true, window: true */
    var d = ((typeof define === 'function') && define),
      m = ((typeof module === 'object') && module);
    if (d && d.amd) { d(function f() { return e; }); }
    if (m && m.exports) { m.exports = e; }
    if (d || m) { return; }
    m = ((typeof window === 'object') && window);
    if (m) { m.objPop = e; }
  }(EX));
}());
