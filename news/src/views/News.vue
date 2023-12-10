<script>
import axios from 'axios'
import router from '@/router'

import NTable from '@/components/NTable.vue'

export default {
  name: 'ViewNews',
  components: { NTable },
  data: () => {
    return {
      news: [],
      pageSize: 25,
      page: 1,
      pageLimit: 10,
      scrollRef: null,
      isLoading: false,
      token: localStorage.getItem('token')
    }
  },
  created() {
    this.getNews()
  },
  mounted() {
    this.scrollRef = this.$refs.scrollContainer
  },
  watch: {
    isLoading(val) {
      if (this.scrollRef) this.scrollRef.style['overflow-y'] = val ? 'hidden' : 'auto'
    }
  },
  methods: {
    async getNews() {
      try {
        this.isLoading = true

        const response = await axios.get(
          `http://localhost:8000/api/v1/news/query?pageSize=${this.pageSize}&page=${this.page}`,
          {
            headers: { Authorization: 'Bearer ' + this.token }
          }
        )

        this.isLoading = false

        if (response.status === 200) this.news = response.data.articles
      } catch (error) {
        this.isLoading = false
        console.log({ error })
      }
    },
    async updateNews(event) {
      const { scrollHeight, scrollTop, clientHeight } = event.target

      // if scroll taps the top
      if (scrollTop <= 0 && this.page > 1) {
        this.page--
        await this.getNews()
        this.scrollRef.scrollTop = scrollHeight - clientHeight - 25
      }

      // if scroll taps the bottom
      if (scrollHeight - scrollTop === clientHeight && this.page < this.pageLimit) {
        this.page++
        await this.getNews()
        this.scrollRef.scrollTop = 25
      }
    },
    async onLogout() {
      await localStorage.removeItem('token')
      router.push('/login')
    }
  }
}
</script>

<template>
  <div class="page">
    <div class="page__sidebar">
      <div class="page__sidebar-item page__sidebar-item--active">
        <img src="../assets/news-icon.svg" alt="news-icon" />
        <p class="page__sidebar-item-text">News List</p>
      </div>
      <div class="page__sidebar-line" />
      <div class="page__sidebar-item" @click="onLogout">
        <img src="../assets/logout-icon.svg" alt="logout-icon" />
        <p class="page__sidebar-item-text">Logout</p>
      </div>
    </div>
    <div class="page__news">
      <div class="page__news-title">
        <div class="page__news-title-logo" />
        <p class="page__news-title-text">News List</p>
      </div>
      <div class="page__news-table" ref="scrollContainer" @scroll="updateNews">
        <n-table :data="news" :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  display: flex;

  &__sidebar {
    width: 20%;
    height: 100%;
    border-right: 1px solid #d5d9e3;
    background: #f9fafe;
    padding: 50px 25px;

    @media only screen and (max-width: 992px) {
      display: none;
    }

    &-item {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      display: flex;
      align-items: center;

      cursor: pointer;

      &-text {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: #212427;
        margin-left: 12px;
      }

      &--active,
      &:hover {
        background: #e8efff;

        .page__sidebar-item-text {
          color: #3159ba;
        }
      }
    }

    &-line {
      height: 1px;
      width: 100%;
      background: #dfe2ee;
      margin: 12px 0px;
    }
  }

  &__news {
    flex: 1;
    padding: 2rem;

    &-title {
      display: flex;
      align-items: center;
      margin-bottom: 45px;

      &-logo {
        width: 4px;
        align-self: stretch;
        background: #3159ba;
        margin-right: 12px;
      }

      &-text {
        color: #212427;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }

    &-table {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 540px;
      border-radius: 8px;
      border: 1px solid #d5d9e3;
      position: relative;

      &::-webkit-scrollbar {
        width: 7px;
        border-radius: 4px;
        background: #edeff1;
      }

      &::-webkit-scrollbar-thumb {
        background: #545c64;
      }
    }
  }
}
</style>
