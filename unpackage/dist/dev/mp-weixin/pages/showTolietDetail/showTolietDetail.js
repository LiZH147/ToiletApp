"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Zs.database();
const _sfc_main = {
  setup(props, context) {
    const placeData = common_vendor.ref([]);
    const distance = common_vendor.ref(null);
    return {
      placeData,
      distance
    };
  },
  data() {
    return {
      gradeTotal: 0,
      gradeEnv: 0,
      gradeAir: 0,
      showDetailGrade: false
    };
  },
  onLoad: function(options) {
    console.log(options.id, options.distance);
    this.distance = options.distance;
    console.log("getComment");
    db.collection("toilet-data").where({
      _id: options.id
    }).get().then((res) => {
      this.placeData = res.result.data[0];
      console.log("onLoad接收数据", res.result.data[0]);
    });
  },
  methods: {
    gradeTotalOnChange: function(e) {
      !this.showDetailGrade ? this.showDetailGrade = true : null;
    },
    submitGrade: function() {
      const submitData = {
        autrhor: "a1",
        grade_total: this.gradeTotal,
        grade_env: this.gradeEnv,
        grade_air: this.gradeAir,
        create_time: (/* @__PURE__ */ new Date()).getTime(),
        toilet_id: this.placeData._id
      };
      console.log("submitGrade", submitData);
    }
  }
};
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.placeData.Address),
    b: common_vendor.t($setup.distance),
    c: common_vendor.t(),
    d: common_vendor.t(),
    e: common_vendor.o(() => {
    }),
    f: common_vendor.o($options.gradeTotalOnChange),
    g: common_vendor.o(($event) => $data.gradeTotal = $event),
    h: common_vendor.p({
      allowHalf: "true",
      size: "28",
      margin: "20",
      modelValue: $data.gradeTotal
    }),
    i: $data.showDetailGrade
  }, $data.showDetailGrade ? {
    j: common_vendor.o(($event) => $data.gradeEnv = $event),
    k: common_vendor.p({
      allowHalf: "true",
      size: "28",
      margin: "20",
      modelValue: $data.gradeEnv
    }),
    l: common_vendor.o(($event) => $data.gradeAir = $event),
    m: common_vendor.p({
      allowHalf: "true",
      size: "28",
      margin: "20",
      modelValue: $data.gradeAir
    })
  } : {}, {
    n: common_vendor.o((...args) => $options.submitGrade && $options.submitGrade(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-98423a9e"]]);
wx.createPage(MiniProgramPage);
