<template>
  <div class="goods-item" v-if="goodsItem.show || goodsItem.image" @click="itemClick">
    <img :src="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imgLoad() {
      // this.$bus.$emit('itemImgLoad')
      // 问题：detail的图片加载完，Home刷新。办法：1.在这分类 2.传同一个'itemImgLoad'，在Home.vue的deactivated取消事件监听，在Detail.vue的destroyed取消事件监听
      let path = this.$route.path
      if (path.indexOf('/home') !== -1) {
        this.$bus.$emit('homeImgLoad')
      } else if (path.indexOf('/detail') !== -1) {
        this.$bus.$emit('detailImgLoad')
      }
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}

</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>