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

  addToCart(e) {
    let { id } = e.currentTarget.dataset;
    // 这样加一个 默认值， 就省去了 判断是否有购物车的一步，没有购物车则默认空数组
    let localCart = wx.getStorageSync("cart") || [];

    // localCart.forEach((item) => {
    //   if (item.goodsDetail.goods_id === id) {
    //     // 存在该商品 数量+1, 并保存
    //     item.num += 1;
    //     console.log(item.num);
    //     hasGoods = true;
    //   }
    // });

    // 用一个语法糖方法来代替遍历, 根据index来判断是否存在商品
    let index = localCart.findIndex((item) => item.goodsDetail.goods_id === id);

    if (index !== -1) {
      console.log("商品已存在, 数量加一");

      localCart[index].num += 1;
    } else {
      console.log("商品未存在");
      localCart.push({
        num: 1,
        goodsDetail: this.data.goodsDetail,
      });
    }

    // 最后, 保存并提示
    wx.setStorageSync("cart", localCart);
    wx.showToast({
      title: "已加入购物车",
      // 提示期间，屏蔽用户操作
      mask: true
    });
  },
  onSwiperImageTap(e) {
    let { index } = e.currentTarget.dataset;
    console.log(this.goodsAllInfo.pics);
    let urlList = this.goodsAllInfo.pics.map((item) => item.pics_big);
    wx.previewImage({
      current: urlList[index], // 当前显示图片的http链接
      urls: urlList, // 需要预览的图片http链接列表
    });
  },

  queryParams: {
    goods_id: undefined,
  },
  async getGoodsDetail() {
    const res = await request({ url: "/goods/detail", data: this.queryParams });
    console.log(res);
    this.goodsAllInfo = res.data.message;
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
        pics: data.pics,
        goods_id: data.goods_id,
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
