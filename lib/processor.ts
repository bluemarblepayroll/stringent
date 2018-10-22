/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ICustomFormatter } from "./formatter";
import { IResolver, Template } from "./template";

const cache: Record<string, Template> = {};

function get(expression: string): Template {
  if (cache[expression]) {
    return cache[expression];
  } else {
    const template: Template = new Template(expression);

    return cache[expression] = template;
  }
}

export function evaluate(expression: string,
                         input: any,
                         resolver?: IResolver,
                         customFormatters?: Record<string, ICustomFormatter>): string {

  const template: Template = get(expression);

  return template.evaluate(input, resolver, customFormatters);
}
