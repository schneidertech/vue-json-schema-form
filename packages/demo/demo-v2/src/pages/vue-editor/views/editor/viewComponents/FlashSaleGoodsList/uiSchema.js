import genImgItem from '../_commonConfig/ui/genImgItem';

export default {
    startTime: {
        'ui:options': {
            placeholder: '',
            style: {
                width: '100%'
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            }
        }
    },
    seckillBrand: {
        ...genImgItem(),
        'ui:title': ''
    },
    goodsList: {
        'ui:options': {
            title: '',
            description: '',
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
