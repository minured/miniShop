Page({
  data: {
    address: null,
    cart: [],
    totalPrice: 0,
  },
  async onSettlement() {
    console.log("支付");
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
    wx.setStorageSync("cart", cart);
  },

  onShow() {
    let address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    this.updateCartStatus(cart);
    this.setData({ address });
  },
});
