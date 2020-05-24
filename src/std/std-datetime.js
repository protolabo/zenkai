import { isNullOrUndefined, isDate } from './std-parse.js';


/**
 * Compare 2 times
 * @param {string} t1 time 1
 * @param {string} t2 time 2
 * @param {string} [separator=":"]
 * @returns {number} 1, 0, -1 if t1 > t2, t1 = t2 and t1 < t2 respectively
 * @memberof STD
 */
export function compareTime(t1, t2, separator =  ":") {
    if (isNullOrUndefined(t1) || isNullOrUndefined(t2) || !t1.includes(separator) || !t2.includes(separator)) {
        return null;
    }

    var arr1 = t1.split(separator);
    var arr2 = t2.split(separator);

    // hour comparison
    if (+arr1[0] > +arr2[0]) {
        return 1;
    } else if (+arr1[0] < +arr2[0]) {
        return -1;
    } else {
        // minute comparison
        if (+arr1[1] > +arr2[1]) {
            return 1;
        } else if (+arr1[1] < +arr2[1]) {
            return -1;
        } else {
            if (arr1.length == arr2.length && arr1.length == 3) {
                // second comparison
                if (+arr1[2] > +arr2[2]) {
                    return 1;
                } else if (+arr1[2] < +arr2[2]) {
                    return -1;
                }
            }

            return 0;
        }
    }
}

/**
 * Resolves a date value
 * @param {*} [value] 
 * @returns {Date}
 */
export function resolveDate(value) {
    if (isNullOrUndefined(value)) {
        return new Date();
    } else if (isDate(value)) {
        return value;
    }

    var date = new Date(value);
    var time = date.getTime();

    if (Number.isNaN(time)) {
        return new Date();
    }

    return new Date(time + date.getTimezoneOffset() * 60000);
}

/**
 * Formats a date
 * @param {!Date} date 
 * @param {!string} format 
 * @returns {string} Formatted date
 * @memberof STD
 */
export function formatDate(date, format) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;   // January = 0
    var yyyy = date.getFullYear().toString();
    var hh = date.getHours();
    var MM = date.getMinutes();
    var ss = date.getSeconds();

    const twoDigits = (val) => val < 10 ? `0${val}` : val;

    return format.replace('yyyy', yyyy)
        .replace('yy', yyyy.slice(-2))
        .replace('mm', twoDigits(mm))
        .replace('m', mm)
        .replace('dd', twoDigits(dd))
        .replace('d', dd)
        .replace('hh', twoDigits(hh))
        .replace('h', hh)
        .replace('MM', twoDigits(MM))
        .replace('M', MM)
        .replace('ss', twoDigits(ss))
        .replace('s', ss);
}

/**
 * Returns a date and time using the format "YYYY-mm-dd"
 * @param {*} _date 
 * @returns {string}
 * @memberof STD
 */
export function shortDate(_date) {
    var date = resolveDate(_date);

    return formatDate(date, 'yyyy-mm-dd');
}

/**
 * Returns a date and time using the format "YYYY-mm-dd hh:MM"
 * @param {*} _date 
 * @returns {string}
 * @memberof STD
 */
export function shortDateTime(_date) {
    var date = resolveDate(_date);

    return formatDate(new Date(date + date.getTimezoneOffset() * 60000), 'yyyy-mm-dd hh:MM');
}