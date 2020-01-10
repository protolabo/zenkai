import { isInt, valOrDefault, isNullOrUndefined, isDate } from './type-manip.js';

/**
 * Compare 2 times
 * @param {string} t1 time 1
 * @param {string} t2 time 2
 * @returns {number} 1, 0, -1 if t1 > t2, t1 = t2 and t1 < t2 respectively
 * @memberof TYPE
 */
export function compareTime(t1, t2) {
    if (isNullOrUndefined(t1) || isNullOrUndefined(t2) || !t1.includes(":") || !t2.includes(":")) {
        return null;
    }

    var arr1 = t1.split(':');
    var arr2 = t2.split(':');

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
 * @param {*} [date] 
 * @returns {Date}
 * @private
 */
function resolveDate(date) {
    if (isNullOrUndefined(date)) {
        return new Date();
    } else if (isDate(date)) {
        return date;
    }

    var _date = new Date(date);
    return new Date(_date.getTime() + _date.getTimezoneOffset() * 60000);
}

/**
 * Formats a date
 * @param {!Date} date 
 * @param {!string} format 
 * @returns {string} Formatted date
 * @memberof TYPE
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
 * @memberof TYPE
 */
export function shortDate(_date) {
    var date = resolveDate(_date);

    return formatDate(date, 'yyyy-mm-dd');
}

/**
 * Returns a date and time using the format "YYYY-mm-dd hh:MM"
 * @param {*} _date 
 * @returns {string}
 * @memberof TYPE
 */
export function shortDateTime(_date) {
    var date = resolveDate(_date);

    return formatDate(new Date(date + date.getTimezoneOffset() * 60000), 'yyyy-mm-dd hh:MM');
}

export function parseTime(n) {
    var hh = +n | 0;
    var mm = '00';

    if (!isInt(+n)) {
        mm = (n + '').split('.')[1] * 6;
    }

    return hh + ':' + mm;
}

const DICT = {
    'en': {
        'second': 'second(s)',
        'minute': 'minute(s)',
        'hour': 'hour(s)',
        'day': 'day(s)',
        'week': 'week(s)',
        'month': 'month(s)',
        'year': 'year(s)',
    },
    'fr': {
        'second': 'seconde(s)',
        'minute': 'minute(s)',
        'hour': 'heure(s)',
        'day': 'jour(s)',
        'week': 'semaine(s)',
        'month': 'mois',
        'year': 'année(s)',
    },
};

const trans = function translation(lang, key, isPlural) {
    var value = DICT[lang][key];

    if (value === undefined) {
        return undefined;
    }

    if (isPlural) {
        return value.replace(/\(([a-z]+)\)/g, '$1');
    }

    return value.replace(/\([a-z]+\)/g, '');
};

const timeAgoResponse = function timeAgoResponseBuilder(time, unit, _lang) {
    var lang = valOrDefault(_lang, 'en');
    var isPlural = time === 1;
    var msg = {
        en: `${time} ${trans('en', unit, isPlural)} ago`,
        fr: `il y a ${time} ${trans('fr', unit, isPlural)}`,
    };

    return msg[lang];
};

/**
 * Returns the ellapsed time between now and a point in time
 * @param {*} time 
 * @param {*} _callback 
 * @returns {string}
 * @memberof TYPE
 */
export function timeAgo(time, _callback) {
    var callback = valOrDefault(_callback, timeAgoResponse);

    const seconds = Math.floor((Date.now() - resolveDate(time).getTime()) / 1000);
    const MINUTE = 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30;
    const YEAR = WEEK * 52;

    if (seconds < MINUTE) {
        return callback(seconds, 'second');
    } else if (seconds < HOUR) {
        return callback(~~(seconds / MINUTE), 'minute');
    } else if (seconds < DAY) {
        return callback(~~(seconds / HOUR), 'hour');
    } else if (seconds < WEEK) {
        return callback(~~(seconds / DAY), 'day');
    } else if (seconds < MONTH) {
        return callback(~~(seconds / WEEK), 'week');
    } else if (seconds < YEAR) {
        return callback(~~(seconds / MONTH), 'month');
    } else {
        return callback(~~(seconds / YEAR), 'year');
    }
}