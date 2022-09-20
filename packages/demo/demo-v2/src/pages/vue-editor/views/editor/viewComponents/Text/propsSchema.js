export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: '',
    description: '',
    type: 'object',
    required: ['txt'],
    properties: {
        imgUrl: {
            title: '',
            type: 'string',
            default: 'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',
            'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
            'ui:widget': 'UploadWidget',
            'ui:btnText': '',
            'ui:responseFileUrl': (res) => {}
        },
        txt: {
            title: '',
            type: 'string',
            'ui:placeholder': '',
            'err:required': ''
        },
        txtColor: {
            title: '',
            type: 'string',
            format: 'color',
            default: '#ff0132'
        }
    }
};
