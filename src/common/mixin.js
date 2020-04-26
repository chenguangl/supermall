import {debounce} from 'common/utils'
import BackTop from 'components/common/backtop/BackTop'


export const itemImageListener = {
  data () {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImageListener = () => {
      this.refresh();
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener);
  }
}

export const backTopMixin = {
  data () {
    return {
      isShown: false,
      
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
}