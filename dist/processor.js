"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var Processor;
(function (Processor) {
    var cache = {};
    function isCached(expression) {
        return !!cache[expression];
    }
    function get(expression) {
        if (cache[expression]) {
            return cache[expression];
        }
        else {
            var template = new template_1.Template(expression);
            return cache[expression] = template;
        }
    }
    function evaluate(expression, input, resolver, customFormatters) {
        var template = get(expression);
        return template.evaluate(input, resolver, customFormatters);
    }
    Processor.evaluate = evaluate;
})(Processor = exports.Processor || (exports.Processor = {}));
//# sourceMappingURL=processor.js.map