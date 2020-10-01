// 小程序api封装为promise
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export const showModal = (params) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...params,
      success: (result) => {
        resolve(result);
      },
      fail: (res) => {
        reject(res);
      },
      complete: () => {},
    });
  });
};

export const showToast = (params) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      ...params,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {},
    });
  });
};
