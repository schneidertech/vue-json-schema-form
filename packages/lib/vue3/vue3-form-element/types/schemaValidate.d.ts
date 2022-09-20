declare namespace schemaValidate {
    /** schemaajvformData */
    function ajvValidateFormData(options: object): object;

    /** formData 并转换错误信息 */
    function validateFormDataAndTransformMsg(options: object): object;

    /** schema 是否通过校验 */
    function isValid(schema: object, data: any): boolean;

    /** ajv validate 方法 */
    function ajvValid(schema: object, data: any): boolean;

    /** oneOf anyOf 通过formData的值来找到当前匹配项索引 */
    function getMatchingOption(formData: object, options: object, rootSchema: object): boolean;
}

export default schemaValidate;
