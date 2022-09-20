/**
 * Created by Liu.Jun on 2020/4/23 11:24.
 */

import {
    computed, h, ref, watch, inject
} from 'vue';

import { IconQuestion } from '@snema/vjsf-utils/icons';

import { validateFormDataAndTransformMsg } from '@snema/vjsf-utils/schema/validate';
import { fallbackLabel } from '@snema/vjsf-utils/formUtils';

import {
    isRootNodePath, path2prop, getPathVal, setPathVal, resolveComponent
} from '@snema/vjsf-utils/vue3Utils';

export default {
    name: 'Widget',
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
        formProps: null,
        getWidget: null,
        renderScopedSlots: null, //
        globalOptions: null, //
        onChange: null
    },
    emits: ['otherDataChange'],
    inheritAttrs: true,
    setup(props, { emit }) {
        const genFormProvide = inject('genFormProvide');
        const widgetValue = computed({
            get() {
                if (props.isFormData) return getPathVal(props.rootFormData, props.curNodePath);

                return props.curValue;
            },
            set(value) {
                // null
                const trueValue = (value === '' || value === null) ? props.emptyValue : value;
                if (props.isFormData) {
                    setPathVal(props.rootFormData, props.curNodePath, trueValue);
                } else {
                    emit('otherDataChange', trueValue);
                }
            }
        });

        //
        if (props.uiProps.enumOptions
            && props.uiProps.enumOptions.length > 0
            && widgetValue.value === undefined
            && widgetValue.value !== props.uiProps.enumOptions[0]
        ) {
            // array
            if (props.schema.items) {
                widgetValue.value = [];
            } else if (props.required && props.formProps.defaultSelectFirstOption) {
                widgetValue.value = props.uiProps.enumOptions[0].value;
            }
        }

        // widget
        const widgetRef = ref(null);
        //   widget vm
        if (typeof props.getWidget === 'function') {
            watch(widgetRef, () => {
                props.getWidget.call(null, widgetRef.value);
            });
        }

        return () => {
            //
            const isRootNode = isRootNodePath(props.curNodePath);

            const isMiniDes = props.formProps && props.formProps.isMiniDes;
            const miniDesModel = isMiniDes || props.globalOptions.HELPERS.isMiniDes(props.formProps);

            const descriptionVNode = (props.description) ? h(
                'div',
                {
                    innerHTML: props.description,
                    class: {
                        genFromWidget_des: true,
                        genFromWidget_des_mini: miniDesModel
                    }
                },
            ) : null;

            const { COMPONENT_MAP } = props.globalOptions;
            const miniDescriptionVNode = (miniDesModel && descriptionVNode) ? h(resolveComponent(COMPONENT_MAP.popover), {
                style: {
                    margin: '0 2px',
                    fontSize: '16px',
                    cursor: 'pointer'
                },
                placement: 'top',
                trigger: 'hover'
            }, {
                default: () => descriptionVNode,
                reference: () => h(IconQuestion)
            }) : null;

            // form-item style
            const formItemStyle = {
                ...props.fieldStyle,
                ...(props.width ? {
                    width: props.width,
                    flexBasis: props.width,
                    paddingRight: '10px'
                } : {})
            };

            //
            const label = fallbackLabel(props.label, (props.widget && genFormProvide.fallbackLabel.value), props.curNodePath);
            return h(
                resolveComponent(COMPONENT_MAP.formItem),
                {
                    class: {
                        ...props.fieldClass,
                        genFormItem: true
                    },
                    style: formItemStyle,
                    ...props.fieldAttrs,

                    ...props.labelWidth ? { labelWidth: props.labelWidth } : {},
                    ...props.isFormData ? {
                        // elementUiprop
                        prop: isRootNode ? '__$$root' : path2prop(props.curNodePath),
                        rules: [
                            {
                                validator(rule, value, callback) {
                                    if (isRootNode) value = props.rootFormData;

                                    // schema
                                    const errors = validateFormDataAndTransformMsg({
                                        formData: value,
                                        schema: props.schema,
                                        uiSchema: props.uiSchema,
                                        customFormats: props.customFormats,
                                        errorSchema: props.errorSchema,
                                        required: props.required,
                                        propPath: path2prop(props.curNodePath)
                                    });

                                    //
                                    if (errors.length > 0) {
                                        if (callback) return callback(errors[0].message);
                                        return Promise.reject(errors[0].message);
                                    }

                                    // customRule
                                    const curCustomRule = props.customRule;
                                    if (curCustomRule && (typeof curCustomRule === 'function')) {
                                        return curCustomRule({
                                            field: props.curNodePath,
                                            value,
                                            rootFormData: props.rootFormData,
                                            callback
                                        });
                                    }

                                    //
                                    if (callback) return callback();
                                    return Promise.resolve();
                                },
                                trigger: 'change'
                            }
                        ]
                    } : {},
                },
                {
                    // ...
                    error: slotProps => (slotProps.error ? h('div', {
                        class: {
                            formItemErrorBox: true
                        },
                        title: slotProps.error
                    }, [slotProps.error]) : null),

                    // label
                    /*
                        TODO:slot vue3 bug
                         error ElementPlus label labelWrap  slots.default?.()  undefined
                    */
                    ...label ? {
                        label: () => h('span', {
                            class: {
                                genFormLabel: true,
                                genFormItemRequired: props.required,
                            },
                        }, [
                            `${label}`,
                            ...miniDescriptionVNode ? [miniDescriptionVNode] : [],
                            `${(props.formProps && props.formProps.labelSuffix) || ''}`
                        ])
                    } : {},

                    // default
                    default: otherAttrs => [
                        // description
                        // mini description
                        ...(!miniDesModel && descriptionVNode) ? [descriptionVNode] : [],

                        ...props.widget ? [
                            h( //
                                resolveComponent(props.widget),
                                {
                                    style: props.widgetStyle,
                                    class: props.widgetClass,

                                    ...props.widgetAttrs,
                                    ...props.uiProps,
                                    modelValue: widgetValue.value, // v-model
                                    ref: widgetRef,
                                    'onUpdate:modelValue': function updateModelValue(event) {
                                        const preVal = widgetValue.value;
                                        if (preVal !== event) {
                                            widgetValue.value = event;
                                            if (props.onChange) {
                                                props.onChange({
                                                    curVal: event,
                                                    preVal,
                                                    parentFormData: getPathVal(props.rootFormData, props.curNodePath, 1),
                                                    rootFormData: props.rootFormData
                                                });
                                            }
                                        }
                                    },
                                    ...otherAttrs ? (() => Object.keys(otherAttrs).reduce((pre, k) => {
                                        pre[k] = otherAttrs[k];

                                        // ui ui
                                        [
                                            props.widgetAttrs[k],
                                            props.uiProps[k]
                                        ].forEach((uiConfFn) => {
                                            if (uiConfFn && typeof uiConfFn === 'function') {
                                                pre[k] = (...args) => {
                                                    uiConfFn(...args);
                                                    pre[k](...args);
                                                };
                                            }
                                        });

                                        return pre;
                                    }, {}))() : {}
                                },
                                {
                                    ...(props.renderScopedSlots ? (
                                        typeof props.renderScopedSlots === 'function' ? props.renderScopedSlots() : props.renderScopedSlots
                                    ) : {})
                                }
                            )
                        ] : []
                    ]
                }
            );
        };
    }
};
