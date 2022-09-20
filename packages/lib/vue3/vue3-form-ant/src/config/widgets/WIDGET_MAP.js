/**
 * Created by Liu.Jun on 2020/4/21 18:23.
 */

// widget elementUi

import widgetComponents from './index';

const {
    InputWidget,
    InputNumberWidget,
    SwitchWidget,
    CheckboxesWidget,
    RadioWidget,
    SelectWidget,
    TimePickerWidget,
    DatePickerWidget,
    DateTimePickerWidget,
    ColorWidget
} = widgetComponents;

export default {
    types: {
        boolean: SwitchWidget,
        string: InputWidget,
        number: InputNumberWidget,
        integer: InputNumberWidget,
    },
    formats: {
        color: ColorWidget,
        time: TimePickerWidget, // 20:20:39+00:00
        date: DatePickerWidget, // 2018-11-13
        'date-time': DateTimePickerWidget, // 2018-11-13T20:20:39+00:00
    },
    common: {
        select: SelectWidget,
        radioGroup: RadioWidget,
        checkboxGroup: CheckboxesWidget,
    },
    widgetComponents
};
