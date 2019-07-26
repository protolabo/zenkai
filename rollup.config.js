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

function buildExport(input, output, _minfied) {
    var minfied = _minfied || output.file.endsWith('.min.js');
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
    buildExport('./src/index.js', buildOutput('zenkai.js', 'zenkai', { sourcemap: false })),
    buildExport('./src/index.js', buildOutput('zenkai.esm.js', 'zenkai', { sourcemap: false, format: 'esm' })),
    // Utils bundle
    buildExport('./src/utils/index.js', buildOutput('zenkai-utils.min.js', 'zutils')),
    buildExport('./src/utils/index.js', buildOutput('zenkai-utils.js', 'zutils', { sourcemap: false })),
    // Components bundle
    buildExport('./src/components/index.js', buildOutput('zenkai-components.min.js', 'zcomponents')),
    buildExport('./src/components/index.js', buildOutput('zenkai-components.js', 'zcomponents', { sourcemap: false })),
    // DOM bundle
    buildExport('./src/dom/index.js', buildOutput('zenkai-dom.min.js', 'zdom')),
    buildExport('./src/dom/index.js', buildOutput('zenkai-dom.js', 'zdom', { sourcemap: false })),
    // DataType bundle
    buildExport('./src/datatype/index.js', buildOutput('zenkai-type.min.js', 'ztype')),
    buildExport('./src/datatype/index.js', buildOutput('zenkai-type.js', 'ztype', { sourcemap: false }), false)
];