/** @module path */

import { isNullOrWhiteSpace } from './datatype/type-string.js';

/**
 * Append the path to the current path
 * @param {string} target 
 * @param {string} path 
 */
export function addPath(target, path) { return isNullOrWhiteSpace(target) ? path : target + '.' + path; }

/**
 * Returns the directory of the path
 * @param {string} path 
 */
export function getDir(path) { return path.substring(0, path.lastIndexOf('.')); }

/**
 * Returns the directory of the path from the target
 * @param {string} path 
 */
export function getDirTarget(path, target) { return path.substring(0, path.lastIndexOf(target) - 1); }

/**
 * Returns an element in an object using its path
 * @param {Object} obj
 * @param {string} path  
 * @param {string} separator
 */
function findModelElement(obj, path, separator) {
    var components = path.split('.');
    var me = obj;

    var dir, match, index, prop, name;
    for (var i = 0; i < components.length; i++) {
        dir = components[i];
        if (/\[\d+\]/.test(dir)) {
            match = dir.match(/\[\d+\]/g);
            index = +match[0].match(/\d+/g);
            prop = dir.substring(0, dir.indexOf('['));
            me = me[prop][index];
        } else if (/\[\w+\]/.test(dir)) {
            match = dir.match(/\[\w+\]/g);
            name = match[0].match(/\w+/g);
            prop = dir.substring(0, dir.indexOf('['));
            me = me[prop].find(function (x) {
                return x.name == name;
            });
        } else {
            me = me[dir];
        }
    }

    return me;
}