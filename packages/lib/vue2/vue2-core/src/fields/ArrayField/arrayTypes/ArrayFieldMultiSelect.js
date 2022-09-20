/**
 * Created by Liu.Jun on 2020/4/24 11:56.
 */


import {
    getWidgetConfig, optionsList
} from '@lljj/vjsf-utils/formUtils';
import retrieveSchema from '@lljj/vjsf-utils/schema/retriev';
import vueProps from '../../props';

import Widget from '../../../components/Widget';

export default {
    name: 'ArrayFieldMultiSelect',
    functional: true,
    props: {
        ...vueProps
    },
    render(h, context) {
        const {
            schema, rootSchema, uiSchema, curNodePath, rootFormData, globalOptions
        } = context.props;

        // schemaField
        const itemsSchema = retrieveSchema(schema.items, rootSchema);

        const enumOptions = optionsList(itemsSchema, uiSchema, curNodePath, rootFormData);

        const widgetConfig = getWidgetConfig({
            schema,
            uiSchema,
            curNodePath,
            rootFormData
        }, () => ({
            widget: globalOptions.WIDGET_MAP.common.checkboxGroup
        }));

        //   enumOptions
        widgetConfig.uiProps.multiple = true;

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
