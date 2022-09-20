#

##
 [Vue](https://cn.vuejs.org/)  [JsonSchema](https://json-schema.org/understanding-json-schema/index.html)

##
* [Playground ](https://form.lljj.me/ "Vue JSON Schema Form Playground")
* [Vue](https://form.lljj.me/vue-editor.html)
* [Schema](https://form.lljj.me/schema-generator.html "Vue JSON Schema Form Schema")

##
VueUi

**api99%**
::: warning
* vue3 emiton [ Emit Event](/zh/guide/basic-config.html#-emit-event)
* vue3 antd Vue `v-model`  `modelValue` props[](/zh/guide/#vue3-ant-v-model-%E7%89%B9%E6%AE%8A%E5%A4%84%E7%90%86)
:::

### @lljj/vue-json-schema-form
* ui`Vue2` `ElementUi`
* package name: `@lljj/vue-json-schema-form`
* umd cdn[@lljj/vue-json-schema-form cdn](https://npm.elemecdn.com/@lljj/vue-json-schema-form/dist/vueJsonSchemaForm.umd.min.js)
* umd script  `window.vueJsonSchemaForm``window.vueJsonSchemaForm.default`  `VueForm`
* [playground](https://form.lljj.me/#/demo?type=Simple)

### @lljj/vue2-form-iview3
* ui`Vue2` `iview3`
* package name: `@lljj/vue2-form-iview3`
* umd cdn[@lljj/vue2-form-iview3 cdn](https://npm.elemecdn.com/@lljj/vue2-form-iview3/dist/vue2-form-iview3.umd.min.js)
* umd script  `window.vue2FormIview3``window.vue2FormIview3.default`  `vue2FormIview3`
* [playground](https://form.lljj.me/#/demo?type=Simple&ui=VueIview3Form)

### @lljj/vue3-form-element
* ui`Vue3` `ElementPlus`
* package name : `@lljj/vue3-form-element`
* umd cdn[@lljj/vue3-form-element cdn](https://npm.elemecdn.com/@lljj/vue3-form-element/dist/vue3-form-element.umd.min.js)
* umd script  `window.vue3FormElement``window.vue3FormElement.default`
* [playground](https://form.lljj.me/v3/#/demo?type=Simple)

### @lljj/vue3-form-naive
* ui`Vue3` `antdv`
* package name : `@lljj/vue3-form-naive`
* umd cdn[@lljj/vue3-form-naive cdn](https://npm.elemecdn.com/@lljj/vue3-form-naive/dist/vue3-form-naive.umd.min.js)
* umd script  `window.vue3FormNaive``window.vue3FormNaive.default`
* [playground](https://form.lljj.me/v3/#/demo?type=Simple&ui=VueNaiveForm)

### @lljj/vue3-form-ant
* ui`Vue3` `antdv`
* package name : `@lljj/vue3-form-ant`
* umd cdn[@lljj/vue3-form-ant cdn](https://npm.elemecdn.com/@lljj/vue3-form-ant/dist/vue3-form-ant.umd.min.js)
* umd script  `window.vue3FormAnt``window.vue3FormAnt.default`
* [playground](https://form.lljj.me/v3/#/demo?type=Simple&ui=VueAntForm)

#### vue3 antnaiveUi v-model
 `a-input` ant vue3 `v-model:value` `v-model`  `modelValue`props

 `modelValueComponent`
```js
//  modelValue  update:modelValue v-model
import { modelValueComponent } from '@lljj/vue3-form-ant';
const MyFixInputComponent = modelValueComponent('a-input', {
    model: 'value' // ant model
});

// naive
import { modelValueComponent } from '@lljj/vue3-form-naive';
const MyFixInputComponent = modelValueComponent('n-input', {
    model: 'value' // naive model
});
```

:::tip
Widget
 [antnaiveUi vue Widget](/zh/guide/components.html#vue3-antnaiveui-)
:::

##
> ** `@lljj/vue-json-schema-form` **

### npm

``` bash
#
npm install --save @lljj/vue-json-schema-form

# yarn
yarn add @lljj/vue-json-schema-form
```

*
```js
import VueForm from '@lljj/vue-json-schema-form';
import Vue from 'vue';

//
Vue.component('VueForm', VueForm);
```

### script
```html
# script
<script src="//npm.elemecdn.com/@lljj/vue-json-schema-form/dist/vueJsonSchemaForm.umd.min.js"></script>
```

## DEMO
codepen

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
 `JSON Schema` form
* schema `title`  form
* schema `description`


![Vjsf](/vjsf.jpg)

`Field``Widget`
* `Field`  `FormItem`
* `Widget`  `input` `select` `FormItem`
> `Field` `Widget` `ui-schema`
>  [Field](/zh/guide/adv-config.html#field)[Widget](/zh/guide/adv-config.html#widget)

##
```js
import VueForm, {
    getDefaultFormState,
    fieldProps,
    vueUtils,
    formUtils,
    schemaValidate,
    i18n
} from '@lljj/vue-json-schema-form';
```

####  VueForm
 VueForm

#### getDefaultFormState
 `JSON Schema`  `FormState`
* (schema, formData, rootSchema, includeUndefinedValues)

>* schema `object` schema
>* formData `object`  formData  `undefined`
>* rootSchema `object` schemaschema
>* includeUndefinedValues `boolean`   `true`

>  `ui-schema` `ui:field`

#### fieldProps
Field props `ui:field` field props
>  `ui-schema` `ui:field`

#### vueUtils
Vueutils [](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/utils/vueUtils.js)
>  `ui-schema` `ui:field`

#### formUtils
Formutils [](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/utils/formUtils.js)
>  `ui-schema` `ui:field`

#### schemaValidate
schema [](https://github.com/lljj-x/vue-json-schema-form/blob/master/packages/lib/utils/schema/validate.js)
>  `ui-schema` `ui:field`

##
*  JSON Schema  `JSON Schema`form
* uiuiElementUiiView
* schema  [ajv](https://github.com/epoberezkin/ajv)
* schema [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)
