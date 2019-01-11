export const valOrDefault = function (arg, val) { return typeof arg !== 'undefined' ? arg : val; };

export const XHR = function (file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.open('GET', file, true);
    xhr.send();
};

export const defProp = Object.defineProperty;

/**
 * Returns the index or value of the first element in the object
 * @param {Object|Array} obj 
 * @param {any} value 
 */
export const find = function (obj, value) {
    if (Array.isArray(obj)) {
        let index = obj.indexOf(value);
        if (index !== -1) return index;
    } else {
        for (const e of Object.keys(obj)) {
            if (obj[e] === value || obj[e].val === value) {
                return e;
            }
        }
    }
    return undefined;
};