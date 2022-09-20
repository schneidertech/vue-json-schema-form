/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Date()',
    type: 'array',
    format: 'date',
    items: {
        type: 'number'
    }
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
                        startPlaceholder: {
                            type: 'string',
                            title: '',
                            default: ''
                        },
                        endPlaceholder: {
                            type: 'string',
                            title: '',
                            default: ''
                        }
                    }
                }
            }
        }
    })
};
