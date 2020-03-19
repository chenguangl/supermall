<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
    }
  },
  // computed是属性,调用的时候不需要加小括号,有缓存
  computed: {
    isActive() {
      // $route,表示当前激活的路由的状态信息
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive? {color: this.activeColor}: {};
    }    
  },
  // methods是方法,会重复调用
  methods: {
    itemClick() {
      // 表示当前激活的路由的状态信息,push方法的跳转会向 history 栈添加一个新的记录
      this.$router.push(this.path).catch(err => {err});
    }
  },
  components: {
  }
}
</script>

<style scoped>
   .tab-bar-item {
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 14px;
  }

  .tab-bar-item img {
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
    width: 24px;
    height: 24px;
  }

  .active {
    color: red;
  }
</style>
