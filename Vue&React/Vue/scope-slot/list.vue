<template>
  <div>
    <div
      v-for="(item,key) in data"
      :key="key"
    >
      <slot :item="item"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>