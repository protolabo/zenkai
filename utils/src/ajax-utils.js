import { isFunction } from "./datatype/index.js";

const xhrHandler = function(type, file, callback) {
    var xhr = new XMLHttpRequest();    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (isFunction(callback)) {
                callback(xhr.responseText);
            }
        }
    };
    xhr.open(type, file, true);

    return xhr;
};

export function GET (file, callback) {
    var xhr = xhrHandler('GET', file, callback);
    xhr.send();
}

export function POST(file, form, callback) {
    var xhr = xhrHandler('POST', file, callback);
    xhr.send(form);
}

export function DELETE(file, form, callback) {
    var xhr = xhrHandler('DELETE', file, callback);
    xhr.send(form);
}