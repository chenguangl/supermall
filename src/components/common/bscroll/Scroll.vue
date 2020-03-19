<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data () {
    return {
      scroll: null
    }
  },
  // mounted:html加载完成后执行。执行顺序：子组件-父组件
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {

    })
  },
  methods: {
    scrollTo(x, y, time=400) {
      this.scroll.scrollTo(x, y, time);
    }
  }
}
</script>

<style scoped>

</style>