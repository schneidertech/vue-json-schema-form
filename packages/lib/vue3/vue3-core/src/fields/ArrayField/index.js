/**
 * Created by Liu.Jun on 2020/4/24 11:23.
 */


import {
    ref, computed, h, watch, toRaw
} from 'vue';

import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';

import {
    allowAdditionalItems, isFixedItems, isMultiSelect
} from '@lljj/vjsf-utils/formUtils';
import { getPathVal, setPathVal } from '@lljj/vjsf-utils/vue3Utils';
import { genId, lowerCase } from '@lljj/vjsf-utils/utils';

import * as arrayMethods from '@lljj/vjsf-utils/arrayUtils';
import Widget from '../../components/Widget';

import vueProps from '../props';

import ArrayFieldNormal from './arrayTypes/ArrayFieldNormal';
import ArrayFieldMultiSelect from './arrayTypes/ArrayFieldMultiSelect';
import ArrayFieldTuple from './arrayTypes/ArrayFieldTuple';
import ArrayFieldSpecialFormat from './arrayTypes/ArrayFieldSpecialFormat';

export default {
    name: 'ArrayField',
    props: vueProps,
    setup(props) {
        //
        const getCurFormData = () => {
            const { rootFormData, curNodePath } = props;
            const value = getPathVal(rootFormData, curNodePath);

            if (Array.isArray(value)) return value;

            console.error('error: type array array ');

            return [];
        };

        // key list key
        const formKeys = ref(getCurFormData().map(() => genId()));

        //  formData
        const curFormData = computed(() => getCurFormData());
        watch(curFormData, (newVal, oldVal) => {
            //
            //
            if (newVal !== oldVal && toRaw(newVal) !== toRaw(oldVal) && Array.isArray(newVal)) {
                formKeys.value = newVal.map(() => genId());
            }
        }, {
            deep: true
        });

        // keyformData
        const itemsFormData = computed(() => curFormData.value.map((item, index) => ({
            key: formKeys.value[index],
            value: item
        })));

        // item
        const getNewFormDataRow = () => {
            const { schema, rootSchema } = props;
            let itemSchema = schema.items;

            // https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation
            // additionalItems
            if (isFixedItems(schema) && allowAdditionalItems(schema)) {
                itemSchema = schema.additionalItems;
            }
            return getDefaultFormState(itemSchema, undefined, rootSchema);
        };

        const handleArrayOperate = ({
            command,
            data
        }) => {
            //
            const strategyMap = {
                moveUp(target, { index }) {
                    arrayMethods.moveUpAt(target, index);
                },
                moveDown(target, { index }) {
                    arrayMethods.moveDownAt(target, index);
                },
                remove(target, { index }) {
                    arrayMethods.removeAt(target, index);
                },
                add(target, { newRowData }) {
                    target.push(newRowData);
                },
                batchPush(target, { pushArray }) {
                    pushArray.forEach((item) => {
                        target.push(item);
                    });
                },
                setNewTarget(target, { formData, nodePath, newTarget }) {
                    setPathVal(formData, nodePath, newTarget);
                }
            };

            const curStrategy = strategyMap[command];
            if (curStrategy) {
                let formDataPrams = data;
                let keysParams = data;

                if (command === 'add') {
                    //
                    formDataPrams = { newRowData: getNewFormDataRow() };
                    keysParams = { newRowData: genId() };
                } else if (command === 'batchPush') {
                    //
                    keysParams = {
                        pushArray: formDataPrams.pushArray.map(item => genId())
                    };
                } else if (command === 'setNewTarget') {
                    //
                    formDataPrams = {
                        formData: props.rootFormData,
                        nodePath: props.curNodePath,
                        newTarget: formDataPrams.newTarget
                    };
                    keysParams = {
                        formData: formKeys,
                        nodePath: 'value',
                        newTarget: formDataPrams.newTarget.map(item => genId())
                    };
                }

                //  formData keys
                curStrategy.apply(null, [formKeys.value, keysParams]);

                // formData
                curStrategy.apply(null, [curFormData.value, formDataPrams]);
            } else {
                throw new Error(` - [${command}]`);
            }
        };

        return () => {
            const {
                schema,
                uiSchema,
                rootSchema,
                rootFormData,
                curNodePath,
                globalOptions
            } = props;

            if (!schema.hasOwnProperty('items')) {
                throw new Error(`[${schema}]  items`);
            }

            //
            if (isMultiSelect(schema, rootSchema)) {
                // item
                return h(ArrayFieldMultiSelect, {
                    ...props,
                    class: {
                        [lowerCase(ArrayFieldMultiSelect.name)]: true
                    }
                });
            }

            //  date datetime time url-upload
            // array  ui:widget
            //   ui:widget
            if (schema.format || schema['ui:widget'] || uiSchema['ui:widget']) {
                return h(ArrayFieldSpecialFormat, {
                    ...props,
                    class: {
                        [lowerCase(ArrayFieldSpecialFormat.name)]: true
                    }
                });
            }

            // https://json-schema.org/understanding-json-schema/reference/array.html#list-validation
            // https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation
            const CurrentField = isFixedItems(schema) ? ArrayFieldTuple : ArrayFieldNormal;

            return h('div', [
                h(CurrentField, {
                    itemsFormData: itemsFormData.value,
                    ...props,
                    onArrayOperate: handleArrayOperate,
                    class: {
                        [lowerCase(CurrentField.name)]: true
                    }
                }),

                // Widget array - maxItems. minItems. uniqueItems items
                props.needValidFieldGroup ? h(Widget, {
                    key: 'validateWidget-array',
                    class: {
                        validateWidget: true,
                        'validateWidget-array': true
                    },
                    schema: Object.entries(schema).reduce((preVal, [key, value]) => {
                        if (key !== 'items') preVal[key] = value;
                        return preVal;
                    }, {}),
                    uiSchema,
                    errorSchema: props.errorSchema,
                    curNodePath,
                    rootFormData,
                    globalOptions
                }) : null
            ]);
        };
    },
};
