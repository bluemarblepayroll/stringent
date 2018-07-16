import { CustomFormatter } from "./formatter";
import { Placeholder } from "./placeholder";
export declare class Template {
    readonly value: string;
    private _placeholders;
    constructor(value: string);
    placeholders(): Array<Placeholder>;
    evaluate(input: any, resolver: Function, customFormatters: Record<string, CustomFormatter>): string;
    private stripFirstAndLastChars;
}
