/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
import { Template } from "./template";
import { CustomFormatter } from "./formatter";

export namespace Processor {

  const defaultResolver:Function = (value:string, input:any):any => input ? input[value] : null;

  const cache:Record<string, Template> = {};

  function resolverWrapper(input:any, resolver:Function):Function {
    if (resolver) {
      return (expr:string) => resolver(expr, input);
    } else {
      return (expr:string) => defaultResolver(expr, input);
    }
  }

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
    resolver?:Function,
    customFormatters?:Record<string, CustomFormatter>):string {

    let template:Template = get(expression);
    let wrapper:Function = resolverWrapper(input, resolver);

    return template.evaluate(input, wrapper, customFormatters);
  }
}
