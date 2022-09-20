# object

##
>* type `object`
>*  - [JSON Schema object](https://json-schema.org/understanding-json-schema/reference/object.html)

##
### `additionalProperties`
 `false`

### `required`
key

### `minProperties`


### `maxProperties`


### `dependencies`


::: warning
* `Dependencies` schema
* `additionalProperties`  `false`
* `Pattern Properties`
:::



`schema` `ui-schema` `error-schema`

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :error-schema="errorSchema"
    >
        <div slot-scope="{ formData, formRefFn}">
            <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
            <p><el-button @click="formRefFn().validate()" type="primary"></el-button></p>
        </div>
    </vue-form>
</template>
<script>
   export default {
        data() {
            return {
                formData: {
                    orderInfo: {
                        a: '11'
                    }
                },
                schema: {
                    id: 'objectSchema',
                    title: 'type object',
                    type: 'object',
                    properties: {
                        userInfo: {
                            type: 'object',
                            title: '',
                            description: '',
                            required: ['firstName'],
                            properties: {
                                firstName: {
                                    type: 'string',
                                    title: '',
                                    default: 'Jun'
                                },
                                lastName: {
                                    type: 'string',
                                    title: ''
                                }
                            }
                        },
                        orderInfo: {
                            type: 'object',
                            title: '',
                            description: '',
                            additionalProperties: false,
                            properties: {
                                orderId: {
                                    type: 'string',
                                    title: 'Id',
                                    default: '12312311123123'
                                }
                            }
                        }
                    }
                },
                errorSchema: {
                    orderInfo: {
                        'err:additionalProperties': ''
                    }
                }
            }
        }
   }
</script>

<style>
.genFromComponent_objectSchemaForm .__pathRoot_orderInfo .validateWidget-object .formItemErrorBox{
    margin-top: -15px;
}
</style>
```
:::

##

### ui:order
*  `ui-schema` `ui:order`
*  [ui-schema order ](https://form.lljj.me/#/demo?type=Simple)


```js
//  *
uiSchema = {
    'ui:order': ['number', '*'],
    // 'ui:order': ['firstName', 'lastName'],
}
```

### ui:onlyShowIfDependent

`ui-schema`  `onlyShowIfDependent: true` [](/zh/guide/data-linkage.html#object-dependencies-)
