<template>
  <div>
    <nav-bar>
      <div slot="left" @click="clickBack">
        <img src="~assets/img/common/back.svg" alt="" class="back">
      </div>
      <div slot="center" class="nav">
        <div v-for="(item, index) in titles" :key="index" class="nav-item" :class="{active:currentIndex === index}" @click="itemClick(index)">
          <div>{{item}}</div>
        </div>
      </div> 
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
    },
    clickBack() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
  .nav {
    display: flex;
    font-size: 13px;
  }

  .nav-item {
    flex: 1;
  }

  .back {
    margin-top: 15px;
  }
  .active {
    color: var( --color-high-text);
  }
</style>