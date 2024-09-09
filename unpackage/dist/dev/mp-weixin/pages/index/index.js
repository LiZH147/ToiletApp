"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    function topage(row) {
      common_vendor.index.navigateTo({
        url: row
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(_ctx.title),
        c: common_vendor.o(($event) => topage("/uni_modules/uni-id-pages/pages/login/login-withoutpwd")),
        d: common_vendor.o(($event) => topage("../mapPages/index"))
      };
    };
  }
};
wx.createPage(_sfc_main);
