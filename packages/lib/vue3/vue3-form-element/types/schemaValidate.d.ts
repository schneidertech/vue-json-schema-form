declare namespace schemaValidate {
    /** schemaajvformData */
    function ajvValidateFormData(options: object): object;

    /** formData  */
    function validateFormDataAndTransformMsg(options: object): object;

    /** schema  */
    function isValid(schema: object, data: any): boolean;

    /** ajv validate  */
    function ajvValid(schema: object, data: any): boolean;

    /** oneOf anyOf formData */
    function getMatchingOption(formData: object, options: object, rootSchema: object): boolean;
}

export default schemaValidate;
