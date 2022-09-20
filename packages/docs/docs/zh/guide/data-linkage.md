---
sidebarDepth: 2
---

#
 `JSON Schema` ui**JSON Schema**

 `JSON Schema`
* [JSON Schema anyOf ](#anyof-)
* [object dependencies ](#object-dependencies-)
* [Todo:  if else ](#if-else-)

UI
* [ui-schema](#ui-schema)
* [ui:field ](#ui-field-)
* [ui-schema ](#ui-schema-)

:::warning
UI `JSON Schema`  `JSON Schema`
>  `required`, ui-schema `ui:hidden: true` ....

....
:::

## anyOf
 [JSON Schema anyOf](https://json-schema.org/understanding-json-schema/reference/combining.html#anyof) [anyOf](/zh/rules/combining.html#anyof)**ui**

 `firstName` + `lastName`   `userId`  ``  `formData`  [anyOf](https://form.lljj.me/#/demo?type=AnyOf%28%29)

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
        @on-submit="handleSubmit"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {
            },
            schema: {
                title: '',
                type: 'object',
                properties: {
                    price: {
                        type: 'number',
                        title: '',
                        default: 99999.99
                    },
                    userInfo: {
                        title: '',
                        anyOf: [
                            {
                                title: '',
                                required: ['firstName'],
                                properties: {
                                    type: {
                                        'ui:widget': 'HiddenWidget',
                                        title: '',
                                        type: 'string',
                                        default: 'userInfo'
                                    },
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
                                    type: {
                                        'ui:widget': 'HiddenWidget',
                                        title: '',
                                        type: 'string',
                                        default: 'userId'
                                    },
                                    idCode: {
                                        type: 'string',
                                        title: 'ID',
                                        default: '10086'
                                    }
                                }
                            }
                        ]
                    },
                },
                anyOf: [{
                    title: '',
                    properties: {
                        age: {
                            title: '',
                            type: 'number',
                            anyOf: [
                                {
                                    const: 18
                                },
                                {
                                    const: 28
                                }
                            ]
                        },
                        url: {
                            title: '',
                            format: 'uri',
                            type: 'string',
                            default: 'https://lljj.me'
                        },
                        projects: {
                            title: '',
                            type: 'array',
                            minItems: 1,
                            items: {
                                type: 'object',
                                anyOf: [
                                    {
                                        title: '',
                                        properties: {
                                            url: {
                                                title: '',
                                                type: 'string',
                                                format: 'uri',
                                                default: 'https://www.demo.com'
                                            }
                                        }
                                    },
                                    {
                                        title: '',
                                        required: ['name'],
                                        properties: {
                                            name: {
                                                type: 'string',
                                                title: '',
                                                default: 'Vjsf'
                                            },
                                            description: {
                                                type: 'string',
                                                title: '',
                                                default: 'JSON Schema form'
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }, {
                    title: '',
                    properties: {}
                }]
            },
            uiSchema: {
                userInfo: {
                    anyOfSelect: {
                       'ui:widget': 'RadioWidget'
                    },
                    anyOf: [
                        {
                            'ui:title': 'ui-schema', // schema
                        },
                    ]
                },
                anyOfSelect: {
                    'ui:title': '',
                }
            },
            errorSchema: {
            }
        }
    },
    methods: {
        handleSubmit(formData) {
            this.$showJson({
                componentProps: {
                    jsonString: formData
                }
            });
        }
    }
}
</script>
```
:::

>*  `anyOf``oneOf`

## object dependencies

 [JSON Schema Object dependencies](https://json-schema.org/understanding-json-schema/reference/object.html#property-dependencies) **undefined*** property dependencies*

 `ui-schema`  `onlyShowIfDependent: true`

 ``  `` [Object-property-dependencies](https://form.lljj.me/#/demo?type=Object-property-dependencies%28%29)

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        @on-submit="$showJson({
             componentProps: {
                 jsonString: formData
             }
         })"
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
                title: 'Object property dependencies',
                type: 'object',
                properties: {
                    unidirectional: {
                        title: '',
                        description: 'ui-schema  onlyShowIfDependent ',
                        type: 'object',
                        'ui:options': {
                            onlyShowIfDependent: true
                        },
                        properties: {
                            name: {
                                title: 'Name',
                                type: 'string'
                            },
                            credit_card: {
                                title: 'Credit card',
                                type: 'string'
                            },
                            billing_address: {
                                title: 'Billing address',
                                type: 'string'
                            }
                        },
                        required: [
                            'name'
                        ],
                        dependencies: {
                            credit_card: [
                                'billing_address'
                            ]
                        }
                    },
                    bidirectional: {
                        title: '',
                        description: ' onlyShowIfDependent ',
                        type: 'object',
                        properties: {
                            name: {
                                title: 'Name',
                                type: 'string'
                            },
                            credit_card: {
                                title: 'Credit card',
                                type: 'string'
                            },
                            billing_address: {
                                title: 'Billing address',
                                type: 'string'
                            }
                        },
                        required: [
                            'name'
                        ],
                        dependencies: {
                            credit_card: [
                                'billing_address'
                            ],
                            billing_address: [
                                'credit_card'
                            ]
                        }
                    }
                }
            },
        }
    }
}
</script>
```
:::

## if else
> **

 [JSON Schema if then else](https://json-schema.org/understanding-json-schema/reference/conditionals.html)******

 if else ````

## ui-schema
 `JSON Schema`  [ali form-render](https://github.com/alibaba/form-render)ui-schema `ui:hidden`

**ui:hidden**

### ui:hidden mustache
mustache  `parentFormData``rootFormData`

* `parentFormData`  FormData
* `rootFormData`  FormData

>  `new Function` return


```js
uiSchema = {
    user: {
        'ui:hidden': `{{ parentFormData.attr !== 'league' && rootFormData.case1.showMore === false }}`,
    }
}
```

 [uiSchema ui:hidden()](https://form.lljj.me/#/demo?type=uiSchema-ui-hidden%28%29)
::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        @on-submit="$showJson({
             componentProps: {
                 jsonString: formData
             }
         })"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {
                case3: {
                  ruleList: [
                      {
                          attr: 'league',
                          relation: '>',
                          league: 'b'
                      }
                  ]
                }
            },
            schema: {
                title: 'ui-schemaui:hidden',
                type: 'object',
                properties: {
                    case1: {
                        title: '',
                        type: 'object',
                        properties: {
                            showMore: {
                                title: '',
                                type: 'boolean',
                                default: false
                            },
                            x1: {
                                title: '1',
                                type: 'string',
                                'ui:hidden': '{{rootFormData.case1.showMore === false}}'
                            },
                            x2: {
                                title: '2',
                                type: 'string',
                                'ui:hidden': '{{rootFormData.case1.showMore === false}}'
                            }
                        }
                    },
                    case3: {
                        title: '/',
                        type: 'object',
                        properties: {
                            ruleList: {
                                title: '',
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        attr: {
                                            title: '',
                                            type: 'string',
                                            enum: [
                                                'goal',
                                                'league'
                                            ],
                                            enumNames: [
                                                '',
                                                ''
                                            ],
                                            'ui:width': '40%'
                                        },
                                        relation: {
                                            title: '-',
                                            type: 'string',
                                            enum: [
                                                '>',
                                                '<',
                                                '='
                                            ],
                                            'ui:hidden': "{{parentFormData.attr === 'league'}}",
                                            'ui:width': '20%'
                                        },
                                        goal: {
                                            title: '',
                                            type: 'string',
                                            pattern: '^[0-9]+$',
                                            message: {
                                                pattern: ''
                                            },
                                            'ui:hidden': "{{parentFormData.attr !== 'goal'}}",
                                            'ui:width': '40%'
                                        },
                                        league: {
                                            title: '',
                                            type: 'string',
                                            enum: [
                                                'a',
                                                'b',
                                                'c'
                                            ],
                                            enumNames: [
                                                '',
                                                '',
                                                ''
                                            ],
                                            'ui:hidden': "{{parentFormData.attr !== 'league'}}",
                                            'ui:width': '40%'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>
```
:::

### ui:hidden function
function  `parentFormData``rootFormData`

* `parentFormData`  FormData
* `rootFormData`  FormData


```js
uiSchema = {
    user: {
        'ui:hidden': (parentFormData, rootFormData) => {
            return ...;
        },
    }
}
```


### ui:hidden
*  `true` `false`  `Boolean`

## ui:field
 `JSON Schema` ****

 [ui:field ](/zh/guide/adv-config.html#demo-)

## ui-schema
 `JSON Schema` `ui-schema`  `formData`  ui-schema `ui:widget:HiddenWidget` `ui:field: null`  `ui:fieldStyle`

 `ui-schema`
