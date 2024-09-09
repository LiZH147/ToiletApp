"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup(props, context) {
    console.log(props);
  },
  data() {
    return {};
  },
  onLoad: function(options) {
    console.log(options.id);
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
