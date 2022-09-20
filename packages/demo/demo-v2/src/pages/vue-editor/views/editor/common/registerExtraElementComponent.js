/**
 * Created by Liu.Jun on 2020/4/24 10:59.
 */

import Vue from 'vue';

const ExtraComponents = {
    //  Field
    LinkImgField: () => import('../fieldComponents/linkImgField/LinkImgField')
};

Object.entries(ExtraComponents).forEach(([key, value]) => {
    Vue.component(key, value);
});
