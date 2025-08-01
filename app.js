"use strict";
const obj = {
    a: 1,
    b: 2
};
function swapKeysAndValues(initialRecord) {
    return Object.fromEntries(Object.entries(initialRecord).map(([key, value]) => [value, key]));
}
const res = swapKeysAndValues(obj);
console.log(res);
