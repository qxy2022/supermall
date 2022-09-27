<template>
  <div class="cart">
    <!-- 导航 -->
    <NavBar class="nav-bar">
      <template #center>购物车({{cartLength}})</template>
    </NavBar>
    <!-- 商品列表 -->
    <CartList/>
    <!-- 底部汇总 -->
    <CartBottomBar/>
 </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';

import { mapGetters } from 'vuex';

export default {
    name: "Cart",
    components: { NavBar, CartList, CartBottomBar },
    computed: {
      ...mapGetters(['cartLength'])
    }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>