/**
 * Return a random integer between min and max (inclusive).
 * @param min - minimum value
 * @param max - maximum value (optional, if omitted min becomes max and min becomes 0)
 * @param secure - use cryptographically secure random (default: false)
 * @returns Random integer
 * @memberof STD
 */
export function random(min: number, max?: number, secure: boolean = false): number {
    if (!Number.isInteger(min)) {
        throw new TypeError("Bad argument: min must be an integer");
    }

    if (max === undefined) {
        max = min;
        min = 0;
    } else if (!Number.isInteger(max)) {
        throw new TypeError("Bad argument: max must be an integer");
    }

    if (max < min) {
        throw new Error("Bad argument: max must be greater than or equal to min");
    }

    return min + Math.floor((secure ? secureMathRandom() : Math.random()) * (max - min + 1));
}

/**
 * More secure implementation of `Math.random`
 * Works in both browser and Node.js environments
 * @private
 */
function secureMathRandom(): number {
    // Browser environment
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        // Divide a random UInt32 by the maximum value (2^32 - 1) to get a result between 0 and 1
        return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
    }
    
    // Node.js environment
    if (typeof global !== 'undefined' && typeof require !== 'undefined') {
        try {
            const crypto = require('crypto');
            return crypto.randomBytes(4).readUInt32BE(0) / 4294967295;
        } catch (e) {
            // Fall back to Math.random if crypto is not available
            console.warn('Secure random not available, falling back to Math.random');
            return Math.random();
        }
    }
    
    // Fallback
    return Math.random();
}
