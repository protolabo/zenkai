/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

var fs = require('fs');
var path = require('path');
var CleanCSS = require('clean-css');

const DIRECTORY = './dist/css';

var bundle = new CleanCSS({
    sourceMap: true,
    rebaseTo: `${DIRECTORY}/form.min.css`
}).minify([
    './src/ui/css/form.css'
]);

// log bundle result
outputFeedback(bundle.errors, true);
outputFeedback(bundle.warnings);
// write bundle file
if (!fs.existsSync(DIRECTORY)) {
    fs.mkdirSync(DIRECTORY, { recursive: true });
}
output({ path: `${DIRECTORY}/form.min.css` }, bundle.styles);
output({ path: `${DIRECTORY}/form.min.map` }, bundle.sourceMap);

function outputFeedback(messages, isError) {
    var prefix = isError ? '\x1B[31mERROR\x1B[39m:' : 'WARNING:';

    messages.forEach(function (message) {
        console.error('%s %s', prefix, message);
    });
}

function output(options, minified) {
    fs.writeFileSync(options.path, minified, 'utf8');
}

