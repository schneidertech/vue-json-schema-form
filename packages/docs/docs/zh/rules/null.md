# null

##
>* type `null`
>*  - [JSON Schema null](https://json-schema.org/understanding-json-schema/reference/null.html)

##
* `null`   nullnull field `formData`  `null`

`schema` `ui-schema` `error-schema`

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
    >
        <div slot-scope="{ formData }">
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
                    title: 'type boolean',
                    type: 'object',
                    properties: {
                        nullType: {
                            type: 'null'
                        }
                    }
                }
            }
        }
   }
</script>
```


