/**
 * Created by Liu.Jun on 2020/3/28 10:02 .
 */

function merge(target, other) {
    target.push(...other);
}

function ensure(target, item) {
    //
    if (target.indexOf(item) === -1) {
        target.push(item);
    }
    return target;
}

function removeAt(target, index) {
    //
    return !!target.splice(index, 1).length;
}

//
function remove(target, item) {
    //
    const index = target.indexOf(item);
    if (~index) {
        return removeAt(target, index);
    }
    return false;
}

function toMap(target, key) {
    return target.reduce((preVal, curVal) => {
        preVal[curVal[key]] = curVal;
        return preVal;
    }, {});
}

//
function isFirst(target, item) {
    return target.indexOf(item) === 0;
}

//
function isLast(target, item) {
    return target.indexOf(item) === target.length - 1;
}

//  index
function moveUpAt(target, index) {
    if (index === 0) return false;
    const item = target[index];
    const newItems = [item, target[index - 1]];
    return target.splice(index - 1, 2, ...newItems);
}

//
function moveUp(target, item) {
    if (isFirst(target, item)) {
        //
        return false;
    }

    const index = target.indexOf(item);

    const newItems = [item, target[index - 1]];
    return target.splice(index - 1, 2, ...newItems);
}

//  index
function moveDownAt(target, index) {
    if (index === target.length - 1) return false;
    const item = target[index];
    const newItems = [target[index + 1], item];
    return target.splice(index, 2, ...newItems);
}

//
function moveDown(target, item) {
    if (isLast(target, item)) {
        //
        return false;
    }

    const index = target.indexOf(item);

    const newItems = [target[index + 1], item];
    return target.splice(index, 2, ...newItems);
}

//
// function insert(target, items, index) {
//     return target.splice(index + 1, 0, ...items);
// }

export {
    merge,
    ensure,
    removeAt,
    remove,
    toMap,
    isFirst,
    isLast,
    moveDown,
    moveDownAt,
    moveUp,
    moveUpAt,
};
