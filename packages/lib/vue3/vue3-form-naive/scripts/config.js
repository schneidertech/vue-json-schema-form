/**
 * Created by Liu.Jun on 2020/6/2 16:00.
 */

const path = require('path');

const resolve = p => path.resolve(__dirname, '../', p);

const packageData = require('../package.json');

// eslint-disable-next-line max-len
const banner = `/** @license ${packageData.name} (c) 2020-${new Date().getFullYear()} ${packageData.author} License: ${packageData.license} */`;

module.exports = {
    entry: resolve('src/index.js'),
    banner,
    external: ['vue'],
    globals: {
        vue: 'Vue'
    },
    extractcss: false,
    output: {
        path: resolve('dist/'),
        file: 'vue3-form-naive', //  format
        name: 'vue3FormNaive', // umd
        format: ['esm', 'umd']
    }
};
