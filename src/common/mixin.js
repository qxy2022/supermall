import { debounce } from './utils';
import BackTop from '@/components/content/backTop/BackTop.vue';

export const itemListenerMixin = {
  data() {
    return itemImgListener = null
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}