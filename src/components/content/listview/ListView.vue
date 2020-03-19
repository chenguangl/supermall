<template>
  <div class="listview">
    <list-view-item v-for="(item,index) in data" :key="index" :item="item"></list-view-item>
  </div>
</template>

<script>
import ListViewItem from './ListViewItem'
export default {
  name: 'ListView',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    ListViewItem
  }
}
</script>

<style scoped>
  .listview {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>