import { isFunction } from '@std/index.js';
import { isNode } from './dom-parse.js';

/**
 * Removes all children of a node from the DOM or 
 * those that satisfy the predicate function if given
 * @param {!Node} node 
 * @param {Function} [_callback] Decides whether the node should be removed
 * @memberof DOM
 */
export function removeChildren(node, _callback) {
    if (!isNode(node)) {
        throw new TypeError("Bad argument: The given `node` is not a valid Node");
    }

    if (isFunction(_callback)) {
        Array.from(node.childNodes).forEach(n => {
            if (_callback(n)) {
                node.removeChild(n);
            }
        });

        return node;
    }

    return removeAllChildren(node);

}

/**
 * Removes all children of a node from the DOM
 * @param {!Node} node 
 * @private
 */
/* istanbul ignore next */
function removeAllChildren(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }

    return node;
}