// pages/note/note.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notes: [],
    pageSize: 5,
    pageNum: 1
  },
  toDetail() {
    wx.navigateTo({
      url: 'note-detail/note-detail',
    })
  },
  loadMore() {
    var index = this.data.pageNum + 1;
    var notes = wx.getStorageSync("notes");
    this.setData({
      notes: notes.slice(0, this.data.pageSize * index),
      pageNum: index
    });
  },
  clear() {
    wx.showModal({
      title: '清除',
      content: "是否确定清除记事本？",
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync("notes");
          this.setData({
            notes: []
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var notes = wx.getStorageSync("notes");
    this.setData({
      notes: notes.slice(0, this.data.pageSize * this.data.pageNum)
    });
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
    setTimeout(()=>{
      wx.stopPullDownRefresh();
    }, 500)
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
    return {
      title: "分享给你米",
      desc: "分享我吧",
      path: "pages/index/index"
    }
  }
})