/**
 * Created by Liu.Jun on 2020/4/21 9:24.
 */

import { h, computed } from 'vue';

import { getWidgetConfig, isSelect, optionsList } from '@snema/vjsf-utils/formUtils';
import vueProps from '../props';
import Widget from '../../components/Widget';

export default {
    name: 'StringField',
    props: vueProps,
    setup(props, { attrs }) {
        const widgetConfig = computed(() => {
            // select input
            const enumOptions = isSelect(props.schema)
                                && optionsList(props.schema, props.uiSchema, props.curNodePath, props.rootFormData);

            const tempWidgetConfig = getWidgetConfig({
                schema: props.schema,
                uiSchema: props.uiSchema,
                curNodePath: props.curNodePath,
                rootFormData: props.rootFormData,
            }, () => {
                const isNumber = props.schema.type === 'number' || props.schema.type === 'integer';

                return {
                    widget: enumOptions
                        ? props.globalOptions.WIDGET_MAP.common.select
                        : (
                            props.globalOptions.WIDGET_MAP.formats[props.schema.format]
                            || (isNumber ? props.globalOptions.WIDGET_MAP.types.number : props.globalOptions.WIDGET_MAP.types.string)
                        )
                };
            });

            //   enumOptions
            if (enumOptions && !tempWidgetConfig.uiProps.enumOptions) {
                tempWidgetConfig.uiProps.enumOptions = enumOptions;
            }

            return tempWidgetConfig;
        });

        return () => h(
            Widget,
            {
                ...props,
                ...attrs,
                ...widgetConfig.value
            }
        );
    }
};
