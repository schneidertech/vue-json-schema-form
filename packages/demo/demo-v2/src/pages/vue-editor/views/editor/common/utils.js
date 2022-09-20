/**
 * Created by Liu.Jun on 2019/11/28 18:37.
 */

import { genId } from 'demo-common/utils/id';


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

//
export function getComponentsAndInitToolsConfig(configTools) {
    //
    const componentList = configTools.reduce((preVal, curVal) => [
        ...preVal,
        ...curVal.componentList
    ], []);

    //
    const data = componentList.reduce((preVal, { name: configItemName, componentPack }) => {
        //
        //  FromView Name
        const needViewName = !componentPack.componentViewName;
        const needFormName = componentPack.Form && !componentPack.componentFormName;

        // viewName  formName
        if (needViewName || needFormName) {
            const id = configItemName || genId();
            if (needViewName) componentPack.componentViewName = `View${id}`;
            if (needFormName) componentPack.componentFormName = `Form${id}`;
        }

        if (componentPack.componentFormName) {
            preVal[componentPack.componentFormName] = componentPack.Form;
        }
        preVal[componentPack.componentViewName] = componentPack.View;

        Object.freeze(componentPack);
        return preVal;
    }, {});


    //
    Object.freeze(configTools);
    return data;
}
