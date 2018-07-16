import { CustomFormatter } from "./formatter";
export declare namespace Processor {
    function evaluate(expression: string, input: any, resolver?: Function, customFormatters?: Record<string, CustomFormatter>): string;
}
