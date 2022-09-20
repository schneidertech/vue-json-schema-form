---
sidebarDepth: 2
---

#

##
 `ui:widget`  `ui:hidden`

[hidden](https://form.lljj.me/#/demo?type=hidden%28%E9%9A%90%E8%97%8F%E8%A1%A8%E5%8D%95%E9%A1%B9%29)

```js
uiSchema = {
    hidden: {
        //
        'ui:widget': 'HiddenWidget',
        'ui:hidden': true,
    }
};
```


##
*  `$ref`
*  `$ref`  [](https://json-schema.org/understanding-json-schema/structuring.html?highlight=definitions#reuse)

:::warning
* $ref
:::

demo

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                schema: {
                    title: 'Refer  Refer',
                    definitions: {
                        node: {
                            type: 'object',
                            properties: {
                                name: { title: '', type: 'string' },
                                children: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/definitions/node',
                                    },
                                },
                            },
                        },
                    },
                    type: 'object',
                    properties: {
                        tree: {
                            $ref: '#/definitions/node',
                        },
                    },
                },
                uiSchema: {
                    tree: {
                        name: {
                            'ui:description': 'ui-schema'
                        }
                    }

                },
                formData: {
                    tree: {
                        name: 'root',
                        children: [{ name: 'leaf' }],
                    }
                }
            }
        }
   }
</script>
```
:::

##
 `''` `undefined`JSON Schema

 `ui-schema` `ui:emptyValue`

  `firstName` `lastName`

>* `JSON.stringify`  `undefined`  Demo `firstName`

:::demo ui:emptyValue
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
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
                    title: 'ui:emptyValue ',
                    type: 'object',
                    required: ['firstName', 'lastName'],
                    properties: {
                        firstName: {
                            title: 'First Name',
                            type: 'string',
                            default: 'Jun'
                        },
                        lastName: {
                            title: 'Last Name',
                            type: 'string',
                            default: 'Liu'
                        }
                    },
                },
                uiSchema: {
                    lastName: {
                        'ui:emptyValue': ''
                    }
                }
            }
        }
   }
</script>
```
:::

