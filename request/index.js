// 改写原生的wx.request为promise
// 参数传入， 然后解构
export const request = (params) => {
    return new Promise ((resolve, reject) => {
        var reqTask = wx.request({
            ...params,
            success: (res)=>{
                resolve(res)
            },
            fail: (err)=>{
                reject(err)
            },
        });
    })
}