/**
 * Created by Liu.Jun on 2020/4/24 11:23.
 */


import getDefaultFormState from '@snema/vjsf-utils/schema/getDefaultFormState';

import {
    allowAdditionalItems, isFixedItems, isMultiSelect
} from '@snema/vjsf-utils/formUtils';
import { getPathVal, setPathVal } from '@snema/vjsf-utils/vueUtils';
import { genId, lowerCase } from '@snema/vjsf-utils/utils';

import * as arrayMethods from '@snema/vjsf-utils/arrayUtils';
import Widget from '../../components/Widget';

import vueProps from '../props';

import ArrayFieldNormal from './arrayTypes/ArrayFieldNormal';
import ArrayFieldMultiSelect from './arrayTypes/ArrayFieldMultiSelect';
import ArrayFieldTuple from './arrayTypes/ArrayFieldTuple';
import ArrayFieldSpecialFormat from './arrayTypes/ArrayFieldSpecialFormat';

export default {
    name: 'ArrayField',
    props: vueProps,
    data() {
        return {
            // key list key
            formKeys: this.getCuFormData().map(() => genId())
        };
    },
    computed: {
        itemsFormData() {
            const formKeys = this.$data.formKeys;
            return this.curFormData.map((item, index) => ({
                key: formKeys[index],
                value: item
            }));
        },
        curFormData() {
            return this.getCuFormData();
        }
    },
    watch: {
        curFormData(newVal, oldVal) {
            //
            if (newVal !== oldVal && Array.isArray(newVal)) {
                this.formKeys = newVal.map(() => genId());
            }
        }
    },
    methods: {
        //
        getCuFormData() {
            const { rootFormData, curNodePath } = this.$props;
            const value = getPathVal(rootFormData, curNodePath);

            if (Array.isArray(value)) return value;

            console.error('error: type array array ');

            return [];
        },
        // item
        getNewFormDataRow() {
            const { schema, rootSchema } = this.$props;
            let itemSchema = schema.items;

            // https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation
            // additionalItems
            if (isFixedItems(this.schema) && allowAdditionalItems(this.schema)) {
                itemSchema = schema.additionalItems;
            }
            return getDefaultFormState(itemSchema, undefined, rootSchema);
        },

        //
        handleArrayOperate({
            command,
            data
        }) {
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
                    formDataPrams = { newRowData: this.getNewFormDataRow() };
                    keysParams = { newRowData: genId() };
                } else if (command === 'batchPush') {
                    //
                    keysParams = {
                        pushArray: formDataPrams.pushArray.map(item => genId())
                    };
                } else if (command === 'setNewTarget') {
                    //
                    formDataPrams = {
                        formData: this.rootFormData,
                        nodePath: this.curNodePath,
                        newTarget: formDataPrams.newTarget
                    };
                    keysParams = {
                        formData: this.$data,
                        nodePath: 'formKeys',
                        newTarget: formDataPrams.newTarget.map(item => genId())
                    };
                }

                //  formData keys
                curStrategy.apply(this, [this.$data.formKeys, keysParams]);

                // formData
                curStrategy.apply(this, [this.curFormData, formDataPrams]);
            } else {
                throw new Error(` - [${command}]`);
            }
        }
    },
    render(h) {
        const self = this;
        const {
            schema,
            uiSchema,
            rootSchema,
            rootFormData,
            curNodePath,
            globalOptions
        } = this.$props;

        if (!schema.hasOwnProperty('items')) {
            throw new Error(`[${schema}]  items`);
        }

        //
        if (isMultiSelect(schema, rootSchema)) {
            // item
            return h(ArrayFieldMultiSelect, {
                props: this.$props,
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
                props: this.$props,
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
                props: {
                    itemsFormData: this.itemsFormData,
                    ...this.$props,
                },
                class: {
                    [lowerCase(CurrentField.name)]: true
                },
                on: {
                    onArrayOperate: this.handleArrayOperate
                }
            }),

            // Widget array - maxItems. minItems. uniqueItems items
            this.needValidFieldGroup ? h(Widget, {
                key: 'validateWidget-array',
                class: {
                    validateWidget: true,
                    'validateWidget-array': true
                },
                props: {
                    schema: Object.entries(self.$props.schema).reduce((preVal, [key, value]) => {
                        if (key !== 'items') preVal[key] = value;
                        return preVal;
                    }, {}),
                    uiSchema,
                    errorSchema: this.errorSchema,
                    curNodePath,
                    rootFormData,
                    globalOptions
                }
            }) : null
        ]);
    }
};
