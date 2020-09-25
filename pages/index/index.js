//Page Object
// 微信小程序 引入 要把路径写完整
import { request } from "../../request/index.js"

Page({
    data: {
        swiperList: [],
        navList: [],
        floorList: []
    },
    
    // 数据请求
    dataMap: [
        {
            name: "swiperList",
            url: "/home/swiperdata"
        },
        {
            name: "navList",
            url: "/home/catitems"            
        },
        {
            name: "floorList",
            url: "/home/floordata"
        }
    ],
    // 修正接口返回url
    formatSwiperUrl(e){
        let {url} = e.currentTarget.dataset
        let left = url.spilt("?")[0].split("/").pop()
        let right = url.split("?")[1]
        url = left + right

        return url
    },

    getIndexData() {
        this.dataMap.forEach(item => {
            request({url: item.url}).then(res => {
                this.setData({
                    [item.name]: res.data.message
                })
            })
        })
    },


    // async getSwiperList() {
    //     let res = await request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    //     this.setData({
    //         swiperList: res.data.message
    //     })
    // },
    // async getNavList() {
    //     let res = await　request({url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    //     this.setData({
    //         navList: res.data.message
    //     })
    // },
    // async getFloorList() {
    //     let res = await request({url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    //     this.setData({
    //         floorList: res.data.message
    //     })
    // },

    onLoad() {
        // this.getSwiperList()
        // this.getNavList()
        // this.getFloorList()
        this.getIndexData()

    },
    //可以在此发送请求
    // onLoad: function(options){
    //     // 使用promise处理请求
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