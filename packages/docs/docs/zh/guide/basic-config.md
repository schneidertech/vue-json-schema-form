---
sidebarDepth: 2
---

# API

##  Props

### schema
* required`true`
* `object`
* `undefined`

 JSON Schema
 [JSON Schema](https://json-schema.org/understanding-json-schema/index.html)

```
title: '',
description: '' // html
```

 `object` `array`  `title` `description` `FieldGroupWrap`

 `title` `description`  `widget`  `formItem`

:::tip
*  `title` `description`
* `object` `array`  ['ui:showTitle': false](#ui-schema)
:::


**: **
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
            formData: {},
            schema: {
                title: 'UserInfo ',
                description: 'A simple form example.',
                type: 'object',
                required: [
                    'firstName',
                    'lastName'
                ],
                properties: {
                    firstName: {
                        type: 'string',
                        title: 'First name',
                        default: 'Jun'
                    },
                    lastName: {
                        type: 'string',
                        title: 'Last name'
                    },
                    age: {
                        type: 'integer',
                        title: 'Age',
                        maximum: 80,
                        minimum: 16
                    },
                    bio: {
                        type: 'string',
                        title: 'Bio',
                        minLength: 10
                    },
                    password: {
                        type: 'string',
                        title: 'Password',
                        minLength: 3
                    },
                    telephone: {
                        type: 'string',
                        title: 'Telephone',
                        minLength: 10
                    }
                }
            }
        };
    }
};
</script>
```
:::

### ui-schema
* `object`
* `{}`
* ``ui  `schema`

>* `0.0.16`  `ui-schema`  `schema`  [](#ui-schemaschema)
>* `0.1.0`  [error-schema](#error-schema)  [ui-schema](#ui-schema) `ui-schema`  `error-schema` ui

json `JSON Schema`


#### ui-schema
* `0.2`  `ui:xxx` ui:options
mustache  `parentFormData``rootFormData`
* `parentFormData`  FormData
* `rootFormData`  FormData

>  `new Function` return

[uiSchema ](https://form.lljj.me/#/demo?type=uiSchema%28%29)
```
'ui:title': `{{ parentFormData.age > 18 ? '' : '' }}`
```

:::tip
*  `schema` ui `ui:`
*  `ui:options`  `ui:`
* `ui:xx`  `ui:options` `xx``ui:options` `ui:options`
> ui-schema json JSON Schema
:::

:::warning
* `ui:hidden` `ui:widget` `ui:field` `ui:fieldProps`  `ui:options`
:::



```js
uiSchema = {
     // schema title
    'ui:title': 'schema title',

    // schema description
    'ui:description': 'schema description',

    //  undefined
    'ui:emptyValue': undefined,

     // (options)
    // https://vue-json-schema-form.lljj.me/zh/guide/data-linkage.html#ui-schema%E9%85%8D%E7%BD%AE%E8%A1%A8%E8%BE%BE%E5%BC%8F
    'ui:hidden': false,

     // field (options)
    // https://vue-json-schema-form.lljj.me/zh/guide/adv-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89field
    'ui:field': 'componentName',

    // field fieldprops props: { fieldProps } (options)
    'ui:fieldProps': undefined,

    // widget(options)
    // https://vue-json-schema-form.lljj.me/zh/guide/adv-config.html#%E8%87%AA%E5%AE%9A%E4%B9%89widget
    'ui:widget': 'el-slider',

    // formItem  labelWidthantdv formItem fieldAttrslabelCollabel
    //  fieldAttrs  labelWidth': '50px'
    'ui:labelWidth': '50px',

    'ui:options': {
            // scoped slots render
            //  renderScopedSlots keyslotNamevnode
            // render https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
            renderScopedSlots(h) {
                return {
                    append: (props) => h('span', '.com')
                };
            },

            // slotsrender
            //  renderChildren  Vnode[] slotslotName
            // render https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
            renderChildren(h) {
                return [
                    h('span', {
                        slot: 'suffix',
                    }, '')
                ];
            },

            // widget
            // widget mounted vm
            // : "0.4.1"
            getWidget: (widgetVm) => {
                console.log(widgetVm);
            },

            // onChange
            //  1.3
            /**
             *
             * @param curVal
             * @param preVal
             * @param parentFormData
             * @param rootFormData
             */
            onChange({ curVal, preVal, parentFormData, rootFormData }) {
                console.log('change:', curVal, preVal, parentFormData, rootFormData);
            },

            //  type`object``array`
            showTitle: true,

             //  type `object``array`
            showDescription: false,

            // 0.2 fieldStyle
            width: '100px',

            attrs: {
                //  vue render attrs  Widget
                //  attrs    attrs
                // widgetwidgetpropsuiSchemaattr
                autofocus: true,
                width: '99px', // widgetwidth
            },
            style: {
                //  vue render style  Widget
                boxShadow: '0 0 6px 2px #2b9939'
            },
            class: {
                // 0.1.0
                //  vue render class  Widget
                className_hei: true
            },
            fieldStyle: {
                // 0.1.0
                //  vue render style  Field field
                background: 'red'
            },
            fieldClass: {
                // 0.1.0
                //  vue render class  Field field
                fieldClass: true
            },
            fieldAttrs: {
                //  vue render attrs  Field
                'attr-x': 'xxx'
            },

            //  attrs  Widget
            type: 'textarea',
            placeholder: ''
    }
}
```

>1. `ui:field` field  [ field](/zh/guide/adv-config.html#field)
>1. `ui:widget` widget  [ widget](/zh/guide/adv-config.html#widget)
>1. `ui:widget`  `HiddenWidget`  `hidden`
>1. `ui:hidden`  [ui-schema ui:hidden](/zh/guide/data-linkage.html#ui-schema)

### ui-schema - events
uiSchema widgetListeners  emit events

:::warning
*  `vue2`
* `vue3`  `ui:onXxx` [vue3 listeners](https://v3.cn.vuejs.org/guide/migration/listeners-removed.html#%E6%A6%82%E8%A7%88)
:::

>  ui widgetListenerwidgetevents

```js
{
    'ui:options': {
        widgetListeners: {
            input(event) {
                console.log('ui input', event);
            }
        }
    }
}
```



### ui-schema - slots
uiSchemarenderslotWidget

> vue2slotsscopeSlots
>
> [render](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)

* slots - `renderChildren` (vue2)

> vue3 slots  `renderScopedSlots`

```js
{
    'ui:options': {
        // slotsrender
        //  renderChildren  Vnode[] slotslotName
        // render https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
        renderChildren(h) {
            return [
                h('span', {
                    slot: 'suffix',
                }, '')
            ];
        }
    }
}
```

* scopedSlots - `renderScopedSlots` vue3vue2
> vue3 h api`import { h } from 'vue'`
>
> vue3  `renderScopedSlots` vue3scoped slots

```js
{
    'ui:options': {
        // vue2
        // scoped slots render
        //  renderScopedSlots keyslotNamevnode
        // render https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
        renderScopedSlots(h){
            return {
                append: (props) => h('span', '.com')
            };
        }
    },

    'ui:options': {
        // vue3
        // slots render
        // vue3 renderScopedSlots function
        // vue3 render https://v3.cn.vuejs.org/guide/render-function.html#%E6%8F%92%E6%A7%BD
        renderScopedSlots: {
            default: (props) =>h('span', props.text)
        }
    }
}
```

#### ui-schemaschema

`0.0.16` `ui-schema`  `schema`

* `ui-schema`  `schema`
*  `schema`  `JSON Schema`


```json
{
    "title": "Demo",
    "type": "object",
    "ui:order": [
        "bio",
        "firstName"
    ],
    "properties": {
        "firstName": {
            "type": "string",
            "title": "First name",
            "ui:placeholder": "FirstNameschema"
        },
        "bio": {
            "type": "string",
            "title": "Bio",
            "minLength": 10,
            "ui:options": {
                "type": "textarea",
                "placeholder": "FirstNameschema",
                "rows": 4
            }
        }
    }
}
```

#### ui-schemawidget
::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    data() {
        return {
            formData: {
                number: 1,
                numberEnumRadio: 2,
                integerRange: 50,
            },
            schema: {
                type: 'object',
                properties: {
                    firstName: {
                        type: 'string',
                        title: 'First name',
                        'ui:placeholder': 'FirstNameschema'
                    },
                    bio: {
                        type: 'string',
                        title: 'Bio',
                        minLength: 10,
                        'ui:options': {
                            type: 'textarea',
                            placeholder: 'placeholderschema',
                            rows: 4
                        }
                    },
                    inputText: {
                        title: 'Input Text',
                        type: 'string'
                    },
                    number: {
                        title: 'Number ()',
                        type: 'number'
                    },
                    integerRange: {
                        title: 'Integer range ( ElSlider)',
                        type: 'integer',
                        minimum: 42,
                        maximum: 100
                    }
                }
            },
            uiSchema: {
                'ui:order': ['number', '*'],
                inputText: {
                    'ui:description': '',
                    'ui:emptyValue': '',
                    'ui:options': {
                        style: {
                            boxShadow: '0 0 6px 2px #2b9939'
                        },
                        class: {
                            className_hei: true
                        },
                        type: 'textarea',
                        autofocus: true,
                        rows: 6,
                        placeholder: ''
                    }
                },
                number: {
                    'ui:title': ''
                },
                integerRange: {
                    'ui:widget': 'el-slider',
                }
            }
        }
    }
};
</script>
```
:::

