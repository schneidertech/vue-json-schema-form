/**
 * Created by Liu.Jun on 2018/5/31.
 */

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const envConfig = require('./envConfig');

// n
// const arrayIntersection = (...arg) => {
//     arg.reduce((previousValue, currentValue) => previousValue.filter(v => currentValue.includes(v)), arg[0]);
// };

//  entry
const isEntry = (filePath, curDir) => {
    //
    const exclude = ['/template/', '/component/', '/components/', '/module/', '/modules/'];

    //
    const isSame = (path.dirname(filePath).split('/').pop() === path.basename(filePath).split('.')[0]);

    //
    const isEntryFile = isSame && exclude.every(exStr => !filePath.includes(exStr));

    if (isEntryFile && curDir.length > 0) {
        //
        return curDir.some(dirItem => ~filePath.indexOf(dirItem));
    }
    return isEntryFile;
};

//
const defaultTemp = path.resolve(__dirname, '../default.html');

function entryFn({ dir, chunks = [] }) {
    // entry
    const dirPath = path.normalize(path.resolve(__dirname, '../src/pages'));

    // entry
    const filePath = path.normalize(path.resolve(__dirname, '../src/pages/**/*.js'));

    const temFiles = glob.sync(filePath);
    const curDir = dir ? String(dir).split(',') : [];

    // isEntry + component
    const files = temFiles.filter(v => isEntry(v, curDir));

    let openPage = null;
    const entries = files.reduce((preValue, entry, index) => {
        const dirName = path.normalize(path.dirname(entry));
        const entryName = dirName.substring(path.normalize(dirPath).length + 1).replace(/\\/g, '/');

        // const fileName = path.basename(entry, path.extname(entry));

        //  entry
        if (index === 0) openPage = `${entryName}.html`;

        preValue[entryName] = {
            entry,
            template: fs.existsSync(entry.replace('.js', '.html')) ? entry.replace('.js', '.html') : defaultTemp,
            filename: `${entryName}.html`,
            title: `${entryName} - Test Demo`,
            chunks: [
                entryName,
                ...chunks
            ]
            // chunks to include on this pages, by default includes
            // extracted common chunks and vendor chunks.
            // chunks: ['chunk-runtime', 'chunk-vendors-polyfill', 'index']
        };
        return preValue;
    }, {});

    return {
        entries,
        openPage
    };
}

module.exports = ({
    chunks = []
} = {}) => {
    //
    const {
        dir, //
    } = envConfig.getConfig();

    return entryFn({
        dir,
        chunks
    });
};
