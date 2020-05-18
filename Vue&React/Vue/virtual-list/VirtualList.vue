<template>
  <!-- 外层可以滚动的盒子 -->
  <div
    class="viewport"
    ref="viewport"
    @scroll="handleScroll"
  >
    <!-- 用来撑起滚动条的高度 -->
    <div
      class="scroll-bar"
      ref="scrollBar"
    ></div>
    <!-- 滚动列表 -->
    <div
      class="scroll-list"
      :style="{ transform: `translate3d(0, ${offset}px,0)`}"
    >
      <div
        class="list-item"
        v-for="item in visibleData"
        :vid="item.id"
        :key="item.id"
        ref="items"
      >
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "virtual-list",
  props: {
    size: Number, // 每个列表的高度
    remain: Number, // 显示多少个列表
    items: Array, // 列表数据
    variable: Boolean // 是否高度不固定
  },
  data() {
    return {
      // 一屏数据的开始索引
      start: 0,
      // 列表容器的偏移量
      offset: 0,
      // 缓存的位置信息
      positions: []
    };
  },
  computed: {
    // 一屏数据的结束索引
    end() {
      return this.start + this.remain;
    },
    // 默认渲染三屏列表
    prevCount() {
      // 前面预留几个列表
      return Math.min(this.start, this.remain);
    },
    nextCount() {
      // 后面预留几个列表
      return Math.min(this.remain, this.items.length - this.end);
    },
    // 渲染的数据
    visibleData() {
      // 实际渲染数据的开始和结束索引, 三屏数据
      let start = this.start - this.prevCount;
      let end = this.end + this.nextCount;
      return this.items.slice(start, end);
    }
  },
  methods: {
    handleScroll() {
      // 滚动的时候
      let scrollTop = this.$refs.viewport.scrollTop;

      if (this.variable) {
        // 如果 variable 为真, 则高度不固定
        // 使用二分查找找到对应的记录
        this.start = this.getStartIndex(scrollTop);
        let position = this.positions[this.start - this.prevCount];
        this.offset = position ? position.top : 0;
      } else {
        // 高度固定的情况
        // 1. 通过已经滚动的距离, 来计算当前显示列表的开始索引
        this.start = Math.floor(scrollTop / this.size);
        // 2. 计算列表的偏移位置, 让列表显示在可视区域内
        // 有预留的一屏渲染, 需要减去它的高度
        this.offset = (this.start - this.prevCount) * this.size;
      }
    },
    cacheList() {
      // 缓存当前项的高度和 top/bottom 值
      this.positions = this.items.map((item, index) => ({
        height: this.size,
        top: index * this.size,
        bottom: (index + 1) * this.size
      }));
    },
    getStartIndex(value) {
      let start = 0;
      let end = this.positions.length - 1;
      let temp = null;

      while (start <= end) {
        let midIndex = parseInt((start + end) / 2);
        // 找到中间值的那个人的末尾位置
        let midValue = this.positions[midIndex].bottom;

        if (midValue === value) {
          return midIndex + 1; // 因为是跟末尾位置比较,所以要 + 1
        } else if (midValue < value) {
          start = midIndex + 1;
        } else if (midValue > value) {
          // 需要考虑在两个值中间范围内
          if (temp == null || temp > midIndex) {
            temp = midIndex;
          }
          end = midIndex - 1;
        }
      }
      return temp;
    }
  },
  updated() {
    // 页面渲染完成后, 需要根据当前展示的数据, 更新缓存区的内容
    this.$nextTick(() => {
      // 根据当前显示的列表, 更新缓存中的 height / bottom / top, 最终更新滚动条的高度
      let nodes = this.$refs.items;
      if (!(nodes && nodes.length > 0)) return;

      nodes.forEach(node => {
        let { height } = node.getBoundingClientRect(); // 当前的位置信息
        // 获取旧的高度
        let id = node.getAttribute("vid") - 0;
        let oldHeight = this.positions[id].height;

        let val = oldHeight - height;
        if (val) {
          // 当前列表高度变化, top 不会变化, 但是 bottom 会变化
          this.positions[id].height = height;
          this.positions[id].bottom = this.positions[id].bottom - val;
          // 后面所有的列表的 top 和 bottom 都会变化
          for (let i = id + 1; i < this.positions.length; i++) {
            this.positions[i].top = this.positions[i - 1].bottom;
            this.positions[i].bottom = this.positions[i].bottom - val;
          }
        }
      });
      // 重新计算滚动条高度
      this.$refs.scrollBar.style.height =
        this.positions[this.positions.length - 1].bottom + "px";
    });
  },
  mounted() {
    this.$refs.viewport.style.height = this.size * this.remain + "px";
    this.$refs.scrollBar.style.height = this.items.length * this.size + "px";

    // 加载完毕之后, 缓存每一项的高度
    this.cacheList();
  }
};
</script>
<style>
.viewport {
  overflow: scroll;
  position: relative;
}
.scroll-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>