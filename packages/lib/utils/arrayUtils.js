/**
 * Created by Liu.Jun on 2020/4/25 10:53.
 */

//  index
export function moveUpAt(target, index) {
    if (index === 0) return false;
    const item = target[index];
    const newItems = [item, target[index - 1]];
    return target.splice(index - 1, 2, ...newItems);
}

//  index
export function moveDownAt(target, index) {
    if (index === target.length - 1) return false;
    const item = target[index];
    const newItems = [target[index + 1], item];
    return target.splice(index, 2, ...newItems);
}

//
export function removeAt(target, index) {
    //
    return !!target.splice(index, 1).length;
}

//
export function fillObj(target, data) {
    //
    try {
        if (typeof data === 'object') {
            return target.fill(null).map(() => JSON.parse(JSON.stringify(data)));
        }
    } catch (e) {
        // nothing ...
    }

    //  undefined
    return undefined;
}

//
export function cutOff(target, cutOffPointIndex) {
    return target.reduce((preVal, curVal, curIndex) => {
        preVal[curIndex > cutOffPointIndex ? 1 : 0].push(curVal);
        return preVal;
    }, [[], []]);
}

//
export function intersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item));
}
