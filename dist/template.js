"use strict";
exports.__esModule = true;
var formatter_1 = require("./formatter");
var placeholder_1 = require("./placeholder");
var Template = (function () {
    function Template(value) {
        this.value = value ? value.toString() : '';
    }
    Template.prototype.placeholders = function () {
        var _this = this;
        if (!this._placeholders) {
            var matches = (this.value.match(/{(.*?)}/g) || []);
            this._placeholders = matches.map(function (x) { return _this.stripFirstAndLastChars(x); })
                .map(function (x) { return new placeholder_1.Placeholder(x); });
        }
        return this._placeholders;
    };
    Template.prototype.evaluate = function (input, resolver, customFormatters) {
        var resolved = this.value;
        this.placeholders().forEach(function (x) {
            var resolvedValue = resolver(x.name, input);
            var formattedValue = formatter_1.Formatter.format(customFormatters, resolvedValue, x.formatter, x.arg);
            resolved = resolved.replace(new RegExp("{" + x.value + "}", 'g'), formattedValue);
        });
        return resolved;
    };
    Template.prototype.stripFirstAndLastChars = function (value) {
        if (value && value.length) {
            return value.substring(1, value.length - 1);
        }
        else {
            return '';
        }
    };
    return Template;
}());
exports.Template = Template;
//# sourceMappingURL=template.js.map