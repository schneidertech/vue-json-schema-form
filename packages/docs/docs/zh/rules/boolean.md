# boolean
##
>* type `boolean`
>*  - [JSON Schema boolean](https://json-schema.org/understanding-json-schema/reference/boolean.html)

##
* `boolean`  `true`  `false`

`schema` `ui-schema` `error-schema`

:::demo
```html
<template>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        :error-schema="errorSchema"
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
                        switch: {
                            type: 'boolean',
                            title: ''
                        }
                    }
                },
                uiSchema: {
                    switch: {
                        'ui:options': {
                            activeText: '',
                            inactiveText: ''
                        }
                    }
                },
                errorSchema: {}
            }
        }
   }
</script>
```
:::


