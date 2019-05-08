import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default [
    {
        input: './src/index.js',
        output: {
            file: './dist/jslib.min.js',
            name: 'jsLabo',
            format: 'iife',
            interop: false,
            sourcemap: true,
        },
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },
    {
        input: './src/utils/index.js',
        output: {
            file: './dist/jslib-utils.min.js',
            name: 'jsUtils',
            format: 'iife',
            interop: false,
            sourcemap: true,
        },
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },
    {
        input: './src/utils/index.js',
        output: {
            file: './dist/jslib-components.min.js',
            name: 'jsComponents',
            format: 'iife',
            interop: false,
            sourcemap: true,
        },
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },
    {
        input: './src/utils/dom/index.js',
        output: {
            file: './dist/dom-utils.min.js',
            name: 'jsDOM',
            format: 'iife',
            interop: false,
            sourcemap: true,
        },
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    },
    {
        input: './src/utils/datatype/index.js',
        output: {
            file: './dist/type-utils.min.js',
            name: 'jsType',
            format: 'iife',
            interop: false,
            sourcemap: true,
        },
        plugins: [babel({
            exclude: 'node_modules/**'
        }), uglify()]
    }
];