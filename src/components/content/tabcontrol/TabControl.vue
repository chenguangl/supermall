<template>
  <div class="tab-control">
   <div v-for="(item, index) in titles" :key="index" class="tab-control-item" :class="{active: currentIndex === index}" @click="tabClick(index)" >
    <span>
      {{item}}
    </span>
  </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data () {
    return {
      currentIndex: 0  
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    background-color: #fff; 
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }

  .tab-control-item {
    flex: 1;

  }
  .tab-control-item span {
    padding: 3px;
  }

  .active span {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }
</style>