*
1. [JSON Schema object required](/zh/guide/faq.html#json-schema-object-required)
1. [ui-schema ](/zh/guide/basic-config.html#ui-schema)


##

### form
formclasscsscss `genFromComponent`

### widget
 widget  `ui-schema`  `style``class``attrs`

 [ui-schemawidget](/zh/guide/basic-config.html#ui-schema-widget)

### field
 field  `ui-schema`  `fieldStyle``fieldClass``fieldAttrs`

> ...

###
formschema `field`  `path` classclass


![class pathName](/pathName.png)

::: tip
css `__path`  `anyOf``oneOf` path  path className
:::

## Widget
Widget `ui:widget`

**widget `v-model` formData`ui:xxx`  `props` widget**

::: tip
* Widget `input` `checkbox`formui:xx
* vue
* props: `value` / `modelValue`
* v-modelv-modelvue2 prop `value`, vue3 prop `modelValue`
*  `ui:xxx` widget
* [vue2 v-model](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)
   [vue3 v-model](https://v3.cn.vuejs.org/guide/migration/v-model.html)
:::

* `String` | `Object` | `Function`  ( [$createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0) )
* `` ``

::: warning
*  `Widget`  `v-model`
* `0.3`  `type: array`  `ui:widget`[](https://form.lljj.me/#/demo?type=Upload)
*  `type: object`
:::

:::demo  componentOptions `import componentOptions from './widget-components/XXX.vue'`
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
    </vue-form>
</template>
<script>
    //  import componentOptions from './widget-components/XXX.vue'
    // demorender
    const componentOptions = {
        name: 'TestAsyncWidget',
        props: {
            value: {
                type: null,
                default: ''
            }
        },
        render(h) {
            return h('div', {style: { padding: '4px', boxShadow: '0 0  4px 1px rgba(0,0,0,0.1)' }}, [
                h('button', {
                    attrs: {type: 'button'},
                    style: {marginRight: '6px'},
                    on: {
                        click: () => {
                            this.$emit('input', String(new Date()))
                        }
                    }
                }, ''),
                h('span', this.value),
            ]);
        }
    }

   export default {
        data() {
            return {
                formData: {},
                schema: {
                    title: 'Widget (demo)',
                    type: 'object',
                    required: ['inputText', 'numberEnumRadio'],
                    properties: {
                        inputText: {
                            title: 'options',
                            type: 'string',
                            default: String(new Date())
                        },
                        numberEnumRadio: {
                            type: 'number',
                            title: '( Radio )',
                            enum: [1, 2, 3],
                            enumNames: ['Radio - 1', 'Radio - 2', 'Radio - 3']
                        }
                    }
                },
                uiSchema: {
                    numberEnumRadio: {
                        'ui:widget': 'RadioWidget'
                    },
                    inputText: {
                        //  'el-input'
                        'ui:widget': componentOptions,
                    }
                }
            }
        }
   }
</script>
```
:::


## Field
field `ui-schema` `ui:field` fieldschema [Widget](#widget)

**field vueUtils.getPathVal vueUtils.setPathVal formData**

::: tip
* Field WidgetWidgetformItem
* vue
* props:  props  `Fieldprops`
*  vueUtils.getPathVal vueUtils.setPathVal [demo](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/DistpickerField.vue)
*  [ui:fieldProps](/zh/guide/basic-config.html#ui-schema)  prop fieldProps fieldprops
* demo
:::

* `String` | `Object` | `Function` ( [$createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0) )
* schema

::: warning
* vueUtils.getPathVal vueUtils.setPathVal [demo](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/DistpickerField.vue)
* Field field `FormItem`````
:::

Field `props`

:::demo showCode: Props
 ```js
{
    // schema
    schema: {
         type: Object,
         default: () => ({})
     },

    // Ui Schema
     uiSchema: {
         type: Object,
         default: () => ({})
     },

     // Error Schema
     errorSchema: {
         type: Object,
         default: () => ({})
     },

     //
     customFormats: {
         type: Object,
         default: () => ({})
     },

     //  Schema
     rootSchema: {
         type: Object,
         default: () => ({})
     },

     //
     rootFormData: {
         type: null,
         default: () => ({})
     },

     //
     curNodePath: {
         type: String,
         default: ''
     },

     //
     required: {
         type: Boolean,
         default: false
     }
}
```
:::

 `@snema/vue-json-schema-form` props
```js
import { fieldProps } from  '@snema/vue-json-schema-form';
```

### Demo -

* Demo `ui:field` schema ``  `` `formData`
* [field](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/LinkImgField.vue)

>* ...
>* Demo

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
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
                    id: 'MultipleImgLink',
                        type: 'object',
                        definitions: {
                            ImgItem: {
                                type: 'object',
                                properties: {
                                    imgUrl: {
                                        title: '',
                                        type: 'string',
                                        format: 'uri'
                                    },
                                    imgLink: {
                                        title: '',
                                        type: 'string',
                                        format: 'uri'
                                    }
                                },
                                required: [
                                    'imgUrl',
                                    'imgLink'
                                ]
                            }
                        },
                        properties: {
                            imgItem1: {
                                $ref: '#/definitions/ImgItem'
                            },
                            imgItem2: {
                                $ref: '#/definitions/ImgItem'
                            }
                        }
                },
                uiSchema: {
                    imgItem1: {
                        'ui:title': '1ui:field',

                        // LinkImgField  https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/LinkImgField.vue
                        'ui:field': 'LinkImgField'
                    },
                    imgItem2: {
                        'ui:title': '2ui:field',
                    }
                }
            }
        }
   }
</script>
:::

### Demo -

* Demo `ui:field` schema
* [field](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/docs/docs/.vuepress/injectVue/field/DistpickerField.vue)

>*
>*  `ui:fieldProps`  placeholders
>* Demo

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
    >
        <div slot-scope="{ formData, formRefFn }">
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
                    id: 'DistpickerTest',
                    title: '',
                    type: 'object',
                    definitions: {
                        item: {
                            title: '/',
                            type: 'string'
                        },
                        address: {
                            default: {
                                province: 440000,
                                city: "",
                                area: ""
                            },
                            type: 'object',
                            properties: {
                                province: {
                                    title: '',
                                    $ref: '#/definitions/item'
                                },
                                city: {
                                    title: '',
                                    $ref: '#/definitions/item'
                                },
                                area: {
                                    title: '',
                                    $ref: '#/definitions/item'
                                }
                            }
                        }
                    },
                    required: ['name'],
                    properties: {
                        name: {
                            title: '',
                            type: 'string',
                            default: 'HH'
                        },
                        address1: {
                            $ref: '#/definitions/address'
                        },
                        address3: {
                            $ref: '#/definitions/address'
                        }
                    }
                },
                uiSchema: {
                    name: {
                        'ui:options': {
                            placeholder: ''
                        },
                        'err:options': {
                            required: ''
                        }
                    },
                    address1: {
                        'ui:field': 'DistpickerField',
                        'ui:fieldProps': {
                            placeholders: {
                                  province: '-------  --------',
                                  city: '---  ---',
                                  area: '---  ---',
                              }
                        },
                    },
                    address3: {
                        'ui:title': 'ui:field',
                    }
                }
            }
        }
   }
</script>
:::
