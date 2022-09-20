# @snema/vue-json-schema-form

 [Element Ui](https://element.eleme.io/) Vue2 [JSON Schema](https://json-schema.org/understanding-json-schema/index.html)

>  [@snema/vue2-form-core](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue2/vue2-core)  ElementUi

##

```ssh
## npm
npm install --save @snema/vue-json-schema-form

## yarn
yarn add @snema/vue-json-schema-form
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
import VueForm from '@snema/vue-json-schema-form';

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
