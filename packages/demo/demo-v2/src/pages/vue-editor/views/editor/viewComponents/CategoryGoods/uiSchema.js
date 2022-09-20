/**
 * Created by Liu.Jun on 2020/7/25 15:47.
 */

import genImgItem from '../_commonConfig/ui/genImgItem';

export default {
    title: {
        'ui:placeholder': ''
    },
    subTitle: {
        'ui:placeholder': ''
    },
    banner: {
        link: {
            ...genImgItem()
        },
        bannerTitle: {
            'ui:placeholder': 'banner'
        },
        bannerSubTitle: {
            'ui:placeholder': 'banner'
        }
    },
    goodsList: {
        'ui:showIndexNumber': true,
        items: {
            ...genImgItem()
        }
    }
};
