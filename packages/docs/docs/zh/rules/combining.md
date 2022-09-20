---
sidebarDepth: 2
---

# combining
>*  - [JSON Schema combining](https://json-schema.org/understanding-json-schema/reference/combining.html)


* [allOf](#allof)
* [anyOf](#anyof)
* [oneOf](#oneof)
* [not](#not)

## allOf
###
*  `schema`
*  - [JSON Schema allOf](https://json-schema.org/understanding-json-schema/reference/combining.html#allof)

###
* `allOf`  `schema`

>  `schema`  `allOf`
> ```js
> //   `false`
> schema = {
>   "allOf": [
>     { "type": "string" },
>     { "type": "number" }
>  ]
> }
> ```

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
                    title: 'allOf',
                    type: 'object',
                    definitions: {
                        address: {
                            type: 'object',
                            properties: {
                                street_address: {
                                    title: '',
                                    type: 'string'
                                },
                                city: {
                                    title: '',
                                    type: 'string'
                                },
                                state: {
                                    title: '',
                                    type: 'string'
                                }
                            },
                            required: ['street_address', 'city', 'state']
                        }
                    },
                    properties: {
                        testAllOfRef: {
                            allOf: [
                                {
                                    $ref: '#/definitions/address'
                                },
                                {
                                    properties: {
                                        type: {
                                            type: 'string',
                                            title: '',
                                            enum: ['residential', 'business']
                                        }
                                    }
                                }
                            ],
                        }
                    }
                },
                uiSchema: {
                    testAllOfRef: {
                        type: {
                            'ui:widget': 'RadioWidget'
                        }
                    }
                },
                errorSchema: {
                    testAllOfRef: {
                        street_address: {
                            'err:required': '...'
                        }
                    }}
            }
        }
   }
</script>
```
:::

## anyOf

###
*  `schema`  `oneOf`  `anyOf`  `anyOf`
*  - [JSON Schema anyOf](https://json-schema.org/understanding-json-schema/reference/combining.html#anyof)
* `oneOfSelect` `anyOfSelect`
* anyOf objectarray `title`  `description` `ui:showTitle: true``ui:description: true`

###
*

>* [Demo](https://form.lljj.me/#/demo?type=AnyOf%28%29)
>* [](/zh/guide/adv-config.html#)

### anyOfSelectoneOfSelect
`anyOfSelect` `oneOfSelect`  anyOf  oneOf

anyOftitle `ui:enumOptions`



```js
const schema = {
    anyOfSelect: {
        'ui:widget': 'RadioWidget',
        'ui:title': '',
        'ui:options': {},
        'ui:enumOptions': [{
            label: '',
            value: 0
        }, {
            label: '',
            value: 1
        }]
    }
}
```

### anyOf
anyOf formDataanyOf

** `const` **


```js
const schema = {
    type: 'object',
    title: '',
    required: [],
    anyOfSelect: {
        'ui:title': ''
    },
    anyOf: [{
        title: 'el-switch',
        type: 'object',
        properties: {
            schemaOptions: {
                type: 'object',
                properties: {
                    'ui:widget': {
                        title: '',
                        type: 'string',
                        default: 'el-switch',
                        const: 'el-switch',
                        'ui:hidden': true
                    },
                    other: {
                        title: '',
                        type: 'string'
                    }
                }
            }
        }
    }, {
        title: 'el-checkbox',
        type: 'object',
        properties: {
            schemaOptions: {
                type: 'object',
                properties: {
                    'ui:widget': {
                        title: '',
                        type: 'string',
                        default: 'el-checkbox',
                        const: 'el-checkbox',
                        'ui:hidden': true
                    },
                    other: {
                        title: '',
                        type: 'string'
                    }
                }
            }
        }
    }]
}
```

###

#### const
* `const`  `anyOf` `const`  value`title`  label

`schema` `ui-schema` `error-schema`

:::demo 1 anyOfSelect  <br> 2anyOfschema
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
            <p><el-button @click="formRefFn().validate()" type="primary"></el-button></p>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                formData: {},
                schema: {
                    title: 'anyOf',
                    type: 'object',
                    properties: {
                        constVal: {
                            title: 'AnyOf const',
                            type: 'string',
                            anyOf: [
                                {
                                    title: 'schema option1',
                                    const: '111'
                                },
                                {
                                    const: '222'
                                }
                            ]
                        },
                        number: {
                            title: 'anyOf',
                            anyOf: [
                                {
                                    title: ' 5 ',
                                    type: 'integer',
                                    multipleOf: 5
                                },
                                {
                                    title: ' 3 ',
                                    type: 'integer',
                                    multipleOf: 3
                                }
                            ]
                        },
                        userInfo: {
                            title: '',
                            anyOf: [
                                {
                                    title: '',
                                    required: ['firstName'],
                                    properties: {
                                        firstName: {
                                            type: 'string',
                                            title: '',
                                            default: 'Jun'
                                        },
                                        lastName: {
                                            type: 'string',
                                            title: '',
                                            default: 'Liu'
                                        }
                                    }
                                },
                                {
                                    title: 'id',
                                    properties: {
                                        idCode: {
                                            type: 'string',
                                            title: 'ID',
                                            default: '10086'
                                        }
                                    }
                                }
                            ]
                        },
                    }
                },
                uiSchema: {
                    constVal: {
                        'ui:widget': 'RadioWidget',
                        anyOf: [
                            {},
                            {
                                'ui:title': 'ui-option2'
                            }
                        ]
                    },
                    number: {
                        anyOfSelect: {
                            'ui:widget': 'RadioWidget'
                        },
                        //  anyOf schema
                        'ui:widget': 'el-slider',
                        'ui:options': {
                            description: 'anyOf',
                        }
                    },
                    userInfo: {
                        //  anyOfSelect
                        anyOfSelect: {
                            'ui:title': '',
                            // 'ui:widget': 'RadioWidget',
                            'ui:options': {
                                style: {
                                    width: '100%'
                                }
                            }
                        },
                        anyOf: [
                            {
                                firstName: {
                                    'ui:title': 'ui-schema - title '
                                }
                            },
                            {
                                idCode: {
                                    'ui:title': 'ui-schema - title ID'
                                }
                            }
                        ]
                    }
                },
                errorSchema: {
                    userInfo: {
                        anyOf: [
                            {
                                firstName: {
                                    'err:required': 'firstName'
                                }
                            }
                        ]
                    }
                }
            }
        }
   }
</script>
```
:::

::: tip
* `anyOf` `oneOf`  `oneOfSelect` `anyOfSelect` `schema` key `error-schema``ui-schema`
*  `anyOf`  `schema`  `schema`  `Object.assign({}, this.schema, curSelectSchema)`
* `ui-schema``error-schema` anyOf`schema`
:::

## oneOf
###
*  `schema`
*  - [JSON Schema oneOf](https://json-schema.org/understanding-json-schema/reference/combining.html#oneof)

###
 `anyof` [anyof](#anyof)

## not
###
*  `schema`
*  - [JSON Schema not](https://json-schema.org/understanding-json-schema/reference/combining.html#not)

###
>1.   ...
>1.  ...
>1.  ...
