/**
 * Created by Liu.Jun on 2020/4/30 17:13.
 */

import genImgItem from '../_commonConfig/ui/genImgItem';

const line2Item = genImgItem({
    width: 383,
    height: 500,
});

export default {
    imgItem1_1: {
        'ui:title': '',
        ...genImgItem({
            width: 1920,
            height: 420,
        })
    },
    imgItem2_1: {
        'ui:title': '',
        ...line2Item
    },
    imgItem2_2: {
        'ui:title': '',
        ...line2Item
    },
    imgItem2_3: {
        'ui:title': '',
        ...line2Item
    }
};
