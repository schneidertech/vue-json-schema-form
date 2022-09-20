/**
 * Created by Liu.Jun on 2020/12/10 15:16.
 */


import genSchema from '../genSchema.js';

const viewSchema = {
    title: '(Checkbox)',
    type: 'boolean',
    'ui:widget': 'el-checkbox'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '',
            properties: {
                uiOptions: {
                    type: 'object',
                    properties: {
                        label: {
                            title: '',
                            type: 'string',
                            default: ''
                        }
                    }
                }
            }
        }
    })
};
