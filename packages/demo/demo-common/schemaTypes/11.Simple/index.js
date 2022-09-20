export default {
    schema: {
        title: '',
        description: 'A simple form example.',
        type: 'object',
        required: ['firstName', 'lastName'],
        'ui:order': [
            'lastName',
            'firstName',
            '*',
            'password',
        ],
        properties: {
            firstName: {
                type: 'string',
                title: 'First name',
                default: 'Jun'
            },
            lastName: {
                type: 'string',
                title: 'Last name',
                'ui:options': {
                    description: ''
                },
                'err:required': 'Last Name'
            },
            price: {
                type: 'string',
                description: ' 999999.99',
                title: '',
                format: 'price'
            },
            age: {
                type: 'integer',
                title: 'Age',
                maximum: 80,
                minimum: 16
            },
            bio: {
                type: 'string',
                title: 'Bio',
                minLength: 10
            },
            password: {
                type: 'string',
                title: 'Password',
                minLength: 3,
            },
            telephone: {
                type: 'string',
                title: 'Telephone',
                minLength: 10,
            },
        },
    },
    formData: {
        lastName: 'Liu',
        age: 88,
        bio: '',
        password: 'My.Pass',
        telephone: '1881446xxxx'
    },
    uiSchema: {
        'ui:description': 'UiSchemadescription',
        firstName: {
            'ui:title': '',
            'ui:description': '',
            'ui:emptyValue': '',
            'ui:options': {
                placeholder: '',
                attrs: {
                    autofocus: true
                }
            }
        },
        bio: {
            'ui:options': {
                placeholder: '',
                type: 'textarea',
                rows: 6
            }
        }
    },
    errorSchema: {
        bio: {
            'err:minLength': '10'
        }
    }
};
