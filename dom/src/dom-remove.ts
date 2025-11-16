import { isFunction } from '@protolabo/zenjs';
import { isNode } from './dom-parse';

/**
 * Removes all children of a node from the DOM or 
 * those that satisfy the predicate function if given
 * @param node - Node to remove children from
 * @param callback - Optional predicate to decide whether a node should be removed
 * @returns The node (for chaining)
 * @memberof DOM
 */
export function removeChildren(
    node: Node, 
    callback?: (node: Node) => boolean
): Node {
    if (!isNode(node)) {
        throw new TypeError("removeChildren: node must be a valid Node");
    }

    if (isFunction(callback)) {
        Array.from(node.childNodes).forEach(n => {
            if (callback(n)) {
                node.removeChild(n);
            }
        });

        return node;
    }

    return removeAllChildren(node);
}

/**
 * Removes all children of a node from the DOM
 * @param node - Node to remove children from
 * @returns The node (for chaining)
 * @private
 */
function removeAllChildren(node: Node): Node {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild!);
    }

    return node;
}
