// pages/detail/detail.js
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo');
  },
  inputValue: '',
  /**
   * 页面的初始数据
   */
  data: {
    videoInfo: null,
    othersList: [],
    commentData: [],
    src: '',
    danmuList:
      [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
  },

  bindInputBlur: function (e) {
    this.inputValue = e.detail.value;
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    });
  },

  // 获取视频详情
  getCurrentVideo(videoId){
    const _this = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5cef4f907778277d6f0e5558/aaa/videoDetail',
      success(res) {
        if (res.data.code === 0) {
          _this.setData({
            videoInfo: res.data.data.videoInfo
          });
        }
      }
    })
  },

  // 获取推荐视频
  getOthersList(videoId){
    const _this = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5cef4f907778277d6f0e5558/aaa/othersList?id='+videoId,
      success(res){
        if(res.data.code === 0) {
          _this.setData({
            othersList: res.data.data.othersList
          });
        }
      }
    });
  },

  // 获取评论数据
  getCommentList(videoId){
    const _this = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5cef4f907778277d6f0e5558/aaa/commentsList?id='+videoId,
      success(res){
        if(res.data.code === 0) {
          _this.setData({
            commentData: res.data.data.commentData
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let videoId = options.id;
    this.getCurrentVideo(videoId);
    this.getOthersList(videoId);
    this.getCommentList(videoId);
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