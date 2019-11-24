<template>
  <div class="list">
    <div
      v-for="(item,index) in data"
      :key="index"
    >
      <li v-if="!render">{{item}}</li>
      <ListItem
        v-else
        :item="item"
        :renderFn="render"
      ></ListItem>
    </div>
  </div>
</template>
<script>
import ListItem from "./jsx-list-item.js";
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    render: {
      type: Function
    }
  },
  components: {
    ListItem
  }
};
</script>