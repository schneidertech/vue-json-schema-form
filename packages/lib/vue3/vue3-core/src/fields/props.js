/**
 * Created by Liu.Jun on 2020/4/22 18:58.
 */

// props
export default {
    formProps: {
        type: null
    },
    //  ui
    globalOptions: {
        type: null
    },
    // schema
    schema: {
        type: Object,
        default: () => ({})
    },
    // Ui Schema
    uiSchema: {
        type: Object,
        default: () => ({})
    },
    // Error Schema
    errorSchema: {
        type: Object,
        default: () => ({})
    },
    //
    customRule: {
        type: Function,
        default: null
    },
    //
    customFormats: {
        type: Object,
        default: () => ({})
    },
    //  Schema
    rootSchema: {
        type: Object,
        default: () => ({})
    },
    //
    rootFormData: {
        type: null,
        default: () => ({})
    },
    //
    curNodePath: {
        type: String,
        default: ''
    },
    //
    required: {
        type: Boolean,
        default: false
    },
    //
    // object array
    needValidFieldGroup: {
        type: Boolean,
        default: true
    }
};
