<template>
  <div class="goods-params" v-if="Object.keys(goodsParams).length !== 0">
    <table v-for="(table, index) in goodsParams.sizes" :key="index" class="info-table">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(item, index) in  goodsParams.infos" :key="index">
        <td class="param-key">{{item.key}}</td>
        <td class="param-value">{{item.value}}</td>
      </tr>
    </table>
    <div v-if="Object.keys(goodsParams.image).length !== 0" class="info-img">
      <img :src="goodsParams.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsParams',
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .goods-params {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

   .goods-params table {
     width: 100%;
     border-collapse: collapse;

   }

   .goods-params table tr {
     height: 42px;
   }

   .goods-params table tr td {
     border-bottom: 1px solid rgba(100, 100, 100, .1);
   }

   .info-param {
     border-top: 1px solid rgba(0, 0, 0, .1);
   }

   .param-key {
     width: 95px;
   }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>