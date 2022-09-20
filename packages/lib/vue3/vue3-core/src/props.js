/**
 * Created by Liu.Jun on 2020/4/16 10:47 .
 */

export default {
    formFooter: {
        type: Object,
        default: () => ({
            show: true,
            okBtn: '',
            cancelBtn: '',
        }),
    },
    modelValue: {
        type: null,
        default: () => ({}),
        required: true
    },
    fallbackLabel: {
        type: Boolean,
        default: false,
    },
    strictMode: {
        type: Boolean,
        default: false,
    },
    formProps: {
        type: Object,
        default: () => ({}),
    },
    schema: {
        type: Object,
        default: () => ({}),
        required: true
    },
    // ui
    uiSchema: {
        type: Object,
        default: () => ({})
    },
    //
    customFormats: {
        type: Object,
        default: () => ({})
    },
    //
    customRule: {
        type: Function,
        default: null
    },
    //
    errorSchema: {
        type: Object,
        default: () => ({})
    }
};
