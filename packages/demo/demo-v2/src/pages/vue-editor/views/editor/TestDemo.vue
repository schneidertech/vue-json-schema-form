<template>
    <div
        v-if="true"
        class="demo-wrapper"
    >
        <VueElementForm
            v-model="formData"
            strict-mode
            class="demo-form-box"
            :schema="schema"
            @on-submit="handleSubmit"
        >
        </VueElementForm>
    </div>
</template>

<script>
import VueElementForm from '@snema/vue-json-schema-form/src/index';

export default {
    components: {
        VueElementForm
    },
    data() {
        return {
            formData: {
                item: [
                    {
                        text: ''
                    },
                    {
                        imgUrl: '',
                        step: 1,
                        text: ''
                    }
                ]
            },
            schema: {
                title: 'DEMO',
                type: 'object',
                properties: {
                    item: {
                        title: '',
                        type: 'array',
                        required: [],
                        minItems: 1,
                        items: {
                            title: '',
                            type: 'object',
                            anyOf: [
                                {
                                    title: '',
                                    required: ['text', 'imgUrl', 'step'],
                                    properties: {
                                        text: {
                                            type: 'string',
                                            title: ''
                                        },
                                        imgUrl: {
                                            title: '',
                                            type: 'string',
                                        },
                                        step: {
                                            title: '',
                                            type: 'number',
                                            const: 1,
                                            default: 1,
                                            'ui:disabled': true,
                                            'ui:hidden': true
                                        }
                                    }
                                },
                                {
                                    title: '',
                                    required: ['text'],
                                    properties: {
                                        text: {
                                            type: 'string',
                                            title: ''
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            },
        };
    },
    created() {
        //
        // this.formData = {
        //     item: [
        //         {
        //             text: ''
        //         },
        //         {
        //             imgUrl: '',
        //             step: 1,
        //             text: ''
        //         }
        //     ]
        // };
    },
    methods: {
        handleSubmit(formData) {
            debugger;
        }
    }
};
</script>


<style scoped>
    .demo-wrapper {
        z-index: 1000;
        position: fixed;
        width: 100%;
        height: 100%;
        background: #FFFFFF;
    }
    .demo-form-box {
        margin: 0 auto;
        width: 600px;
    }
</style>
