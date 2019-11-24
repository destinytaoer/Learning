<template>
  <div>
    <List :data="data">
      <template v-slot="{item}">
        <span>{{item}}</span>
      </template>
    </List>
  </div>
</template>
<script>
import List from "./list";
export default {
  data() {
    return { data: ["苹果", "香蕉", "橘子"] };
  },
  components: {
    List
  }
};
</script>