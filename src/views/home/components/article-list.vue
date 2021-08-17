<template>
  <div>
    <div class="article-list">
      <van-pull-refresh @refresh="onRefresh" v-model="isreFreshLoading" :success-text="refreshSuccessText" :success-duration="1500">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error"
        error-text="请求失败，点击重新加载">
          <!-- <van-cell v-for="(item, index) in list" :key="index" :title="item.title" /> -->
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
      ArticleItem
  },
  directives: {},
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本f
    }
  },
  mounted () {
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        // 展示错误提示状态
        this.error = true
        // 请求失败了，loading 也需要关闭
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now(), // 下拉刷线，每次请求获取最新数据，所以传递当前最新时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.2) {
        //   JSON.parse('dsnajndjsa')
        // }

        // 2. 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 3. 关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false

        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
// .article-list {
//   position: fixed;
//   top: 180px;
//   bottom: 100px;
//   right: 0;
//   left: 0;
//   overflow-y: auto;
// }
</style>
