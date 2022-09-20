/**
 * Created by Liu.Jun on 2020/11/27 16:42.
 */
export default {
    schema: {
        title: '',
        type: 'object',
        description: '  el-upload el-upload <br/>slot  slotsVNode list',
        properties: {
            imgUrl: {
                title: '',
                type: 'string',
                default: 'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',
                'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                'ui:widget': 'UploadWidget',
                'ui:btnText': ''
            },
            imgUrlList: {
                title: '',
                type: 'array',
                'ui:widget': 'UploadWidget',
                'ui:action': 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca',
                // eslint-disable-next-line max-len
                default: ['http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp'],
                items: {
                    type: 'string',
                }
            }
        }
    },
    formData: {}
};
