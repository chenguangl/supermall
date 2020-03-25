<template>
  <div>
    <detail-nav-bar />
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import {getDetailData, Goods} from 'network/detail.js'
export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  created () {
    this.iid = this.$route.params.iid;
    getDetailData(this.iid).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(data.columns, data.itemInfo, data.shopInfo.services);
    })
  }
}
</script>

<style scoped>

</style>