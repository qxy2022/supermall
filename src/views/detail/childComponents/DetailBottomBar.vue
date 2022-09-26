<template>
  <div class="bottom-bar">
    <div class="bar-left bar-item">
      <div><i class="icon serve"></i><span>客服</span></div>
      <div><i class="icon shop"></i><span>店铺</span></div>
      <div><i class="icon select"></i><span>收藏</span></div>
    </div>
    <div class="bar-right bar-item">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item>div {
  flex: 1;
}

.bar-left {
  font-size: 10px;
}

.bar-left .icon {
  display: flex;
  width: 22px;
  height: 22px;
  margin: 8px auto 4px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position: 0 -54px;
}

.bar-left .shop {
  background-position: 0 -98px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}

.sport-ball {
  position: absolute;
  left: 225px;
  bottom: 20px;
}
</style>