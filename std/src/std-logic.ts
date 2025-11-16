import { isFunction } from "./std-parse";

/**
 * Predicate function type
 */
type Predicate<T> = (...args: T extends any[] ? T : [T]) => boolean;

/**
 * Verifies that the condition is satisfied for a specified number (range) of values
 * @param values - Set of values
 * @param pred - Condition
 * @param min - Minimum number of values that must satisfy the condition
 * @param max - Maximum number of values that must satisfy the condition
 * @returns A value indicating whether the condition is satisfied for the specified range
 */
export function assert<T>(
    values: T[],
    pred: Predicate<T>,
    min?: number,
    max?: number
): boolean {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    const hitCount = getHitCount(values, pred);

    if (all([min, max], Number.isInteger)) {
        if (max! < min!) {
            throw new Error("Bad argument: max must be greater than min");
        }

        return hitCount >= min! && hitCount <= max!;
    }

    if (Number.isInteger(min)) {
        return hitCount >= min!;
    }

    if (Number.isInteger(max)) {
        return hitCount <= max!;
    }

    return hitCount > 0;
}

/**
 * Verifies that at least one value satisfies the condition
 * @param values - Set of values
 * @param pred - Condition
 * @returns A value indicating whether at least one value satisfies the condition
 */
export function some<T>(values: T[], pred: Predicate<T>): boolean {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if (pred(...(Array.isArray(value) ? value : [value]) as any)) {
            return true;
        }
    }

    return false;
}

/**
 * Verifies that all the values satisfy the condition
 * @param values - Set of values
 * @param pred - Condition
 * @returns A value indicating whether all the values satisfy the condition
 */
export function all<T>(values: T[], pred: Predicate<T>): boolean {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if (!pred(...(Array.isArray(value) ? value : [value]) as any)) {
            return false;
        }
    }

    return true;
}

/**
 * Verifies that exactly one value satisfies the condition
 * @param values - Set of values
 * @param pred - Condition
 * @returns A value indicating whether exactly one value satisfies the condition
 */
export function one<T>(values: T[], pred: Predicate<T>): boolean {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    return getHitCount(values, pred) === 1;
}

/**
 * Verifies that no value satisfies the condition
 * @param values - Set of values
 * @param pred - Condition
 * @returns A value indicating whether no value satisfies the condition
 */
export function no<T>(values: T[], pred: Predicate<T>): boolean {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    return getHitCount(values, pred) === 0;
}

/**
 * Verifies that at most one value satisfies the condition
 * @param values - Set of values
 * @param pred - Condition
 * @returns A value indicating whether at most one value satisfies the condition
 */
export function lone<T>(values: T[], pred: Predicate<T>): boolean {
    if (!(Array.isArray(values) && isFunction(pred))) {
        throw new TypeError("Bad argument");
    }

    return getHitCount(values, pred) <= 1;
}

/**
 * Gets the number of values that satisfy the condition
 * @param values - Array of values
 * @param pred - Predicate function
 * @returns Number of values satisfying the condition
 * @private
 */
function getHitCount<T>(values: T[], pred: Predicate<T>): number {
    let counter = 0;

    for (let i = 0; i < values.length; i++) {
        const value = values[i];

        if (pred(...(Array.isArray(value) ? value : [value]) as any)) {
            counter++;
        }
    }

    return counter;
}
