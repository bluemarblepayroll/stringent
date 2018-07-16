/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
'use strict';

var expect = require('chai').expect;
var Template = require('../dist/template.js').Template;

describe('Template#variables', () => {

  it('should properly be extracted', () => {
    let tests = [
      [ '', [] ],
      [ null, [] ],
      [ 1, [] ],
      [ false, [] ],
      [ 'string with none', [] ],

      [ '{one {inside} another one}', [ {
        name: 'one {inside', formatter: '', value: 'one {inside', arg: null } ] ],  //this type of use is not supported

      [ 'matt {is} a {monkeys} uncle.', [
        { name: 'is', formatter: '', value: 'is', arg: null },
        { name: 'monkeys', formatter: '', value: 'monkeys', arg: null } ] ],

      [ 'matt {is::date::short} a {monkeys::timeAgo} uncle.', [
        { name: 'is', formatter: 'date', value: 'is::date::short', arg: 'short' },
        { name: 'monkeys', formatter: 'timeAgo', value: 'monkeys::timeAgo', arg: null } ] ],
    ];

    tests.forEach(x => {
      let t = new Template(x[0]);

      expect(t.placeholders()).to.have.lengthOf(x[1].length);
      expect(t.placeholders()).to.deep.equal(x[1]);
    });
  });

});
