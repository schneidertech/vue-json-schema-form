<template>
    <GoodsListView
        :line-num="1"
        :line-items="5"
        title=""
    ></GoodsListView>
</template>
<script>
import GoodsListView from '../../../components/GoodsListView';

export default {
    name: 'RecommendedGoodsList',
    components: {
        GoodsListView
    },
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>
