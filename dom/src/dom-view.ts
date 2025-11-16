import { isFunction } from "@protolabo/zenjs";
import { isHTMLElement } from './dom-parse';

/**
 * Epsilon for floating-point comparisons
 * @private
 */
const EPSILON = 0.001;

/**
 * Missing utility: Checks if element is hidden
 * @param element - Element to check
 * @returns boolean indicating if element is hidden
 * @private
 */
function isHidden(element: HTMLElement): boolean {
    return element.offsetParent === null ||
        window.getComputedStyle(element).display === 'none' ||
        window.getComputedStyle(element).visibility === 'hidden';
}

/**
 * Missing utility: Converts pixel string to number
 * @param value - CSS pixel value (e.g., "10px")
 * @returns Number value
 * @private
 */
function pixelToNumber(value: string): number {
    return parseFloat(value) || 0;
}

/**
 * Missing utility: Gets window width
 * @returns Window inner width
 * @private
 */
function windowWidth(): number {
    return window.innerWidth;
}

/**
 * Missing utility: Gets window height
 * @returns Window inner height
 * @private
 */
function windowHeight(): number {
    return window.innerHeight;
}

/**
 * Verifies that an element is visible in the viewport
 * @param element - Element to check
 * @returns boolean indicating if element is in viewport
 * @memberof DOM
 */
export function isInViewport(element: HTMLElement): boolean {
    if (!isHTMLElement(element)) {
        throw new TypeError("isInViewport: element must be a valid HTML Element");
    }

    const { top, right, bottom, left } = element.getBoundingClientRect();

    return top >= 0 && left >= 0 && bottom <= windowHeight() && right <= windowWidth();
}

/**
 * Verifies that an element is displayed inside a target element
 * @param element - Element to check
 * @param target - Target container element
 * @returns boolean indicating if element is within target
 * @memberof DOM
 */
export function isInElement(element: HTMLElement, target: HTMLElement): boolean {
    if (!(isHTMLElement(element)) || !(isHTMLElement(target))) {
        throw new TypeError("isInElement: both element and target must be valid HTML Elements");
    }

    const e = element.getBoundingClientRect();
    const t = target.getBoundingClientRect();

    // element fully inside target
    return t.top <= e.top &&
        t.left <= e.left &&
        e.right <= t.right &&
        e.bottom <= t.bottom;
}

/**
 * Checks if two numbers are approximately equal
 * @param a - First number
 * @param b - Second number
 * @param tolerance - Tolerance (default: EPSILON)
 * @returns boolean indicating approximate equality
 * @private
 */
function approximately(a: number, b: number, tolerance: number = EPSILON): boolean {
    return Math.abs(a - b) < tolerance;
}

/**
 * CSS property extractors for margins
 * @private
 */
const margin = {
    top: (style: CSSStyleDeclaration) => style.marginTop,
    right: (style: CSSStyleDeclaration) => style.marginRight,
    bottom: (style: CSSStyleDeclaration) => style.marginBottom,
    left: (style: CSSStyleDeclaration) => style.marginLeft,
};

/**
 * CSS property extractors for padding
 * @private
 */
const padding = {
    top: (style: CSSStyleDeclaration) => style.paddingTop,
    right: (style: CSSStyleDeclaration) => style.paddingRight,
    bottom: (style: CSSStyleDeclaration) => style.paddingBottom,
    left: (style: CSSStyleDeclaration) => style.paddingLeft,
};

/**
 * CSS property extractors for borders
 * @private
 */
const border = {
    top: (style: CSSStyleDeclaration) => style.borderTopWidth,
    right: (style: CSSStyleDeclaration) => style.borderRightWidth,
    bottom: (style: CSSStyleDeclaration) => style.borderBottomWidth,
    left: (style: CSSStyleDeclaration) => style.borderLeftWidth,
};

/**
 * Direction type for positioning
 */
type Direction = 'top' | 'right' | 'bottom' | 'left';

/**
 * Verifies if an element is the closest to a direction of a container
 * @param source - Source element
 * @param container - Container element
 * @param dir - Direction to check
 * @returns boolean indicating if source is closest to direction
 * @private
 */
