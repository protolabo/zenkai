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
    buildExport('./src/index.js', buildOutput('zenkai.esm.js', 'zenkai', { sourcemap: false, format: 'esm' }), false),
    // Utils bundle
    buildExport('./src/utils/index.js', buildOutput('zenkai-utils.min.js', '_utils')),
    buildExport('./src/utils/index.js', buildOutput('zenkai-utils.js', '_utils', { sourcemap: false }), false),
    // Components bundle
    buildExport('./src/components/index.js', buildOutput('zenkai-components.min.js', '_components')),
    buildExport('./src/components/index.js', buildOutput('zenkai-components.js', '_components', { sourcemap: false }), false),
    // DOM bundle
    buildExport('./src/dom/index.js', buildOutput('zenkai-dom.min.js', '_dom')),
    buildExport('./src/dom/index.js', buildOutput('zenkai-dom.js', '_dom', { sourcemap: false }), false),
    // DataType bundle
    buildExport('./src/datatype/index.js', buildOutput('zenkai-type.min.js', '_type')),
    buildExport('./src/datatype/index.js', buildOutput('zenkai-type.js', '_type', { sourcemap: false }), false),
];