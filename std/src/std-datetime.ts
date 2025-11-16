import { isNullOrUndefined, isDate } from './std-parse';

/**
 * Compare 2 times
 * @param t1 - time 1
 * @param t2 - time 2
 * @param separator - time separator (default ":")
 * @returns 1, 0, -1 if t1 > t2, t1 = t2 and t1 < t2 respectively, or null if invalid
 */
export function compareTime(t1: string, t2: string, separator: string = ":"): number | null {
    if (isNullOrUndefined(t1) || isNullOrUndefined(t2) || !t1.includes(separator) || !t2.includes(separator)) {
        return null;
    }

    const arr1 = t1.split(separator);
    const arr2 = t2.split(separator);

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
            if (arr1.length === arr2.length && arr1.length === 3) {
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
 * @param value - date value (Date, string, number, or undefined)
 * @param useOffset - whether to apply timezone offset
 * @returns Date object
 */
export function resolveDate(value?: Date | string | number, useOffset: boolean = true): Date {
    if (isNullOrUndefined(value)) {
        return new Date();
    } else if (isDate(value)) {
        return value;
    }

    const date = new Date(value);
    const time = date.getTime();

    if (Number.isNaN(time)) {
        return new Date();
    }

    if (useOffset) {
        return new Date(time + date.getTimezoneOffset() * 60000);
    }

    return date;
}

/**
 * Formats a date
 * @param date - Date to format
 * @param format - Format string (supports: yyyy, yy, mm, m, dd, d, hh, h, MM, M, ss, s)
 * @returns Formatted date string
 */
export function formatDate(date: Date, format: string): string {
    const dd = date.getDate();
    const mm = date.getMonth() + 1;   // January = 0
    const yyyy = date.getFullYear().toString();
    const hh = date.getHours();
    const MM = date.getMinutes();
    const ss = date.getSeconds();

    const twoDigits = (val: number): string => val < 10 ? `0${val}` : `${val}`;

    return format.replace('yyyy', yyyy)
        .replace('yy', yyyy.slice(-2))
        .replace('mm', twoDigits(mm))
        .replace('m', mm.toString())
        .replace('dd', twoDigits(dd))
        .replace('d', dd.toString())
        .replace('hh', twoDigits(hh))
        .replace('h', hh.toString())
        .replace('MM', twoDigits(MM))
        .replace('M', MM.toString())
        .replace('ss', twoDigits(ss))
        .replace('s', ss.toString());
}

/**
 * Returns a date using the format "YYYY-mm-dd"
 * @param _date - Date value
 * @returns Formatted date string
 */
export function shortDate(_date?: Date | string | number): string {
    const date = resolveDate(_date);

    return formatDate(date, 'yyyy-mm-dd');
}

/**
 * Returns a date and time using the format "YYYY-mm-dd hh:MM"
 * @param _date - Date value
 * @returns Formatted datetime string
 */
export function shortDateTime(_date?: Date | string | number): string {
    const date = resolveDate(_date, false);

    return formatDate(date, 'yyyy-mm-dd hh:MM');
}
