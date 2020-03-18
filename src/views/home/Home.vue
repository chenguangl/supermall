<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <div slot="center">购物车</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-items :recommend="recommend"></recommend-items>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendItems from './childComps/RecommendItems'
import {getHomeMultidata} from 'network/home'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendItems
  },
  data() {
    return{
      banner: [],
      dKeyword: [],
      keywords: [],
      recommend: []
    }
  },
  created () {
    getHomeMultidata().then(res => {
      this.banner = res.data.banner.list;
      this.dKeyword = res.data.dKeyword.list;
      this.keywords = res.data.keywords.list;
      this.recommend = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
  .home-navbar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
