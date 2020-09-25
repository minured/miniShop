import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: null,
  },

  // 商品全部数据
  goodsAllInfo: {},

  onSwiperImageTap(e){
    let {index} = e.currentTarget.dataset
    console.log(this.goodsAllInfo.pics);
    let urlList = this.goodsAllInfo.pics.map(item => item.pics_big)
    wx.previewImage({
      current: urlList[index],  // 当前显示图片的http链接
      urls: urlList   // 需要预览的图片http链接列表
    })
  },

  queryParams: {
    goods_id: undefined,
  },
  async getGoodsDetail() {
    const res = await request({ url: "/goods/detail", data: this.queryParams });
    console.log(res);
    this.goodsAllInfo = res.data.message
    let data = res.data.message;

    // 只把响应ui的数据放到 data
    this.setData({
      goodsDetail: {
        //  goodsDetail: res.data.message
        goods_name: data.goods_name,
        goods_price: data.goods_price,
        // 前端简单替换后缀, 要确保后端有这个图片
        // goods_introduce: data.goods_introduce.replace(/\.webp/g, ".jpg"),
        goods_introduce: data.goods_introduce,
        pics: data.pics
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.queryParams.goods_id = options.goods_id;
    this.getGoodsDetail();
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
