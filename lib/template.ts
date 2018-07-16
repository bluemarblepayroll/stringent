/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
import { CustomFormatter, Formatter } from "./formatter";
import { Placeholder } from "./placeholder";

export class Template {
  readonly value:string;

  private _placeholders:Array<Placeholder>;

  constructor(value:string) {
    this.value = value ? value.toString() : '';
  }

  placeholders():Array<Placeholder> {
    if (!this._placeholders) {
      let matches = (this.value.match(/{(.*?)}/g) || []);

      this._placeholders = matches.map(x => this.stripFirstAndLastChars(x))
                                  .map(x => new Placeholder(x));
    }

    return this._placeholders;
  }

  evaluate(input:any, resolver:Function, customFormatters:Record<string, CustomFormatter>):string {
    let resolved:string = this.value;

    this.placeholders().forEach(x => {
      let resolvedValue:any = resolver(x.name, input);

      let formattedValue:string = Formatter.format(customFormatters, resolvedValue, x.formatter, x.arg);

      resolved = resolved.replace(new RegExp(`{${x.value}}`, 'g'), formattedValue);
    });

    return resolved;
  }

  private stripFirstAndLastChars(value:string):string {
    if (value && value.length) {
      return value.substring(1, value.length - 1);
    } else {
      return '';
    }
  }

}
