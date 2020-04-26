<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="top">
      <span class="top-left left">用户评价</span>
      <span class="top-right right">更多</span>
    </div>
    <div class="bottom">
      <div class="user">
        <img :src="commentInfo.user.avatar" alt="" class="userImg">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="content">
        {{commentInfo.content}}
      </div>
      <div class="other">
        <span class="time">{{commentInfo.created | showTime}}</span>
        <span class="style">{{commentInfo.style}}</span>
      </div>
      <div v-if="commentInfo.images !== null" class="image">
        <img v-for="(item,index) in commentInfo.images" :key="index" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import{formatDate} from 'common/utils'
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showTime(value) {
      const date = new Date(value * 1000);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  }
}
</script>

<style scoped>
  .top {
    height: 62px;
    line-height: 30px;
    padding: 15px 10px;
    border-bottom: 2px solid #f2f5f8;
    font-size: 16px;
    text-align: center;
  }

  .top-left {
    font-size: 20px;
  }

  .bottom {
    padding: 15px 10px 15px;
    color: #333;
  }
  .bottom .userImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }

  .content {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #777;
  }

  .time,
  .style {
    margin-right: 10px;
    font-size: 13px;
    color: #777;
  }

  .image img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }
</style>