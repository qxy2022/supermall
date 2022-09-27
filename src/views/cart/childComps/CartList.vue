<template>
  <div class="cart-list">
    <Scroll class="scroll" ref="scroll">
      <CartListItem v-for="(item,index) in cartList" :key="index" :item="item"/>
    </Scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Scroll from '@/components/common/scroll/Scroll.vue';
import CartListItem from './CartListItem.vue'

export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"])
  },
  components: { 
    Scroll,
    CartListItem 
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.scroll {
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>