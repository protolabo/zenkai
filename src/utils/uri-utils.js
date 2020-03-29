/**
 * @namespace URI
 */

import { isNullOrWhitespace, valOrDefault } from '@std/index.js';

const encode = encodeURIComponent;

/**
 * Extracts and returns the protocol and host of a given url
 * @param {string} url 
 * @memberof URI
 */
export function getRootUrl(url) {
    return url.toString().replace(/^(.*\/\/[^/?#]*).*$/, "$1");
}

/**
 * Extracts and returns the parameters of a URL
 * @param {string} [prop] Searched parameter
 * @param {string} [defValue] Searched parameter default value
 * @memberof URI
 */
export function getUrlParams(prop, defValue) {
    var search = decodeURIComponent(window.location.search);

    if (isNullOrWhitespace(search)) {
        return null;
    }

    var params = {};
    if ('URLSearchParams' in window) {
        let searchParams = new URLSearchParams(search.substring(1));
        for (const pair of searchParams.entries()) {
            params[pair[0]] = pair[1];
        }
        if (prop) {
            return searchParams.get(prop);
        }

        return params;
    }

    var defs = search.substring(1).split('&');
    defs.forEach((val) => {
        var parts = val.split('=', 2);
        params[parts[0]] = parts[1];
    });
    
    if (prop) {
        return valOrDefault(params[prop], defValue);
    }

    return params;
}

/* istanbul ignore next */
function getParams(href) {
    return href.slice(href.indexOf('?') + 1);
}

/**
 * Creates a query string
 * @param {Object} query 
 * @returns {string} Query string
 * @memberof URI
 */
export function queryBuilder(query, ignoreNullOrEmpty = false) {
    var str = [];

    Object.keys(query).forEach((prop) => {
        if (!ignoreNullOrEmpty || !isNullOrWhitespace(query[prop])) {
            str.push(`${encode(prop)}=${encode(query[prop])}`);
        }
    });

    return str.join('&');
}