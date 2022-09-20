/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '',
    type: 'string'
};
export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '',
            required: [],
            properties: {
                uiOptions: {
                    type: 'object',
                    properties: {
                        placeholder: {
                            type: 'string',
                            title: '',
                            default: ''
                        },
                        clearable: {
                            title: '',
                            type: 'boolean',
                            default: false
                        },
                        showWordLimit: {
                            title: '',
                            type: 'boolean',
                            default: false
                        },
                        showPassword: {
                            title: '',
                            type: 'boolean',
                            default: false
                        },
                        type: {
                            type: 'string',
                            title: '',
                            enum: [
                                'text',
                                'textarea'
                            ],
                            enumNames: [
                                ' Input',
                                ' Textarea'
                            ]
                        },
                    }
                }
            }
        },
        rules: {
            type: 'object',
            title: '',
            required: [],
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        maxLength: {
                            title: '',
                            type: 'number'
                        },
                        minLength: {
                            title: '',
                            type: 'number'
                        }
                    }
                }
            }
        }
    })
};
