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