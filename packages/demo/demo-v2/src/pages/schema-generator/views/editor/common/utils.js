/**
 * Created by Liu.Jun on 2019/11/28 18:37.
 */

// import { genId } from 'demo-common/utils/id';

export function isObject(obj) {
    return (Object.prototype.toString.call(obj) === '[object Object]');
}

export function isEmptyObject(obj) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

export function deepFreeze(obj) {
    // obj
    const propNames = Object.getOwnPropertyNames(obj);

    //
    propNames.forEach((name) => {
        const prop = obj[name];

        // prop
        if (typeof prop === 'object' && prop !== null) deepFreeze(prop);
    });

    // (no-op if already frozen)
    return Object.freeze(obj);
}
