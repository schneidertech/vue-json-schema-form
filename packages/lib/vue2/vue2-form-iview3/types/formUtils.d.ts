interface Options {
    schema: object,
    uiSchema: object
}

declare namespace formUtils {

    /**  ui field */
    function getUiField(schemaOption: Options): object | null;

    /**  uiSchema options */
    function getUserUiOptions(schemaOption: Options): object;

     /** ui options */
    function getUiOptions(schemaOption: Options): object;

     /** ui  options + widget */
    function getWidgetConfig(schemaOption: Options): object;

     /** ui  options + widget */
    function getUserErrOptions(schemaOption: Options): object;

     /** ui:order object-> properties  */
    function orderProperties(properties: object, order): object;

     /** schema  */
    function isConstant(schema: object): boolean;

    function toConstant(schema: object): object | null;

    /**  **/
    function isSelect(_schema: object, rootSchema: object): boolean;

    /** type array items  **/
    function isFixedItems(schema: object): boolean;

    /**  **/
    function isMultiSelect(schema: object, rootSchema: object): boolean;

    function allowAdditionalItems(schemaOption: Options): boolean;

    /**  **/
    function optionsList(schemaOption: Options);
}

export default formUtils;
