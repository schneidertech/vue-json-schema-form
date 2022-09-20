/**
 * Created by Liu.Jun on 2020/4/28 15:36.
 */

export function vm2Api(vmData) {
    return vmData.map(item => ({
        name: item.name,
        value: item.componentValue,
    }));
}

function getComponentMap(configTools) {
    const componentList = configTools.reduce((preVal, curVal) => [
        ...preVal,
        ...curVal.componentList
    ], []);

    //
    return componentList.reduce((preVal, componentItem) => {
        preVal[componentItem.name] = componentItem;
        return preVal;
    }, {});
}

export function api2VmToolItem(configTools, apiData) {
    const componentMap = getComponentMap(configTools);
    try {
        const apiJson = apiData === String(apiData) ? JSON.parse(apiData) : apiData;
        return apiJson.map(({ name, value }) => ({
            ...componentMap[name],
            componentValue: value
        }));
    } catch (e) {
        //
        return [];
    }
}