::: warning
 `schema`  `formData`


```js

// schema
schema = {
    type: 'object',
    properties: {
        fixedItemsList: {
            type: 'array',
            title: 'A list of fixed items',
            items: [
                {
                    title: 'A string value',
                    type: 'string',
                    maxLength: 2
                }
            ]
        }
    }
}
```

```js
//
uiSchema = {
    fixedItemsList: {
         //  schema
         items: [
             {
                 'ui:options': {
                    ...
                }
             }
         ]
    }
}
```

```js
//
uiSchema = {
    fixedItemsList: [
         {
             'ui:options': {
                ...
            }
        }
    ]
}
```

:::

### error-schema
* `object`
* `{}`
* ``ui  `schema`

>* `0.0.16`  `error-schema`  `schema`  [](#error-schemaschema)
>* `0.1.0`  [error-schema](#error-schema)  [ui-schema](#ui-schema) `ui-schema`  `error-schema` ui

json JSON Schema

 `ui-schema`
1.  `err:`
1.  schema  `err:${name}` key `err:format` `err:required` `err:type`

::: tip
 * schema `error`  `err:`
 *  `err:options`  `err:`
 * `err:xx`  `err:options` `xx``err:options` `err:options`
 > error-schema jsonJSON Schema
 :::

#### error-schemaschema

`0.0.16` `error-schema`  `schema`

>  [ui-schemaschema](#ui-schemaschema)

error-schema

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
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
                required: [
                    'userName',
                    'homePage',
                    'bio'
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: '',
                        default: 'Liu.Jun'
                    },
                    homePage: {
                        type: 'string',
                        format: 'uri',
                        title: '',
                        'err:required': 'schema',
                        'err:format': 'Urlschema'
                    },
                    bio: {
                        type: 'string',
                        title: '',
                        minLength: 10
                    },
                    listOfStrings: {
                        type: 'array',
                        title: 'A list of strings',
                        description: 'item',
                        uniqueItems: true,
                        minItems: 2,
                        items: {
                            type: 'string',
                            default: 'bazinga'
                        }
                    },
                    fixedItemsList: {
                        type: 'array',
                        title: 'A list of fixed items',
                        items: [
                            {
                                title: 'A string value',
                                type: 'string',
                                maxLength: 2
                            }
                        ]
                    }
                }
            },
            uiSchema: {
                bio: {
                    'ui:type': 'textarea',
                    'ui:placeholder': ' ...',
                    'err:required': 'ui-schema',
                },
            },
            errorSchema: {
                userName: {
                    'err:options': {
                        required: ''
                    }
                },
                bio: {
                    'err:minLength': '10'
                },
                listOfStrings: {
                    'err:uniqueItems': '',
                    items: {
                        'err:options': {
                            required: ' ~'
                        }
                    }
                },
                fixedItemsList: {
                    items: [
                        {
                            'err:maxLength': ''
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

### custom-formats
* `object`
* `{}`

 `avj.addFormat` format[](https://github.com/ajv-validator/ajv#addformatstring-name-stringregexpfunctionobject-format---ajv)



::: demo 0 < 999999.99
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :custom-formats="customFormats"
        :error-schema="errorSchema"
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
                required: [
                    'price'
                ],
                properties: {
                    price: {
                        type: 'string',
                        title: '',
                        description: '999999.99',
                        format: 'price'
                    }
                }
            },
            errorSchema: {
                price: {
                    'err:options': {
                        required: '',
                        format: '999999.99'
                    }
                }
            },
            customFormats: {
                price(value) {
                    return value !== '' && /^[0-9]\d*$|^\d+(\.\d{1,2})$/.test(value) && value >= 0 && value <= 999999.99
                }
           }
        }
    }
}
</script>
```
:::

### custom-rule
* `function`
* `-`

*  el-form rules validator
* [](/zh/guide/validate.html#custom-rule-)

### value / v-model
* `object`
* `{}`

` value props`


### form-footer
* `object`

```js
//
formFooter = {
    show: true, //
    okBtn: '', //
    okBtnProps: { type: 'primary' }, //  props loading  okBtnProps: { loading: true }
    cancelBtn: '', //

    // formFooter formItem
    //  vue3-ant wrapperCol  formItemAttrs = { wrapperCol: { span: 10, offset: 5 }}
    formItemAttrs: {}
}
```

#### formFooter show: false
 formFooter `show: false`
1.  [$$uiFormRef](/zh/guide/basic-config.html#uiformref) uiformelementUielForm `validate`

```html
<template>
  <vjsf ref="myForm" />
</template>

<script>
export default {
  async submit() {
    //
    await this.$refs.myForm.$$uiFormRef.validate()
    this.postData()
  }
}
</script>
```

2.  scope slot

[slot-scope](/zh/guide/basic-config.html#-scope-slot)


### fallback-label
* `boolean`
* default`false`

 `schema`  `title` `label`

 `fallback-label`  `true` `label`  `street_address`
```js
schema = {
    properties: {
        street_address: {
            type: 'string'
        }
    }
}
```

### form-props
* `object`
`form-props`

*

ui
```js
//
formProps = {
    layoutColumn: 1, // 1 2 3  1 2 3 inline
    inline: false, // labelPositiontop, antdlabelCol wrapperCol
    inlineFooter: false, //  true
    labelSuffix: '', // label
    labelPosition: 'top', //
    isMiniDes: false, // minilabel
    defaultSelectFirstOption: true, //
}
```

* uiform
uiformelementUi el-formIView i-form ...
```js
formProps = {
    layoutColumn: 2, // 1 2 3  1 2 3 inline

    // form
    // elementUi el-form labelWidth
    labelWidth: 'auto', //  '50px'
}
```

### strict-mode
 `anyOf`/`onyOf`  issue: [#157](https://github.com/lljj-x/vue-json-schema-form/issues/157)

* `boolean`
* default`false`


##  Emit Event
emit

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        @on-submit="handlerSubmit"
        @on-cancel="handlerCancel"
        @on-change="handlerChange"
    >
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    methods: {
        handlerSubmit() {
            const vNode = this.$createElement('pre', JSON.stringify(this.formData, null, 4));
            this.$message({
                type: 'success',
                message: vNode
            });
        },
        handlerCancel() {
            this.$message.warning('');
        },
        handlerChange({ oldValue, newValue }) {
            const vNode = this.$createElement('pre', JSON.stringify(newValue, null, 4));
            this.$notify({
                title: '',
                message: vNode
            });
        },
    },
    data() {
        return {
            formData: {
               name: 'Liu.Jun'
            },
            schema: {
                type: 'object',
                properties: {
                    name: {
                        title: '',
                        type: 'string'
                    }
                }
            }
        }
    }
};
</script>
```
:::

### on-submit
* (formData)

::: warning
vue3 `submit` `on`
:::



> [props form-footer](#form-footer)

### on-validation-failed
* (errorObj)

::: warning
vue3 `validation-failed` `on`
:::



> [props form-footer](#form-footer)


### on-cancel
* ()

::: warning
vue3 `cancel` `on`
:::


> [props form-footer](#form-footer)

### on-change
* (newVal, oldVal)

::: warning
vue3 `change` `on`
:::


> newVal  oldVal  [vue watch](https://cn.vuejs.org/v2/api/#vm-watch)

### on-form-mounted
* (formRef, { formData })

uiformform(`validate`)

::: warning
vue3 `form-mounted` `on`
:::

##  Methods
-

##  Attrs
### $$uiFormRef
`1.10` [on-form-mounted](#on-form-mounted)uiform
* uiform

::: warning
* `mounted`
:::

##  Scope-Slot
* name `default`form  `form-footer`

: { formData, formRefFn }

::: tip
* `formData`
* `formRefFn`  `function` `el-form` ref
:::

::: demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
    >
        <div slot-scope="{ formData, formRefFn }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
            <p><el-button @click="consoleLog(formRefFn)" type="primary"></el-button></p>
        </div>
    </vue-form>
</template>

<script>
export default {
    name: 'Demo',
    methods: {
        consoleLog(getForm) {
            console.log(getForm());
        },
    },
    data() {
        return {
            formData: {
               name: 'Liu.Jun'
            },
            schema: {
                type: 'object',
                properties: {
                    name: {
                        title: '',
                        type: 'string'
                    }
                }
            }
        }
    }
};
</script>
```
