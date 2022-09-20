/**
 * Created by Liu.Jun on 2020/4/20 9:55 .
 */

import { getUiField, isSelect, isHiddenWidget } from '@snema/vjsf-utils/formUtils';
import { nodePath2ClassName } from '@snema/vjsf-utils/vueUtils';
import { lowerCase } from '@snema/vjsf-utils/utils';
import retrieveSchema from '@snema/vjsf-utils/schema/retriev';
import FIELDS_MAP from '../../FIELDS_MAP';
import vueProps from '../props';

export default {
    name: 'SchemaField',
    props: vueProps,
    functional: true,
    render(h, context) {
        const props = context.props;
        const { rootSchema } = props;

        // schemaadditionalProperties formData
        // const schema = retrieveSchema(props.schema, rootSchema, formData);
        const schema = retrieveSchema(props.schema, rootSchema);

        //
        const curProps = {
            ...props,
            schema
        };

        //
        if (Object.keys(schema).length === 0) {
            return null;
        }

        // Uifield
        const {
            field: fieldComponent,
            fieldProps
        } = getUiField(FIELDS_MAP, curProps);

        // hidden
        const hiddenWidget = isHiddenWidget({
            schema,
            uiSchema: props.uiSchema,
            curNodePath: props.curNodePath,
            rootFormData: props.rootFormData
        });

        const pathClassName = nodePath2ClassName(props.curNodePath);

        if (schema.anyOf && schema.anyOf.length > 0 && !isSelect(schema)) {
            // anyOf
            return h(FIELDS_MAP.anyOf, {
                class: {
                    [`${pathClassName}-anyOf`]: true,
                    fieldItem: true,
                    anyOfField: true
                },
                props: curProps
            });
        } if (schema.oneOf && schema.oneOf.length > 0 && !isSelect(schema)) {
            // oneOf
            return h(FIELDS_MAP.oneOf, {
                class: {
                    [`${pathClassName}-oneOf`]: true,
                    fieldItem: true,
                    oneOfField: true
                },
                props: curProps
            });
        }
        return (fieldComponent && !hiddenWidget) ? h(fieldComponent, {
            props: {
                ...curProps,
                fieldProps
            },
            class: {
                ...context.data.class,
                [lowerCase(fieldComponent.name) || fieldComponent]: true,
                hiddenWidget,
                fieldItem: true,
                [pathClassName]: true
            }
        }) : null;
    }
};
