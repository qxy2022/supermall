<template>
  <div id="home">
    <NavBar class="home-nav"><template #center>购物街</template></NavBar>
    <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control1" v-show="isTabFixed"/>

    <Scroll class="scroll" ref="scroll" 
      :probe-type="3" 
      :pull-up-load="true" 
      @scroll="contentScroll" 
      @pullingUp="loadMore">
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <HomeRecommendView :recommends="recommends" />
      <FeatureView />
      <TabControl :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"/>
      <GoodsList :goods="showGoods" />
      <GoodsListItem />
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue';
import HomeRecommendView from './childComps/HomeRecommendView.vue';
import FeatureView from './childComps/FeatureView.vue';

import NavBar from '@/components/common/navbar/NavBar.vue';
import TabControl from '@/components/content/tabControl/TabControl.vue';
import GoodsList from '@/components/content/goods/GoodsList.vue';
import GoodsListItem from '@/components/content/goods/GoodsListItem.vue';
import Scroll from '@/components/common/scroll/Scroll.vue';
import BackTop from '@/components/content/backTop/BackTop.vue';

import { getHomeMultidata, getHomeGoods } from '@/network/home';

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    GoodsListItem,
    BackTop,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 1)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /* 
    事件监听
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      this.isShowBackTop = position.y < -1000

      this.isTabFixed = position.y < -this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /* 
    网络请求
    */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      }
      )
    }
  }
}
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
/* 
  position: sticky;
  top: 0;
  z-index: 9;  */
}

.scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>