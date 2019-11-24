<template>
  <div>
    <H type="2">Hello</H>
    <List
      :data="data"
      :render="render"
    ></List>
  </div>
</template>
<script>
import H from "./jsx-title.js";
import List from "./list";
export default {
  data() {
    return { data: ["苹果", "香蕉", "橘子"] };
  },
  methods: {
    render(h, item) {
      return <span>{item}</span>;
    }
  },
  components: {
    H,
    List
  }
};
</script>