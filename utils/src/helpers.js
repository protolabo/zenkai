import { StringHelper as _ } from './string-helper.js';

export const Helper = {
    valOrDefault(arg, val) { return typeof arg !== 'undefined' ? arg : val; },

    XHR: function (file, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };
        xhr.open('GET', file, true);
        xhr.send();
    },

    /**
     * Append the path to the current path
     * @param {string} target 
     * @param {string} path 
     */
    addPath: function (target, path) { return _.isNullOrWhiteSpace(target) ? path : target + '.' + path; },
    /**
     * Returns the directory of the path
     * @param {string} path 
     */
    getDir: function (path) { return path.substring(0, path.lastIndexOf('.')); },
    /**
     * Returns the directory of the path from the target
     * @param {string} path 
     */
    getDirTarget: function (path, target) { return path.substring(0, path.lastIndexOf(target) - 1); },

    defProp: Object.defineProperty,

    /**
     * Returns the index or value of the first element in the object
     * @param {Object|Array} obj 
     * @param {any} value 
     */
    find(obj, value) {
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
    },
    /**
     * Inserts an item in an array at the specified index
     * @param {Object[]} arr array
     * @param {number} index 
     * @param {object} item 
     */
    insert(arr, index, item) { arr.splice(index, 0, item); },
    /**
     * Return a random integer between min and max (inclusive).
     * @param {number} min 
     * @param {number} max 
     */
    random(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }

        return min + Math.floor(Math.random() * (max - min + 1));
    }
};