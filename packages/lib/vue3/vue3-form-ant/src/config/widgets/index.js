/**
 * Created by Liu.Jun on 2020/5/17 10:41 .
 */

import { h } from 'vue';
import CheckboxesWidget from './CheckboxesWidget';
import RadioWidget from './RadioWidget';
import SelectWidget from './SelectWidget';
import DatePickerWidget from './DatePickerWidget';
import DateTimePickerWidget from './DateTimePickerWidget';
import TimePickerWidget from './TimePickerWidget';
import UploadWidget from './UploadWidget';

import { modelValueComponent } from '../utils';

const widgetComponents = {
    CheckboxesWidget,
    RadioWidget,
    SelectWidget,
    TimePickerWidget,
    DatePickerWidget,
    DateTimePickerWidget,
    UploadWidget,
    InputWidget: modelValueComponent('a-input'),
    ColorWidget: {
        setup(props, { attrs }) {
            return () => h(widgetComponents.InputWidget, {
                ...attrs,
                style: {
                    ...attrs.style || {},
                    maxWidth: '180px'
                }
            }, {
                addonAfter: () => h('input', {
                    disabled: attrs.disabled,
                    readonly: attrs.readonly,
                    value: attrs.modelValue,
                    onInput(e) {
                        attrs['onUpdate:modelValue'](e.target.value);
                    },
                    onChange(e) {
                        attrs['onUpdate:modelValue'](e.target.value);
                    },
                    type: 'color',
                    style: {
                        padding: '0',
                        width: '50px'
                    }
                })
            });
        }
    },
    TextAreaWidget: modelValueComponent('a-textarea'),
    InputNumberWidget: modelValueComponent('a-input-number'),
    AutoCompleteWidget: modelValueComponent('a-auto-complete'),
    SliderWidget: modelValueComponent('a-slider'),
    RateWidget: modelValueComponent('a-rate'),
    SwitchWidget: modelValueComponent('a-switch', {
        model: 'checked'
    }),
};

export default widgetComponents;
