/**
 * Copyright (c) 2018-present, Blue Marble Payroll, LLC
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { format, ICustomFormatter } from "./formatter";
import { Placeholder } from "./placeholder";

export type IResolver = (value: string, input: any) => any;

const defaultResolver: IResolver = (value: string, input: any): any => input ? input[value] : null;

export class Template {
  public readonly value: string;
  private parsedPlaceholders: Placeholder[];

  constructor(value: string) {
    this.value = value ? value.toString() : "";
  }

  public placeholders(): Placeholder[] {
    if (!this.parsedPlaceholders) {
      const matches: string[] = (this.value.match(/{(.*?)}/g) || []);

      this.parsedPlaceholders = matches.map((x) => this.stripFirstAndLastChars(x))
                                       .map((x) => new Placeholder(x));
    }

    return this.parsedPlaceholders;
  }

  public evaluate(input: any,
                  resolver: IResolver,
                  customFormatters: Record<string, ICustomFormatter>): string {
    let resolved: string = this.value;

    this.placeholders().forEach((x) => {
      const resolvedValue: any = this.resolve(resolver, x.name, input);
      const formattedValue: string = format(customFormatters, resolvedValue, x.formatter, x.arg);

      resolved = resolved.replace(new RegExp(`{${x.value}}`, "g"), formattedValue);
    });

    return resolved;
  }

  private resolve(resolver: IResolver, value: string, input: any): any {
    if (resolver) {
      return resolver(value, input);
    }

    return defaultResolver(value, input);
  }

  private stripFirstAndLastChars(value: string): string {
    if (value && value.length) {
      return value.substring(1, value.length - 1);
    } else {
      return "";
    }
  }
}
