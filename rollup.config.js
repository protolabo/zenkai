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
    out.plugins = minfied ?
        [babel({ exclude: 'node_modules/**' }), uglify()] :
        [babel({ exclude: 'node_modules/**' })];

    return out;
}

export default [
    // Zenkai complete bundle
    buildExport('./src/index.js', buildOutput('zenkai.min.js', 'zenkai')),
    buildExport('./src/index.js', buildOutput('zenkai.js', 'zenkai', { sourcemap: false })),
    buildExport('./src/index.js', buildOutput('zenkai.esm.js', 'zenkai', { sourcemap: false, format: 'esm' })),
    // UI bundle
    buildExport('./src/ui/index.js', buildOutput('zenkai-ui.min.js', 'zenui')),
    buildExport('./src/ui/index.js', buildOutput('zenkai-ui.js', 'zenui', { sourcemap: false })),
    // DOM bundle
    buildExport('./src/dom/index.js', buildOutput('zenkai-dom.min.js', 'zendom')),
    buildExport('./src/dom/index.js', buildOutput('zenkai-dom.js', 'zendom', { sourcemap: false })),
    // STD bundle
    buildExport('./src/std/index.js', buildOutput('zenkai-std.min.js', 'zenstd')),
    buildExport('./src/std/index.js', buildOutput('zenkai-std.js', 'zenstd', { sourcemap: false }), false)
];