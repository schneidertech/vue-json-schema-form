/**
 * Created by Liu.Jun on 2020/10/30 17:11.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Date()',
    type: 'number',
    format: 'date'
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
                        }
                    }
                }
            }
        }
    })
};
