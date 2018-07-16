"use strict";
exports.__esModule = true;
var Formatter;
(function (Formatter) {
    function genericFormat(value, arg) {
        if (value === null || typeof value === 'undefined') {
            return '';
        }
        else {
            return value.toString();
        }
    }
    function format(customFormatters, value, formatter, arg) {
        if (customFormatters && customFormatters[formatter]) {
            return customFormatters[formatter](value, arg);
        }
        else {
            return genericFormat(value, arg);
        }
    }
    Formatter.format = format;
})(Formatter = exports.Formatter || (exports.Formatter = {}));
//# sourceMappingURL=formatter.js.map