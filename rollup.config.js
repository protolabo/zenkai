import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

function buildOutput(file, name) {
    return {
        file: `./dist/${file}`,
        name: name,
        format: 'iife',
        interop: false,
        sourcemap: true,
    };
}

export default [
    {
        input: './src/index.js',
        output: buildOutput('zenkai.min.js', 'zenkai'),
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },
    {
        input: './src/utils/index.js',
        output: buildOutput('zenkai-utils.min.js', '_utils'),
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },
    {
        input: './src/utils/index.js',
        output: buildOutput('zenkai-components.min.js', '_components'),
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },
    {
        input: './src/utils/dom/index.js',
        output: buildOutput('zenkai-utils-dom.min.js', '__dom'),
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },
    {
        input: './src/utils/datatype/index.js',
        output: buildOutput('zenkai-utils-type.min.js', '__type'),
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    }
];