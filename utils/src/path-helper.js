import { isNullOrWhiteSpace } from './string-helper.js';

export const PathHelper = {
    /**
     * Append the path to the current path
     * @param {string} target 
     * @param {string} path 
     */
    addPath: function (target, path) { return isNullOrWhiteSpace(target) ? path : target + '.' + path; },
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
}