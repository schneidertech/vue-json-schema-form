# string

##
>* type `string`
>*  - [JSON Schema string](https://json-schema.org/understanding-json-schema/reference/string.html)

##
> minLengthmaxLength
### `minLength`


### `maxLength`


### `pattern`


### `format`
 `uri` `email` `JSON Schema`

##

### enum
* `enum` `enumNames`  label
* `ui:enumNames` label



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
                    title: 'type string',
                    type: 'object',
                    required: [
                        'userName'
                    ],
                    properties: {
                        userName: {
                            type: 'string',
                            title: '',
                            minLength: 2,
                            maxLength: 8,
                            default: 'Liu.Jun'
                        },
                        homePage: {
                            type: 'string',
                            description: ' www.google.com',
                            title: '',
                            format: 'uri',
                            pattern: "^https?:\\/\\/www\\.google\\.com.*"
                        },
                        stringEnum: {
                            type: 'string',
                            title: ' (radio)',
                            enum: ['red', 'yellow', 'blue'],
                            enumNames: ['Color - 1', 'Color - 2', 'Color - 3']
                        }
                    }
                },
                uiSchema: {
                    userName: {
                        'ui:description': '2 - 8',
                        'ui:options': {
                            style: {
                                boxShadow: '0 0 3px 1px red',
                            }
                        }
                    },
                    stringEnum: {
                        'ui:widget': 'RadioWidget',
                        'ui:enumNames': ['UiColor - 1', 'UiColor - 2', 'UiColor - 3']
                    }
                },
                errorSchema: {
                    userName: {
                        'err:options': {
                            required: ''
                        }
                    },
                    homePage: {
                        'err:pattern': ' -  www.google.com'
                    }
                }
            }
        }
   }
</script>
```
:::

