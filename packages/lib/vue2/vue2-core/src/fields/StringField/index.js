/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 */

import { getWidgetConfig, isSelect, optionsList } from '@snema/vjsf-utils/formUtils';
import vueProps from '../props';
import Widget from '../../components/Widget';

export default {
    name: 'StringField',
    props: vueProps,
    functional: true,
    render(h, context) {
        const {
            schema, uiSchema, curNodePath, rootFormData, globalOptions: { WIDGET_MAP }
        } = context.props;

        // select input
        const enumOptions = isSelect(schema) && optionsList(schema, uiSchema, curNodePath, rootFormData);

        const widgetConfig = getWidgetConfig({
            schema,
            uiSchema,
            curNodePath,
            rootFormData
        }, () => {
            const isNumber = schema.type === 'number' || schema.type === 'integer';

            return {
                widget: enumOptions
                    ? WIDGET_MAP.common.select
                    : WIDGET_MAP.formats[schema.format]
                    || (isNumber ? WIDGET_MAP.types.number : WIDGET_MAP.types.string)
            };
        });

        //   enumOptions
        if (enumOptions && !widgetConfig.uiProps.enumOptions) {
            widgetConfig.uiProps.enumOptions = enumOptions;
        }

        return h(
            Widget,
            {
                ...context.data,
                props: {
                    ...context.props,
                    ...widgetConfig
                }
            }
        );
    }
};
