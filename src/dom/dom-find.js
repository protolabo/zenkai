import { isNullOrUndefined } from '@datatype/index.js';
import { isElement } from './checker.js';

/**
 * Finds an ancestor of an element
 * @param {Element} target 
 * @param {Function} callback Decides whether the target is found
 * @param {number} [max] Maximum number of iterations
 * @returns {Element|null}
 * @memberof DOM
 */
export function findAncestor(target, callback, max) {
    if (!isElement(target)) {
        return null;
    }

    var parent = target.parentElement;
    if (max > 0) {
        return findAncestorIter(parent, callback, max);
    }
    return findAncestorInf(parent, callback);
}

/**
 * Look an ancestor of an element using a callback
 * @param {Element} target 
 * @param {Function} callback Decides whether the target is found
 * @private
 */
/* istanbul ignore next */
function findAncestorInf(target, callback) {
    if (isNullOrUndefined(target)) {
        return null;
    }

    if (callback(target)) {
        return target;
    }

    return findAncestorInf(target.parentElement, callback);
}

/**
 * Look for an ancestor of an element using a callback with a maximum number of iteration
 * @param {Element} target 
 * @param {Function} callback Decides whether the target is found
 * @param {number} [max] Maximum number of iterations
 * @private
 */
/* istanbul ignore next */
function findAncestorIter(target, callback, max) {
    if (isNullOrUndefined(target) || max === 0) {
        return null;
    }

    if (callback(target)) {
        return target;
    }

    return findAncestorIter(target.parentElement, callback, max - 1);
}