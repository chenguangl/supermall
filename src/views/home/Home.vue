<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <div slot="center">购物车</div>
    </nav-bar>
    <scroll class="content"  ref="scroll">
      <home-swiper :banner="banner"></home-swiper>
      <recommend-items :recommend="recommend"></recommend-items>
      <feature-view />
      <tab-control :titles = "titles" class="tab-control" @tabClick="tabClick"/>
      <list-view :data="getGoods"/>
    </scroll>
    <back-top @click.native="backTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendItems from './childComps/RecommendItems'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import ListView from 'components/content/listview/ListView'
import Scroll from 'components/common/bscroll/Scroll'
import BackTop from 'components/common/backtop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendItems,
    FeatureView,
    TabControl,
    NavBar,
    ListView,
    Scroll,
    BackTop
  },
  data() {
    return{
      banner: [],
      recommend: [],
      titles: ['流行', '新款', '精选'],
      goods: {
        'pop': {page: 0, list:[]},
        'new': {page:0, list:[]},
        'sell': {page:0, list:[]},
      },
      currentType: 'pop'
    }
  },
  created () {
   this.getHomeMultidata();
   this.getHomeGoods('pop');
   this.getHomeGoods('new');
   this.getHomeGoods('sell');
  },
  computed: {
    getGoods() {
      return this.goods[this.currentType].list;
    }
  },

  methods: {
    // 事件监听的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    // 网络请求的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banner = res.data.banner.list;
      this.recommend = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // 把res.data.list数组解构push到goods里面
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
      })
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
    padding-top: 44px;
  }

  .home-navbar {
    position: fixed;
    background-color: var(--color-tint);
    color: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 5;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
