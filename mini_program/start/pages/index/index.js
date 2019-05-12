// pages/index/index.js
let data = require("../../data/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [
      "/imgs/banner1.jpg",
      "/imgs/banner2.jpg",
      "/imgs/banner3.jpg",
      "/imgs/banner4.jpg",
      "/imgs/banner5.jpg",
      "/imgs/banner6.jpg"
    ],
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      lists: data
    });
  },
  toDetail(e) {
    // 获取 id
    let el  = e.currentTarget;
    let id = el.dataset.uid;
    wx.navigateTo({
      url: `detail/detail?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})