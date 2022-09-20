/**
 * Created by Liu.Jun on 2020/10/30 16:25.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: 'Time()',
    type: 'string',
    format: 'time'
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
