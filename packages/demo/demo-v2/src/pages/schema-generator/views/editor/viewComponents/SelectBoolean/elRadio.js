/**
 * Created by Liu.Jun on 2020/12/10 15:16.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '(Radio)',
    type: 'boolean',
    'ui:widget': 'RadioWidget'
};

export default {
    viewSchema,
    propsSchema: genSchema({
        options: {
            type: 'object',
            title: '',
            properties: {
                schemaOptions: {
                    type: 'object',
                    properties: {
                        enumNames: {
                            type: 'array',
                            items: [{
                                title: '',
                                type: 'string',
                                default: ''
                            }, {
                                title: '',
                                type: 'string',
                                default: ''
                            }]
                        }
                    }
                }
            }
        }
    })
};
