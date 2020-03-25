<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control :titles = "titles" class="tab-control tabfix" @tabClick="tabClick" ref="tabcontrol2" v-show="isTabFixed"/>

    <scroll class="content"  ref="scroll" @contentScroll="contentScroll" :probe-type="3" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-items :recommend="recommend"></recommend-items>
      <feature-view />
      <tab-control :titles = "titles" class="tab-control" @tabClick="tabClick" ref="tabcontrol1"/>
      <list-view :data="getGoods"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShown"/>
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
import {debounce} from 'common/utils'
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
      currentType: 'pop',
      isShown: false,
      offsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  created () {
   this.getHomeMultidata();
   this.getHomeGoods('pop');
   this.getHomeGoods('new');
   this.getHomeGoods('sell');

  
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on('itemImageLoad', () => {
       refresh();
    })
  },
  computed: {
    getGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY();
    
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
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShown = (-position.y) > 1000;
      this.isTabFixed = (-position.y) > this.offsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.offsetTop = this.$refs.tabcontrol1.$el.offsetTop;
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
        this.$refs.scroll.finishPullUp();
      })
    },

  }
}
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
    /* padding-top: 44px; */
  }

  .home-navbar {
    background-color: var(--color-tint);
    color: #fff;
    
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tabfix {
    position: relative;
    z-index: 5;
  }
</style>
