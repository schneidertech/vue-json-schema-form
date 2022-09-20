import Vue from 'vue';

declare class VueForm extends Vue {
    /** formFooter  */
    formFooter: object

    /** value / v-model */
    value: object

    /** formprops */
    formProps: object

    /** schema  */
    schema: object

    /** uiSchema  */
    uiSchema: object

    /**  */
    errorSchema: object

    /**  */
    customFormats: object

    /**  */
    customRule: null
}

export default VueForm;
