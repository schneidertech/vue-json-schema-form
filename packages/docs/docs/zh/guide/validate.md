#


* [schema ](#schema-)
* [custom-rule](#custom-rule-)
* [ui:fieldfield](#-field-)

:::tip
 `schema`  `schema`
:::

## schema
 `JSON Schema`  [error-schema](/zh/guide/basic-config.html#error-schema)

>  `schema`

## custom-rule
* `function`


```js
const customRule = ({
    field,
    value,
    rootFormData,
    callback
}) => {
    if (field === 'imgList.0.imgUrl') {
        return callback('');
    }
    return callback();
};
```

:::warning
* vue3 antdcallbackPromise `return Promise.reject('')`
:::


>* `field`  `field`  `formData`   `.`  `imgList.0.imgUrl`
> `Vue DevTools`  `curNodePath`
>* `value`
>* `rootFormData``formData`
>* `callback``function`  `callback`

 `custom-rule`
 `field`

:::tip

```js
//
// imgList.0.imgUrl imgList.1.imgUrl ...
if (/imgList\.\d+\.imgUrl/.test(field)) {
    return callback('');
}
```
:::

### Democustom-rule

::: demo  custom-rule
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :custom-rule="customRule"
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
                    'password',
                    'password2'
                ],
                properties: {
                    password: {
                        type: 'string',
                        title: ''
                    },
                    password2: {
                        type: 'string',
                        title: ''
                    },
                    imgList: {
                        title: '',
                        type: 'array',
                        minItems: 1,
                        maxItems: 3,
                        items: {
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
                                    format: "uri"
                                }
                            },
                            required: [
                                'imgUrl',
                                'imgLink'
                            ]
                        }
                    }
                }
            },
            customRule: ({
                field,
                value,
                rootFormData,
                callback
            }) => {
                const rules = [{
                    rule: 'password2',
                    validator(value, rootFormData) {
                        if (value !== rootFormData.password) return '';
                    }
                }, {
                    rule: /imgList\.\d+\.imgUrl/,
                    validator(value, rootFormData) {
                        if(!/^https/.test(value)) return 'https';
                    }
                }];

                for(const ruleItem of rules) {
                    // String | Regx
                    if ((String(ruleItem.rule) === ruleItem.rule && ruleItem.rule === field)
                            || (Object.prototype.toString.call(ruleItem.rule) === '[object RegExp]' && ruleItem.rule.test(field))
                    ) {
                        const error = ruleItem.validator(value, rootFormData);
                        //
                        if (error) return callback(error);
                    }
                }
                return callback();
            }
        }
    }
}
</script>
```
:::

##  field
 `ui-schema`  `ui:field`  `field` field

*  [field](/zh/guide/adv-config.html#field)
