<template>
  <div id="detailNavBar">
    <NavBar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="@/assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template #center>
        <div class="title">
          <div class="title-item" 
            v-for="(item, index) in titles" 
            :class="{active: index === currentIndex}"
            @click="titleClick(index)">
          {{item}}
          </div>
        </div>
      </template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
}

.title-item {
  flex: 1
}

.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 10px;
}
</style>