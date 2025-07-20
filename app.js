"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeOrdinal(words) {
    const trimmed = words.replace(/,$/, '');
    const lastWord = trimmed.split(' ').pop() || '';
    if (lastWord === 'zero')
        return 'zeroth';
    if (lastWord === 'one')
        return trimmed.replace(/one$/, 'first');
    if (lastWord === 'two')
        return trimmed.replace(/two$/, 'second');
    if (lastWord === 'three')
        return trimmed.replace(/three$/, 'third');
    if (lastWord === 'five')
        return trimmed.replace(/five$/, 'fifth');
    if (lastWord === 'eight')
        return trimmed.replace(/eight$/, 'eighth');
    if (lastWord === 'nine')
        return trimmed.replace(/nine$/, 'ninth');
    if (lastWord === 'twelve')
        return trimmed.replace(/twelve$/, 'twelfth');
    if (lastWord === 'twenty')
        return trimmed.replace(/twenty$/, 'twentieth');
    if (lastWord === 'thirty')
        return trimmed.replace(/thirty$/, 'thirtieth');
    if (lastWord === 'forty')
        return trimmed.replace(/forty$/, 'fortieth');
    if (lastWord === 'fifty')
        return trimmed.replace(/fifty$/, 'fiftieth');
    if (lastWord === 'sixty')
        return trimmed.replace(/sixty$/, 'sixtieth');
    if (lastWord === 'seventy')
        return trimmed.replace(/seventy$/, 'seventieth');
    if (lastWord === 'eighty')
        return trimmed.replace(/eighty$/, 'eightieth');
    if (lastWord === 'ninety')
        return trimmed.replace(/ninety$/, 'ninetieth');
    // For numbers ending in 'y', replace with 'ieth'
    if (lastWord.endsWith('y')) {
        return trimmed.replace(new RegExp(lastWord + '$'), lastWord.slice(0, -1) + 'ieth');
    }
    // For most other numbers, just add 'th'
    return trimmed + 'th';
}
function isFinite(num) {
    return Number.isFinite(num);
}
function isSafeNumber(num) {
    return Number.isSafeInteger(num);
}
var Numbers;
(function (Numbers) {
    Numbers[Numbers["TEN"] = 10] = "TEN";
    Numbers[Numbers["ONE_HUNDRED"] = 100] = "ONE_HUNDRED";
    Numbers[Numbers["ONE_THOUSAND"] = 1000] = "ONE_THOUSAND";
    Numbers[Numbers["ONE_MILLION"] = 1000000] = "ONE_MILLION";
    Numbers[Numbers["ONE_BILLION"] = 1000000000] = "ONE_BILLION";
    Numbers[Numbers["ONE_TRILLION"] = 1000000000000] = "ONE_TRILLION";
    Numbers[Numbers["ONE_QUADRILLION"] = 1000000000000000] = "ONE_QUADRILLION";
    Numbers[Numbers["MAX"] = 9007199254740992] = "MAX";
})(Numbers || (Numbers = {}));
const LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];
const TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];
/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function toWords(number, asOrdinal) {
    const num = parseInt(number, 10);
    if (!isFinite(num)) {
        throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
    }
    if (!isSafeNumber(num)) {
        throw new RangeError('Input is not a safe number, it’s either too large or too small.');
    }
    const words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}
function generateWords(number, initialWords = []) {
    let remainder = 0;
    let word = '';
    const wordsArray = [...initialWords];
    if (number === 0) {
        return !wordsArray.length ? 'zero' : wordsArray.join(' ').replace(/,$/, '');
    }
    // If negative, prepend “minus”
    if (number < 0) {
        wordsArray.push('minus');
        number = Math.abs(number);
    }
    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    }
    else if (number < Numbers.ONE_HUNDRED) {
        remainder = number % Numbers.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / Numbers.TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    }
    else if (number < Numbers.ONE_THOUSAND) {
        remainder = number % Numbers.ONE_HUNDRED;
        word = generateWords(Math.floor(number / Numbers.ONE_HUNDRED)) + ' hundred';
    }
    else if (number < Numbers.ONE_MILLION) {
        remainder = number % Numbers.ONE_THOUSAND;
        word = generateWords(Math.floor(number / Numbers.ONE_THOUSAND)) + ' thousand,';
    }
    else if (number < Numbers.ONE_BILLION) {
        remainder = number % Numbers.ONE_MILLION;
        word = generateWords(Math.floor(number / Numbers.ONE_MILLION)) + ' million,';
    }
    else if (number < Numbers.ONE_TRILLION) {
        remainder = number % Numbers.ONE_BILLION;
        word = generateWords(Math.floor(number / Numbers.ONE_BILLION)) + ' billion,';
    }
    else if (number < Numbers.ONE_QUADRILLION) {
        remainder = number % Numbers.ONE_TRILLION;
        word = generateWords(Math.floor(number / Numbers.ONE_TRILLION)) + ' trillion,';
    }
    else if (number <= Numbers.MAX) {
        remainder = number % Numbers.ONE_QUADRILLION;
        word = generateWords(Math.floor(number / Numbers.ONE_QUADRILLION)) +
            ' quadrillion,';
    }
    wordsArray.push(word);
    return generateWords(remainder, wordsArray);
}
exports.default = toWords;
