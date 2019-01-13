import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default [
    {
        input: './src/index.js',
        output: {
            file: './dist/jslib-utils.min.js',
            name: 'jsLabo',
            format: 'iife',
            interop: false,
        },
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },
    {
        input: './src/dom/index.js',
        output: {
            file: './dist/dom-utils.min.js',
            name: 'jsDOM',
            format: 'iife',
            interop: false,
        },
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },
    {
        input: './src/datatype/index.js',
        output: {
            file: './dist/type-utils.min.js',
            name: 'jsType',
            format: 'iife',
            interop: false,
        },
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },   
]