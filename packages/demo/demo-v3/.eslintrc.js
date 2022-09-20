"use strict";

module.exports = {
    root: true,
    env: {
        browser: true,
        worker: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    plugins: ['vue'],
    extends: [
        '@snema/eslint-config',
        '@snema/eslint-config/vue'
    ],
    rules: {
        //
        'import/no-cycle': 'off',
    },
    globals: {
        'self': true
    },
    overrides: [
        {
            files: ["*.vue"],
            rules: {
                "indent": "off",
            }
        }
    ]
};
