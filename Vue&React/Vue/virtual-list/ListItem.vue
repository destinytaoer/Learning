<template>
  <div class="list-item">
    {{item.id}} --- {{item.content}}
  </div>
</template>
<script>
export default {
  name: "list-item",
  props: {
    item: Object
  }
};
</script>
<style scoped>
.list-item {
  padding: 20px 0;
  border: 1px solid red;
}
</style>