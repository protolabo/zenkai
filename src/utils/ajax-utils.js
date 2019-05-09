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

/**
 * An XHR resposne
 * @typedef {Object} xhrResponse
 * @property {number} status - The response status code
 * @property {string} message - The response content
 */

/**
 * @callback xhrCallback
 * @param  {xhrResponse} response - The XHR response object
 */

/**
 * 
 * @param {('GET'|'POST'|'PUT'|'DELETE')} type The HTTP method
 * @param {string} url The URL to send the request 
 * @param {*} successPred The success condition
 * @param {xhrCallback} successCb A callback function to handle a successful request
 * @param {xhrCallback} failureCb A callback function to handle a failed request
 */
const xhrHandler = function (type, url, successPred, successCb, failureCb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === State.DONE) {
            var response = {
                status: xhr.status,
                message: xhr.responseText
            };
            if (successPred(xhr.status)) {
                if (isFunction(successCb)) {
                    successCb(response);
                }
            }
            else {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (isFunction(successCb)) {
                        successCb(response);
                    }
                }
                if (isFunction(failureCb)) {
                    failureCb(response);
                }
            }
        }
    };
    xhr.open(type, url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    return xhr;
};

/**
 * Sends a GET request
 * @param {string} url The URL to send the request 
 * @param {xhrCallback} [success] A callback function to handle a successful request
 * @param {xhrCallback} [fail] A callback function to handle a failed request
 * @memberof AJAX
 */
export function GET(url, success, fail) {
    const successCondition = (status) => status === HttpResponse.OK;
    var xhr = xhrHandler('GET', url, successCondition, success, fail);
    xhr.send();
}

/**
 * Sends a POST request
 * @param {string} url The URL to send the request 
 * @param {*} data The data to be sent in the request
 * @param {xhrCallback} [success] A callback function to handle a successful request
 * @param {xhrCallback} [fail] A callback function to handle a failed request
 * @memberof AJAX
 */
export function POST(url, data, success, fail, options) {
    const successCond = (status) => isFunction(options.successPred) ? options.successPred(status) : status === HttpResponse.Created;
    const successCondition = isFunction(options.successPred) ? options.successPred : (status) => status === HttpResponse.Created;
    var xhr = xhrHandler('POST', url, successCondition, success, fail);
    xhr.send(data);
}

/**
 * Sends a PUT request
 * @param {string} url The URL to send the request 
 * @param {*} data The data to be sent in the request
 * @param {xhrCallback} [success] A callback function to handle a successful request
 * @param {xhrCallback} [fail] A callback function to handle a failed request
 * @memberof AJAX
 */
export function PUT(url, data, success, fail) {
    const successCondition = (status) => [HttpResponse.OK, HttpResponse.NoContent].includes(status);
    var xhr = xhrHandler('PUT', url, successCondition, success, fail);
    xhr.send(data);
}

/**
 * Sends a DELETE request
 * @param {string} url The URL to send the request 
 * @param {*} data The data to be sent in the request
 * @param {xhrCallback} [success] A callback function to handle a successful request
 * @param {xhrCallback} [fail] A callback function to handle a failed request
 * @memberof AJAX
 */
export function DELETE(url, data, success, fail) {
    const successCondition = (status) => [HttpResponse.OK, HttpResponse.Accepted, HttpResponse.NoContent].includes(status);
    var xhr = xhrHandler('DELETE', url, successCondition, success, fail);
    xhr.send(data);
}