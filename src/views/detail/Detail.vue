<template>
  <div id="detail">
    <DetailNavBar class="detail-nav"></DetailNavBar>
    <Scroll class="content">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info="detailInfo"></DetailGoodsInfo>
      <DetailParamInfo :param-info="paramInfo"></DetailParamInfo>
      <DetailCommentInfo :comment-info="commentInfo"></DetailCommentInfo>
      <GoodsList :goods="recommends"></GoodsList>
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar.vue';
import Scroll from '@/components/common/scroll/Scroll.vue';
import DetailSwiper from './childComponents/DetailSwiper.vue';
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue';
import DetailShopInfo from './childComponents/DetailShopInfo.vue';
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue';
import DetailParamInfo from './childComponents/DetailParamInfo.vue';
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue';
import GoodsList from '@/components/content/goods/GoodsList.vue';

import { getDetail, Goods, Shop, GoodsParam, getRecommend} from '@/network/detail';

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
},
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
    };
  },
  created() {
    // 1.保存传入的iid 动态路由
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result

      // 1.获取顶部轮播图
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 3.请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list
    })
  }
}
</script>

<style scoped>
.content {
  height: calc(100vh - 44px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>