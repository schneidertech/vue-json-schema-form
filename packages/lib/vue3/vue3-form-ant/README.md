# @lljj/vue3-form-ant

 [Antd Vue](https://2x.antdv.com/components/overview-cn/) Vue3 [JSON Schema](https://json-schema.org/understanding-json-schema/index.html)

>  [@lljj/vue3-form-core](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue3/vue3-core)  Ant Design Vue3

##

```ssh
## npm
npm install --save @lljj/vue3-form-ant

## yarn
yarn add @lljj/vue3-form-ant
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
import VueForm from '@lljj/vue3-form-ant';

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
