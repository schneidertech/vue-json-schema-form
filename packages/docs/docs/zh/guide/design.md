#

##

![Vjsf](/vjsf.jpg)

:::tip
* `schema` `ui-schema` `error-schema`
* `formData`
path `curNodePath` formData `rootFormData`
> `curNodePath`  `userInfo.userName`
>>
>> ```js
>> import { vueUtils } from '@lljj/vue-json-schema-form';
>>
>> // get
>> vueUtils.getPathVal(rootFormData, curNodePath);
>>
>> // set
>> vueUtils.setPathVal(rootFormData, curNodePath, value);
>> ```
:::

##
 [ajv](https://github.com/epoberezkin/ajv) schema [error-schema](/zh/guide/basic-config.html#error-schema)

####


```js
// schema
schema = {
     type: 'object',
     minProperties: 2,
     required: [
         'firstName',
         'lastName'
     ],
     properties: {
         firstName: {
             type: 'string',
             title: 'First name',
             default: 'Jun'
         },
         lastName: {
             type: 'string',
             title: 'Last name'
         }
     }
};

// formData
formData = {
    firstName: 'Jun'
}
```


![vjsf-vaidate](/vjsf-vaidate.jpg)

schemapropertyobject

####
 `formItem`


> ajvformItem


>  objectminPropertiesarrayminItemsoneOfanyOf
>*  `object``array``oneOf``anyOf`  `submit`  `object`

####  `required`
`object required`  `property`  `object field`   `property`  `required`

```js
//  - required props
function render(h) {
    const propertiesVnode = propertiesNameList.map(name => {
        return h(
            ChildField,
            {
                props: {
                    ...,
                    required: Array.isArray(schema.required)
                        && schema.required.includes(name),
                }
            }
        );
    });
}
```

:::tip
 `array`  `item`  `required`
:::

####
`error-schema`  `ui-schema`  `schema` formData
 `anyOf`

##

* [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form)
schema `react-json-schema`

*  `Widget`
