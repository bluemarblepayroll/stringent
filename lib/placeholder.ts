/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Placeholder {
  public readonly name: string;
  public readonly value: string;
  public readonly formatter: string;
  public readonly arg: string;

  constructor(value: string) {
    this.value = value || "";

    const parts: string[] = this.value.split("::");

    if (parts.length >= 0 && parts.length <= 3) {
      this.name = parts[0];
      this.formatter = parts[1] || "";
      this.arg = parts[2] || null;
    } else {
      throw new Error(`variable has incorrect syntax: ${value}, cant be split`);
    }
  }
}
