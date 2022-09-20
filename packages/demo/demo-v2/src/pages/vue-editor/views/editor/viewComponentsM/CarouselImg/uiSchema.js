/**
 * Created by Liu.Jun on 2020/4/30 17:13.
 */

import genImgItem from '../../viewComponents/_commonConfig/ui/genImgItem';

export default {
    imgList: {
        'ui:options': {
            title: '',
            description: '750px400px<span>field</span>'
        },
        items: {
            ...genImgItem({
                width: 1920,
                height: 500,
            }),
            imgLink: {
                'err:format': '',
                'err:required': ''
            },
            'ui:title': ''
        }
    }
};
