/**
 * Created by Liu.Jun on 2020/12/10 15:15.
 */

import genSchema from '../genSchema.js';

const viewSchema = {
    title: '(Switch)',
    type: 'boolean'
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
                        activeText: {
                            title: '',
                            type: 'string'
                        },
                        inactiveText: {
                            title: '',
                            type: 'string'
                        }
                    }
                }
            }
        }
    })
};
