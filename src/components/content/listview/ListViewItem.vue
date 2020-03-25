<template>
  <div class="listview-item" @click="itemClick">
    <img :src="item.show.img" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{item.title}}</p>
      <span class="price">￥{{item.price}}</span>
      <span class="collect">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListViewItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad');
    },
    itemClick() {
      this.$router.push('detail/'+this.item.iid);
    }
  }
}
</script>

<style scoped>
  .listview-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }

  .listview-item img {
    width: 100%;
    border-radius: 5px;
  } 

  .goods-info {
    overflow: hidden;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
  }

  .goods-info p {
    /* overflow: hidden 不能继承 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .price {
    margin-right: 20px;
    color: var(--color-high-text);
  }

  .collect {
    position: relative;
  }

  .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }




</style>