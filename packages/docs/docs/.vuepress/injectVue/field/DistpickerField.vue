<template>
    <el-form-item
        label=" ui:field"
        required
    >
        <Distpicker
            :province="defaultVal.province"
            :city="defaultVal.city"
            :area="defaultVal.area"
            v-bind="fieldProps"
            @selected="onSelected"
        ></Distpicker>
    </el-form-item>
</template>

<script>
    import Distpicker from 'v-distpicker';
    import { fieldProps, vueUtils } from '@snema/vue-json-schema-form';

    export default {
        name: 'DistpickerField',
        components: {
            Distpicker
        },
        props: {
            //  field props
            ...fieldProps,

            //  ui:fieldProps
            fieldProps: {
                type: null,
                default: null
            }
        },
        data() {
            return {
                //
                defaultVal: vueUtils.getPathVal(this.rootFormData, this.curNodePath)

                //  rootFormData
                // defaultVal: this.rootFormData.address1
            };
        },
        methods: {
            onSelected(data) {
                const curVal = Object.entries(data).reduce((preVal, [key, {code}]) => {
                    preVal[key] = code;
                    return preVal;
                }, {});

                vueUtils.setPathVal(this.rootFormData, this.curNodePath, curVal);

                //  rootFormData
                // this.rootFormData.address1 = curVal;
            }
        }
    };
</script>
