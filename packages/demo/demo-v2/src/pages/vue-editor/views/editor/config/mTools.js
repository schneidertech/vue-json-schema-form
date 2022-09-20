/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

//
import componentPackCarouselImg from '../viewComponentsM/CarouselImg';

//
import componentPackText from '../viewComponentsM/Text';

//
import CategoryList from '../viewComponentsM/CategoryList';

//
import RecommendGoods from '../viewComponentsM/RecommendGoods';

//
import Test from '../viewComponentsM/Test';


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
            viewWidth: '100%',
            icon: 'el-icon-picture',
            name: 'MCarouselImg',
            componentPack: componentPackCarouselImg
        }, {
            title: '',
            maxNum: 20,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            name: 'MText',
            componentPack: componentPackText
        }, {
            title: '',
            maxNum: 5,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            name: 'MCategoryList',
            componentPack: CategoryList
        }, {
            title: '',
            maxNum: 5,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            name: 'MRecommendGoods',
            componentPack: RecommendGoods
        }, {
            title: 'form',
            maxNum: 5,
            viewWidth: '100%',
            icon: 'el-icon-notebook-1',
            name: 'MTestModule',
            componentPack: Test
        }]
    }
];

export default tools;
