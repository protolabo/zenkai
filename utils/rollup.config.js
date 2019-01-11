import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: './src/index.js',
    output: {
        file: './dist/jslib-utils.js',
        name: 'jsLabo',
        format: 'iife'
    },
    plugins: [babel({
        exclude: 'node_modules/**'
    }), uglify()]
}