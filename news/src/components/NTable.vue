<script>
import moment from 'moment'

export default {
  name: 'NTable',
  props: ['data', 'isLoading'],
  methods: {
    getDate(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    }
  }
}
</script>

<template>
  <table cellpadding="0" cellspacing="0">
    <tr>
      <th>Title</th>
      <th>Category</th>
      <th>Created By</th>
      <th>Updated By</th>
      <th>Created Date</th>
    </tr>
    <tr v-for="(item, index) in data" :key="index">
      <template v-if="isLoading">
        <td v-for="line in 5" :key="line">
          <div class="line" />
        </td>
      </template>
      <template v-else>
        <td>
          <p>{{ item.title }}</p>
        </td>
        <td>{{ item.source.name }}</td>
        <td>{{ item.author }}</td>
        <td>-</td>
        <td>{{ getDate(item.publishedAt) }}</td>
      </template>
    </tr>
  </table>
</template>

<style lang="scss" scoped>
$base-color: #f4f4f4;
$shine-color: rgba(229, 229, 229, 0.8);
$animation-duration: 2s;

@mixin background-gradient {
  background-image: linear-gradient(90deg, $base-color 0px, $shine-color 40px, $base-color 80px);
  background-size: 600px;
}
.line {
  float: left;
  width: 100px;
  height: 16px;
  margin-top: 12px;
  border-radius: 7px;

  @include background-gradient;
  animation: shine-lines $animation-duration infinite ease-out;
}

@keyframes shine-lines {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 140px;
  }
}

table {
  width: 100%;
}

table tr {
  color: #545c64;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  z-index: 2;
}

table tr:first-child {
  position: sticky;
  top: 0px;
}

table tr:hover {
  background: #f3f9fe;
}

table td,
table th {
  padding: 16px 30px;
}

table td:first-child {
  max-width: 500px;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background: #f6f8fa;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  color: #073775;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
