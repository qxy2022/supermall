<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="detailNav" />
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <DetailSwiper :top-images="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailGoodsInfo :detail-info="detailInfo" />
      <DetailParamInfo :param-info="paramInfo" ref="params" />
      <DetailCommentInfo :comment-info="commentInfo" ref="comments" />
      <GoodsList :goods="recommends" ref="recommends" />
    </Scroll>
    <DetailBottomBar />
    <BackTop @click.native="backTop" v-show="isShowBackTop"/>
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
import DetailBottomBar from './childComponents/DetailBottomBar.vue';

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@/network/detail';
import { debounce } from '@/common/utils';
import { backTopMixin } from '@/common/mixin'

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
    GoodsList,
    DetailBottomBar,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      newRefresh: null,
      currentIndex: 0
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
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted() {
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      let params = this.$refs.params
      let comments = this.$refs.comments
      let recommends = this.$refs.recommends
      this.themeTopYs.push(0)
      this.themeTopYs.push(params && params.$el.offsetTop)
      this.themeTopYs.push(comments && comments.$el.offsetTop)
      this.themeTopYs.push(recommends && recommends.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    }, 500)
    this.$bus.$on('detailImgLoad', this.getThemeTopY)
  },
  methods: {
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y
      // 和组件offsetTop得到的值比较
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // i < length
        //   if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i])) {
        //     this.currentIndex = i
        //     this.$refs.detailNav.currentIndex = this.currentIndex
        //   }     

        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }
      // BackTop 显示与隐藏
      this.isShowBackTop = positionY > 700
    }
  }
}
</script>

<style scoped>
.content {
  height: calc(100vh - 93px);
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>