function isClosestTo(source: HTMLElement, container: HTMLElement, dir: Direction): boolean {
    const sourceStyle = window.getComputedStyle(source);
    const containerStyle = window.getComputedStyle(container);

    const sourceMargin = margin[dir](sourceStyle);
    const containerPadding = padding[dir](containerStyle);
    const containerBorder = border[dir](containerStyle);

    const sourceDistance = source.getBoundingClientRect()[dir] + pixelToNumber(sourceMargin);
    const containerDistance = container.getBoundingClientRect()[dir]
        - pixelToNumber(containerPadding)
        - pixelToNumber(containerBorder);

    return approximately(sourceDistance, containerDistance, 2);
}

/**
 * Gets the first visible element
 * @param parent - Parent container
 * @param pred - Optional predicate to filter elements
 * @returns First visible element or null
 * @memberof DOM
 */
export function getVisibleElement(
    parent: HTMLElement,
    pred?: (el: HTMLElement) => boolean
): HTMLElement | null {
    const usePred = isFunction(pred);

    for (let i = 0; i < parent.children.length; i++) {
        const element = parent.children[i] as HTMLElement;

        if (usePred && !pred!(element)) {
            continue;
        }

        if (!isHidden(element)) {
            return element;
        }
    }

    return null;
}

/**
 * Cardinal direction type
 */
type CardinalDirection = 'up' | 'down' | 'left' | 'right';

/**
 * Get closest element from a direction inside an optional container
 * @param source - Source element
 * @param dir - Direction to search
 * @param container - Container element
 * @param relative - Whether to use relative positioning
 * @param pred - Optional predicate to filter elements
 * @returns Closest element or null
 * @memberof DOM
 */
export function getClosest(
    source: HTMLElement,
    dir: CardinalDirection,
    container: HTMLElement,
    relative: boolean = true,
    pred?: (el: HTMLElement) => boolean
): HTMLElement | null {
    switch (dir) {
        case 'up':
            return getElementTop(source, container, relative, pred);
        case 'down':
            return getElementBottom(source, container, relative, pred);
        case 'left':
            return getElementLeft(source, container, relative, pred);
        case 'right':
            return getElementRight(source, container, relative, pred);
        default:
            console.error("getClosest: unknown direction", dir);
            return null;
    }
}

/**
 * Default element filter (excludes hidden elements and source)
 * @private
 */
const defaultFilter = (source: HTMLElement) => (item: HTMLElement) =>
    !isHidden(item) && item !== source;

/**
 * Get closest element above a source element inside an optional container
 * @param source - Source element
 * @param container - Container element
 * @param relative - Whether to check if at container edge
 * @param pred - Optional predicate to filter elements
 * @returns Closest element above or null
 * @memberof DOM
 */
export function getElementTop(
    source: HTMLElement,
    container: HTMLElement,
    relative: boolean = true,
    pred?: (el: HTMLElement) => boolean
): HTMLElement | null {
    const items = container.children;
    const { top: top1, left: left1 } = source.getBoundingClientRect();

    if (relative && isClosestTo(source, container, 'top')) {
        return null;
    }

    const filterFn = pred || defaultFilter(source);
    let closest: HTMLElement | null = null;
    let vdist = Infinity;
    let hdist = Infinity;

    for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLElement;

        if (!filterFn(item)) {
            continue;
        }

        const { bottom: bottom2, left: left2 } = item.getBoundingClientRect();

        const $vdist = Math.abs(top1 - bottom2);
        const $hdist = Math.abs(left1 - left2);

        if (top1 >= (bottom2 - 1) && ($vdist < vdist || ($vdist === vdist && $hdist < hdist))) {
            closest = item;
            vdist = $vdist;
            hdist = $hdist;
        }
    }

    return closest;
}

/**
 * Get closest element on the left of a source element inside a container
 * @param source - Source element
 * @param container - Container element
 * @param relative - Whether to check if at container edge
 * @param pred - Optional predicate to filter elements
 * @returns Closest element to the left or null
 * @memberof DOM
 */
