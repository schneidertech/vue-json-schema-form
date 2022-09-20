/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '',
    type: 'number'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '',
            required: [],
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        multipleOf: {
                            title: '',
                            type: 'number',
                            default: 1
                        },
                    }
                },
                uiOptions: {
                    type: 'object',
                    properties: {
                        stepStrictly: {
                            title: '',
                            type: 'boolean',
                            default: false
                        },
                        precision: {
                            title: '',
                            type: 'number',
                            minimum: 0
                        },
                        controlsPosition: {
                            type: 'string',
                            title: '',
                            enum: [
                                'default',
                                'right'
                            ],
                            enumNames: [
                                '',
                                ''
                            ],
                            default: 'default'
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
                        minimum: {
                            title: '',
                            type: 'number'
                        },
                        maximum: {
                            title: '',
                            type: 'number'
                        },
                    }
                }
            }
        }
    }, 'number')
};
