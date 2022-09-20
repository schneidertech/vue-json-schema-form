---
home: true
pageClass: custom-page-home
heroImage: /logo.png
heroText: Vue JSON Schema Form
tagline:  Vue JSON Schema formVue3Ui
footer: Apache2.0 Licensed | Copyright  2020-2020 Jun
actionText:
actionLink: /zh/guide/
---

##
* [Playground ](https://form.lljj.me/ "Vue JSON Schema Form Playground")
* [](https://github.com/lljj-x/vue-json-schema-form "Vue JSON Schema github") / [Schema](https://form.lljj.me/schema-generator.html "Vue JSON Schema Form Schema") / [Vue](https://form.lljj.me/vue-editor.html)
* [](/zh/guide/todo.html)

``` bash
#
# vue2+elementUi
npm install --save @lljj/vue-json-schema-form

#
yarn add @lljj/vue-json-schema-form
```

```vue
<template>
    <VueForm
        v-model="formData"
        :ui-schema="uiSchema"
        :schema="schema"
    >
    </VueForm>
</template>

<script >
//
import VueForm from '@lljj/vue-json-schema-form';

export default {
    name: 'Demo',
    components: {
        VueForm
    },
    data() {
        return {
            formData: {},
            schema: {
                type: 'object',
                required: [
                    'userName',
                    'age',
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: '',
                        default: 'Liu.Jun',
                    },
                    age: {
                        type: 'number',
                        title: ''
                    },
                    bio: {
                        type: 'string',
                        title: '',
                        minLength: 10,
                        default: '',
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

>

## DEMO
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
            formData: {},
            schema: {
                type: 'object',
                required: [
                    'userName',
                    'age',
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: '',
                        default: 'Liu.Jun',
                    },
                    age: {
                        type: 'number',
                        title: ''
                    },
                    bio: {
                        type: 'string',
                        title: '',
                        minLength: 10,
                        default: '',
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

##
[JSON Schema](https://json-schema.org/understanding-json-schema/index.html) |
[Vue](https://cn.vuejs.org/)

##
 `JSON Schema`

schema vue elementUi ..
