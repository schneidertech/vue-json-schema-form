/**
 * Created by Liu.Jun on 2020/7/22 11:07 .
 */

export default {
    schema: {
        title: '',
        type: 'object',
        description: ' type string  ISO ',
        required: ['dateTimeRange', 'dateTime'],
        properties: {
            dateTimeRange: {
                title: '',
                type: 'array',
                format: 'date-time',
                items: {
                    type: 'string'
                }
            },
            dateTimeRangeNumber: {
                title: 'number',
                type: 'array',
                format: 'date-time',
                items: {
                    type: 'number'
                }
            },
            dateRange: {
                title: '',
                type: 'array',
                format: 'date',
                items: {
                    type: 'string'
                }
            },
            dateRangeNumber: {
                title: 'number',
                type: 'array',
                format: 'date',
                items: {
                    type: 'number'
                }
            },
            time: {
                title: '',
                type: 'string',
                format: 'time'
            },
            dateTime: {
                title: '',
                type: 'string',
                format: 'date-time'
            },
            dateTimeNumber: {
                title: '',
                type: 'number',
                format: 'date-time'
            },
            date: {
                title: '',
                type: 'string',
                format: 'date'
            },
            dateNumber: {
                title: '',
                type: 'number',
                format: 'date'
            }
        }
    }
};
