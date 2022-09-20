# number/integer

##
>* type `number`
>*  - [JSON Schema number](https://json-schema.org/understanding-json-schema/reference/numeric.html)


##
### `integer`


### `multipleOf`


### `minimum`


### `maximum`



:::tip
* integer  type

```js
{ type: 'integer' }
```

* `exclusiveMinimum` `exclusiveMinimum` schema

*  `schema`  `props`  `Widget`
```js
    const props = {};
    if (undefined !== schema.multipleOf) {
        //
        props.step = schema.multipleOf;
    }
    if (schema.minimum || schema.minimum === 0) {
        props.min = schema.minimum;
    }
    if (schema.maximum || schema.maximum === 0) {
        props.max = schema.maximum;
    }
```

* `enum`  `string` [enum](/zh/rules/string.html#enum)
:::



`schema` `ui-schema` `error-schema`

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
    >
        <div slot-scope="{ formData }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                formData: {},
                schema: {
                    title: 'type number',
                    type: 'object',
                    required: [
                        'age'
                    ],
                    properties: {
                        age: {
                            type: 'integer',
                            title: '',
                            minimum: 10,
                            maximum: 99,
                            default: 18
                        },
                        price: {
                            type: 'number',
                            description: ' 0.5 ',
                            title: '',
                            multipleOf: 0.5,
                            default: 1,
                        },
                        numberEnum: {
                            type: 'number',
                            title: ' (select)',
                            enum: [1, 2, 3],
                            enumNames: ['Select - 1', 'Select - 2', 'Select - 3']
                        }
                    }
                },
                uiSchema: {
                    age: {
                        'ui:widget': 'el-slider',
                        'ui:description': '10 - 99',
                        'ui:options': {
                            style: {
                                boxShadow: '0 0 3px 1px yellow',
                            }
                        }
                    }
                },
                errorSchema: {
                    age: {
                        'err:options': {
                            required: ' 10 - 99'
                        }
                    }
                }
            }
        }
   }
</script>
```
:::

