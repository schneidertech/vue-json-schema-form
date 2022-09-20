/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

//
import componentPackInput from '../viewComponents/Input';
import componentPackColor from '../viewComponents/Color';
import componentPackInputNumber from '../viewComponents/InputNumber';
import componentPackSlider from '../viewComponents/Slider';

//  Boolean
import componentPackBooleanSwitch from '../viewComponents/SelectBoolean/elSwitch';
import componentPackBooleanCheckbox from '../viewComponents/SelectBoolean/elCheckbox';
import componentPackBooleanSelect from '../viewComponents/SelectBoolean/elSelect';
import componentPackBooleanRadio from '../viewComponents/SelectBoolean/elRadio';

//
import componentPackRadio from '../viewComponents/SingleSelect/elRadio';
import componentPackRadioSelect from '../viewComponents/SingleSelect/elSelect';

import componentPackMultiSelect from '../viewComponents/MultiSelect/elSelect';
import componentPackMultiCheckbox from '../viewComponents/MultiSelect/elCheckbox';

//
import componentPackUpload from '../viewComponents/Upload';
import componentPackMultiUpload from '../viewComponents/MultiUpload';

//
import componentPackTime from '../viewComponents/Time';

//
import componentPackDate from '../viewComponents/Date';
import componentPackDateString from '../viewComponents/Date/string';

//
import componentPackDateTime from '../viewComponents/DateTime';
import componentPackDateTimeString from '../viewComponents/DateTime/string';

//
import componentPackDateRange from '../viewComponents/DateRange';
import componentPackDateRangeString from '../viewComponents/DateRange/string';

//
import componentPackDateTimeRange from '../viewComponents/DateTimeRange';
import componentPackDateTimeRangeString from '../viewComponents/DateTimeRange/string';


//  Object Array
import componentPackObject from '../viewComponents/Object';
import componentPackArray from '../viewComponents/Array';

/**
 * hidden
 * maxNum Number
 * topDisplay Bool
 * bottomDisplay Bool
 * onlyCanConfig Bool  copy
 * @type {*[]}
 */
const tools = [
    {
        groupName: '',
        componentList: [{
            title: 'Object',
            btnClass: 'w100',
            componentPack: componentPackObject
        }, {
            title: 'Array',
            btnClass: 'w100',
            componentPack: componentPackArray
        }]
    },
    {
        groupName: '',
        componentList: [{
            title: '',
            componentPack: componentPackInput
        }, {
            title: '(slider)', //  componentPackInputNumber
            componentPack: componentPackSlider
        }, {
            title: '',
            componentPack: componentPackInputNumber
        }, {
            title: '',
            componentPack: componentPackColor
        }]
    },
    {
        groupName: 'Bool',
        componentList: [{
            title: '(Switch)',
            componentPack: componentPackBooleanSwitch
        }, {
            title: '(Checkbox)',
            componentPack: componentPackBooleanCheckbox
        }, {
            title: '(Select)',
            componentPack: componentPackBooleanSelect
        }, {
            title: '(Radio)',
            componentPack: componentPackBooleanRadio
        }]
    },
    {
        groupName: '/',
        componentList: [{
            title: '(Radio)',
            componentPack: componentPackRadio
        }, {
            title: '(Select)',
            componentPack: componentPackRadioSelect
        }, {
            title: '(Select)',
            componentPack: componentPackMultiSelect
        }, {
            title: '(Checkbox)',
            componentPack: componentPackMultiCheckbox
        }]
    },
    {
        groupName: '',
        componentList: [{
            title: '',
            componentPack: componentPackUpload
        }, {
            title: '',
            componentPack: componentPackMultiUpload
        }]
    },
    {
        groupName: '',
        componentList: [{
            title: 'Date()',
            componentPack: componentPackDate
        }, {
            title: 'Date()',
            componentPack: componentPackDateString
        }, {
            title: 'DateTime()',
            componentPack: componentPackDateTime
        }, {
            title: 'DateTime()',
            componentPack: componentPackDateTimeString
        }, {
            title: 'Date()',
            componentPack: componentPackDateRange
        }, {
            title: 'Date()',
            componentPack: componentPackDateRangeString
        }, {
            title: 'DateTime()',
            componentPack: componentPackDateTimeRange
        }, {
            title: 'DateTime()',
            componentPack: componentPackDateTimeRangeString
        }, {
            title: 'Time()',
            componentPack: componentPackTime
        }]
    }
];

export default tools;
