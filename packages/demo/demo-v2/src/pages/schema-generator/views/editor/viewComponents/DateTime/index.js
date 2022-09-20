/**
 * Created by Liu.Jun on 2020/10/30 17:10.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'DateTime()',
    type: 'number',
    format: 'date-time'
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
