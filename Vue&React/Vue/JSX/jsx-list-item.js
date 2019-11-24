export default {
  props: {
    renderFn: {
      type: Function
    },
    item: {
      type: String
    }
  },
  render(h) {
    return this.renderFn(h, this.item);
  }
};
