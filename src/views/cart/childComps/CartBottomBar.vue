<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      <div class="count">
        已选：{{checkedLength}}件
      </div>
      <div class="total-price" @click="calcClick">
        合计：￥{{totalPrice}}
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: "CartBottomBar",
  components: { CheckButton },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => item.checked)
        .reduce((preValue, item) => preValue + item.count * item.price, 0)
        .toFixed(2)
    },
    checkedLength() {
      return this.cartList.filter(item => item.checked).reduce((preValue, item) => item.count + preValue, 0)
    },
    isSelectAll(){
      if(!this.cartList.length) return false
      return this.cartList.every(item => item.checked)
    }
  },
  methods: {
    checkClick () {
      if(this.isSelectAll) {
        // 全选状态下，点击变成全不选
        this.cartList.forEach(item => item.checked = false)
      } else {
        // 只要有一个没选中，点击全选
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.cartList.some(item => item.checked)) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: absolute;
  bottom: 49px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}

.check-content {
  flex: 2;
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 14px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 8px;
}

.price {
  flex: 3;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.total-price {
  padding: 0 7px;
  background-color: red;
  color: #fff;
  border-radius: 5px;
}
</style>