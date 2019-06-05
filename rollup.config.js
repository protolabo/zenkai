import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

function buildOutput(file, name, options) {
    return Object.assign({
        file: `./dist/${file}`,
        name: name,
        format: 'iife',
        interop: false,
        sourcemap: true,
    }, options);
}

function buildExport(input, output, minfied = true) {
    var out = {
        input: input,
        output: output,
        plugins: null
    };
    out.plugins = minfied ? [babel({ exclude: 'node_modules/**' }), uglify()] : [babel({ exclude: 'node_modules/**' })];

    return out;
}

export default [
    // Zenkai complete bundle
    buildExport('./src/index.js', buildOutput('zenkai.min.js', 'zenkai')),
    buildExport('./src/index.js', buildOutput('zenkai.js', 'zenkai', { sourcemap: false }), false),
    // Utils bundle
    buildExport('./src/utils/index.js', buildOutput('zenkai-utils.min.js', '_utils')),
    buildExport('./src/utils/index.js', buildOutput('zenkai-utils.js', '_utils', { sourcemap: false }), false),
    // Components bundle
    buildExport('./src/components/index.js', buildOutput('zenkai-components.min.js', '_components')),
    buildExport('./src/components/index.js', buildOutput('zenkai-components.js', '_components', { sourcemap: false }), false),
    // DOM (Utils) bundle
    buildExport('./src/utils/dom/index.js', buildOutput('zenkai-utils-dom.min.js', '__dom')),
    buildExport('./src/utils/dom/index.js', buildOutput('zenkai-utils-dom.js', '__dom', { sourcemap: false }), false),
    // DataType (Utils) bundle
    buildExport('./src/utils/datatype/index.js', buildOutput('zenkai-utils-type.min.js', '__type')),
    buildExport('./src/utils/datatype/index.js', buildOutput('zenkai-utils-type.js', '__type', { sourcemap: false }), false),
];