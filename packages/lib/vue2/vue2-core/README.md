# @lljj/vue2-form-core
vue2  vue2 ui

 `props`  props

>  [@lljj/vue-json-schema-form](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue2/vue2-form-element) [@lljj/vue2-form-iview3](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue2/vue2-form-iview3)


##
npm  es6+  lib babe

 rollup babel plugin

```js
babel({
    exclude: /node_modules\/(?!(@lljj)\/).*/, //  @lljj
    extensions: ['.js', '.vue'],
})
```

##

```ssh
## npm
npm install --save @lljj/vue2-form-core

## yarn
yarn add @lljj/vue2-form-core
```

##

` props elementUiprops`

```js
import createVue2Core from '@lljj/vue2-form-core';

const globalOptions = {
    // widget
    WIDGET_MAP: {
        // schema type widget
        types: {
            // type  boolean
            boolean: 'el-switch',

            // type  string
            string: 'el-input',

            // type number
            number: 'el-input-number',

            // type integer
            integer: 'el-input-number',
        },

        //  schema format widget types
        formats: {
            // format: color
            color: 'el-color-picker',

            // format: time
            time: TimePickerWidget, //  20:20:39+00:00

            // format: date
            date: DatePickerWidget, //  2018-11-13

            // format: date-time
            'date-time': DateTimePickerWidget, //  2018-11-13T20:20:39+00:00
        },

        //
        common: {
            // select option
            select: SelectWidget,

            // radio
            radioGroup: RadioWidget,

            // checkout
            checkboxGroup: CheckboxesWidget,
        },

        //  ui
        // Vue2  createVue2Core
        widgetComponents: {
            CheckboxesWidget,
            RadioWidget,
            SelectWidget,
            TimePickerWidget,
            DatePickerWidget,
            DateTimePickerWidget
        }
    },

    //
    COMPONENT_MAP: {
        // form
        form: 'el-form',

        // formItem
        formItem: 'el-form-item',

        // button
        button: 'el-button',

        // popoverformLable description
        popover: 'el-popover'
    },
    HELPERS: {
        // mini description
        isMiniDes(formProps) {
            return formProps && ['left', 'right'].includes(formProps.labselPosition);
        }
    }
};

//  object.freeze globalOptions
const mySchemaForm = createVue2Core(globalOptions);

```

ui

## License
Apache-2.0
