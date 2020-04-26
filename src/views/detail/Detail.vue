<template>
    <div id="detail">
      <detail-nav-bar id="detail-nav" @itemClick="itemClick" ref="nav"/>
      <scroll id="content" ref="scroll" @contentScroll="contentScroll" :probe-type="3">
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info  :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-goods-params ref="params" :goods-params="goodsParams"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <list-view ref="rec" :data="recommends"/>
      </scroll>
      <back-top @click.native="backTop" v-show="isShown"/>
      <detail-bottom-bar @addToCart="addToCart"/>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailGoodsParams from './childComps/DetailGoodsParams'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import ListView from 'components/content/listview/ListView'

import Scroll from 'components/common/bscroll/Scroll'
import {getDetailData, Goods, Shop, GoodsParams, getRecommends} from 'network/detail.js'
import {itemImageListener, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils.js'

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  mixins: [itemImageListener, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentInfo,
    ListView,
    DetailBottomBar
  },
  created () {
    this.iid = this.$route.params.iid;
    getDetailData(this.iid).then(res => {
      const data = res.result;
      console.log(data);
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(data.columns, data.itemInfo, data.shopInfo.services);
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule);
      if(data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    })
    getRecommends().then(res => {
      this.recommends = res.data.list;
    })
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.rec.$el.offsetTop);
    }) 

  },
  methods: {
    imageLoad() {
      this.refresh();
      this.getThemeTopY();
    },

    itemClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index]);
    },

    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.detailInfo.title;
      product.desc = this.detailInfo.desc;
      product.realPrice = this.detailInfo.lowNowPrice;
      product.iid = this.iid;
    },

    contentScroll(position) {
      this.isShown = (-position.y) > 1000;
      const positionY = -position.y;
      
      for(let i = 0; i < this.themeTopY.length; i++) {
        if((this.currentIndex !== i) && ((i < this.themeTopY.length - 1 &&
         positionY > this.themeTopY[i] && positionY <= this.themeTopY[i + 1]) || (i === this.themeTopY.length - 1 && positionY > this.themeTopY[i]))) {
           this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
         }
      }
    }
  },
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImageListener);
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 5;
    background-color: #fff;
    height: 100vh;
  }

  #detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 5;
  }

  #content {
    height: calc(100% - 44px - 49px);
  }
 
</style>