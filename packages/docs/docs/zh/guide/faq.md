#

## select

*  JsonSchema  `enum`  `enumNames`  schema
* `ui:enumOptions`

 `ui:enumOptions`
::: demo
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
               name: ''
            },
            schema: {
                type: 'object',
                properties: {
                    name: {
                        title: '',
                        type: 'string',
                    }
                }
            },
            uiSchema: {
                name: {
                    'ui:widget': 'SelectWidget',
                    'ui:enumOptions': [{value: '1',  label: '...'}]
                }
            }
        }
    },
    created() {
        setTimeout(() => {
            Object.assign(this.uiSchema.name, {
                'ui:enumOptions': [{value: '2',  label: ''},{value: '3',  label: ''}]
            })
        }, 3000);
    }
};
</script>
```

:::

## JSON Schema object required

> ****
>* JSON Schema  object `required`  `undefined`
>* `javascript`  `undefined` `0` `` `null`  `boolean`  `false`

 `''`  `undefined`  `JSON Schema`

:::tip
*  `ui-schema`  `emptyValue`


```js
{ 'ui:emptyValue': '' }

//
{ 'ui:emptyValue': '' }
```
 [ui-schema](/zh/guide/basic-config.html#ui-schema)
:::


## Vue  Module not found
`0.0.8`  `vue-cli`  lib `rollup`  `vue`
> installvue vue-cli libVue Vue

::: tip
1vuenpmwebpack resolve  Vue

```js
// webpack
module.exports = {
    // ...
    resolve: {
        alias: {
            Vue: 'vue' // + Vue
        }
    }
};

//  vue cli3 +
// vue.config.js  configureWebpack
module.exports = {
    // ...
    configureWebpack: (config) => {
         config.resolve.alias = {
             ...config.resolve.alias,
             Vue: 'vue' // + Vue
         };
    }
}

```

2vuescriptwebpack externals  Vue
```js
// webpack
module.exports = {
    // ...
    externals: {
        vue: 'Vue',
        Vue: 'Vue' // + Vue
    }
}

//  vue cli3 +
// vue.config.js  configureWebpack
module.exports = {
    // ...
    configureWebpack: (config) => {
         config.externals = {
            ...config.externals,
            vue: 'Vue',
            Vue: 'Vue', // + Vue
         };
    }
}
```
:::


## ie9

`@lljj/vue-json-schema-form`  `vue` `elementUi` `ajv`  `ie9`

* ie9
1. css

flex ie9
>

2. js

 polyfill `@lljj/vue-json-schema-form`  `bable-loader`
[](/zh/guide/polyfill.html#script-)

##
 object
