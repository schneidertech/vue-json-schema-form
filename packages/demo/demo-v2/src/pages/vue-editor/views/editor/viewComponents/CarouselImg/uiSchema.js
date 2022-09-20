/**
 * Created by Liu.Jun on 2020/4/30 17:13.
 */

import genImgItem from '../_commonConfig/ui/genImgItem';

export default {
    imgList: {
        'ui:options': {
            title: '',
            description: '1920px500px<span>field</span>',
            showIndexNumber: true
        },
        items: {
            ...genImgItem({
                width: 1920,
                height: 500,
            }),
            'ui:title': ''
        }
    }
};