export function getElementLeft(
    source: HTMLElement,
    container: HTMLElement,
    relative: boolean = true,
    pred?: (el: HTMLElement) => boolean
): HTMLElement | null {
    const items = container.children;
    const { top: top1, left: left1 } = source.getBoundingClientRect();

    if (relative && isClosestTo(source, container, 'left')) {
        return null;
    }

    const filterFn = pred || defaultFilter(source);
    let closest: HTMLElement | null = null;
    let vdist = Infinity;
    let hdist = Infinity;

    for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLElement;

        if (!filterFn(item)) {
            continue;
        }

        const { top: top2, right: right2 } = item.getBoundingClientRect();

        const $vdist = Math.abs(top1 - top2);
        const $hdist = Math.abs(left1 - right2);

        if (left1 >= (right2 - 1) && ($hdist < hdist || ($hdist === hdist && $vdist < vdist))) {
            closest = item;
            vdist = $vdist;
            hdist = $hdist;
        }
    }

    return closest;
}

/**
 * Get closest element on the right of a source element inside a container
 * @param source - Source element
 * @param container - Container element
 * @param relative - Whether to check if at container edge
 * @param pred - Optional predicate to filter elements
 * @returns Closest element to the right or null
 * @memberof DOM
 */
export function getElementRight(
    source: HTMLElement,
    container: HTMLElement,
    relative: boolean = true,
    pred?: (el: HTMLElement) => boolean
): HTMLElement | null {
    const items = container.children;
    const { top: top1, right: right1 } = source.getBoundingClientRect();

    if (relative && isClosestTo(source, container, 'right')) {
        return null;
    }

    const filterFn = pred || defaultFilter(source);
    let closest: HTMLElement | null = null;
    let vdist = Infinity;
    let hdist = Infinity;

    for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLElement;

        if (!filterFn(item)) {
            continue;
        }

        const { top: top2, left: left2 } = item.getBoundingClientRect();

        const $vdist = Math.abs(top1 - top2);
        const $hdist = Math.abs(right1 - left2);

        if (right1 <= (left2 + 1) && ($hdist < hdist || ($hdist === hdist && $vdist < vdist))) {
            closest = item;
            vdist = $vdist;
            hdist = $hdist;
        }
    }

    return closest;
}

/**
 * Get closest element below a source element inside a container
 * @param source - Source element
 * @param container - Container element
 * @param relative - Whether to check if at container edge
 * @param pred - Optional predicate to filter elements
 * @returns Closest element below or null
 * @memberof DOM
 */
export function getElementBottom(
    source: HTMLElement,
    container: HTMLElement,
    relative: boolean = true,
    pred?: (el: HTMLElement) => boolean
): HTMLElement | null {
    const items = container.children;
    const { bottom: bottom1, left: left1 } = source.getBoundingClientRect();

    if (relative && isClosestTo(source, container, 'bottom')) {
        return null;
    }

    const filterFn = pred || defaultFilter(source);
    let closest: HTMLElement | null = null;
    let vdist = Infinity;
    let hdist = Infinity;

    for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLElement;

        if (!filterFn(item)) {
            continue;
        }

        const { top: top2, left: left2 } = item.getBoundingClientRect();

        const $vdist = Math.abs(bottom1 - top2);
        const $hdist = Math.abs(left1 - left2);

        if (bottom1 <= (top2 + 1) && ($vdist < vdist || ($vdist === vdist && $hdist < hdist))) {
            closest = item;
            vdist = $vdist;
            hdist = $hdist;
        }
    }

    return closest;
}

/**
 * Returns the closest element to the top of its parent container
 * @param container - Container element
 * @param pred - Optional predicate to filter elements
 * @returns The closest element to the top or null
 * @memberof DOM
 */
