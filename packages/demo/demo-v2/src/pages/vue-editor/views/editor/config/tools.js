/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

//
import componentPackCarouselImg from '../viewComponents/CarouselImg';

//
import componentPackFlashSaleGoodsList from '../viewComponents/FlashSaleGoodsList';

//
import componentPackText from '../viewComponents/Text';

// 5
import componentPackMultipleImg5 from '../viewComponents/MultipleImg5';

//  2-3
import componentPackMultipleImg23 from '../viewComponents/MultipleImg2_3';

//  1-2
import componentPackMultipleImg13 from '../viewComponents/MultipleImg1_3';

//
import componentPackCategoryGoods from '../viewComponents/CategoryGoods';

//
import componentPackRecommendedGoodsList from '../viewComponents/RecommendedGoodsList';

//
import componentPackAllGoodsList from '../viewComponents/AllGoodsList';

//
import componentPackCoupon from '../viewComponents/Coupon';


/**
 * hidden
 * maxNum Number
 * topDisplay Bool
 * bottomDisplay Bool
 * onlyCanConfig Bool  copy
 * @type {*[]}
 */
const tools = [
    {
        groupName: '',
        componentList: [{
            title: ' ()',
            maxNum: 2,
            viewWidth: '1920px',
            icon: 'el-icon-picture',
            name: 'CarouselImg',
            componentPack: componentPackCarouselImg
        }, {
            title: '',
            maxNum: 3,
            icon: 'el-icon-picture',
            name: 'FlashSaleGoodsList',
            componentPack: componentPackFlashSaleGoodsList
        }, {
            title: '(5)',
            maxNum: 5,
            icon: 'el-icon-picture',
            name: 'MultipleImg5',
            componentPack: componentPackMultipleImg5
        }, {
            title: '(2-3)',
            maxNum: 10,
            icon: 'el-icon-s-grid',
            name: 'MultipleImg2_3',
            componentPack: componentPackMultipleImg23
        }, {
            title: '(1-3)',
            maxNum: 10,
            icon: 'el-icon-s-grid',
            name: 'MultipleImg1_3',
            componentPack: componentPackMultipleImg13
        }, {
            title: '',
            maxNum: 10,
            icon: 'el-icon-s-grid',
            name: 'CategoryGoods',
            componentPack: componentPackCategoryGoods
        }, {
            title: '',
            maxNum: 20,
            icon: 'el-icon-notebook-1',
            name: 'Text',
            componentPack: componentPackText
        }]
    },
    {
        groupName: '',
        componentList: [{
            title: '',
            maxNum: 1,
            icon: 'el-icon-s-goods',
            componentPack: componentPackAllGoodsList,
            name: 'AllGoodsList',
            additional: {
                bottomDisplay: true,
                unRemove: true //
            }
        }, {
            title: '',
            maxNum: 1,
            icon: 'el-icon-s-goods',
            name: 'RecommendedGoodsList',
            componentPack: componentPackRecommendedGoodsList
        }]
    },
    {
        groupName: '',
        componentList: [{
            title: '',
            maxNum: 1,
            icon: 'el-icon-s-ticket',
            name: 'Coupon',
            componentPack: componentPackCoupon
        }]
    }
];

export default tools;
