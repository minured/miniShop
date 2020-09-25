// 改写原生的wx.request为promise
// 参数传入， 然后解构

let ajaxNum = 0

export const request = (params) => {
    ajaxNum += 1
    console.log(ajaxNum);
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise ((resolve, reject) => {

        wx.showLoading({
            title: "加载中",
            mask: true,
        });

        var reqTask = wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (res)=>{
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
            },
            complete: () => {
                ajaxNum -= 1
                console.log(ajaxNum);
                if (ajaxNum === 0) {
                    wx.hideLoading();
                }
            }
        });
    })
}