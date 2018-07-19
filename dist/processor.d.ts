import { Resolver } from "./template";
import { CustomFormatter } from "./formatter";
export declare namespace Processor {
    function evaluate(expression: string, input: any, resolver?: Resolver, customFormatters?: Record<string, CustomFormatter>): string;
}
