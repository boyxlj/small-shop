// const BASEURL = "http://localhost:3303/api"
const BASEURL = "https://small-shop.helloxlj.top/api";
export const request = (url, data, method) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASEURL + url,
      method: method ? method : "GET",
      data,
      header: {
        "content-type": "application/json",
      },
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
