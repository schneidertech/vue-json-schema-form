/**
 * Created by Liu.Jun on 2020/4/16 17:32.
 */

import {
    getCurrentInstance, watch, ref, computed, h, provide, toRef
} from 'vue';

import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';

// form
import getDefaultFormState from '@lljj/vjsf-utils/schema/getDefaultFormState';
import { deepEquals } from '@lljj/vjsf-utils/utils';

//
import '@lljj/vjsf-utils/style/baseForm.css';

import vueProps from './props';

//
import FormFooter from './components/FormFooter.js';

import SchemaField from './fields/SchemaField';
import fieldProps from './fields/props';

export {
    fieldProps,
    SchemaField
};

export default function createForm(globalOptions = {}) {
    const Form = {
        name: 'VueForm',
        props: vueProps,
        emits: ['update:modelValue', 'change', 'cancel', 'submit', 'validation-failed', 'form-mounted'],
        setup(props, { slots, emit }) {
            // global components
            const internalInstance = getCurrentInstance();
            if (!Form.installed && globalOptions.WIDGET_MAP.widgetComponents) {
                Object.entries(globalOptions.WIDGET_MAP.widgetComponents).forEach(
                    ([componentName, component]) => internalInstance.appContext.app.component(componentName, component)
                );

                //
                Form.installed = true;
            }

            // provide
            const fallbackLabel = toRef(props, 'fallbackLabel');
            provide('genFormProvide', {
                fallbackLabel,
            });
            // rootFormData
            const rootFormData = ref(getDefaultFormState(props.schema, props.modelValue, props.schema, props.strictMode));
            const footerParams = computed(() => ({
                show: true,
                okBtn: '',
                okBtnProps: {},
                cancelBtn: '',
                ...props.formFooter
            }));

            // form
            let formRef = null;

            // formData
            const emitFormDataChange = (newValue, oldValue) => {
                // v-model
                emit('update:modelValue', newValue);

                // change  newValue
                emit('change', {
                    newValue,
                    oldValue
                });
            };

            // props
            const willReceiveProps = (newVal, oldVal) => {
                if (!deepEquals(newVal, oldVal)) {
                    const tempVal = getDefaultFormState(props.schema, props.modelValue, props.schema, props.strictMode);
                    if (!deepEquals(rootFormData.value, tempVal)) {
                        rootFormData.value = tempVal;
                    }
                }
            };

            // emit v-model
            watch(rootFormData, (newValue, oldValue) => {
                emitFormDataChange(newValue, oldValue);
            }, {
                deep: true
            });

            // schema
            watch(() => props.schema, (newVal, oldVal) => {
                willReceiveProps(newVal, oldVal);
            });

            // model value
            watch(() => props.modelValue, (newVal, oldVal) => {
                willReceiveProps(newVal, oldVal);
            });

            // v-model
            emitFormDataChange(rootFormData.value, props.modelValue);

            const getDefaultSlot = () => {
                if (slots.default) {
                    return slots.default({
                        formData: rootFormData,
                        formRefFn: () => formRef
                    });
                }

                if (footerParams.value.show) {
                    return h(FormFooter, {
                        globalOptions,
                        okBtn: footerParams.value.okBtn,
                        okBtnProps: footerParams.value.okBtnProps,
                        cancelBtn: footerParams.value.cancelBtn,
                        formItemAttrs: footerParams.value.formItemAttrs,
                        onCancel() {
                            emit('cancel');
                        },
                        onSubmit() {
                            //  $$validate  validate
                            (formRef.$$validate || formRef.validate)((isValid, resData) => {
                                if (isValid) {
                                    return emit('submit', rootFormData);
                                }
                                console.warn(resData);
                                return emit('validation-failed', resData);
                            });
                        }
                    });
                }

                return [];
            };

            return () => {
                const {
                    // eslint-disable-next-line no-unused-vars
                    layoutColumn = 1, inlineFooter, labelSuffix, isMiniDes, defaultSelectFirstOption, ...uiFormProps
                } = props.formProps;

                const { inline = false, labelPosition = 'top' } = uiFormProps;

                const schemaProps = {
                    schema: props.schema,
                    uiSchema: props.uiSchema,
                    errorSchema: props.errorSchema,
                    customFormats: props.customFormats,
                    customRule: props.customRule,
                    rootSchema: props.schema,
                    rootFormData: rootFormData.value, //
                    curNodePath: '', //
                    globalOptions, // ui
                    formProps: {
                        labelPosition,
                        labelSuffix: '',
                        defaultSelectFirstOption: true,
                        inline,
                        ...props.formProps
                    }
                };

                return h(
                    resolveComponent(globalOptions.COMPONENT_MAP.form),
                    {
                        class: {
                            genFromComponent: true,
                            formInlineFooter: inlineFooter,
                            formInline: inline,
                            [`genFromComponent_${props.schema.id}Form`]: !!props.schema.id,
                            layoutColumn: !inline,
                            [`layoutColumn-${layoutColumn}`]: !inline
                        },
                        setFormRef: (form) => {
                            formRef = form;
                            internalInstance.ctx.$$uiFormRef = formRef;

                            emit('form-mounted', form, {
                                formData: rootFormData.value
                            });
                        },
                        // formsubmit
                        onSubmit(e) {
                            e.preventDefault();
                        },
                        model: rootFormData,
                        labelPosition,
                        inline,
                        ...uiFormProps
                    },
                    {
                        default: () => [
                            h(
                                SchemaField,
                                schemaProps
                            ),
                            getDefaultSlot(),
                        ]
                    }
                );
            };
        },
    };

    Form.install = (vueApp, options = {}) => {
        vueApp.component(options.name || Form.name, Form);
    };

    return Form;
}
