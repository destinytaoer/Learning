// 函数式组件
export default {
  render() {
    const tag = 'h' + this.type;
    return <tag>{this.$slots.default}</tag>;
  },
  props: {
    type: {
      type: String
    }
  }
};
