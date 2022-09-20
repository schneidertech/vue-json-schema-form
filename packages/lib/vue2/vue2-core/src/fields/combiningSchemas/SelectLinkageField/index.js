/**
 * Created by Liu.Jun on 2020/5/19 10:15 .
 */

import {
    getPathVal, setPathVal, deletePathVal, nodePath2ClassName
} from '@lljj/vjsf-utils/vueUtils';
import {
    isEmptyObject, filterObject, isObject, getSchemaType
} from '@lljj/vjsf-utils/utils';

import {
    getWidgetConfig, getUiOptions, getUserErrOptions
} from '@lljj/vjsf-utils/formUtils';

import retrieveSchema from '@lljj/vjsf-utils/schema/retriev';
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { getMatchingOption } from '@lljj/vjsf-utils/schema/validate';

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
    data() {
        const curSelectIndex = this.computedCurSelectIndexByFormData(getPathVal(this.rootFormData, this.curNodePath));
        return {
            curSelectIndex
        };
    },
    methods: {
        computedCurSelectIndexByFormData(formData) {
            return getMatchingOption(formData, this.selectList, this.rootSchema, true);
        },

        //  VNode
        getSelectBoxVNode() {
            //
            const selectWidgetConfig = getWidgetConfig({
                schema: this.schema[`${this.combiningType}Select`] || {}, //  oneOfSelect,anyOfSelect
                uiSchema: this.uiSchema[`${this.combiningType}Select`] || {}, //  uiSchema['oneOf'] ui
                curNodePath: this.curNodePath,
                rootFormData: this.rootFormData,
            }, () => ({
                //
                widget: 'SelectWidget'
            }));

            // title description  schema  uiSchema
            // select ui (oneOf|anyOf)Select
            selectWidgetConfig.label = selectWidgetConfig.label || this.schema.title;
            selectWidgetConfig.description = selectWidgetConfig.description || this.schema.description;

            //
            if (!selectWidgetConfig.uiProps.enumOptions) {
                const uiSchemaSelectList = this.uiSchema[this.combiningType] || [];
                selectWidgetConfig.uiProps.enumOptions = this.selectList.map((option, index) => {
                    const curUiOptions = getUiOptions({
                        schema: option,
                        uiSchema: uiSchemaSelectList[index],
                        containsSpec: false,
                        // curNodePath: this.curNodePath,
                        // rootFormData: this.rootFormData,
                    });
                    return {
                        label: curUiOptions.title || ` ${index + 1}`,
                        value: index,
                    };
                });
            }

            // oneOf option
            //  VNode
            return this.$createElement(
                Widget,
                {
                    key: `fieldSelect_${this.combiningType}`,
                    class: {
                        [`fieldSelect_${this.combiningType}`]: true
                    },
                    props: {
                        isFormData: false,
                        curValue: this.curSelectIndex,
                        globalOptions: this.globalOptions,
                        rootFormData: this.rootFormData,
                        curNodePath: this.curNodePath,
                        ...selectWidgetConfig
                    },
                    on: {
                        onOtherDataChange: (event) => {
                            this.curSelectIndex = event;
                        }
                    }
                }
            );
        }
    },
    watch: {
        //  select
        // object  option
        // option
        curSelectIndex(newVal, oldVal) {
            const curFormData = getPathVal(this.rootFormData, this.curNodePath);

            //
            const newOptionData = getDefaultFormState(this.selectList[newVal], undefined, this.rootSchema);

            const hasOwn = Object.prototype.hasOwnProperty;

            // key
            if (isObject(curFormData)) {
                const oldSelectSchema = retrieveSchema(
                    this.selectList[oldVal],
                    this.rootSchema
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
                            // delete curFormData[key];
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
                            || this.selectList[newVal].properties[key].const !== undefined
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
                setPathVal(this.rootFormData, this.curNodePath, newOptionData || curFormData);
            }

            //
            // todo: onChangeOption
        }
    },
    render(h) {
        const { curNodePath } = this.$props;
        const pathClassName = nodePath2ClassName(curNodePath);

        // is object
        const isTypeObject = (this.schema.type === 'object' || this.schema.properties);

        //
        const childrenVNodeList = [this.getSelectBoxVNode()];

        // option
        let curSelectSchema = this.selectList[this.curSelectIndex];

        // schema
        if (curSelectSchema) {
            const {
                // eslint-disable-next-line no-unused-vars
                properties,
                // eslint-disable-next-line no-unused-vars
                [this.combiningType]: combiningType,
                // eslint-disable-next-line no-unused-vars
                [`${this.combiningType}Select`]: combiningTypeSelect,
                ...parentSchema
            } = this.schema;

            // schema
            curSelectSchema = Object.assign({}, parentSchema, curSelectSchema);
        }

        // object
        const isObjectEmptyAttachProperties = isTypeObject && isEmptyObject(curSelectSchema && curSelectSchema.properties);

        //  oneOf  VNode
        if (curSelectSchema && !isObjectEmptyAttachProperties) {
            //
            const {
                // eslint-disable-next-line no-unused-vars
                properties,
                // eslint-disable-next-line no-unused-vars
                [this.combiningType]: combiningType,
                // eslint-disable-next-line no-unused-vars
                [`${this.combiningType}Select`]: combiningTypeSelect,
                ...parentSchema
            } = this.schema;

            curSelectSchema = Object.assign({}, parentSchema, curSelectSchema);

            // ui err
            //  oneOf anyOf  schema
            const userUiOptions = filterObject(getUiOptions({
                schema: {},
                uiSchema: this.uiSchema,
                containsSpec: false,
                curNodePath,
                rootFormData: this.rootFormData,
            }), key => (key === this.combiningType ? undefined : `ui:${key}`));

            const userErrOptions = filterObject(getUserErrOptions({
                schema: {},
                uiSchema: this.uiSchema,
                errorSchema: this.errorSchema
            }), key => (key === this.combiningType ? undefined : `err:${key}`));

            childrenVNodeList.push(
                h(
                    SchemaField,
                    {
                        key: `appendSchema_${this.combiningType}`,
                        props: {
                            ...this.$props,
                            schema: {
                                'ui:showTitle': false, // title
                                'ui:showDescription': false, //
                                ...curSelectSchema,
                            },
                            required: this.required,
                            uiSchema: {
                                ...userUiOptions, // oneOf
                                ...((this.uiSchema[this.combiningType] || [])[this.curSelectIndex])
                            },
                            errorSchema: {
                                ...userErrOptions, // oneOf
                                ...((this.errorSchema[this.combiningType] || [])[this.curSelectIndex])
                            },
                            // needValidFieldGroup: false //
                        }
                    }
                )
            );
        }

        // object
        let originVNode = null;
        if (isTypeObject && !isEmptyObject(this.schema.properties)) {
            const {
                // eslint-disable-next-line no-unused-vars
                title, description, properties, ...optionSchema
            } = curSelectSchema;

            // object anyOf
            const origSchema = Object.assign({}, this.schema, optionSchema);
            delete origSchema[this.combiningType];

            originVNode = h(SchemaField, {
                key: `origin_${this.combiningType}`,
                class: {
                    [`${this.combiningType}_originBox`]: true,
                    [`${pathClassName}-originBox`]: true
                },
                props: {
                    ...this.$props,
                    schema: origSchema,
                    // needValidFieldGroup: false //
                }
            });
        }

        // oneOf  VNode
        childrenVNodeList.push(
            h(Widget, {
                key: `validateWidget-${this.combiningType}`,
                class: {
                    validateWidget: true,
                    [`validateWidget-${this.combiningType}`]: true
                },
                props: {
                    schema: this.schema,
                    uiSchema: this.uiSchema,
                    errorSchema: this.errorSchema,
                    curNodePath: this.curNodePath,
                    rootFormData: this.rootFormData,
                    globalOptions: this.globalOptions
                }
            })
        );

        return h('div', [
            originVNode,
            h('div', {
                key: `appendBox_${this.combiningType}`,
                class: {
                    appendCombining_box: true,
                    [`${this.combiningType}_appendBox`]: true,
                    [`${pathClassName}-appendBox`]: true
                }
            }, childrenVNodeList)
        ]);
    }
};
