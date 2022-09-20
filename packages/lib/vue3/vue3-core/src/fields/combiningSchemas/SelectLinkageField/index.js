/**
 * Created by Liu.Jun on 2020/5/19 10:15 .
 */


import { ref, watch, h } from 'vue';
import {
    getPathVal, setPathVal, deletePathVal, nodePath2ClassName
} from '@snema/vjsf-utils/vue3Utils';
import {
    isEmptyObject, filterObject, isObject, getSchemaType
} from '@snema/vjsf-utils/utils';

import {
    getWidgetConfig, getUiOptions, getUserErrOptions
} from '@snema/vjsf-utils/formUtils';

import retrieveSchema from '@snema/vjsf-utils/schema/retriev';
import getDefaultFormState from '@snema/vjsf-utils/schema/getDefaultFormState';
import { getMatchingOption } from '@snema/vjsf-utils/schema/validate';

import vueProps from '../../props';
import Widget from '../../../components/Widget';
import SchemaField from '../../SchemaField';

export default {
    name: 'SelectLinkageField',
    props: {
        ...vueProps,
        combiningType: {
            type: String,
            default: 'anyOf' // anyOf oneOf
        },
        selectList: {
            type: Array,
            require: true
        }
    },
    setup(props) {
        const computedCurSelectIndexByFormData = (formData) => {
            const index = getMatchingOption(formData, props.selectList, props.rootSchema, true);
            return index || 0;
        };

        //  option
        const curSelectIndex = ref(computedCurSelectIndexByFormData(getPathVal(props.rootFormData, props.curNodePath)));

        //  VNode
        const getSelectBoxVNode = () => {
            //
            const selectWidgetConfig = getWidgetConfig({
                schema: props.schema[`${props.combiningType}Select`] || {}, //  oneOfSelect,anyOfSelect
                uiSchema: props.uiSchema[`${props.combiningType}Select`] || {}, //  uiSchema['oneOf'] ui
                curNodePath: props.curNodePath,
                rootFormData: props.rootFormData,
            }, () => ({
                //
                widget: 'SelectWidget'
            }));

            // title description  schema  uiSchema
            // select ui (oneOf|anyOf)Select
            selectWidgetConfig.label = selectWidgetConfig.label || props.schema.title;
            selectWidgetConfig.description = selectWidgetConfig.description || props.schema.description;

            //
            if (!selectWidgetConfig.uiProps.enumOptions) {
                const uiSchemaSelectList = props.uiSchema[props.combiningType] || [];
                selectWidgetConfig.uiProps.enumOptions = props.selectList.map((option, index) => {
                    const curUiOptions = getUiOptions({
                        schema: option,
                        uiSchema: uiSchemaSelectList[index],
                        containsSpec: false,
                        // curNodePath: props.curNodePath,
                        // rootFormData: props.rootFormData,
                    });
                    return {
                        label: curUiOptions.title || ` ${index + 1}`,
                        value: index,
                    };
                });
            }

            // oneOf option
            //  VNode
            return h(
                Widget,
                {
                    key: `fieldSelect_${props.combiningType}`,
                    class: {
                        [`fieldSelect_${props.combiningType}`]: true
                    },
                    isFormData: false,
                    curValue: curSelectIndex.value,
                    curNodePath: props.curNodePath,
                    rootFormData: props.rootFormData,
                    globalOptions: props.globalOptions,
                    ...selectWidgetConfig,
                    onOtherDataChange: (event) => {
                        curSelectIndex.value = event;
                    }
                }
            );
        };

        //  select
        // object  option
        // option
        watch(curSelectIndex, (newVal, oldVal) => {
            const curFormData = getPathVal(props.rootFormData, props.curNodePath);

            //
            const newOptionData = getDefaultFormState(props.selectList[newVal], undefined, props.rootSchema);

            const hasOwn = Object.prototype.hasOwnProperty;

            // key
            if (isObject(curFormData)) {
                const oldSelectSchema = retrieveSchema(
                    props.selectList[oldVal],
                    props.rootSchema
                );
                if (getSchemaType(oldSelectSchema) === 'object') {
                    // schema
                    // Object.keys(oldSelectSchema.properties)
                    for (const key in oldSelectSchema.properties) {
                        if (
                            hasOwn.call(oldSelectSchema.properties, key)
                            && !hasOwn.call(newOptionData, key)
                        ) {
                            deletePathVal(curFormData, key);
                        }
                    }
                }
            }

            //
            if (isObject(newOptionData)) {
                Object.entries(newOptionData).forEach(([key, value]) => {
                    if (
                        value !== undefined
                        && (
                            curFormData[key] === undefined
                            || props.selectList[newVal].properties[key].const !== undefined
                            || isObject(value)
                        )
                    ) {
                        //
                        //
                        // 1. anyOfschema const
                        // 2. key
                        setPathVal(curFormData, key, value);
                    }
                });
            } else {
                setPathVal(props.rootFormData, props.curNodePath, newOptionData || curFormData);
            }
        });

        return () => {
            const { curNodePath } = props;
            const pathClassName = nodePath2ClassName(curNodePath);

            // is object
            const isTypeObject = (props.schema.type === 'object' || props.schema.properties);

            //
            const childrenVNodeList = [getSelectBoxVNode()];

            // option
            let curSelectSchema = props.selectList[curSelectIndex.value];

            // schema
            if (curSelectSchema) {
                //
                const {
                    // eslint-disable-next-line no-unused-vars
                    properties,
                    // eslint-disable-next-line no-unused-vars
                    [props.combiningType]: combiningType,
                    // eslint-disable-next-line no-unused-vars
                    [`${props.combiningType}Select`]: combiningTypeSelect,
                    ...parentSchema
                } = props.schema;

                curSelectSchema = Object.assign({}, parentSchema, curSelectSchema);
            }

            // object
            const isObjectEmptyAttachProperties = isTypeObject && isEmptyObject(curSelectSchema && curSelectSchema.properties);

            if (curSelectSchema && !isObjectEmptyAttachProperties) {
                // ui err
                //  oneOf anyOf  schema
                const userUiOptions = filterObject(getUiOptions({
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    containsSpec: false,
                    curNodePath,
                    rootFormData: props.rootFormData,
                }), key => (key === props.combiningType ? undefined : `ui:${key}`));

                const userErrOptions = filterObject(getUserErrOptions({
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    errorSchema: props.errorSchema
                }), key => (key === props.combiningType ? undefined : `err:${key}`));

                childrenVNodeList.push(
                    h(
                        SchemaField,
                        {
                            key: `appendSchema_${props.combiningType}`,
                            ...props,
                            schema: {
                                'ui:showTitle': false, // title
                                'ui:showDescription': false, //
                                ...curSelectSchema,
                            },
                            required: props.required,
                            uiSchema: {
                                ...userUiOptions, // oneOf
                                ...((props.uiSchema[props.combiningType] || [])[curSelectIndex.value])
                            },
                            errorSchema: {
                                ...userErrOptions, // oneOf
                                ...((props.errorSchema[props.combiningType] || [])[curSelectIndex.value])
                            },
                            // needValidFieldGroup: false //
                        }
                    )
                );
            }

            // object
            let originVNode = null;
            if (isTypeObject && !isEmptyObject(props.schema.properties)) {
                const {
                    // eslint-disable-next-line no-unused-vars
                    title, description, properties, ...optionSchema
                } = curSelectSchema;

                // object anyOf
                const origSchema = Object.assign({}, props.schema, optionSchema);
                delete origSchema[props.combiningType];

                originVNode = h(SchemaField, {
                    key: `origin_${props.combiningType}`,
                    class: {
                        [`${props.combiningType}_originBox`]: true,
                        [`${pathClassName}-originBox`]: true
                    },
                    ...props,
                    schema: origSchema,
                    // needValidFieldGroup: false //
                });
            }

            // oneOf  VNode
            childrenVNodeList.push(
                h(Widget, {
                    key: `validateWidget-${props.combiningType}`,
                    class: {
                        validateWidget: true,
                        [`validateWidget-${props.combiningType}`]: true
                    },
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    errorSchema: props.errorSchema,
                    curNodePath: props.curNodePath,
                    rootFormData: props.rootFormData,
                    globalOptions: props.globalOptions
                })
            );

            return h('div', [
                originVNode,
                h('div', {
                    key: `appendBox_${props.combiningType}`,
                    class: {
                        appendCombining_box: true,
                        [`${props.combiningType}_appendBox`]: true,
                        [`${pathClassName}-appendBox`]: true
                    }
                }, childrenVNodeList)
            ]);
        };
    }
};
