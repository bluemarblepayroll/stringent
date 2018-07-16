export interface CustomFormatter {
    (value: any, arg: string): string;
}
export declare namespace Formatter {
    function format(customFormatters: Record<string, CustomFormatter>, value: any, formatter: string, arg: string): string;
}
