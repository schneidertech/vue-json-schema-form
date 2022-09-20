module.exports = {
    plugins: [
        // '@babel/plugin-proposal-export-default-from'
    ],
    presets: [
        [
            '@snema/babel-preset-app',
            {
                useBuiltIns: false,
                regenerator: true,
                helpers: true
            }
        ]
    ]
};