export function getTopElement(
    container: HTMLElement,
    pred?: (el: HTMLElement) => boolean
): HTMLElement | null {
    const items = container.children;
    const { top: top1, left: left1 } = container.getBoundingClientRect();

    if (items.length === 0) {
        return null;
    }

    const usePred = isFunction(pred);
    let closest: HTMLElement | null = null;
    let vdist = Infinity;
    let hdist = Infinity;

    for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLElement;

        if (usePred && !pred!(item)) {
            continue;
        }

        if (isHidden(item)) {
            continue;
        }

        const { top: top2, left: left2 } = item.getBoundingClientRect();

        const $vdist = Math.abs(top1 - top2);
        const $hdist = Math.abs(left1 - left2);

        if (top1 <= (top2 + 1) && ($vdist < vdist || ($vdist === vdist && $hdist < hdist))) {
            closest = item;
            vdist = $vdist;
            hdist = $hdist;
        }
    }

    return closest;
}

/**
 * Returns the closest element to the left side of its parent container
 * @param container - Container element
 * @param pred - Optional predicate to filter elements
 * @returns The closest element to the left side or null
 * @memberof DOM
 */
export function getLeftElement(
    container: HTMLElement,
    pred?: (el: HTMLElement) => boolean
): HTMLElement | null {
    const items = container.children;
    const { top: top1, left: left1 } = container.getBoundingClientRect();

    if (items.length === 0) {
        return null;
    }

    const usePred = isFunction(pred);
    let closest: HTMLElement | null = null;
    let vdist = Infinity;
    let hdist = Infinity;

    for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLElement;

        if (usePred && !pred!(item)) {
            continue;
        }

        if (isHidden(item)) {
            continue;
        }

        const { top: top2, left: left2 } = item.getBoundingClientRect();

        const $vdist = Math.abs(top1 - top2);
        const $hdist = Math.abs(left1 - left2);

        if (left1 <= (left2 + 1) && ($hdist < hdist || ($hdist === hdist && $vdist < vdist))) {
            closest = item;
            vdist = $vdist;
            hdist = $hdist;
        }
    }

    return closest;
}

/**
 * Returns the closest element to the right side of its parent container
 * @param container - Container element
 * @param pred - Optional predicate to filter elements
 * @returns The closest element to the right side or null
 * @memberof DOM
 */
export function getRightElement(
    container: HTMLElement,
    pred?: (el: HTMLElement) => boolean
): HTMLElement | null {
    const items = container.children;
    const { top: top1, right: right1 } = container.getBoundingClientRect();

    if (items.length === 0) {
        return null;
    }

    const usePred = isFunction(pred);
    let closest: HTMLElement | null = null;
    let vdist = Infinity;
    let hdist = Infinity;

    for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLElement;

        if (usePred && !pred!(item)) {
            continue;
        }

        if (isHidden(item)) {
            continue;
        }

        const { top: top2, right: right2 } = item.getBoundingClientRect();

        const $vdist = Math.abs(top1 - top2);
        const $hdist = Math.abs(right1 - right2);

        if (right1 >= (right2 - 1) && ($hdist < hdist || ($hdist === hdist && $vdist < vdist))) {
            closest = item;
            vdist = $vdist;
            hdist = $hdist;
        }
    }

    return closest;
}

/**
 * Returns the closest element to the bottom of its parent container
 * @param container - Container element
 * @param pred - Optional predicate to filter elements
 * @returns The closest element to the bottom or null
 * @memberof DOM
 */
export function getBottomElement(
    container: HTMLElement,
    pred?: (el: HTMLElement) => boolean
): HTMLElement | null {
    const items = container.children;
    const { bottom: bottom1, left: left1 } = container.getBoundingClientRect();

    if (items.length === 0) {
        return null;
    }

    const usePred = isFunction(pred);
    let closest: HTMLElement | null = null;
    let vdist = Infinity;
    let hdist = Infinity;

    for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLElement;

        if (usePred && !pred!(item)) {
            continue;
        }

        if (isHidden(item)) {
            continue;
        }

        const { bottom: bottom2, left: left2 } = item.getBoundingClientRect();

        const $vdist = Math.abs(bottom1 - bottom2);
        const $hdist = Math.abs(left1 - left2);

        if (bottom1 >= (bottom2 - 1) && ($vdist < vdist || ($vdist === vdist && $hdist < hdist))) {
            closest = item;
            vdist = $vdist;
            hdist = $hdist;
        }
    }

    return closest;
}
