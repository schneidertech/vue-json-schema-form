interface HELPERS {
    isMiniDes: (formProps: object) => boolean;
}

declare namespace globalOptions {

    /** WIDGET_MAP  */
    export const WIDGET_MAP:object

    /** COMPONENT_MAP  */
    export const COMPONENT_MAP:object

    /** HELPERS  */
    export const HELPERS: HELPERS
}

export default globalOptions;
