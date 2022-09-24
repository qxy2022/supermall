<template>
  <div id="detail">
    <DetailNavBar></DetailNavBar>
    <DetailSwiper :top-images="topImages"></DetailSwiper>
    <DetailBaseInfo :goods="goods"></DetailBaseInfo>
    <DetailShopInfo :shop = "shop"></DetailShopInfo>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar.vue';
import DetailSwiper from './childComponents/DetailSwiper.vue';
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue';
import DetailShopInfo from './childComponents/DetailShopInfo.vue';

import {getDetail, Goods, Shop} from '@/network/detail';

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    };
  },
  created() {
    // 1.保存传入的iid 动态路由
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      console.log(data);
      // 1.获取顶部轮播图
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
    })
  },
  components: { DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo }
}
</script>

<style scoped>

</style>