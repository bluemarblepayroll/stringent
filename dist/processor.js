"use strict";
exports.__esModule = true;
var template_1 = require("./template");
var Processor;
(function (Processor) {
    var defaultResolver = function (value, input) { return input ? input[value] : null; };
    var cache = {};
    function resolverWrapper(input, resolver) {
        if (resolver) {
            return function (expr) { return resolver(expr, input); };
        }
        else {
            return function (expr) { return defaultResolver(expr, input); };
        }
    }
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
        var wrapper = resolverWrapper(input, resolver);
        return template.evaluate(input, wrapper, customFormatters);
    }
    Processor.evaluate = evaluate;
})(Processor = exports.Processor || (exports.Processor = {}));
//# sourceMappingURL=processor.js.map