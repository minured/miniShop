import { request } from "../../request/index.js";

Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0
  },
  categoryData: [],

  onMenuClick(e) {
    let { index } = e.currentTarget.dataset;
    this.setData({
      currentIndex: index,
    });

    // 设置目标index的右边数据
    let targetRightData = this.categoryData[index].children;
    this.setData({
      rightContent: targetRightData,
    });
    
    // 重置滚动条
    this.setData({
      scrollTop: 0
    })
  },

  // 设置本地缓存
  saveCategory() {
    wx.setStorageSync("cates", { time: Date.now(), data: this.categoryData });
  },

  // 抽离方法， 设置左边和右边数据
  setFirstItemData() {
    let left = this.categoryData.map((item) => item.cat_name);
    this.setData({
      leftMenuList: left,
      rightContent: this.categoryData[0].children,
    });
  },

  async getCategory() {
    let res = await request({
      url: "/categories",
    });
    this.categoryData = res.data.message;
    this.setFirstItemData();
    this.saveCategory();
  },
  // 判断本地数据 及其 有效时间
  // {time: Date.now(), data: {...}}
  onLoad: function (options) {
    const localCategory = wx.getStorageSync("cates");
    if (!localCategory) {
      this.getCategory();
    } else {
      if (Date.now() - localCategory.time > 1000 * 300) {
        // console.log("数据过期 重新获取");
        this.getCategory()
      } else {
        // console.log("数据有效， 使用本地数据");
        this.categoryData = localCategory.data;
        this.setFirstItemData();
      }
    }
  },

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
