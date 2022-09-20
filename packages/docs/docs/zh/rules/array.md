# array

##
>* type `array`
>*  - [JSON Schema array](https://json-schema.org/understanding-json-schema/reference/array.html)

##
### `items`
 schema schema

### `additionalItems`
items schema

### `contains`
 { "type": "number" }

### `minItems`


### `maxItems`


### `uniqueItems`
 `false`

`schema` `ui-schema` `error-schema`

>  [array demo](https://form.lljj.me/#/demo?type=Arrays)
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
                schema: {
                    definitions: {
                        Thing: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    title: 'Name',
                                    default: 'Default name',
                                },
                            },
                        },
                    },
                    type: 'object',
                    properties: {
                        listOfString: {
                            type: 'array',
                            title: 'A list with a minimal number of items',
                            minItems: 1,
                            maxItems: 3,
                            items: {
                                $ref: '#/definitions/Thing',
                            }
                        },
                        multipleChoicesList: {
                            type: 'array',
                            title: 'A multiple choices list',
                            items: {
                                type: 'string',
                                enum: ['foo', 'bar', 'fuzz', 'qux'],
                            },
                            uniqueItems: true,
                        },
                        fixedItemsList: {
                            type: 'array',
                            title: 'A list of fixed items (tuple)',
                            items: [
                                {
                                    title: 'A string value',
                                    type: 'string',
                                    default: 'lorem ipsum',
                                },
                                {
                                    title: 'a boolean value',
                                    type: 'boolean',
                                },
                                {
                                    title: 'a number value',
                                    type: 'number',
                                }
                            ],
                            additionalItems: {
                                title: 'Additional item',
                                type: 'number',
                            },
                        },
                        nestedList: {
                            type: 'array',
                            title: 'Nested list',
                            items: {
                                type: 'array',
                                title: 'Nested list - inner list',
                                items: {
                                    title: 'Name',
                                    type: 'string',
                                    default: 'lorem ipsum',
                                },
                            },
                        },
                        unorderable: {
                            title: 'Unorderable items',
                            type: 'array',
                            items: {
                                type: 'string',
                                default: 'lorem ipsum',
                            },
                        },
                        unremovable: {
                            title: 'Unremovable items',
                            type: 'array',
                            items: {
                                type: 'string',
                                default: 'lorem ipsum',
                            },
                        },
                        noToolbar: {
                            title: 'No add, remove and order buttons',
                            type: 'array',
                            items: {
                                type: 'string',
                                default: 'lorem ipsum',
                            },
                        },
                        fixedNoToolbar: {
                            title: 'Fixed array without buttons(Tuple)',
                            type: 'array',
                            items: [
                                {
                                    title: 'A number',
                                    type: 'number',
                                    default: 42,
                                },
                                {
                                    title: 'A boolean',
                                    type: 'boolean',
                                    default: false,
                                },
                            ],
                            additionalItems: {
                                title: 'A string',
                                type: 'string',
                                default: 'lorem ipsum',
                            },
                        },
                    },
                },
                uiSchema: {
                    listOfString: {
                        items: {
                            name: {
                                'ui:options': {
                                    placeholder: 'Please enter a name'
                                }
                            }
                        },
                    },
                    multipleChoicesList: {
                        'ui:widget': 'CheckboxesWidget',
                    },
                    fixedItemsList: {
                        items: [
                            {
                                'ui:options': {
                                    type: 'textarea'
                                }
                            },
                            {
                                'ui:options': {
                                    activeText: '',
                                    inactiveText: ''
                                }
                            },
                            {
                                'ui:options': {
                                    placeholder: 'Please enter'
                                }
                            }
                        ],
                        additionalItems: {
                            'ui:options': {
                                step: 10
                            }
                        }
                    },
                    unorderable: {
                        'ui:options': {
                            sortable: false,
                        },
                    },
                    unremovable: {
                        'ui:options': {
                            removable: false,
                        },
                    },
                    noToolbar: {
                        'ui:options': {
                            addable: false,
                            sortable: false,
                            removable: false,
                        },
                        items: {
                            'ui:options': {
                                title: ''
                            }
                        }
                    },
                    fixedNoToolbar: {
                        'ui:options': {
                            addable: false,
                            sortable: false,
                            removable: false,
                        },
                    },
                },
                errorSchema: {
                    nestedList: {
                        items: {
                            items: {
                                'err:required': 'Inner item name'
                            }
                        }
                    }
                },
                formData: {
                    multipleChoicesList: ['foo', 'bar'],
                    fixedItemsList: ['Some text', true],
                    nestedList: [['lorem', 'ipsum'], ['dolor']],
                    unorderable: ['one', 'two'],
                    unremovable: ['one', 'two'],
                    noToolbar: ['one', 'two'],
                    fixedNoToolbar: [42, true, 'additional item one', 'additional item two'],
                }
            }
        }
   }
</script>
```
:::

##
*  `ui-schema`  `ui:addable``ui:sortable``ui:removable` //
*  `ui-schema`  `ui:showIndexNumber` item
*  [ui-schema ](https://form.lljj.me/#/demo?type=Arrays)


```js
uiSchema = {
    'ui:options': {
        addable: false,
        sortable: false,
        removable: false,
        showIndexNumber: true
    }
}
```
