"use strict";
exports.__esModule = true;
var Placeholder = (function () {
    function Placeholder(value) {
        this.value = value || '';
        var parts = this.value.split('::');
        if (parts.length >= 0 && parts.length <= 3) {
            this.name = parts[0];
            this.formatter = parts[1] || '';
            this.arg = parts[2] || null;
        }
        else {
            throw "variable has incorrect syntax: " + value + ", cant be split";
        }
    }
    return Placeholder;
}());
exports.Placeholder = Placeholder;
//# sourceMappingURL=placeholder.js.map