/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Resolver, Template } from "./template";
import { CustomFormatter } from "./formatter";

export namespace Processor {

  const cache:Record<string, Template> = {};

  function isCached(expression:string):boolean {
    return !!cache[expression];
  }

  function get(expression:string):Template {
    if (cache[expression]) {
      return cache[expression];
    } else {
      let template:Template = new Template(expression);

      return cache[expression] = template;
    }
  }

  export function evaluate(
    expression:string,
    input:any,
    resolver?:Resolver,
    customFormatters?:Record<string, CustomFormatter>):string {

    let template:Template = get(expression);

    return template.evaluate(input, resolver, customFormatters);
  }
}
