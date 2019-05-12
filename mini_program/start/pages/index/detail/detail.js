// pages/index/detail/detail.js
let data = require("../../../data/data.js");
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      flag: app.bgMusicFlag
    })
    let {id} = options;
    let item = data.find((d) => {
      return d.id === id;
    });
    this.setData({
      list: item
    });
    // 防止进入其他页面后，按钮不同步
    wx.onBackgroundAudioPlay(() => {
      app.bgMusicFlag = true;
      this.setData({
        flag: true
      })
    });
    wx.onBackgroundAudioPause(() => {
      app.bgMusicFlag = false;
      this.setData({
        flag: false
      })
    });
  },

  playMusic() {
    // true 为正在播放， false 为暂停播放
    if (!this.data.flag) {
      wx.playBackgroundAudio({
        dataUrl: 'http://183.232.83.22/amobile.music.tc.qq.com/C400001SqajE1fDmB4.m4a?guid=6435489591&vkey=1D20542CD7BDFE7927DFE0BF58F3247C7C2E3B04B2401EA5AFF62E1E01A842B4EA76B925FDD7CAC55B57CA82F5FF3BEBD29AAD398B0B8AD3&uin=3151&fromtag=66',
        success: () => {
          app.bgMusicFlag = true;
          this.setData({
            flag: true
          })
        }
      });
    } else {
      wx.pauseBackgroundAudio({
        success: () => {
          app.bgMusicFlag = false;
          this.setData({
            flag: false
          })
        }
      });
    }
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