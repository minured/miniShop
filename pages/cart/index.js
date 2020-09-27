// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasAddress: false,
  },

  onAddAddress() {
    console.log("添加收货地址");
    //先判断用户的授权状态 再请求地址权限

    //三种情况： 前两种都可以直接请求获取地址
    // 用户已授权  true
    // 用户未授权　undefined

    // 用户已拒绝  提示用户手动开启授权

    wx.getSetting({
      success: (result) => {
        console.log(result);
        let scopeAddress = result.authSetting["scope.address"];
        console.log(scopeAddress);
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
