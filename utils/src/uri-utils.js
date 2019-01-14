/** @module uri */

/**
 * Extracts and returns the parameters of a URL
 * @param {string} [prop] Searched parameter
 */
export function getUrlPrams(prop) {
    var href = window.location.href;
    var search = decodeURIComponent(href.slice(href.indexOf('?') + 1));
    if (this.isNullOrWhiteSpace(search)) {
        return undefined;
    }

    var defs = search.split('&');
    var params = {};
    defs.forEach((val) => {
        var parts = val.split('=', 2);
        params[parts[0]] = parts[1];
    });

    if (prop) {
        return params[prop];
    }
    return params;
}