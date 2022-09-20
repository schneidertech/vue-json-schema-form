# Widget

`Widget` v-modelui `el-input`Widget

>

* [CheckboxesWidget](#checkboxeswidget)
* [RadioWidget](#radiowidget)
* [SelectWidget](#selectwidget)
* [UploadWidget](#uploadwidget)
* [TimePickerWidget](#timepickerwidget)
* [DatePickerWidget](#datepickerwidget)
* [DateTimePickerWidget](#datetimepickerwidget)
* [UploadWidget](#uploadwidget)
* [vue3 antnaiveUi ](#vue3-antnaiveui-)


:::tip
* `vjsf` Widget
* vue3  v-model `model: modelValue`
* [Widget](/zh/guide/adv-config.html#widget)
:::

## CheckboxesWidget
 elementUi `el-checkbox-group`

### props
* `value/v-model` `required` [`Array`]
* `enumOptions` `` `[{value: '1',  label: ''}]`value label

>  `el-checkbox-group`

## RadioWidget
 elementUi `el-radio-group`

### props
* `value/v-model` `required` [`String`, `Number`, `Boolean`]
* `enumOptions` `` `[{value: '1',  label: ''}]`value label

>  `el-radio-group`

## SelectWidget
 elementUi `el-select`

### props
* `value/v-model` `required`
* `enumOptions` `` `[{value: '1',  label: ''}]`value label

>  `el-select`

## UploadWidget
*
* [Playground upload ](https://form.lljj.me/#/demo?type=Upload)

### props
* `value/v-model` `required``[String, Array]`
* `responseFileUrl` Function  url
* `btnText`
* `slots`  VNode  upload slot(DEMO)

>  el-upload

`responseFileUrl`
```js
{
    responseFileUrl: {
        default: res => (res ? (res.url || (res.data && res.data.url)) : ''),
        type: [Function]
    }
}
```

 `ui:slots`

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            schema: {
                title: '',
                type: 'object',
                description: '  el-upload el-upload <br/>slot  slotsVNode list',
                properties: {
                    imgUrl: {
                        title: '',
                        type: 'string',
                        default: 'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',
                        'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                        'ui:widget': 'UploadWidget',
                        'ui:slots': {
                            default(h) {
                                return h('el-button', {
                                    slot: 'default',
                                    props: {
                                        size: 'mini',
                                        type: 'primary'
                                    },
                                }, [''])
                            },
                            tip(h) {
                                return h('div', {
                                    slot: 'tip',
                                    style: {
                                        fontSize: '12px',
                                        color: '#666'
                                    }
                                }, ['100 * 100'])
                            },
                       }
                    },
                    imgUrlList: {
                        title: '',
                        type: 'array',
                        'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                        'ui:btnText': '',
                        'ui:widget': 'UploadWidget',
                        // eslint-disable-next-line max-len
                        default: ['http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp'],
                        items: {
                            type: 'string',
                        }
                    }
                }
            },
            formData: {}
       }
    }
};
</script>
```
:::

## TimePickerWidget
>  `timPick`

## DatePickerWidget
>  `DatePicker / DateTimePicker`

## DateTimePickerWidget
>  `DatePicker / DateTimePicker`

## vue3 antnaiveUi
>  `DatePicker / DateTimePicker`

vue3 antnaiveUi  `v-model`  `model: modelValue`

|       | ant | Naive |
| ----------- | ----------- |----------- |
| InputWidget      | a-input       |n-input       |
| TextAreaWidget      | a-textarea       |n-input       |
| InputNumberWidget   | a-input-number        |n-input-number        |
| AutoCompleteWidget   | a-auto-complete        |n-auto-complete       |
| SliderWidget   | a-slider        |n-slider       |
| SwitchWidget   | a-switch        |a-switch       |
| RateWidget   | a-rate        |a-rate       |

 `modelValue` [v-model `modelValue` ](/zh/guide/#vue3-antnaiveui-v-model-)
