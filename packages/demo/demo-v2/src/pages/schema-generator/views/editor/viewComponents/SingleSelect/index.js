/**
 * Created by Liu.Jun on 2019/9/29 19:01.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '',
    type: 'string'
};

const selectOptionsSchema = {
    enum: {
        title: '',
        type: 'array',
        minItems: 1,
        'ui:showIndexNumber': true,
        default: ['1', '2', '3'],
        items: {
            title: '',
            type: 'string'
        }
    },
    enumNames: {
        title: '',
        type: 'array',
        minItems: 1,
        'ui:showIndexNumber': true,
        default: ['', '', ''],
        items: {
            title: '',
            type: 'string'
        }
    }
};

export {
    selectOptionsSchema
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
                    properties: selectOptionsSchema
                }
            },
        }
    })
};
