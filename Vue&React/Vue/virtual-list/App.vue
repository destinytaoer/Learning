<template>
  <div class="app">
    <!-- 只显示可视区域 -->
    <!-- 1. 列表每一项有多高 size, 需要用来模拟滚动条 -->
    <!-- 2. 显示的列表数量 remian -->
    <!-- 3. 列表数据数组 items-->
    <!-- 4. 表示列表高度不确定 variable,此时 size 和 remain 必须要传, size 为大概高度 -->
    <VirtualList
      :size="40"
      :remain="8"
      :items="items"
      :variable="true"
    >
      <template v-slot="{item}">
        <ListItem :item="item"></ListItem>
      </template>
    </VirtualList>
  </div>
</template>
<script>
import VirtualList from "./VirtualList";
import ListItem from "./ListItem";
import Mock from "mockjs";
let items = [];
for (let i = 0; i < 10000; i++) {
  items.push({ id: i, value: i, content: Mock.Random.sentence(5, 50) });
}
export default {
  name: "app",
  data() {
    return {
      items
    };
  },
  components: {
    VirtualList,
    ListItem
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>