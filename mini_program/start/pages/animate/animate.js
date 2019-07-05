// pages/animate/animate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animate: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var animate = wx.createAnimation({
      duration: 2000,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
    this.setData({
      animate
    });
    setTimeout(() => {
    animate.skew(40).rotate(60).step();
    this.setData({
      animate
    });
    }, 100)
    setTimeout(()=>{
      animate.translate(200, 200).step();
      this.setData({
        animate
      })
    },1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})