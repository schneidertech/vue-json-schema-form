/**
 * Created by Liu.Jun on 2020/7/22 13:22.
 */

import { h, ref, watch } from 'vue';
import { resolveComponent } from '@snema/vjsf-utils/vue3Utils';
import { parseDateString } from '@snema/vjsf-utils/utils';

const formatTimeStr = (dateString) => {
    const { hour, minute, second } = parseDateString(dateString, true);
    return `${hour}:${minute}:${second}`;
};

const formatTimeObj = (timeStr) => {
    if (timeStr instanceof Date) {
        return timeStr;
    }

    //
    if (typeof timeStr === 'string') {
        const [hours, minutes, seconds] = timeStr.split(':');
        const curTime = new Date();
        curTime.setHours(+hours);
        curTime.setMinutes(+minutes);
        curTime.setSeconds(+seconds);
        return curTime;
    }

    //
    return undefined;
};

export default {
    name: 'TimePickerWidget',
    inheritAttrs: false,
    props: {
        modelValue: {
            default: null,
            type: null
        }
    },
    setup(props, { attrs, slots }) {
        // hack element plus timePicker object
        const originValue = ref(formatTimeObj(props.modelValue));

        //
        let formatValue = props.modelValue;

        //
        watch(() => props.modelValue, (newVal) => {
            if (newVal !== formatValue) {
                //
                originValue.value = formatTimeObj(newVal);
            }
        });

        return () => h(resolveComponent('el-time-picker'), {
            ...attrs,
            modelValue: originValue.value,
            'onUpdate:modelValue': (val) => {
                originValue.value = val;

                //  timeStr
                formatValue = val === null ? undefined : formatTimeStr(val);

                //
                attrs['onUpdate:modelValue'].apply(attrs, [formatValue]);
            }
        }, slots);
    }
};
