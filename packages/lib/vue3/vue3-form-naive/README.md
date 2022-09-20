# @snema/vue3-form-naive

 [NaiveUi](https://www.naiveui.com/zh-CN/os-theme) Vue3 [JSON Schema](https://json-schema.org/understanding-json-schema/index.html)

>  [@snema/vue3-form-core](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue3/vue3-core)  NaiveUi

##

```ssh
## npm
npm install --save @snema/vue3-form-naive

## yarn
yarn add @snema/vue3-form-naive
```

##
```html
<VueForm
    v-model="formData"
    :schema="schema"
>
</VueForm>
```

```js
//
import VueForm from '@snema/vue3-form-naive';

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
                        'ui:options': {
                            placeholder: '',
                            type: 'textarea',
                            rows: 1
                        }
                    }
                }
            }
        };
    }
};
```

## License
Apache-2.0
