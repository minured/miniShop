import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏
    tabs: [
      {
        id: 0,
        title: "综合",
        isActive: true,
      },
      {
        id: 1,
        title: "销量",
        isActive: false,
      },
      {
        id: 2,
        title: "销量",
        isActive: false,
      },
    ],
    // 分类列表
    goodsList: [],
  },

  // 接口参数， 不响应ui的数据，不用放到data
  QueryParams: {
    query: "", //关键字
    cid: "", //分类id
    pagenum: 1,
    pagesize: 10,
  },

  totalPage: undefined,

  tabsChangeHandler(e) {
    let { index } = e.detail;
    console.log(index);
    let { tabs } = this.data;
    tabs.forEach((item) => {
      item.isActive = index === item.id;
    });
    this.setData({
      tabs,
    });
  },
  async getGoodsList() {

    const res = await request({
      url: "/goods/search",
      data: this.QueryParams,
    });

    let { goodsList } = this.data;
    goodsList.push(...res.data.message.goods);
    this.setData({
      goodsList,
    });
    this.totalPage = Math.ceil(
      res.data.message.total / this.QueryParams.pagesize
    );
    wx.stopPullDownRefresh()

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 直接获得url的查询参数
    console.log(options);
    this.QueryParams.cid = options.cid;
    console.log(this.QueryParams);
    this.getGoodsList();
  },

  onReachBottom: function () {
    console.log(this.QueryParams.pagenum);
    if (this.QueryParams.pagenum < this.totalPage) {
      this.QueryParams.pagenum += 1;
      this.getGoodsList();
    } else {
      // 这方式重复触发， 不方便
      // wx.showToast({
      //   title: "没有更多了"
      // })
    }
  },

  onPullDownRefresh(){
    console.log("下拉刷新");
    // 重置
    this.QueryParams.pagenum = 1
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  }
});
