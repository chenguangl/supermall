<template>
  <div class="shop-info">
    <div class="shop-info-header">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-info-bottom">
      <div class="bottom-left">
        <div class="sales">
          <div class="goods-head">{{getSells}}万</div>
          <div class="goods-bottom">总销量</div>
        </div>
        <div class="count">
          <div class="goods-head">{{shop.goodsCount}}</div>
          <div class="goods-bottom">全部宝贝</div>
        </div>
      </div>
      <div class="bottom-right">
        <div v-for="(item, index) in shop.score" :key="index" >
          <span class="name">{{item.name}}</span>
          <span class="score" :class="{scoreBetter : item.isBetter, scoreWorse: !item.isBetter}">{{item.score}}</span>
          <span class="isBetter" :class="{better : item.isBetter, worse: !item.isBetter}">{{getBetter(item.isBetter)}}</span>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="entry">
        进店逛逛
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    getSells() {
      if(this.shop.sells < 10000) return this.shop.sells;
      return (this.shop.sells/ 10000).toFixed(1)
    }
    
  },
  methods: {
    getBetter(isBetter) {
      return isBetter? '高':'低'
    }
  }
}
</script>

<style scoped>
  .shop-info-header {
    margin-top: 30px;
  }
  .shop-info-header img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 8px;
    margin-right: 10px;
    vertical-align: middle;
  }
 
  .shop-info-bottom {
    display: flex;
    margin-top: 40px;
    margin: 30px 10px 20px 30px;
    color: #222;
  }
  .bottom-left {
    flex: 1;
    height: 50px;
    border-right: 1px solid #ccc;
  }
  .sales {
    display: inline-block;
    text-align: center;
  }
  .goods-head {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .goods-bottom {
    font-size: 14px;
  }

  .count {
    display: inline-block;
    margin-left: 20px;
    text-align: center;
  }

  .bottom-right {
    position: relative;
    flex: 1;
    margin-left: 30px;
    font-size: 13px;
  }
  .bottom-right div {
    margin-bottom: 8px;
  }

  .bottom-right .name,
  .bottom-right .score {
    margin-left: 12px;
  }
  
  .bottom-right .isBetter {
    position: absolute;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    right: 5px;
    color: white;
  }

  .scoreBetter {
    color: red;
  }

  .scoreWorse {
    color: green;
  }

  .better {
    background-color: red;
  }

  .worse {
    background-color: green;
  }

  .shop-bottom {
    margin-top: 10px;
    text-align: center;
  }

  .entry {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>