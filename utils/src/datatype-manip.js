export const DataTypeManip = {
    /**
     * Converts a boolean to an integer
     * @param {boolean} val 
     * @returns {int} 1 or 0
     */
    boolToInt(val) { return val ? 1 : 0; },
    /**
     * Converts to boolean
     */
    toBoolean: function (val) {
        val = this.valOrDefault(val, false);
        return val === true || val.toString().toLowerCase() === 'true';
    },
    /**
     * Returns a value indicating whether the variable is an Integer
     * @returns {boolean}
     */ 
    isInt: function (n) { return n % 1 === 0; },
    /**
     * Returns a value indicating whether the variable is a String
     * @returns {boolean}
     */ 
    isString(str) { return typeof str === 'string' || str instanceof String; },
}