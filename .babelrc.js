/* istanbul ignore file */

const presets = [
    [
        "@babel/preset-env",
        {
            "modules": process.env['NODE_ENV'] === 'test' ? 'commonjs' : false
        }
    ]
];
const plugins = [
    [
        "module-resolver",
        {
            "root": ["."],
            "alias": {
                "@src": "./src",
                "@dom": "./src/dom",
                "@datatype": "./src/datatype",
                "@utils": "./src/utils"
            }
        }
    ]
];

module.exports = { presets, plugins };
