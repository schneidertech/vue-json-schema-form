/**
 * Created by Liu.Jun on 2020/12/9 16:59.
 */

import { formUtils, getDefaultFormState } from '@snema/vue-json-schema-form';
import { generateEditorItem, deFormatFormLabelWidth } from './editorData';
import { isObject } from './utils';

function flatToolItems(toolItems) {
    return toolItems.reduce((preVal, curVal) => [
        ...preVal,
        ...curVal.componentList
    ], []);
}

const getDefaultFormDataBySchema = (() => {
    // cache
    const cacheValueMap = new Map();

    return (schema) => {
        if (!cacheValueMap.has(schema)) {
            //
            const formData = getDefaultFormState(schema, {}, schema);
            cacheValueMap.set(schema, formData);
        }

        return cacheValueMap.get(schema);
    };
})();

function schemaIncludes(target = {}, baseSchema = {}) {
    const keys = Object.keys(baseSchema);
    return keys.every((k) => {
        // title
        if (k === 'title') return true;

        // Array
        if (Array.isArray(target[k])) return true;

        //
        if (isObject(target[k]) && isObject(baseSchema[k])) {
            return schemaIncludes(target[k], baseSchema[k]);
        }

        return target[k] === baseSchema[k];
    });
}

function viewSchemaMatch(target, toolItem) {
    const baseViewSchema = toolItem.componentPack.viewSchema;

    //  target  toolItem
    //  ui:widget
    return schemaIncludes(target, baseViewSchema)
        && (target['ui:widget'] ? !!baseViewSchema['ui:widget'] : true)
        && (target.format ? !!baseViewSchema.format : true);
}

const errorNode = [];

function getUserConfigByViewSchema(curSchema, toolConfigList) {
    const toolItem = toolConfigList.find(item => viewSchemaMatch(curSchema, item));

    if (toolItem) {
        let componentValue = {};

        //  value
        if (curSchema.$$key) {
            const curSchemaUiOptions = formUtils.getUserUiOptions({
                schema: curSchema
            });
            const emptyComponentValue = getDefaultFormDataBySchema(toolItem.componentPack.propsSchema);

            componentValue.property = curSchema.$$key;
            componentValue = ['baseValue', 'options', 'rules'].reduce((preVal, curVal) => {
                if (emptyComponentValue[curVal]) {
                    preVal[curVal] = {};

                    const { schemaOptions, uiOptions } = emptyComponentValue[curVal];

                    //  schema options
                    if (schemaOptions) {
                        preVal[curVal].schemaOptions = {};
                        for (const k in schemaOptions) {
                            if (schemaOptions.hasOwnProperty(k)) {
                                const tmpVal = curSchema[k];
                                if (tmpVal !== undefined) preVal[curVal].schemaOptions[k] = tmpVal;
                            }
                        }
                    }

                    //  ui options
                    if (uiOptions) {
                        preVal[curVal].uiOptions = {};
                        for (const k in uiOptions) {
                            if (uiOptions.hasOwnProperty(k)) {
                                const tmpVal = curSchemaUiOptions[k];
                                if (tmpVal !== undefined) preVal[curVal].uiOptions[k] = k === 'labelWidth' ? deFormatFormLabelWidth(tmpVal) : tmpVal;
                            }
                        }
                    }
                }

                return preVal;
            }, componentValue);
        }

        return generateEditorItem({
            ...toolItem,

            // todo:
            componentValue
        });
    }

    //  title type
    errorNode.push({
        title: curSchema.title,
        type: curSchema.type,
    });

    //
    return null;
}

export default function jsonSchema2ComponentList(code, toolItems) {
    //
    errorNode.length = 0;

    if (String(code).trim() === '') return null;

    const toolConfigList = flatToolItems(toolItems);
    const data = JSON.parse(code);
    const {
        schema, formFooter, formProps, /* uiSchema, */
    } = data;

    //
    let eachQueue = [schema];

    // list
    const componentList = [];

    //
    const getChildList = curSchema => (curSchema.$$parentEditorItem && curSchema.$$parentEditorItem.childList) || componentList;

    //
    const deleteAdditionalData = (curSchema) => {
        delete curSchema.$$parentEditorItem;
        delete curSchema.$$key;
    };

    while (eachQueue.length > 0) {
        const curSchema = eachQueue.shift();

        if (curSchema.properties || (curSchema.items && curSchema.items.properties)) {
            //  ||
            const curObjNode = curSchema.properties ? curSchema : curSchema.items;

            //
            const curItem = getUserConfigByViewSchema(curSchema, toolConfigList);

            //
            (getChildList(curSchema)).push(curItem);
            deleteAdditionalData(curSchema);

            //
            const properties = Object.keys(curObjNode.properties);
            const orderedProperties = formUtils.orderProperties(properties, curObjNode['ui:order']);

            //
            const childSchema = orderedProperties.map(item => ({
                $$parentEditorItem: curItem,
                $$key: item,
                ...curObjNode.properties[item],
                'ui:required': curObjNode.required && curObjNode.required.includes(item)
            }));

            eachQueue = [...eachQueue, ...childSchema];
        } else {
            //
            const curItem = getUserConfigByViewSchema(curSchema, toolConfigList);

            //
            if (curItem) {
                (getChildList(curSchema)).push(curItem);
            }
            deleteAdditionalData(curSchema);
        }
    }

    const formConfig = {};
    if (formFooter) formConfig.formFooter = formFooter;
    if (formProps) {
        formConfig.formProps = {
            ...formProps,
            ...formProps.labelWidth ? {
                labelWidth: deFormatFormLabelWidth(formProps.labelWidth)
            } : {}
        };
    }

    return {
        componentList: componentList[0].childList,
        errorNode,
        formConfig
    };
}
