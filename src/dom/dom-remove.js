import { isFunction } from '@datatype/index.js';

/**
 * Removes all children of a node from the DOM or 
 * those that satisfies the predicate function
 * @param {Node} node 
 * @param {Function} [callback] Decides whether the node should be removed
 * @memberof DOM
 */
export function removeChildren(node, callback) {
    if (!isFunction(callback)) {
        removeAllChildren(node);
    } else {
        Array.from(node.childNodes).forEach(n => {
            if (callback(n)) {
                node.removeChild(n);
            }
        });
    }

    return node;
}

/**
 * Removes all children of a node from the DOM
 * @param {Node} node 
 * @private
 */
function removeAllChildren(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }

    return node;
}