/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 */

import { orderProperties, getUiOptions } from '@lljj/vjsf-utils/formUtils';
import { computedCurPath, getPathVal } from '@lljj/vjsf-utils/vueUtils';
import { isObject } from '@lljj/vjsf-utils/utils';
import FieldGroupWrap from '@lljj/vjsf-utils/components/FieldGroupWrap';
import vueProps from '../props';
import Widget from '../../components/Widget';

// eslint-disable-next-line import/no-cycle
import SchemaField from '../SchemaField';

export default {
    name: 'ObjectField',
    functional: true,
    props: vueProps,
    render(h, context) {
        const {
            schema,
            uiSchema,
            errorSchema,
            needValidFieldGroup,
            curNodePath,
            rootFormData,
            globalOptions
        } = context.props;

        // required
        const isRequired = name => Array.isArray(schema.required) && !!~schema.required.indexOf(name);

        //  dependencies
        // tip:  formData
        // TODO:  dependencies  key value
        const isDependOn = (name) => {
            let isDependency = false; //
            let curDependent = false; //

            if (isObject(schema.dependencies)) {
                curDependent = Object.entries(schema.dependencies).some(([key, value]) => {

                    //
                    const tempDependency = !!(Array.isArray(value) && ~value.indexOf(name));

                    //
                    isDependency = isDependency || tempDependency;

                    //
                    return tempDependency && getPathVal(rootFormData, curNodePath)[key] !== undefined;
                });
            }

            return {
                isDependency,
                curDependent
            };
        };

        const {
            title, description, showTitle, showDescription, order, fieldClass, fieldAttrs, fieldStyle, onlyShowIfDependent
        } = getUiOptions({
            schema,
            uiSchema,
            curNodePath,
            rootFormData
        });

        const properties = Object.keys(schema.properties || {});
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
                    props: {
                        ...context.props,
                        schema: schema.properties[name],
                        uiSchema: uiSchema[name],
                        errorSchema: errorSchema[name],
                        required: required || curDependent,
                        curNodePath: computedCurPath(curNodePath, name)
                    }
                }
            );
        });

        return h(
            FieldGroupWrap,
            {
                props: {
                    title,
                    description,
                    showTitle,
                    showDescription,
                    curNodePath
                },
                class: { ...context.data.class, ...fieldClass },
                attrs: fieldAttrs,
                style: fieldStyle
            },
            [
                h(
                    'template',
                    {
                        slot: 'default'
                    },
                    [
                        ...propertiesVNodeList,

                        // Widget object - minProperties. maxProperties. oneOf
                        needValidFieldGroup ? h(Widget, {
                            key: 'validateWidget-object',
                            class: {
                                validateWidget: true,
                                'validateWidget-object': true
                            },
                            props: {
                                schema: Object.entries(schema).reduce((preVal, [key, value]) => {
                                    if (
                                        schema.additionalProperties === false
                                        || !['properties', 'id', '$id'].includes(key)
                                    ) preVal[key] = value;
                                    return preVal;
                                }, {}),
                                uiSchema,
                                errorSchema,
                                curNodePath,
                                rootFormData,
                                globalOptions
                            }
                        }) : null
                    ]
                )
            ]
        );
    }
};
