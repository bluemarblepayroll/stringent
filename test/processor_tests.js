/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var expect = require('chai').expect;
var evaluate = require('../dist/processor.js').evaluate;

const customFormatter = {
  yesNo: (value, arg) => {
    if (!!value) {
      return 'Yes';
    } else {
      return 'No';
    }
  },

  yesNoUnknown: (value, arg) => {
    if (value === null || typeof value === 'undefined') {
      return 'Unknown';
    } else if (!!value) {
      return 'Yes';
    } else if (!value) {
      return 'No';
    }
  }
};

describe('Processor#evaluate ', () => {

  it('should properly evaluate expressions', () => {
    let tests = [
      [ 'matt is a {animal}', { animal: 'giraffe' }, 'matt is a giraffe' ],
      [ 'variables {that} do not exist get {ignored}', null, 'variables  do not exist get ' ],
      [ '', null, '' ],
      [ null, null, '' ],

      [ '{other} {value} {types} {are} {ok} {bro}', {
        other: 1,
        value: false,
        types: 12.3,
        are: null, // becomes blank string ('')
        ok: undefined, // becomes blank string ('')
        bro: 0 }, '1 false 12.3   0' ],

      [ 'matt is an elephant: {elephant::yesNo}', { elephant: true }, 'matt is an elephant: Yes' ],
      [ 'matt is an ostrich: {ostrich::yesNo}', { ostrich: false }, 'matt is an ostrich: No' ],
      [ 'matt is a cat: {cat::yesNo}', { cat: null }, 'matt is a cat: No' ],

      [ 'matt is a bird: {bird::yesNoUnknown}', { bird: true }, 'matt is a bird: Yes' ],
      [ 'matt is an airplane: {airplane::yesNoUnknown}', { airplane: false }, 'matt is an airplane: No' ],
      [ 'matt is a dog: {dog::yesNoUnknown}', { dog: null }, 'matt is a dog: Unknown' ]
    ];

    tests.forEach(x => {
      let result = evaluate(x[0], x[1], null, customFormatter);

      expect(result).to.equal(x[2]);
    });
  });
});
