/**
 * Created by Liu.Jun on 2021/2/23 10:21 .
 */

import { h } from 'vue';
import { resolveComponent } from '@snema/vjsf-utils/vue3Utils';
import { modelValueComponent, numberTimeComponent } from '../../utils';

const baseComponent = {
    name: 'DatePickerWidget',
    inheritAttrs: false,
    setup(props, { attrs }) {
        return () => {
            const { isNumberValue, isRange, ...otherAttrs } = attrs;
            return h(resolveComponent(isRange ? 'a-range-picker' : 'a-date-picker'), {
                valueFormat: isNumberValue ? 'x' : 'YYYY-MM-DD',
                ...otherAttrs
            });
        };
    }
};

const timeNumberComponent = numberTimeComponent(baseComponent);

const moduleValeComponent = modelValueComponent(timeNumberComponent, {
    model: 'value'
});

export default moduleValeComponent;
