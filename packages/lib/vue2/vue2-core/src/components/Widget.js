/**
 * Created by Liu.Jun on 2020/4/23 11:24.
 */

import {
    isRootNodePath, path2prop, getPathVal, setPathVal
} from '@snema/vjsf-utils/vueUtils';

import { validateFormDataAndTransformMsg } from '@snema/vjsf-utils/schema/validate';
import { IconQuestion } from '@snema/vjsf-utils/icons';
import { fallbackLabel } from '@snema/vjsf-utils/formUtils';

export default {
    name: 'Widget',
    inject: ['genFormProvide'],
    props: {
        // formData
        // oneOf anyOf selectformData
        isFormData: {
            type: Boolean,
            default: true
        },
        // isFormData = false value  curNodePath
        curValue: {
            type: null,
            default: 0
        },
        schema: {
            type: Object,
            default: () => ({})
        },
        uiSchema: {
            type: Object,
            default: () => ({})
        },
        errorSchema: {
            type: Object,
            default: () => ({})
        },
        customFormats: {
            type: Object,
            default: () => ({})
        },
        //
        customRule: {
            type: Function,
            default: null
        },
        widget: {
            type: [String, Function, Object],
            default: null
        },
        required: {
            type: Boolean,
            default: false
        },
        //  JSON Schema required
        //  ''  emptyValue
        emptyValue: {
            type: null,
            default: undefined
        },
        // vue .number
        formatValue: {
            type: [Function],
            default: val => ({
                update: true,
                value: val
            })
        },
        rootFormData: {
            type: null
        },
        curNodePath: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        // width -> formItem width
        width: {
            type: String,
            default: ''
        },
        labelWidth: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        // Widget attrs
        widgetAttrs: {
            type: Object,
            default: () => ({})
        },
        // Widget className
        widgetClass: {
            type: Object,
            default: () => ({})
        },
        // Widget style
        widgetStyle: {
            type: Object,
            default: () => ({})
        },
        // Field attrs
        fieldAttrs: {
            type: Object,
            default: () => ({})
        },
        // Field className
        fieldClass: {
            type: Object,
            default: () => ({})
        },
        // Field style
        fieldStyle: {
            type: Object,
            default: () => ({})
        },
        // props
        uiProps: {
            type: Object,
            default: () => ({})
        },
        widgetListeners: null, // widget emits
        formProps: null,
        getWidget: null,
        renderScopedSlots: null, //
        renderChildren: null, //
        globalOptions: null, //
        onChange: null
    },
    computed: {
        value: {
            get() {
                if (this.isFormData) {
                    return getPathVal(this.rootFormData, this.curNodePath);
                }
                return this.curValue;
            },
            set(value) {
                // null
                const trueValue = (value === '' || value === null) ? this.emptyValue : value;
                if (this.isFormData) {
                    setPathVal(this.rootFormData, this.curNodePath, trueValue);
                } else {
                    this.$emit('onOtherDataChange', trueValue);
                }
            }
        }
    },
    created() {
        //
        if (this.uiProps.enumOptions
            && this.uiProps.enumOptions.length > 0
            && this.value === undefined
            && this.value !== this.uiProps.enumOptions[0]
        ) {
            // array
            if (this.schema.items) {
                this.value = [];
            } else if (this.required && this.formProps.defaultSelectFirstOption) {
                this.value = this.uiProps.enumOptions[0].value;
            }
        }
    },
    render(h) {
        const self = this;

        const { curNodePath } = this.$props;

        //
        const isRootNode = isRootNodePath(curNodePath);

        const isMiniDes = self.formProps && self.formProps.isMiniDes;
        const miniDesModel = isMiniDes || self.globalOptions.HELPERS.isMiniDes(self.formProps);

        const descriptionVNode = (self.description) ? h(
            'div',
            {
                domProps: {
                    innerHTML: self.description
                },
                class: {
                    genFromWidget_des: true,
                    genFromWidget_des_mini: miniDesModel
                }
            },
        ) : null;

        const { COMPONENT_MAP } = self.globalOptions;

        const miniDescriptionVNode = (miniDesModel && descriptionVNode) ? h(COMPONENT_MAP.popover, {
            style: {
                margin: '0 2px',
                fontSize: '16px',
                cursor: 'pointer'
            },
            props: {
                placement: 'top',
                trigger: 'hover'
            }
        }, [
            descriptionVNode,
            h(IconQuestion, {
                slot: 'reference'
            })
        ]) : null;


        // form-item style
        const formItemStyle = {
            ...self.fieldStyle,
            ...(self.width ? {
                width: self.width,
                flexBasis: self.width,
                paddingRight: '10px'
            } : {})
        };

        //
        const label = fallbackLabel(self.label, (self.widget && this.genFormProvide.fallbackLabel), curNodePath);

        return h(
            COMPONENT_MAP.formItem,
            {
                class: {
                    ...self.fieldClass,
                    genFormItem: true
                },
                style: formItemStyle,
                attrs: self.fieldAttrs,
                props: {
                    ...self.labelWidth ? { labelWidth: self.labelWidth } : {},
                    ...this.isFormData ? {
                        // elementUiprop
                        prop: isRootNode ? '__$$root' : path2prop(curNodePath),
                        rules: [
                            {
                                validator(rule, value, callback) {
                                    if (isRootNode) value = self.rootFormData;

                                    // schema
                                    const errors = validateFormDataAndTransformMsg({
                                        formData: value,
                                        schema: self.$props.schema,
                                        uiSchema: self.$props.uiSchema,
                                        customFormats: self.$props.customFormats,
                                        errorSchema: self.errorSchema,
                                        required: self.required,
                                        propPath: path2prop(curNodePath)
                                    });
                                    if (errors.length > 0) return callback(errors[0].message);

                                    // customRule
                                    const curCustomRule = self.$props.customRule;
                                    if (curCustomRule && (typeof curCustomRule === 'function')) {
                                        return curCustomRule({
                                            field: curNodePath,
                                            value,
                                            rootFormData: self.rootFormData,
                                            callback
                                        });
                                    }

                                    return callback();
                                },
                                trigger: 'change'
                            }
                        ]
                    } : {},
                },
                scopedSlots: {
                    // ...
                    error: props => (props.error ? h('div', {
                        class: {
                            formItemErrorBox: true
                        },
                        attrs: {
                            title: props.error
                        }
                    }, [props.error]) : null),
                },
            },
            [
                label ? h('span', {
                    slot: 'label',
                    class: {
                        genFormLabel: true,
                        genFormItemRequired: self.required,
                    },
                }, [
                    `${label}`,
                    miniDescriptionVNode,
                    `${(self.formProps && self.formProps.labelSuffix) || ''}`
                ]) : null,

                // description
                // mini description
                !miniDesModel ? descriptionVNode : null,
                h( //
                    self.widget,
                    {
                        style: self.widgetStyle,
                        class: self.widgetClass,
                        attrs: {
                            ...self.widgetAttrs,
                            ...self.uiProps,
                            value: this.value, // v-model
                        },
                        ref: 'widgetRef',
                        ...(self.renderScopedSlots ? {
                            scopedSlots: self.renderScopedSlots(h) || {}
                        } : {}),
                        on: {
                            ...self.widgetListeners ? self.widgetListeners : {},
                            'hook:mounted': function widgetMounted() {
                                if (self.widgetListeners && self.widgetListeners['hook:mounted']) {
                                    // eslint-disable-next-line prefer-rest-params
                                    self.widgetListeners['hook:mounted'].apply(this, [...arguments]);
                                }

                                //   widget vm
                                if (self.getWidget && typeof self.getWidget === 'function') {
                                    self.getWidget.call(null, self.$refs.widgetRef);
                                }
                            },
                            input(event) {
                                const formatValue = self.formatValue(event);
                                // form input number
                                //  number 0
                                //  1. 1.010  schema
                                // elementnextTickdomvmhack updatetrue
                                const preVal = self.value;
                                if (formatValue.update && preVal !== formatValue.value) {
                                    self.value = formatValue.value;
                                    if (self.onChange) {
                                        self.onChange({
                                            curVal: formatValue.value,
                                            preVal,
                                            parentFormData: getPathVal(self.rootFormData, self.curNodePath, 1),
                                            rootFormData: self.rootFormData
                                        });
                                    }
                                }

                                if (self.widgetListeners && self.widgetListeners.input) {
                                    // eslint-disable-next-line prefer-rest-params
                                    self.widgetListeners.input.apply(this, [...arguments]);
                                }
                            }
                        }
                    },
                    self.renderChildren ? self.renderChildren(h) : null
                )
            ]
        );
    }
};
