# @lljj/vue2-form-iview3

 [iview3](http://iview.talkingdata.com) Vue2 [JSON Schema](https://json-schema.org/understanding-json-schema/index.html)

>  [@lljj/vue2-form-core](https://github.com/lljj-x/vue-json-schema-form/tree/master/packages/lib/vue2/vue2-core)  iview3

##

```ssh
## npm
npm install --save @lljj/vue2-form-iview3

## yarn
yarn add @lljj/vue2-form-iview3
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
import VueForm from '@lljj/vue2-form-iview3';

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
