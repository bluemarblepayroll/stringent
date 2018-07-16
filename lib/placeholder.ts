/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
export class Placeholder {
  readonly name:string;
  readonly value:string;
  readonly formatter:string;
  readonly arg:string;

  constructor(value:string) {
    this.value = value || '';

    let parts:Array<string> = this.value.split('::');

    if (parts.length >= 0 && parts.length <= 3) {
      this.name = parts[0];
      this.formatter = parts[1] || '';
      this.arg = parts[2] || null;
    } else {
      throw `variable has incorrect syntax: ${value}, cant be split`;
    }
  }
}
