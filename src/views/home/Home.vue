<template>
  <div id="home">
    <NavBar class="home-nav"><template #center>购物街</template></NavBar>

    <Scroll class="scroll" ref="scroll" 
    :probe-type="3" :pull-up-load="true" 
    @scroll="contentScroll" @pullingUp="loadMore" >
      <HomeSwiper :banners="banners" />
      <HomeRecommendView :recommends="recommends" />
      <FeatureView />
      <TabControl class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick" />
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
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
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
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    contentScroll(position) {
      this.isShowBackTop = position.y < -1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
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
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: sticky;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>