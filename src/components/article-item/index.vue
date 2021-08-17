<template>
  <div class="article-item">
    <van-cell-group>
      <van-cell>
        <template #title class="title van-multi-ellipsis--l2">{{ article.title }}</template>
        <template #label>
          <div v-if="article.cover.type === 3" class="cover-wrap">
            <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
              <van-image class="cover-item-img" fit="cover" :src="img" />
            </div>
          </div>
          <div class="label-info-wrap">
            <span>{{ article.aut_name }}</span>
            <span>{{ article.comm_count }}评论</span>
            <span>{{ article.pubdate | relativeTime }}</span>
          </div>
        </template>
        <van-image slot="default" v-if="article.cover.type === 1" class="right-cover" fit="cover" :src="article.cover.images[0]" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  directives: {},
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.article)
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
     font-size: 32px;
    color: #3a3a3a;
    margin: 31px 0;
  }
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
   .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .cover-wrap {
    // 三张图片
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 31px 0;
  }
  .cover-item {
    flex: 1;
    &:not(:last-child) {
      padding-right: 4px;
    }
  }
  .cover-item-img {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap {
    color: #b9b9b9;
    font-size: 23px;
    span {
      margin-right: 25px;
    }
  }
  .right-cover {
    width: 232px;
    height: 146px;
    margin: 31px 0;
  }
}
</style>
