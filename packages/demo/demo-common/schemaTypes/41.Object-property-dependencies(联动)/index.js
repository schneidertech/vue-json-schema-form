/**
 * Created by Liu.Jun on 2020/5/19 15:41.
 */

export default {
    schema: {
        title: 'Object property dependencies',
        type: 'object',
        properties: {
            unidirectional: {
                title: '',
                description: 'ui-schema  onlyShowIfDependent ',
                type: 'object',
                'ui:options': {
                    onlyShowIfDependent: true
                },
                properties: {
                    name: {
                        title: 'Name',
                        type: 'string'
                    },
                    credit_card: {
                        title: 'Credit card',
                        type: 'string'
                    },
                    billing_address: {
                        title: 'Billing address',
                        type: 'string'
                    }
                },
                required: [
                    'name'
                ],
                dependencies: {
                    credit_card: [
                        'billing_address'
                    ]
                }
            },
            bidirectional: {
                title: '',
                description: ' onlyShowIfDependent ',
                type: 'object',
                properties: {
                    name: {
                        title: 'Name',
                        type: 'string'
                    },
                    credit_card: {
                        title: 'Credit card',
                        type: 'string'
                    },
                    billing_address: {
                        title: 'Billing address',
                        type: 'string'
                    }
                },
                required: [
                    'name'
                ],
                dependencies: {
                    credit_card: [
                        'billing_address'
                    ],
                    billing_address: [
                        'credit_card'
                    ]
                }
            }
        }
    }
};
