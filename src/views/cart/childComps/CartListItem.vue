<template>
  <div class="cart-list-items">
    <div class="item-selector">
      <CheckButton :is-checked="item.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="item.image" alt="">
    </div>

    <div class="item-info">
      <div class="title">{{item.title}}</div>
      <div class="desc">
        <p>{{item.desc}}</p>
      </div>
      <div class="buy">
        <div class="price">￥{{item.price}}</div>
        <div class="count">x{{item.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue';
export default {
    name: "CartListItem",
    props: {
        item: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    components: { CheckButton },
    methods: {
      checkClick(){
        this.item.checked = !this.item.checked
      }
    }
}
</script>

<style scoped>
.cart-list-items {
  width: 100%;
  display: flex;
  padding: 3px 0;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-img {
  padding: 5px;
}

.item-img img {
  width: 60px;
  height: 80px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #335;
  padding: 6px 10px;
  position: relative;
  overflow: hidden;
}

.title,
.desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.desc {
  font-size: 14px;
  color: #666;
  margin-top: 11px;
}

.buy {
  font-size: 16px;
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  left: 5px;
}

.count {
  float: right;
  margin-right: 10px;
}

.price {
  color: orangered;
  float: left;
  margin-left: 10px;
}
</style>