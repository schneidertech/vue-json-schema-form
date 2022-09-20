#

>  [Schema](https://form.lljj.me/schema-generator.html#/index)
>   `` ``

 [layoutColumn](#layoutcolumn)  [ui:width](#ui-width)

## layoutColumn
> `layoutColumn`

 123  [form-props](/zh/guide/basic-config.html#form-props)  `layoutColumn`


```js
formProps: {
    layoutColumn: 2
}
```

## ui:width
> `ui:width` css width

 [ui-schema](/zh/guide/basic-config.html#ui-schema)  `ui:width`

```js
'ui:width': {
    width: '50%'
}
```

##
codepen

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
        :formProps="{
            layoutColumn: 2
        }"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {},
            schema: {
                type: 'object',
                properties: {
                    obj1: {
                        title: 'Object1',
                        type: 'object',
                        description: '',
                        required: [],
                        properties: {
                            input1: {
                                title: '',
                                type: 'string',
                                'ui:options': {
                                    placeholder: ''
                                }
                            },
                            input2: {
                                title: '',
                                type: 'string',
                                'ui:options': {
                                    placeholder: ''
                                }
                            }
                        },
                        'ui:order': [
                            'input1',
                            'input2'
                        ]
                    },
                    object2: {
                        title: 'Object2',
                        type: 'object',
                        description: ' ui:width ',
                        required: [],
                        properties: {
                            boolean: {
                                title: '(Switch)',
                                type: 'boolean',
                                'ui:options': {
                                    width: '33.333%'
                                }
                            },
                            stringRadio: {
                                title: '(Radio)',
                                type: 'string',
                                'ui:widget': 'RadioWidget',
                                enum: [
                                    '1',
                                    '2',
                                    '3'
                                ],
                                enumNames: [
                                    '',
                                    '',
                                    ''
                                ],
                                'ui:options': {
                                    width: '33.333%'
                                }
                            },
                            stringSelect: {
                                title: '(Select)',
                                type: 'string',
                                'ui:widget': 'SelectWidget',
                                enum: [
                                    '1',
                                    '2',
                                    '3'
                                ],
                                enumNames: [
                                    '',
                                    '',
                                    ''
                                ],
                                'ui:options': {
                                    width: '33.333%'
                                }
                            }
                        },
                        'ui:order': [
                            'boolean',
                            'stringRadio',
                            'stringSelect'
                        ]
                    }
                }
            },
            uiSchema: {
                bio: {
                    'ui:options': {
                        placeholder: '',
                        type: 'textarea',
                        rows: 1
                    }
                }
            }
        };
    }
};
</script>
```
:::
