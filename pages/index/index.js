//Page Object
// 微信小程序 引入 要把路径写完整
import { request } from "../../request/index.js"

Page({
    data: {
        swiperList: [],
        navList: []
    },
    
    async getSwiperList() {
        let res = await request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
        this.setData({
            swiperList: res.data.message
        })
    },
    async getCatItem() {
        let res = await　request({url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
        this.setData({
            navList: res.data.message
        })
        console.log(this.data.navList);
    },

    onLoad() {
        this.getSwiperList()
        this.getCatItem()
        
    },
    //可以在次发送请求
    // onLoad: function(options){


    //     // 使用promise发送处理请求
    //     // request({
    //     //     url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    //     // }).then(res => {
    //     //     console.log(res);
    //     //     this.setData({
    //     //         swiperList: res.data.message
    //     //     })
    //     // }, err => {
    //     //     console.log(err);
    //     // })

    //     // var reqTask = wx.request({
    //     //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //     //     success: (result)=>{
    //     //         console.log(result);    
    //     //         this.setData({
    //     //             swiperList: result.data.message
    //     //         })
    //     //     },
    //     //     fail: (err)=>{
    //     //         console.log(err);
    //     //     },
    //     // });
    // },
    onReady: function(){
        
    },
    onShow: function(){
        
    },
    onHide: function(){

    },
    onUnload: function(){

    },
    onPullDownRefresh: function(){

    },
    onReachBottom: function(){

    },
    onShareAppMessage: function(){

    },
    onPageScroll: function(){

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item){

    }
});