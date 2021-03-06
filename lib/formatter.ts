/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type ICustomFormatter = (value: any, arg: string) => string;

function genericFormat(value: string): string {
  if (value === null || typeof value === "undefined") {
    return "";
  } else {
    return value.toString();
  }
}

export function format(
  customFormatters: Record<string, ICustomFormatter>,
  value: any,
  formatter: string,
  arg: string): string {

  if (customFormatters && customFormatters[formatter]) {
    return customFormatters[formatter](value, arg);
  } else {
    return genericFormat(value);
  }
}
