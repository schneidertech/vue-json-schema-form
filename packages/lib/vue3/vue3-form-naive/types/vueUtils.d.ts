declare namespace vueUtils {

    /** nodePath css */
    function nodePath2ClassName(path: string): string;

    /**  */
    function isRootNodePath(path: string): boolean;

    /** path */
    function computedCurPath(prePath: string, curKey: string): string;

    /** name */
    function deletePathVal(vueData: object, name: string): void;

    /** path */
    function setPathVal(vueData: object, path: string, value: any): void;

    /** path */
    function getPathVal(vueData: object, path: string): object;

    /** path */
    function path2prop(path: string): string;
}

export default vueUtils;
