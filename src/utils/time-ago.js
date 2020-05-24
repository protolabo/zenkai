import { valOrDefault, resolveDate } from "@std/index.js";

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
 * @memberof STD
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