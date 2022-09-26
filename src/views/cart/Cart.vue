<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <template #center>购物车({{cartLength}})</template>
    </NavBar>
 </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';

import { mapGetters } from 'vuex';

export default {
    name: "Cart",
    components: { NavBar },
    computed: {
      ...mapGetters(['cartLength'])
    }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>