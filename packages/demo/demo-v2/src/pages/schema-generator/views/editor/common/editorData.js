/**
 * Created by Liu.Jun on 2020/3/31 11:30 .
 */

import { getDefaultFormState } from '@snema/vue-json-schema-form';
import { genId } from 'demo-common/utils/id';
import { isObject, isEmptyObject } from './utils';

// editor item
export function generateEditorItem(toolItem) {
    const currentComponentPack = toolItem.componentPack;

    const ids = [currentComponentPack.viewSchema.format, currentComponentPack.viewSchema.type, genId()];
    const id = ids.filter(item => !!item).join('_');

    return {
        ...toolItem,
        isEdit: false,
        toolBar: {
            moveDownDisabled: false,
            moveUpDisabled: false,
            copyDisabled: false,
            removeDisabled: false,
        },
        componentValue: {
            ...!toolItem.componentValue || isEmptyObject(toolItem.componentValue) ? getDefaultFormState(
                currentComponentPack.propsSchema,
                {}, //
                currentComponentPack.propsSchema
            ) : toolItem.componentValue,
            property: (toolItem.componentValue && toolItem.componentValue.property) || id
        },
        id,
        ...(currentComponentPack.viewSchema.properties || (currentComponentPack.viewSchema.items && currentComponentPack.viewSchema.items.properties))
            ? { childList: [] }
            : {}
    };
}

// formLabel
export function formatFormLabelWidth(value) {
    return value ? `${value * 4}px` : undefined;
}

//
export function deFormatFormLabelWidth(value) {
    return parseFloat(value) / 4;
}

function filterObj(obj, filter = (key, value) => (isObject(value) && !isEmptyObject(value)) || value !== undefined) {
    const result = {};
    if (!isObject(obj)) return result;

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const filterVal = filter(key, obj[key]);
            // Bool
            const isBoolOrUndefined = filterVal === undefined || Boolean(filterVal) === filterVal;

            //  Boolean
            if (isBoolOrUndefined && filterVal) {
                result[key] = obj[key];
            }

            // Boolean
            if (!isBoolOrUndefined) {
                result[key] = filterVal;
            }
        }
    }

    return result;
}

export function editorItem2SchemaFieldProps(editorItem, formData) {
    // baseValue
    const {
        schemaOptions: baseSchemaOptions,
        uiOptions: {
            required,
            ...baseUiOptions
        } = {}
    } = editorItem.componentValue.baseValue;

    // options
    const {
        schemaOptions,
        uiOptions
    } = editorItem.componentValue.options || {};

    // rules
    const {
        schemaOptions: ruleSchemaOptions,
        uiOptions: ruleUiOptions,
    } = editorItem.componentValue.rules || {};

    // schema
    const schema = {
        ...JSON.parse(JSON.stringify(editorItem.componentPack.viewSchema)),
        ...filterObj({
            ...baseSchemaOptions,
            ...schemaOptions,
            ...ruleSchemaOptions
        })
    };

    // false
    // todo: default
    const ignoreAttrs = {
        // slider
        showInput: false,
        showStops: false,
        showInputControls: true,
        showTooltip: true,
        debounce: 300,

        // input number
        controlsPosition: 'default',
        stepStrictly: false,

        // input
        clearable: false,
        disabled: false,
        showPassword: false,
        showWordLimit: false,
        type: 'text',

        showTitle: true,
        showDescription: true,
    };

    // uiSchema
    const {
        hidden, widget, field, fieldProps, ...mergeUiOptions
    } = filterObj({
        ...baseUiOptions,
        ...uiOptions,
        ...ruleUiOptions
    }, (key, value) => {
        //
        if (ignoreAttrs[key] === value) return false;

        if (key === 'labelWidth') {
            return formatFormLabelWidth(value);
        }

        // undefined
        return value !== undefined;
    });

    const uiSchema = {
        ...Object.entries({
            hidden, widget, field, fieldProps
        }).reduce((preVal, [key, value]) => {
            if (value !== undefined) {
                preVal[`ui:${key}`] = value;
            }
            return preVal;
        }, {}),
        ...isEmptyObject(mergeUiOptions) ? {} : {
            'ui:options': mergeUiOptions
        }
    };

    return {
        rootSchema: schema,
        schema,
        required,
        rootFormData: formData,
        curNodePath: editorItem.componentValue.property || '',
        uiSchema
    };
}

function genBaseObj() {
    return {
        type: 'object',
        required: [],
        properties: {},
        'ui:order': []
    };
}

export function componentList2JsonSchema(componentList) {
    const baseObj = genBaseObj();

    let parentObj = baseObj;
    let queue = [{ $$parentFlag: parentObj }, ...componentList];

    const hasChild = data => Array.isArray(data.childList) && data.childList.length > 0;

    //
    while (queue.length) {
        //
        const item = queue.shift();

        //  parent
        if (item.$$parentFlag) {
            parentObj = item.$$parentFlag;
        } else {
            const { schema, required, uiSchema } = editorItem2SchemaFieldProps(item, {});
            const curSchema = {
                ...schema,
                ...uiSchema
            };

            //
            if (hasChild(item)) {
                queue = [...queue, { $$parentFlag: curSchema }, ...item.childList];
            }

            //
            (parentObj.properties || parentObj.items.properties)[item.componentValue.property] = curSchema;

            //  ui:order
            (parentObj['ui:order'] || parentObj.items['ui:order']).push(item.componentValue.property);

            //  required
            if (required) {
                (parentObj.required || parentObj.items.required).push(item.componentValue.property);
            }
        }
    }

    return baseObj;
}
