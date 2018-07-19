import { CustomFormatter } from "./formatter";
import { Placeholder } from "./placeholder";
export interface Resolver {
    (value: string, input: any): any;
}
export declare class Template {
    readonly value: string;
    private _placeholders;
    constructor(value: string);
    placeholders(): Array<Placeholder>;
    evaluate(input: any, resolver: Resolver, customFormatters: Record<string, CustomFormatter>): string;
    private resolve;
    private stripFirstAndLastChars;
}
