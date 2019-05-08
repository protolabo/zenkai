/** 
 * Ajax namespace
 * @namespace AJAX 
 */

import { isFunction } from "./datatype/index.js";

const HttpResponse = {
    // Successful
    OK: 200,
    Created: 201,
    Accepted: 202,
    NoContent: 204,
    // Client Error
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    UnsupportedMediaType: 415,
    // Server Error
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavaible: 503,
    GatewayTimeout: 504
};

const State = {
    OPENED: 1,
    RECEIVED: 2,
    LOADING: 3,
    DONE: 4
};

const xhrHandler = function (type, file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === State.DONE) {
            if (xhr.status === HttpResponse.OK) {
                if (isFunction(callback)) {
                    callback(xhr.responseText);
                }
            } else {
                if (isFunction(callback)) {
                    callback(xhr.status);
                }
            }
        }
    };
    xhr.open(type, file, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    return xhr;
};

/**
 * 
 * @param {*} file 
 * @param {*} callback 
 * @memberof AJAX
 */
export function GET(file, callback) {
    var xhr = xhrHandler('GET', file, callback);
    xhr.send();
}

/**
 * 
 * @param {*} file 
 * @param {*} form 
 * @param {*} callback 
 * @memberof AJAX
 */
export function POST(file, form, callback) {
    var xhr = xhrHandler('POST', file, callback);
    xhr.send(form);
}

/**
 * 
 * @param {*} file 
 * @param {*} form 
 * @param {*} callback 
 * @memberof AJAX
 */
export function PUT(file, form, callback) {
    var xhr = xhrHandler('PUT', file, callback);
    xhr.send(form);
}

/**
 * 
 * @param {*} file 
 * @param {*} form 
 * @param {*} callback 
 * @memberof AJAX
 */
export function DELETE(file, form, callback) {
    var xhr = xhrHandler('DELETE', file, callback);
    xhr.send(form);
}