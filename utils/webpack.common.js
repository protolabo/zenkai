const path = require('path');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'jslib-utils.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'jsLabo',
        libraryTarget: 'umd'
    },
    resolve: {
        alias: {
            '@': '.',
            '@src': path.resolve(__dirname, 'src')
        }
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.m?js$/,
    //             exclude: /(node_modules|bower_components)/,
    //             use: {
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: ['@babel/preset-env']
    //                 }
    //             }
    //         }
    //     ]
    // }
};