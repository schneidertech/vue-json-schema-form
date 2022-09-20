/**
 * Created by Liu.Jun on 2020/12/10 15:41.
 */


import baseRadio from './index';

const viewSchema = {
    title: '(Select)',
    type: 'string',
    'ui:widget': 'SelectWidget'
};

export default {
    viewSchema,
    propsSchema: baseRadio.propsSchema
};
