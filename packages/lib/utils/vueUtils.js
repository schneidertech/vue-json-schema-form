/**
 * Created by Liu.Jun on 2020/4/25 14:45.
 */

import Vue from 'vue';

//  . key.
const pathSeparator = '.';

// nodePath css
export function nodePath2ClassName(path) {
    const rootPathName = '__pathRoot';
    return path ? `${rootPathName}.${path}`.replace(/\./g, '_') : rootPathName;
}

//
export function isRootNodePath(path) {
    return path === '';
}

// path
export function computedCurPath(prePath, curKey) {
    return prePath === '' ? curKey : [prePath, curKey].join(pathSeparator);
}

// path
export function deletePathVal(vueData, name) {
    Vue.delete(vueData, name);
}

// path
export function setPathVal(obj, path, value) {
    // Vue.set ?
    const pathArr = path.split(pathSeparator);
    for (let i = 0; i < pathArr.length; i += 1) {
        if (pathArr.length - i < 2) {
            //
            // obj[pathArr[pathArr.length - 1]] = value;
            Vue.set(obj, pathArr[pathArr.length - 1], value);
            break;
        }
        obj = obj[pathArr[i]];
    }
}

// path
export function getPathVal(obj, path, leftDeviation = 0) {
    const pathArr = path.split(pathSeparator);

    for (let i = 0; i < pathArr.length - leftDeviation; i += 1) {
        // undefined
        if (obj === undefined) return undefined;
        obj = pathArr[i] === '' ? obj : obj[pathArr[i]];
    }
    return obj;
}

// path props
export function path2prop(path) {
    return path;
}
