import { getSetting, openSetting, chooseAddress } from "../../utils/asyncWX.js";
Page({
  data: {
    hasAddress: false,
    address: null,
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  addNum(e) {
    console.log(e.currentTarget.dataset);

  },
  reduceNum(e) {
    console.log(e.currentTarget.dataset);
  },

  async onAddAddress() {
    console.log("添加收货地址");
    //先判断用户的授权状态 再请求地址权限
    //三种情况： 前两种都可以直接请求获取地址
    // 用户已授权  true
    // 用户未授权　undefined
    // 用户已拒绝  提示用户手动开启授权
    try {
      const res = await getSetting();
      const scopeAddress = res.authSetting["scope.address"];
      console.log(scopeAddress);
      // scopeAddress可能为 undefined
      if (scopeAddress === false) {
        await openSetting();
      }
      const address = await chooseAddress();
      console.log(address);
      address.all =
        address.provinceName +
        address.cityName +
        address.countyName +
        address.detailInfo;
      wx.setStorageSync("address", address);
      this.setData({
        address: address,
      });
    } catch (error) {
      console.error(error);
    }
  },

  // allChecked, totalPrice, totalNum 更新
  updateCartStatus(cart) {
    let totalPrice = 0;
    let totalNum = 0;
    let allChecked = true;

    cart.forEach((item) => {
      if (item.checked) {
        totalPrice += item.goodsDetail.goods_price * item.num;
        totalNum += item.num;
      } else {
        allChecked = false;
      }
    });

    // cart可能为空
    allChecked = cart.length === 0 ? false : allChecked;
    this.setData({
      totalNum,
      totalPrice,
      cart,
      allChecked,
    });
  },
  onGoodsCheckedChange(e) {
    // TODO  取商品 id 还是 index.
    // let {index} = e.currentTarget.dataset

    // 为了保险, 使用商品id
    let { id } = e.currentTarget.dataset;
    let { cart } = this.data;
    let index = cart.findIndex((item) => item.goodsDetail.goods_id === id);
    cart[index].checked = !cart[index].checked;

    this.updateCartStatus(cart);
    wx.setStorageSync("cart", cart);
  },
  onAllCheckedChange() {
    let { allChecked } = this.data;
    let { cart } = this.data;
    allChecked = !allChecked;
    cart.forEach((item) => {
      item.checked = allChecked;
    });
    this.setData({
      allChecked,
      cart
    });
    wx.setStorageSync("cart", cart);
  },

  onShow() {
    let address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];

    // 计算全选， 所有checkbox选中的时候 即为全选
    // every 数组的遍历方法，接受一个回调函数，
    // 全部回调返回true， 则every返回true，
    // 有一个返回false， 则停止遍历， every返回false
    // 注意：如果是空数组 调用了 every， 则返回true
    // const allChecked = localCart.length
    //   ? localCart.every((item) => item.checked)
    //   : false;
    this.updateCartStatus(cart);
    this.setData({ address });
  },
});
