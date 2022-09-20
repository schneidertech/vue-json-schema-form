/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 */

import { h } from 'vue';

import { orderProperties, getUiOptions } from '@lljj/vjsf-utils/formUtils';
import { computedCurPath, getPathVal } from '@lljj/vjsf-utils/vue3Utils';
import { isObject } from '@lljj/vjsf-utils/utils';
import FieldGroupWrap from '@lljj/vjsf-utils/components/FieldGroupWrap';
import vueProps from '../props';
import Widget from '../../components/Widget';

// eslint-disable-next-line import/no-cycle
import SchemaField from '../SchemaField';

export default {
    name: 'ObjectField',
    props: vueProps,
    setup(props) {
        // required
        const isRequired = name => Array.isArray(props.schema.required) && !!~props.schema.required.indexOf(name);

        //  dependencies
        // tip:  formData
        // TODO:  dependencies  key value
        const isDependOn = (name) => {
            let isDependency = false; //
            let curDependent = false; //

            if (isObject(props.schema.dependencies)) {
                curDependent = Object.entries(props.schema.dependencies).some(([key, value]) => {

                    //
                    const tempDependency = !!(Array.isArray(value) && ~value.indexOf(name));

                    //
                    isDependency = isDependency || tempDependency;

                    //
                    return tempDependency && getPathVal(props.rootFormData, props.curNodePath)[key] !== undefined;
                });
            }

            return {
                isDependency,
                curDependent
            };
        };

        return () => {
            const curNodePath = props.curNodePath;
            const {
                title, description, showTitle, showDescription, order, fieldClass, fieldAttrs, fieldStyle, onlyShowIfDependent
            } = getUiOptions({
                schema: props.schema,
                uiSchema: props.uiSchema,
                curNodePath,
                rootFormData: props.rootFormData
            });

            const properties = Object.keys(props.schema.properties || {});
            const orderedProperties = orderProperties(properties, order);

            //
            const propertiesVNodeList = orderedProperties.map((name) => {
                const required = isRequired(name);
                const { isDependency, curDependent } = isDependOn(name);

                // onlyShowWhenDependent
                return (isDependency && onlyShowIfDependent && !curDependent) ? null : h(
                    SchemaField,
                    {
                        key: name,
                        ...props,
                        schema: props.schema.properties[name],
                        uiSchema: props.uiSchema[name],
                        errorSchema: props.errorSchema[name],
                        required: required || curDependent,
                        curNodePath: computedCurPath(curNodePath, name)
                    }
                );
            });

            return h(
                FieldGroupWrap,
                {
                    title,
                    description,
                    showTitle,
                    showDescription,
                    curNodePath,
                    class: { ...fieldClass },
                    style: fieldStyle,
                    ...fieldAttrs
                },
                {
                    default: () => [
                        ...propertiesVNodeList,

                        // Widget object - minProperties. maxProperties. oneOf
                        ...props.needValidFieldGroup ? [
                            h(Widget, {
                                key: 'validateWidget-object',
                                class: {
                                    validateWidget: true,
                                    'validateWidget-object': true
                                },
                                schema: Object.entries(props.schema).reduce((preVal, [key, value]) => {
                                    if (
                                        props.schema.additionalProperties === false
                                        || !['properties', 'id', '$id'].includes(key)
                                    ) preVal[key] = value;
                                    return preVal;
                                }, {}),
                                uiSchema: props.uiSchema,
                                errorSchema: props.errorSchema,
                                curNodePath,
                                rootFormData: props.rootFormData,
                                globalOptions: props.globalOptions
                            })
                        ] : []
                    ]
                }
            );
        };
    }
};
